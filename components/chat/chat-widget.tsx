"use client";

import { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChatPanel } from "@/components/chat/chat-panel";
import { agentConfig } from "@/config/agent";

/**
 * Floating launcher + slide-in panel for "Virtual Najam". Mounted once,
 * site-wide, from the root layout. Panel content is lazy in effect — the
 * useChat hook only runs once the panel has been opened.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  // Keep the panel mounted after first open so conversation state survives close.
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (open) setEverOpened(true);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-4 z-50 flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),400px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-200 sm:right-6 motion-reduce:transition-none",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
        role="dialog"
        aria-label="Virtual Najam — AI assistant"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand/15 text-brand">
              <MessageSquare className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">{agentConfig.identity.name}</p>
              <p className="text-[11px] text-muted-foreground">
                {agentConfig.identity.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {everOpened && <ChatPanel />}
      </div>

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Virtual Najam"}
        aria-expanded={open}
        className="glow-brand fixed bottom-5 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-xl transition-transform hover:scale-105 active:scale-95 sm:right-6 motion-reduce:transition-none"
      >
        <span className="relative h-6 w-6">
          <MessageSquare
            className={cn(
              "absolute inset-0 h-6 w-6 transition-all duration-200 motion-reduce:transition-none",
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )}
          />
          <X
            className={cn(
              "absolute inset-0 h-6 w-6 transition-all duration-200 motion-reduce:transition-none",
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )}
          />
        </span>
      </button>
    </>
  );
}
