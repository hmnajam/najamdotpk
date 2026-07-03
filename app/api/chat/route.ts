import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

import { getChatModel, isChatConfigured } from "@/lib/agent/model";
import { buildSystemPrompt } from "@/lib/agent/persona";
import { agentTools } from "@/lib/agent/tools";
import { agentConfig } from "@/config/agent";

// Node runtime — tools touch Node APIs (fs-backed knowledge, Resend).
export const runtime = "nodejs";

const { guardrails, model } = agentConfig;

// --- Lightweight per-IP rate limiting (in-memory) ---------------------------
// Good enough for a single instance / low traffic. Swap for Upstash Ratelimit
// if we scale to multiple serverless instances.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = guardrails.rateLimitPerMinute;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const MAX_MESSAGES = guardrails.maxMessagesPerConversation;
const MAX_CHARS = guardrails.maxCharsPerMessage; // cap on a single user message

export async function POST(request: Request) {
  if (!isChatConfigured()) {
    return Response.json(
      { error: "The assistant isn't configured yet (model key unset)." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages — give it a minute and try again." },
      { status: 429 }
    );
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return Response.json({ error: "Conversation too long" }, { status: 413 });
  }

  // Input length guard on the latest user message.
  const last = messages[messages.length - 1];
  const lastText = last?.parts
    ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
  if (lastText && lastText.length > MAX_CHARS) {
    return Response.json({ error: "Message too long" }, { status: 413 });
  }

  try {
    const result = streamText({
      model: getChatModel(),
      system: buildSystemPrompt(),
      messages: await convertToModelMessages(messages),
      tools: agentTools,
      stopWhen: stepCountIs(model.maxSteps), // short tool-use loop
      temperature: model.temperature,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[/api/chat] stream failed:", err);
    return Response.json(
      { error: "The assistant hit an error. Please try again." },
      { status: 502 }
    );
  }
}
