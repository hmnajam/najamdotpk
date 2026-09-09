import Link from "next/link";
import type { Testimonial } from "@/data/testimonials";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const approved = items.filter((item) => item.verified && item.sourceUrl);
  if (!approved.length) return null;
  return <div className="grid gap-5 md:grid-cols-2">
    {approved.map((t) => <figure key={t.author + t.sourceUrl} className="space-y-5 rounded-2xl border border-border bg-card p-6">
      <blockquote className="text-lg leading-relaxed">{t.quote}</blockquote>
      <figcaption className="space-y-1 text-sm">
        <p className="font-semibold">{t.author}</p>
        {(t.title || t.company) && <p className="text-muted-foreground">{[t.title, t.company].filter(Boolean).join(" · ")}</p>}
        <Link href={t.sourceUrl!} target="_blank" rel="noreferrer" className="inline-block pt-2 underline underline-offset-4">Read original recommendation<span className="sr-only"> from {t.author}</span> ↗</Link>
      </figcaption>
    </figure>)}
  </div>;
}
