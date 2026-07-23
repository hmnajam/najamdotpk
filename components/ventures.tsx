import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Venture, VentureStatus } from "@/data/ventures";

const statusLabel: Record<VentureStatus, string> = {
  live: "Live",
  building: "Building",
  acquired: "Acquired",
  sunset: "Closed",
};

// Dot + text colour per status. Live/acquired read as wins; closed stays neutral —
// muted, not apologetic.
const statusStyle: Record<VentureStatus, string> = {
  live: "text-emerald-400",
  building: "text-amber-400",
  acquired: "text-brand",
  sunset: "text-zinc-400",
};

// Gradient fallbacks when a venture has no cover image.
const tints = [
  "from-violet-500/40 to-indigo-700/25",
  "from-sky-500/40 to-blue-700/25",
  "from-fuchsia-500/40 to-purple-700/25",
  "from-amber-500/30 to-rose-700/25",
];

function VentureCard({ venture, index }: { venture: Venture; index: number }) {
  const {
    name,
    tagline,
    story,
    outcome,
    role,
    period,
    status,
    url,
    urlLabel,
    image,
    tags,
  } = venture;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-secondary bg-gradient-to-br ${tints[index % tints.length]}`}
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xl font-medium tracking-tight text-foreground/50">
              {name}
            </span>
          </div>
        )}
        {/* Dark scrim keeps the status chip readable over any cover, in both themes. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span
          className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-black/65 px-2 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm ${statusStyle[status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel[status]}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col space-y-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium tracking-tight">{name}</h3>
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {period ? `${role} · ${period}` : role}
          </span>
        </div>

        <p className="text-sm font-medium leading-snug text-foreground/90">
          {tagline}
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">{story}</p>

        {outcome && (
          <p className="border-l-2 border-border pl-3 text-sm italic leading-relaxed text-muted-foreground">
            {outcome}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {url && (
          <div className="pt-1">
            <Link
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {urlLabel ?? "Visit site"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

export function Ventures({ items }: { items: Venture[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {items.map((venture, i) => (
        <VentureCard key={venture.name} venture={venture} index={i} />
      ))}
    </div>
  );
}
