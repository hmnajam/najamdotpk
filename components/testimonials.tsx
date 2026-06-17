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

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((t) => {
        const meta = sourceMeta[t.source];
        const Icon = meta.icon;
        return (
          <figure
            key={t.author}
            className="flex flex-col justify-between rounded-xl border border-border p-6"
          >
            <blockquote className="text-[15px] leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-medium text-brand">
                {initials(t.author)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{t.author}</div>
                <div className="truncate text-sm text-muted-foreground">
                  {t.title}, {t.company}
                </div>
              </div>
              {t.sourceUrl && (
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
        );
      })}
    </div>
  );
}
