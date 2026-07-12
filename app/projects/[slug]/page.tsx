import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";

import { getProject, getProjects, getProjectSlugs } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Mdx } from "@/components/mdx";
import { ProjectIcon } from "@/components/project-icon";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { frontmatter, body } = project;

  // Pick the next project in the list (wrapping) for the footer nav.
  const all = getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next =
    all.length > 1 ? all[(idx + 1) % all.length] : undefined;

  return (
    <article className="space-y-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {frontmatter.repo && (
            <Link
              href={frontmatter.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" /> Source
            </Link>
          )}
          {frontmatter.demo && (
            <Link
              href={frontmatter.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" /> Live
            </Link>
          )}
          {frontmatter.clientUrl && (
            <Link
              href={frontmatter.clientUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              {frontmatter.clientName
                ? `Used by ${frontmatter.clientName}`
                : "Used by a client"}
            </Link>
          )}
          <span className="text-muted-foreground">
            {formatDate(frontmatter.date)}
          </span>
        </div>
      </header>

      <Mdx source={body} />

      {next && (
        <footer className="border-t border-border pt-8">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border p-6 transition-colors hover:border-brand/40"
          >
            <span className="flex items-center gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <ProjectIcon slug={next.slug} className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Next project
                </span>
                <span className="font-medium tracking-tight">
                  {next.frontmatter.title}
                </span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        </footer>
      )}
    </article>
  );
}
