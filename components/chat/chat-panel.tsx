"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Loader2, Search, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { agentConfig } from "@/config/agent";

const STARTERS = agentConfig.starters;

function toolLabel(partType: string): string | null {
  if (!partType.startsWith("tool-")) return null;
  const name = partType.slice("tool-".length);
  return agentConfig.toolLabels[name] ?? `Using ${name}`;
}

export function ChatPanel() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="flex items-start gap-2.5 rounded-2xl rounded-tl-sm bg-secondary/60 px-3.5 py-2.5 text-sm">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <p className="text-foreground/90">{agentConfig.identity.greeting}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] space-y-1.5 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "rounded-tr-sm bg-brand text-brand-foreground"
                  : "rounded-tl-sm bg-secondary/60 text-foreground/90"
              )}
            >
              {m.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <p key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </p>
                  );
                }
                const label = toolLabel(part.type);
                if (label) {
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2 py-1 font-mono text-[11px] text-brand"
                    >
                      <Search className="h-3 w-3" />
                      {label}…
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}

        {busy && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-secondary/60 px-3.5 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-xs text-destructive">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="border-t border-border p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-card/60 p-1.5 focus-within:border-brand/40">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            rows={1}
            placeholder="Ask about Najam…"
            className="max-h-28 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground transition-opacity hover:bg-brand/90 disabled:opacity-40"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 px-1 text-center text-[11px] text-muted-foreground">
          {agentConfig.identity.disclaimer}
        </p>
      </form>
    </div>
  );
}
