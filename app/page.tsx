import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

import { siteConfig } from "@/config/site";
import { stats } from "@/data/stats";
import { skills } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import { getProjects, getPosts } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { FeaturedTile } from "@/components/featured-tile";
import { HeroPanel } from "@/components/hero-panel";
import { FeaturedWriting } from "@/components/featured-writing";
import { Testimonials } from "@/components/testimonials";
import { Typewriter } from "@/components/typewriter";
import { Certifications } from "@/components/certifications";
import { certifications } from "@/data/certifications";
import { WhatsappIcon } from "@/components/whatsapp-icon";

export default function HomePage() {
  // Show the full set on the home grid (kept to a multiple of 6 so the bento
  // layout always packs into a flush, even rectangle).
  const allProjects = getProjects();
  const projectsForHome = allProjects.slice(0, 12);
  // Three flagship projects pinned into the hero panel (image-forward proof).
  const heroOrder = ["zerohr", "rapidcontent", "jobscout"];
  const heroProjects = heroOrder
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const posts = getPosts().slice(0, 3);
  // Home highlights the AI-focused stack; full breakdown lives on /about.
  const highlightCategories = [
    "AI & Agents",
    "Agent SDKs & frameworks",
    "Voice & Telephony",
  ];
  const highlightSkills = Array.from(
    new Set(
      skills
        .filter((g) => highlightCategories.includes(g.category))
        .flatMap((g) => g.items)
    )
  );

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Hero */}
      <section className="relative -mx-4 -mt-12 overflow-hidden px-4 pb-4 pt-12 sm:-mx-6 sm:px-6">
        <div
          aria-hidden="true"
          className="ambient-glow pointer-events-none absolute inset-0 -z-10"
        />
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
        <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
          {siteConfig.available && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          )}
          {siteConfig.available
            ? `Available for work · ${siteConfig.eyebrow}`
            : siteConfig.eyebrow}
        </span>
        <h1 className="display text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
          I&apos;m {siteConfig.name}
        </h1>
        <p className="display mt-4 text-2xl leading-[1.05] text-brand sm:text-4xl lg:text-5xl">
          <Typewriter phrases={[...siteConfig.typewriter]} />
        </p>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {siteConfig.intro}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {siteConfig.roles.map((role) => (
            <span
              key={role.label}
              className="rounded-md px-3 py-1.5 font-mono text-xs"
              style={{
                color: `hsl(var(--${role.color}))`,
                backgroundColor: `hsl(var(--${role.color}) / 0.14)`,
              }}
            >
              {role.label}
            </span>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="glow-brand bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/projects">
              View work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarClock className="h-4 w-4" />
              Book a call
            </a>
          </Button>
        </div>
        </div>

        {/* Right column — agent log + flagship project tiles */}
        {heroProjects.length === 3 && (
          <div className="mt-4 lg:mt-0">
            <HeroPanel projects={heroProjects} />
          </div>
        )}
        </div>

        {/* Stats — full-width band under the hero so they anchor the layout */}
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest writing — promoted directly under the hero */}
      {posts.length > 0 && (
        <Reveal as="section">
          <div className="mb-6 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <h2 className="display text-2xl sm:text-3xl">Latest writing</h2>
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                — new post every week
              </span>
            </div>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All posts →
            </Link>
          </div>
          <FeaturedWriting posts={posts} />
        </Reveal>
      )}

      {/* Selected work */}
      {projectsForHome.length > 0 && (
        <Reveal as="section">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="display text-2xl sm:text-3xl">Selected work</h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects →
            </Link>
          </div>
          <div className="mx-auto max-w-5xl columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {projectsForHome.map((project, i) => (
              <FeaturedTile key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Reveal as="section" id="certifications" className="scroll-mt-24">
          <div className="mb-6 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <h2 className="display text-2xl sm:text-3xl">
                Certifications
              </h2>
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                — credentials &amp; training
              </span>
            </div>
            <Link
              href="/certifications"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All certifications →
            </Link>
          </div>
          <Certifications items={certifications} />
        </Reveal>
      )}

      {/* Stack */}
      <Reveal as="section">
        <h2 className="display mb-6 text-2xl sm:text-3xl">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {highlightSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Reveal
          as="section"
          className="relative -mx-4 overflow-hidden rounded-3xl border border-border bg-card/30 px-4 py-14 sm:-mx-6 sm:px-10 sm:py-16"
        >
          <div
            aria-hidden="true"
            className="ambient-glow pointer-events-none absolute inset-0 -z-10 opacity-70"
          />
          <div className="mb-10 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-brand">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What people say
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <Testimonials items={testimonials} />
          </div>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal as="section" className="relative overflow-hidden rounded-2xl border border-border bg-card/40 px-8 py-12 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="ambient-glow pointer-events-none absolute inset-0 -z-10 opacity-70"
        />
        <h2 className="display text-3xl sm:text-4xl lg:text-5xl">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          I&apos;m available for freelance and contract work. Let&apos;s build
          something great together.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            size="lg"
            className="glow-brand bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarClock className="h-4 w-4" />
              Book a call
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] text-white hover:bg-[#1ebe5b]"
          >
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/hire-me">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
