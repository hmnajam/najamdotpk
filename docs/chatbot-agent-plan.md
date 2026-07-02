# Portfolio Chatbot Agent — Plan

> Status: **planned, not built.** Parked while we focus on design. This doc captures
> the agreed direction so we can pick it up later without re-deciding everything.

## Goal

A small "support" / assistant chat widget on najam.pk that answers visitor
questions about Najam — what he builds, his projects, availability, how to hire
him — grounded in the site's own content. Doubles as a live proof-of-skill piece
("I'm an agentic AI developer — here's an agent I built, answering questions
about me").

## Scope (v1)

- Floating chat button → panel, bottom-right.
- Answers questions about: projects, skills/stack, certifications, blog topics,
  availability, how to get in touch.
- Grounded in site content (no hallucinated facts about Najam).
- Politely deflects off-topic / unknown questions and points to the contact form.
- **Not** in v1: booking calls, taking actions, multi-step tool use, memory across
  sessions. (See "Future — Option B".)

## Architecture — Option A (recommended for v1)

Keep it in this Next.js app; no separate backend.

```
Browser (chat UI, client component)
   │  POST /api/chat  (streamed)
   ▼
Next.js Route Handler  app/api/chat/route.ts   (server, holds API key)
   │  - builds system prompt + retrieved context
   │  - calls the model, streams tokens back
   ▼
Model provider (Anthropic Claude)
```

- API key lives server-side only (`ANTHROPIC_API_KEY` in env / Vercel project
  settings) — never shipped to the client.
- Stream responses for a snappy feel.
- Watch Vercel function execution limits (Hobby ~10s, Pro ~60–300s). A
  retrieval + single completion is well within this.

### Grounding / knowledge (start simple)

- Build-time index of the MDX corpus (projects + blog + about) into a small
  JSON/in-memory structure. Corpus is tiny → **no vector DB needed for v1.**
- Inject the most relevant snippets into the system prompt per question (simple
  keyword/embedding match). Upgrade to a hosted vector store (Upstash Vector or
  Supabase pgvector) only if the corpus grows a lot.

### Model choice

- **Default: Anthropic Claude.** Use **Haiku 4.5** (`claude-haiku-4-5-20251001`)
  for low cost on a high-traffic public widget; escalate to Sonnet if answer
  quality needs it. (Confirm latest model IDs via the claude-api skill at build
  time.)
- **Alternative (user asked): Google.** Gemini via Vertex AI Agent Builder / ADK
  is viable, especially if we ever go GCP-native. For a single-purpose Q&A
  widget it's heavier setup than needed. Noted, not chosen for v1.

## UX

- Launcher button (violet accent, matches the bold/premium design).
- Panel: message list, input, streaming assistant replies, "thinking" state.
- 2–3 suggested starter prompts ("What has Najam built?", "Is he available?",
  "What's his AI stack?").
- Clear "this is an AI assistant" disclosure.
- Respects reduced-motion and the site's dark theme.

## Guardrails & cost

- System prompt constrains scope to Najam / the site; refuse or redirect
  off-topic asks.
- **Rate limiting** per IP (e.g. Upstash Ratelimit) to prevent abuse/cost spikes.
- **Daily spend cap** / max tokens per request.
- Basic input length cap; strip obvious prompt-injection attempts.
- Don't log message contents with PII; if logging for analytics, anonymize.

## Security notes

- API key server-side only.
- Treat user messages as untrusted input.
- No actions/side effects in v1, so blast radius is just text generation.

## Build steps (when we resume)

1. Add `ANTHROPIC_API_KEY` to env + `.env.example` (user provides the secret).
2. Build the content index (build-time, from `lib/content.ts`).
3. `app/api/chat/route.ts` — streaming handler, system prompt + retrieval.
4. Add rate limiting + spend cap.
5. Chat UI components (launcher + panel), wired to the route.
6. Verify in preview; tune the system prompt and starter prompts.

## Future — Option B (only if it needs to *do* things)

If the assistant should book calls, run tools, or reason in multi-step loops,
move the heavy logic to a **FastAPI** service (Najam's stack — see the GenAI
Boilerplate project: Next + FastAPI + LangChain + LangGraph) on
Railway/Render/Fly. The Next.js route becomes a thin proxy that keeps keys and
rate-limiting at the edge.
