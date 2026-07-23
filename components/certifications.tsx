import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

import type { Certification } from "@/data/certifications";

export function Certifications({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cert) => {
        const card = (
          <>
            <div className="flex items-start justify-between gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
              {cert.url && (
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-[15px] font-medium leading-snug tracking-tight">
                {cert.title}
              </h3>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-brand">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          </>
        );

        const base =
          "group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md";

        return cert.url ? (
          <Link
            key={cert.title}
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className={`${base} hover:border-brand/40`}
          >
            {card}
          </Link>
        ) : (
          <div key={cert.title} className={base}>
            {card}
          </div>
        );
      })}
    </div>
  );
}

/** Compact one-line-per-credential list, for the longer tail of course certificates. */
export function CertificationList({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((cert) => {
        const row = (
          <>
            <span className="text-sm leading-snug">{cert.title}</span>
            <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {cert.issuer} · {cert.date}
              {cert.url && (
                <ExternalLink className="h-3.5 w-3.5 transition-colors group-hover:text-foreground" />
              )}
            </span>
          </>
        );

        const base =
          "flex items-center justify-between gap-4 px-5 py-3.5 transition-colors";

        return (
          <li key={cert.title}>
            {cert.url ? (
              <Link
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className={`group ${base} hover:bg-secondary/50`}
              >
                {row}
              </Link>
            ) : (
              <div className={base}>{row}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
