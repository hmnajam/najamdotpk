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

/**
 * Full-width treatment for the venture that ended in an exit. Deliberately
 * breaks the grid rhythm — sitting flush beside two closures made the one that
 * worked read as equivalent to the ones that didn't.
 */
function VentureSpotlight({ venture }: { venture: Venture }) {
  const { name, tagline, story, outcome, role, period, url, urlLabel, image, tags, metric } =
    venture;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-brand/30 bg-card shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="relative grid gap-0 lg:grid-cols-[5fr_7fr]">
        <div className="relative min-h-[220px] overflow-hidden border-b border-border lg:min-h-full lg:border-b-0 lg:border-r">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-secondary bg-gradient-to-br from-violet-500/40 to-indigo-700/25" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              Exit
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {period ? `${role} · ${period}` : role}
            </span>
          </div>

          <div>
            <h3 className="display text-3xl leading-tight tracking-tight sm:text-4xl">
              {name}
            </h3>
            <p className="mt-2 text-base font-medium leading-snug text-foreground/90">
              {tagline}
            </p>
          </div>

          {metric && (
            <div className="flex items-baseline gap-3 border-l-2 border-brand pl-4">
              <span className="display text-4xl leading-none text-gradient sm:text-5xl">
                {metric.value}
              </span>
              <span className="text-sm leading-snug text-muted-foreground">
                {metric.label}
              </span>
            </div>
          )}

          <p className="text-sm leading-relaxed text-muted-foreground">{story}</p>

          {outcome && (
            <p className="text-sm italic leading-relaxed text-brand/90">{outcome}</p>
          )}

          <div className="flex flex-wrap gap-1.5">
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
            <div>
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
      </div>
    </article>
  );
}

export function Ventures({ items }: { items: Venture[] }) {
  if (items.length === 0) return null;

  const spotlit = items.filter((v) => v.spotlight);
  const gridded = items.filter((v) => !v.spotlight);

  return (
    <div className="space-y-12">
      {gridded.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-2">
          {gridded.map((venture, i) => (
            <VentureCard key={venture.name} venture={venture} index={i} />
          ))}
        </div>
      )}
      {spotlit.map((venture) => (
        <VentureSpotlight key={venture.name} venture={venture} />
      ))}
    </div>
  );
}
