import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProject } from "@/lib/content";

export function CaseStudies() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {["talkifai", "labcloud"].map((slug) => {
        const project = getProject(slug);
        if (!project) return null;
        const p = project.frontmatter;
        return (
          <Link key={slug} href={"/projects/" + slug} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[2/1] overflow-hidden bg-secondary">
              {p.image && <Image src={p.image} alt={slug === "labcloud" ? "HealthCloud, the platform LabCloud became after acquisition" : "TalkifAI voice platform"} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-top transition-transform group-hover:scale-[1.02]" />}
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{p.period} · {slug === "talkifai" ? "Voice AI · Closed in 2026" : "Healthcare software · Acquired"}</p>
              <h3 className="flex items-center justify-between gap-3 text-2xl font-semibold">{p.title}<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" /></h3>
              <p className="leading-relaxed text-muted-foreground">{p.description}</p>
              <p className="border-l-2 border-brand pl-4 font-medium">{p.outcome}</p>
              <span className="inline-block text-sm font-medium text-brand">Read the engineering case study →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
