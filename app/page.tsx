import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { stats } from "@/data/stats";
import { certifications } from "@/data/certifications";
import { verifiedTestimonials } from "@/data/testimonials";
import { getProjects, getPosts } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { PersonWebsiteJsonLd } from "@/components/structured-data";
import { CaseStudies } from "@/components/case-studies";
import { WorkPaths } from "@/components/work-paths";
import { FeaturedTile } from "@/components/featured-tile";
import { FeaturedWriting } from "@/components/featured-writing";
import { Certifications } from "@/components/certifications";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = {
  title: { absolute: "Najam Saeed — Agentic AI & Voice AI Engineer" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const strengths = [
  ["Production engineering & ownership", "I build across agent logic, backend integrations, and the product interface. TalkifAI included orchestration, telephony, dashboard, documentation, and billing."],
  ["AI-agent orchestration", "Multi-agent workflows, RAG, and MCP connect models to useful tools and business context. ZeroHR puts human approval before candidate scoring."],
  ["Voice & telephony infrastructure", "Real-time voice agents using LiveKit, Retell AI, Twilio, and SIP, including an Open Dental integration for a US dental startup."],
  ["Reliability, evaluation & guardrails", "Automated end-to-end call tests, component-level status reporting, and per-call analytics make production behavior visible and reviewable."],
  ["Product judgment & customer understanding", "Selling LabCloud into 30+ labs taught me to connect product decisions to operational needs and explain the tradeoffs behind them."],
  ["From concept to deployment", "I can own a defined problem end to end while working with product and engineering colleagues on scope, integration, and what success looks like."],
];

export default function HomePage() {
  const projects = getProjects().filter((p) => !p.frontmatter.caseStudy);
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <PersonWebsiteJsonLd />
      <div className="space-y-16 sm:space-y-24">
        <section aria-labelledby="hero-title" className="space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest text-brand">{siteConfig.available ? "Available for remote engineering roles" : siteConfig.eyebrow}</p>
              <h1 id="hero-title" className="display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">Production AI agents.<br /><span className="text-brand">Real-time voice.</span></h1>
              <p className="mt-6 text-xl font-medium">Najam Saeed · {siteConfig.eyebrow}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{siteConfig.intro}</p>
              <p className="mt-4 text-sm text-muted-foreground">RAG &amp; MCP · Founder with one company exit</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href={siteConfig.resume} target="_blank" rel="noreferrer">View Résumé <span className="sr-only">(PDF, opens a new tab)</span></a></Button>
                <Button asChild size="lg" variant="outline"><Link href="/hire-me#consulting">Discuss an AI Project</Link></Button>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{siteConfig.location}<br />{siteConfig.availability}</p>
            </div>
            <aside className="space-y-5 border-l-2 border-brand pl-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Selected production experience</p>
              <Link href="/projects/talkifai" className="block space-y-2">
                <h2 className="text-xl font-semibold">TalkifAI →</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">Voice platform used by SIEHS and HealthCloud. Provisioned for 20 simultaneous calls; reported 99.9% uptime.</p>
              </Link>
              <Link href="/projects/zerohr" className="block space-y-2 border-t border-border pt-5">
                <h2 className="text-xl font-semibold">ZeroHR →</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">Auditable AI screening with human-approved criteria and evidence behind candidate scores.</p>
              </Link>
            </aside>
          </div>
          <dl className="grid grid-cols-2 gap-x-5 gap-y-8 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => <div key={s.label} className="flex flex-col"><dt className="order-2 mt-2 text-sm text-muted-foreground">{s.label}</dt><dd className="text-3xl font-semibold tracking-tight">{s.value}</dd></div>)}
          </dl>
        </section>

        <section id="case-studies" className="scroll-mt-24 space-y-6" aria-labelledby="case-title">
          <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 id="case-title" className="display text-3xl">Engineering, in production</h2><Link href="/projects" className="text-sm underline underline-offset-4">All projects →</Link></div>
          <p className="max-w-2xl text-muted-foreground">The systems I built, the responsibilities I owned, and the outcomes they reached.</p>
          <CaseStudies />
        </section>

        <section aria-labelledby="team-title" className="space-y-8">
          <h2 id="team-title" className="display text-3xl">What I Bring to an Engineering Team</h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{strengths.map(([title, body], i) => <article key={title} className="border-t border-border pt-5"><p aria-hidden="true" className="mb-3 font-mono text-xs text-brand">0{i + 1}</p><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p></article>)}</div>
        </section>

        <WorkPaths />

        <section className="space-y-6" aria-labelledby="selected-title">
          <h2 id="selected-title" className="display text-3xl">More technical work</h2>
          <div className="mx-auto max-w-5xl columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">{projects.map((project, i) => <FeaturedTile key={project.slug} project={project} index={i} />)}</div>
        </section>

        <section className="space-y-6" aria-labelledby="credentials-title">
          <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 id="credentials-title" className="display text-3xl">Credentials &amp; training</h2><Link href="/certifications" className="text-sm underline underline-offset-4">All certifications →</Link></div>
          <Certifications items={certifications} />
        </section>

        {verifiedTestimonials.length > 0 && <section className="space-y-6"><h2 className="display text-3xl">Recommendations</h2><Testimonials items={verifiedTestimonials} /></section>}

        {posts.length > 0 && <section className="space-y-6"><div className="flex items-baseline justify-between gap-3"><h2 className="display text-3xl">Writing</h2><Link href="/blog" className="text-sm underline underline-offset-4">All posts →</Link></div><FeaturedWriting posts={posts} /></section>}

        <section className="space-y-5 border-t border-border pt-8" aria-labelledby="earlier-title">
          <h2 id="earlier-title" className="text-xl font-semibold">Earlier ventures</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <article><h3 className="font-medium">Orion · 2021–2022</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A gaming revenue-share business closed after the crypto crash. The lesson: a working product still depends on the economics around it.</p></article>
            <article><h3 className="font-medium">Artistica · 2020</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A marketplace for Karachi’s custom-printing businesses. The lesson: adoption and marketplace liquidity need as much attention as the software.</p></article>
          </div>
          <Link href="/ventures" className="inline-block text-sm underline underline-offset-4">Read the founder history →</Link>
        </section>
      </div>
    </>
  );
}
