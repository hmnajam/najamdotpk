# Virtual Najam — On-Site Assistant

> Status: **built (v1).** A tool-using assistant ("Virtual Najam") lives in the
> floating chat widget, grounded in the site's own content, and can hand qualified
> leads to Najam's inbox.

## What it is

A floating chat widget (bottom-right, every page) that answers visitor questions about
Najam — what he builds, his projects, stack, certifications, availability — grounded in
the site's MDX + data. It's also his assistant: it can surface the right contact channel
and email a qualified lead straight to his inbox. Doubles as a live proof-of-skill:
an agent Najam built, visibly reasoning and using tools.

## Architecture

```
Browser  components/chat/chat-widget.tsx + chat-panel.tsx  (useChat)
   │  POST /api/chat   (streamed UI-message stream)
   ▼
app/api/chat/route.ts   (Node runtime, holds keys, rate-limited)
   │  streamText({ model, system, messages, tools, stopWhen: stepCountIs(5) })
   ├─ tool searchSite         → lib/agent/knowledge.ts
   ├─ tool getContactChannels → config/site.ts
   └─ tool captureLead        → Resend email to Najam
   ▼
Model (Gemini Flash via @ai-sdk/google — provider-swappable, lib/agent/model.ts)
```

- **Provider-agnostic** through the Vercel AI SDK. Default is **Google Gemini Flash**
  (free tier). Swap to Claude/OpenAI/self-hosted by editing `lib/agent/model.ts` only.
- Keys are **server-side only**. Node runtime (knowledge reads MDX; `captureLead` uses
  Resend).
- Streaming responses; a short tool-use loop (up to 5 steps).

## Control surface — one file

**`config/agent.ts` is the single place to change the agent.** Persona/system prompt,
starter prompts, the model, RAG behavior (which sources it sees, result count, snippet
sizes, ranking weights, stopwords), guardrails (rate limit, length caps), and UI labels
all live there. Every module below reads from it — edit `config/agent.ts` and you're done.
The system prompt uses `{{tokens}}` (siteName, siteUrl, eyebrow, description, intro)
filled from `config/site.ts`. Env vars `CHAT_MODEL_PROVIDER` / `CHAT_MODEL` still override
the model per-environment.

## Files

| File | Role |
|------|------|
| `config/agent.ts` | **Control surface** — prompt, RAG, model, starters, guardrails, labels. |
| `lib/agent/model.ts` | Provider factory + `isChatConfigured()`. Gemini default; env-overridable model. |
| `lib/agent/knowledge.ts` | Build-time in-memory index of projects, blog, bio, skills, experience, certs. `searchSite(query)` keyword retrieval — **no vector DB** (tiny corpus). |
| `lib/agent/persona.ts` | System prompt: persona (from `config/site.ts`), grounding rules, guardrails, hand-off behavior. |
| `lib/agent/tools.ts` | `searchSite`, `getContactChannels`, `captureLead` (Zod-validated). |
| `app/api/chat/route.ts` | Streaming handler; per-IP rate limit; graceful 503 when unconfigured. |
| `components/chat/chat-widget.tsx` | Floating launcher + slide-in panel. |
| `components/chat/chat-panel.tsx` | Messages, streaming, tool-status chips, starter prompts, composer. |

## Grounding

- Answers about Najam are grounded via `searchSite` — the agent is instructed not to
  invent projects, dates, numbers, or credentials.
- May still answer general AI/engineering questions on-brand, then steer back to Najam.
- Refuses off-topic / abusive asks; ignores prompt-injection in user text.

## Guardrails & cost

- Per-IP in-memory rate limit (12 msgs / 60s) + message length cap (4000 chars) +
  max 40 messages/conversation. Swap the limiter for Upstash if we scale to multiple
  serverless instances.
- Gemini free tier absorbs early traffic; provider factory makes a paid swap trivial.
- `captureLead` validates the email and only fires when it has real details; logs (does
  not silently drop) if Resend is unconfigured.

## Configuration

`.env` (see `.env.example`):

```
CHAT_MODEL_PROVIDER=google
GOOGLE_GENERATIVE_AI_API_KEY=...      # https://aistudio.google.com/apikey (free tier)
# CHAT_MODEL=gemini-2.5-flash         # optional override
```

Lead capture reuses `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL`.
Without a model key the route returns 503 and the widget shows a friendly disabled state.

## Future — Phase 2

- **Antigravity Agent showcase.** As of I/O 2026 Google exposes an Antigravity managed
  agent in the Gemini API (`@google/genai` → `interactions.create`) that browses, runs
  code, and reasons in a sandbox. It's a heavyweight, pay-per-run (~$0.30–$3.25/run) task
  agent — the wrong tier for this always-on public widget, but a great **opt-in "watch a
  real agent work" demo**. Keep it fully separate from the widget so its per-run cost
  can't be triggered casually.
- Also later: true Calendly booking, per-visitor memory, or moving heavy logic to a
  FastAPI service (see the GenAI Boilerplate project) if the assistant needs to *do* more.
