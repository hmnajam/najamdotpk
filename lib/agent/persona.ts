import { renderSystemPrompt } from "@/config/agent";

/**
 * The assistant's system prompt. The actual text lives in `config/agent.ts`
 * (single control surface) — this just renders its {{tokens}} from site config.
 */
export function buildSystemPrompt(): string {
  return renderSystemPrompt();
}
