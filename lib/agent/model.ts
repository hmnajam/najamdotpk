import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

import { agentConfig } from "@/config/agent";

/**
 * Provider factory for the on-site assistant ("Virtual Najam").
 *
 * Kept provider-agnostic on purpose: we go through the Vercel AI SDK so the
 * brain can be swapped (Gemini today; Claude / OpenAI / self-hosted later) by
 * changing this one file. Defaults come from `config/agent.ts`; env vars
 * (CHAT_MODEL_PROVIDER / CHAT_MODEL) override per-environment.
 */

export const CHAT_PROVIDER =
  process.env.CHAT_MODEL_PROVIDER ?? agentConfig.model.provider;

const GOOGLE_MODEL = process.env.CHAT_MODEL ?? agentConfig.model.id;

/** True when the assistant has the credentials it needs to answer. */
export function isChatConfigured(): boolean {
  switch (CHAT_PROVIDER) {
    case "google":
      return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    default:
      return false;
  }
}

/** Returns the configured language model, or throws if unconfigured. */
export function getChatModel(): LanguageModel {
  switch (CHAT_PROVIDER) {
    case "google": {
      const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
      const google = createGoogleGenerativeAI({ apiKey });
      return google(GOOGLE_MODEL);
    }
    default:
      throw new Error(`Unsupported CHAT_MODEL_PROVIDER: ${CHAT_PROVIDER}`);
  }
}
