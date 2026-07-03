import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Content, ProjectFrontmatter } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { ProjectIcon } from "@/components/project-icon";

// Subtle tinted fallbacks (no loud rainbow) used when a project has no image.
const tints = [
  "from-violet-500/20 to-indigo-600/10",
  "from-sky-500/20 to-blue-600/10",
  "from-fuchsia-500/20 to-purple-600/10",
  "from-teal-500/20 to-cyan-600/10",
  "from-rose-500/20 to-pink-600/10",
  "from-amber-500/20 to-orange-600/10",
];

/**
 * Image-forward project card. A fixed-ratio cover (or a tinted icon fallback)
 * over a solid card surface so it reads as a raised panel in both light and
 * dark mode. Lifts on hover.
 */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Content<ProjectFrontmatter>;
  index?: number;
}) {
  const { slug, frontmatter } = project;
  const tint = tints[index % tints.length];

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {frontmatter.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tint}`}
          >
            <ProjectIcon slug={slug} className="h-14 w-14 text-foreground/25" />
          </div>
        )}
        {frontmatter.featured && (
          <span className="absolute left-3 top-3 rounded-full border border-brand/30 bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand backdrop-blur">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-medium leading-snug tracking-tight">
            {frontmatter.title}
          </h3>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {frontmatter.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {frontmatter.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
