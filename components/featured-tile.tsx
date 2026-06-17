import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Content, ProjectFrontmatter } from "@/lib/content";
import { ProjectIcon } from "@/components/project-icon";

// Rotating tint palette — adapts to light/dark via Tailwind color scales.
const palettes = [
  "bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-200",
  "bg-teal-50 text-teal-900 dark:bg-teal-950/40 dark:text-teal-200",
  "bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200",
  "bg-pink-50 text-pink-900 dark:bg-pink-950/40 dark:text-pink-200",
];

export function FeaturedTile({
  project,
  index,
}: {
  project: Content<ProjectFrontmatter>;
  index: number;
}) {
  const { slug, frontmatter } = project;
  const palette = palettes[index % palettes.length];

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group flex min-h-[160px] flex-col justify-between rounded-xl p-6 transition-transform duration-200 hover:-translate-y-0.5 ${palette}`}
    >
      <div className="flex items-start justify-between">
        <ProjectIcon slug={slug} className="h-7 w-7" />
        <ArrowUpRight className="h-5 w-5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div>
        <span className="font-mono text-xs uppercase tracking-wide opacity-70">
          {frontmatter.stack.slice(0, 3).join(" · ")}
        </span>
        <h3 className="mt-1 text-lg font-medium tracking-tight">
          {frontmatter.title}
        </h3>
        <p className="mt-1 text-sm opacity-80">{frontmatter.description}</p>
      </div>
    </Link>
  );
}
