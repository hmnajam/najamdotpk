import Link from "next/link";
import { ExternalLink, FileText, ShieldCheck } from "lucide-react";

import type { Certification } from "@/data/certifications";

/**
 * Two links per credential, deliberately: `url` is the issuer's own record — the
 * authoritative proof — and `pdf` is a local copy that opens instantly and keeps
 * working if the issuer ever moves or retires the verify page.
 */
function CredentialLinks({
  cert,
  className = "",
}: {
  cert: Certification;
  className?: string;
}) {
  if (!cert.url && !cert.pdf) return null;

  const link =
    "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 ${className}`}>
      {cert.url && (
        <Link href={cert.url} target="_blank" rel="noreferrer" className={link}>
          <ExternalLink className="h-3.5 w-3.5" />
          Verify
        </Link>
      )}
      {cert.pdf && (
        <Link href={cert.pdf} target="_blank" rel="noreferrer" className={link}>
          <FileText className="h-3.5 w-3.5" />
          Certificate
        </Link>
      )}
    </div>
  );
}

export function Certifications({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cert) => (
        <div
          key={cert.title}
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
        >
          <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
          <div className="mt-4">
            <h3 className="text-[15px] font-medium leading-snug tracking-tight">
              {cert.title}
            </h3>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-brand">
              {cert.issuer} · {cert.date}
            </p>
            <CredentialLinks cert={cert} className="mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Compact one-line-per-credential list, for the longer tail of course certificates. */
export function CertificationList({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((cert) => (
        <li
          key={cert.title}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3.5"
        >
          <span className="text-sm leading-snug">{cert.title}</span>
          <span className="flex shrink-0 items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {cert.issuer} · {cert.date}
            </span>
            <CredentialLinks cert={cert} />
          </span>
        </li>
      ))}
    </ul>
  );
}
