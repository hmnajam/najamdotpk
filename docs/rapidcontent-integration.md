# RapidContent → najam.pk publishing integration

Handoff spec for **RapidContent** (the content-writing agent) to publish posts to
najam.pk. Hand this whole file to the agent.

The transport is already built and documented — see [`blog-api.md`](./blog-api.md)
for the full endpoint reference. This document adds the two things that file
doesn't cover: **how RapidContent should be wired up**, and **the editorial bar a
post must clear before it goes near the API.** The second half matters more. A
generic content agent pointed at this endpoint will produce competent, forgettable
filler, which is worse than an empty blog on a portfolio whose whole claim is that
its owner builds things that work.

---

## 1. The contract, in brief

```
POST https://www.najam.pk/api/blog
Authorization: Bearer <BLOG_API_TOKEN>
Content-Type: application/json
```

```json
{
  "title": "string, 1–200",
  "description": "string, 1–300 — the card + SEO summary",
  "content": "Markdown body. No frontmatter, no H1.",
  "tags": ["lowercase", "topic", "tags"],
  "category": "AI & Agents",
  "date": "2026-07-25",
  "slug": "optional-explicit-slug",
  "published": false
}
```

Responses: `201` created, `200` updated (same slug = upsert), `401` bad token,
`422` validation failure with `details.fieldErrors`, `502` git commit failed,
`503` server not configured. Full table in [`blog-api.md`](./blog-api.md).

**`category` must be one of these five exactly** (from `data/categories.ts`) — any
other value silently falls back to a grey "Writing" style:

`AI & Agents` · `Engineering` · `Governance` · `Blockchain` · `Books`

### What actually happens on POST

The route ([`app/api/blog/route.ts`](../app/api/blog/route.ts)) builds an MDX file
from the JSON, then commits it to GitHub as `content/blog/<slug>.mdx` on `main`.
There is no database. A `201` means **the commit landed**, not that the page is
live — Vercel still has to rebuild, which takes under a minute. RapidContent must
not poll the public URL immediately and treat a 404 as failure.

---

## 2. Configuration RapidContent needs

| Secret | Where it comes from | Notes |
|---|---|---|
| `NAJAMPK_BLOG_API_TOKEN` | Same value as `BLOG_API_TOKEN` on the najam.pk Vercel deployment | Store in RapidContent's secret manager. Never log it, never put it in a prompt, never commit it. |

That's the only credential. The GitHub token stays server-side on najam.pk —
RapidContent never touches git directly.

Recommended defaults on the RapidContent side:

- Base URL configurable (`NAJAMPK_BASE_URL`), defaulting to `https://www.najam.pk`,
  so posts can be tested against a Vercel preview deployment first.
- 30s request timeout, **max 2 retries, exponential backoff, only on `502`/`503`
  or a network error.** Never retry a `422` — the payload is wrong, fix it. Never
  retry a `401`.
- Hard cap on posts per run (start with 1). An agent that can publish in a loop to
  a personal brand is a liability, not a feature.

---

## 3. The publishing flow

RapidContent must **never publish directly.** The flow is draft → human review →
promote:

1. **Draft.** POST with `"published": false` and an explicit `slug`. The file is
   committed but hidden from `/blog`, the home page, RSS, and tag pages.
2. **Notify.** Report back to Najam with the returned `slug`, `path`, `commit`,
   and the full body text for review. Do not assume silence is approval.
3. **Promote.** On explicit approval, re-POST the **same slug** with
   `"published": true`. Same-slug POSTs upsert, so this replaces the file rather
   than creating a duplicate.

Corrections work the same way: re-POST the same slug with the fixed body.

---

## 4. Editorial brief — the part that matters

### Who the byline is

