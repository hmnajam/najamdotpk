import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { stats } from "@/data/stats";
import { skills } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import { getProjects, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { FeaturedTile } from "@/components/featured-tile";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() {
  const featured = getProjects()
    .filter((p) => p.frontmatter.featured)
    .slice(0, 6);
  const projectsForHome = featured.length > 0 ? featured : getProjects().slice(0, 6);
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
      <section className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-[36rem] max-w-full rounded-full bg-[radial-gradient(closest-side,hsl(var(--brand)/0.16),transparent)] blur-2xl"
        />
        {siteConfig.available && (
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Available for work
          </span>
        )}
        <h1 className="text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {siteConfig.headline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {siteConfig.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/projects">
              See my work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Let&apos;s talk</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:max-w-lg">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-medium tracking-tight sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      {projectsForHome.length > 0 && (
        <Reveal as="section">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-medium tracking-tight">
              Selected work
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projectsForHome.map((project, i) => (
              <FeaturedTile key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Latest writing + Stack */}
      <Reveal as="section" className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-medium tracking-tight">
              Latest writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All posts →
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-1 py-4"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium tracking-tight group-hover:underline">
                        {post.frontmatter.title}
                      </span>
                      <time className="shrink-0 text-sm text-muted-foreground">
                        {formatDate(post.frontmatter.date)}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {post.frontmatter.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-medium tracking-tight">Stack</h2>
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
        </div>
      </Reveal>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Reveal as="section">
          <h2 className="mb-6 text-2xl font-medium tracking-tight">
            What people say
          </h2>
          <Testimonials items={testimonials.slice(0, 2)} />
        </Reveal>
      )}

      {/* CTA */}
      <Reveal as="section" className="rounded-2xl bg-brand px-8 py-12 text-center text-brand-foreground sm:px-12">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-foreground/80">
          I&apos;m available for freelance and contract work. Let&apos;s build
          something great together.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link href="/contact">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Reveal>
    </div>
  );
}
