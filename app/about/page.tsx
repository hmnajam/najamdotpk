import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

import { skills, favoriteTool } from "@/data/skills";
import { experience } from "@/data/experience";
import { stats } from "@/data/stats";
import { certifications } from "@/data/certifications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Four startups, one exit, two honest failures — and what founding them taught me about building AI that actually ships.",
  alternates: { canonical: "/about" },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {children}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <PageHeader
          eyebrow="About"
          title="Four startups. One exit. Now I build agents."
        />
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            I&apos;m a founder who codes — which is a different animal from an
            engineer who takes tickets. I started my first company in 2015 and
            haven&apos;t stopped since: four of them, one sold, two closed with
            my own hands. Everything I know about building software, I learned
            by having to sell the thing afterwards.
          </p>
          <p>
            <strong className="text-foreground">LabCloud</strong> was the one that
            worked. Diagnostic labs here ran on paper registers and WhatsApp; I
            built them a cloud LIMS, sold it lab by lab, and eventually sold the
            company. It runs today as HealthCloud, serving 70+ clients under its
            new owners.
          </p>
          <p>
            The other two taught me more.{" "}
            <strong className="text-foreground">Artistica</strong>{" "}
            was an attempt
            to bring Karachi&apos;s Pakistan Chowk — a dense, physical bazaar of
            small printers and makers — online as a marketplace. The software was
            the easy part; liquidity was the real problem, and I never solved it.{" "}
            <strong className="text-foreground">Orion</strong> gave teenagers
            gaming NFTs and split what they earned. The model worked until
            November 2022, when the crypto crash cut earnings by roughly 99%
            overnight. My unit economics never broke — the asset underneath them
            did. I shut it down rather than string anyone along.
          </p>
          <p>
            Now I build agentic AI: agents, voice AI, and sovereign systems that
            reason, act, and get real work done. I take them the whole way — agent
            logic, tool integrations, the backend underneath, and the product
            people actually use. My current one,{" "}
            <strong className="text-foreground">TalkifAI</strong>, takes you from
            idea to a working voice agent in minutes.
          </p>
          <p>
            What the founder years actually bought me: I know which corners cost
            you later, I ship before it&apos;s perfect, and I don&apos;t hand you
            a demo and call it a product. I also care a great deal about systems
            you own — because I&apos;ve watched a business evaporate when the
            thing underneath it belonged to someone else.
          </p>
        </div>
        <div>
          <Button asChild variant="outline">
            <Link href="/ventures">
              See the ventures
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.slice(0, 4).map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="text-3xl font-semibold tracking-tight text-gradient">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="space-y-5">
        <SectionHeading>Skills &amp; stack</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="text-sm font-medium text-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) =>
                  item === favoriteTool ? (
                    <Badge
                      key={item}
                      className="gap-1 border-transparent bg-brand font-normal text-brand-foreground hover:bg-brand/90"
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {item}
                    </Badge>
                  ) : (
                    <Badge key={item} variant="secondary" className="font-normal">
                      {item}
                    </Badge>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-brand text-brand" />
          {favoriteTool}
          {" is my favorite — it's where I do most of my work."}
        </p>
      </section>

      {/* Experience */}
      <section className="space-y-5">
        <SectionHeading>Experience</SectionHeading>
        <ol className="relative space-y-8 border-l border-border pl-6">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="relative">
              <span className="absolute -left-[1.7rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand bg-background" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {job.role} · {job.company}
                </h3>
                {job.period && (
                  <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {job.period}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Certifications teaser */}
      {certifications.length > 0 && (
        <section className="space-y-5">
          <SectionHeading>Certifications</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.slice(0, 3).map((cert) => (
              <div
                key={cert.title}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <ShieldCheck className="h-5 w-5 text-brand" />
                <div className="mt-4">
                  <h3 className="text-[15px] font-medium leading-snug tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-brand">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-2"
          >
            View all certifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}

      {/* CTA */}
      <Reveal className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Have something that needs to think and act?
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          I take AI systems from idea to production — agents, voice AI, and
          sovereign deployments. Let&apos;s talk about what you&apos;re building.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/hire-me">
              Work with me
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