Najam Saeed. Agentic AI developer and serial founder in Pakistan. Four companies
founded: **LabCloud** (cloud LIMS for Pakistani diagnostic labs, 2015–2019, sold —
still runs as HealthCloud in 70+ labs), **Artistica** (2020, a marketplace for
Karachi's Pakistan Chowk printers, closed — never reached liquidity),
**Orion** (2021–2022, play-to-earn on a revenue split with teens, closed after the
Nov 2022 crypto crash took token earnings down ~99%), **TalkifAI** (2025–2026,
no-code voice agents, wound down). One sold, three closed by his own hand. He now
builds agentic systems, voice AI, and sovereign/self-hosted AI for clients.

The site's whole posture is **outcomes over pitches** — the ventures page leads
with the closures. The blog has to match that or it reads as a different person
wrote it.

### Voice

- First person, plain, declarative. Short sentences. No hedging.
- Specific over general. Numbers, dates, names of real things.
- Admits what failed and what it cost. The Orion post-mortem is more valuable than
  any "5 trends in AI" listicle will ever be.
- Dry, occasionally funny. Never breathless. Never "In today's fast-paced world."
- British/neutral spelling is fine either way; be consistent within a post.

### Banned outright

These are the tells that make a post read as machine-written filler:

- Opening with "In today's rapidly evolving landscape…" or any variant
- "Let's dive in", "game-changer", "unlock", "leverage" (as a verb), "seamless",
  "revolutionize", "in the realm of", "it's not just X, it's Y"
- Numbered listicles with no argument holding them together
- Rhetorical question openers ("Ever wondered what makes agents tick?")
- A concluding paragraph that only restates the intro
- Em-dash-heavy sentence rhythm applied uniformly to every paragraph
- Any claim about Najam's work, clients, revenue, or history that isn't in this
  document or on the site. **Do not invent case studies, metrics, or clients.**
  If a post needs a detail that isn't verifiable, ask Najam instead of filling it in.

### Shape of a good post

- 700–1500 words. Long enough to make one argument properly; short enough to be read.
- **One** thesis, stated in the first two sentences. Not a survey.
- Grounded in something that actually happened — a build, a failure, a decision
  and its cost.
- Concrete code or config where it helps, in fenced blocks with language hints.
- Ends with the consequence, not a summary.

### Topics this byline has earned the right to write about

`AI & Agents` — tool-using agent architecture, why agent loops fail in production,
voice AI latency and telephony, model-agnostic/provider-swappable design,
self-hosted and sovereign AI, grounding and prompt injection.

`Engineering` — Next.js App Router in anger, content-as-code, building the boring
infrastructure a solo founder actually needs.

`Blockchain` — play-to-earn economics and how they broke, written from having run
one and closed it.

`Governance` — AI policy and data sovereignty as it applies to organisations that
can't ship data offshore.

`Books` — what he's read and disagreed with.

Anything requiring expertise he doesn't have is off-limits, however well it would
rank.

---

## 5. Pre-flight checklist

RapidContent must confirm all of these before the draft POST:

- [ ] `content` is Markdown only — **no YAML frontmatter**, and **no H1**; the page
      renders `title` separately.
- [ ] Newlines are real `\n` inside the JSON string.
- [ ] `category` is one of the five exact strings.
- [ ] `description` is under ~160 chars (the limit is 300, but cards truncate).
- [ ] `slug` is explicit, lowercase, hyphenated, and checked against the existing
      posts in `content/blog/` so an unrelated post isn't overwritten.
- [ ] `"published": false`.
- [ ] Every factual claim about Najam traces to this brief or to najam.pk.
- [ ] No banned phrase from §4 appears in the body.
- [ ] Read the whole thing back once and ask: would someone who knows this subject
      learn anything? If no, don't send it.

### Cover images

Omit `image` unless a real asset exists at `public/blog/<name>`. The site
auto-generates a clean category-coloured cover with the title on it, which looks
finished. A wrong or generic stock image looks worse than the generated one.

---

## 6. The three existing posts

`hello-world`, `content-as-code`, and `shipping-is-a-feature` are scaffold
placeholders from the original build, not real writing. They should be replaced,
not padded out — treat their slugs as available.
