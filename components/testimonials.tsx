"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Linkedin, Mail, Twitter } from "lucide-react";

import type { Testimonial, TestimonialSource } from "@/data/testimonials";

const sourceMeta: Record<
  TestimonialSource,
  { label: string; icon: typeof Linkedin }
> = {
  linkedin: { label: "LinkedIn", icon: Linkedin },
  twitter: { label: "Twitter", icon: Twitter },
  email: { label: "Email", icon: Mail },
  upwork: { label: "Upwork", icon: ExternalLink },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const ROTATE_MS = 6000;

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || items.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % items.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;

  const t = items[active];
  const meta = t.source ? sourceMeta[t.source] : null;
  const Icon = meta?.icon;

  return (
    <div
      className="relative rounded-2xl border border-border bg-card/60 p-8 text-center shadow-xl shadow-black/5 backdrop-blur-sm sm:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-2 select-none font-serif text-7xl leading-none text-brand/20 sm:text-8xl"
      >
        &ldquo;
      </span>
      <figure key={active} className="reveal is-visible relative">
        <blockquote className="font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
          {t.quote}
        </blockquote>
        <figcaption className="mt-8 flex flex-col items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-base font-medium text-brand">
            {initials(t.author)}
          </span>
          <div>
            <div className="font-medium">{t.author}</div>
            {(t.title || t.company) && (
              <div className="text-sm text-muted-foreground">
                {[t.title, t.company].filter(Boolean).join(", ")}
              </div>
            )}
          </div>
          {t.sourceUrl && meta && Icon && (
            <Link
              href={t.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Verify on ${meta.label}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {meta.label}
            </Link>
          )}
        </figcaption>
      </figure>

      {items.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.author}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-brand"
                  : "w-1.5 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
