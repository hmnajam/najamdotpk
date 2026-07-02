"use client";

import { useEffect, useState } from "react";

// A small, self-demonstrating "multi-agent run" log for the hero. Lines reveal
// in sequence with a blinking cursor on the active step, then it holds. Pure
// decoration — respects reduced-motion (renders fully complete, no animation).
const steps = [
  { agent: "planner", text: "decomposed task into 4 steps", done: true },
  { agent: "researcher", text: "gathered 12 sources", done: true },
  { agent: "writer", text: "draft generated", done: true },
  { agent: "critic", text: "reviewing", done: false },
] as const;

export function AgentLog() {
  const [visible, setVisible] = useState(1);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setVisible(steps.length);
      return;
    }

    const reveal = setInterval(() => {
      setVisible((v) => (v < steps.length ? v + 1 : v));
    }, 700);
    const cursor = setInterval(() => setBlink((b) => !b), 500);

    return () => {
      clearInterval(reveal);
      clearInterval(cursor);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a12] p-5 font-mono text-[13px] shadow-lg sm:p-6">
      {/* Title bar */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs text-zinc-500">multi-agent-run.log</span>
      </div>

      {/* All lines are always rendered (reserving full height); unrevealed ones
          are hidden so the card never grows and shifts the tiles below it. */}
      <div className="space-y-2.5 leading-relaxed text-zinc-300" aria-hidden="true">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const revealed = i < visible;
          return (
            <div
              key={step.agent}
              style={{ opacity: revealed ? 1 : 0 }}
              className="transition-opacity duration-200"
            >
              <span className="text-violet-400">{step.agent}</span>
              <span className="text-zinc-600"> → </span>
              {step.text}
              {step.done && <span className="ml-1.5 text-emerald-400">✓</span>}
              {isLast && !step.done && (
                <span
                  className="text-violet-400"
                  style={{ opacity: blink ? 1 : 0 }}
                >
                  ▋
                </span>
              )}
            </div>
          );
        })}
      </div>

      <span className="sr-only">
        Example multi-agent workflow: planner, researcher, writer, and critic
        agents collaborating on a task.
      </span>
    </div>
  );
}
