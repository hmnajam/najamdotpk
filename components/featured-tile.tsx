import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Content, ProjectFrontmatter } from "@/lib/content";
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

// Masonry item: each cover keeps its natural height and packs into columns
// (Pinterest-style), so tiles are different sizes. The title surfaces on hover.
export function FeaturedTile({
  project,
  index,
}: {
  project: Content<ProjectFrontmatter>;
  index: number;
}) {
  const { slug, frontmatter } = project;
  const tint = tints[index % tints.length];

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-xl border border-border transition-all duration-200 hover:border-brand/40"
    >
      {frontmatter.image ? (
        // Natural-height cover (masonry). Plain img so the column flow can use
        // the real aspect ratio of each project's image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <div className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${tint}`}>
          <ProjectIcon slug={slug} className="h-12 w-12 text-foreground/30" />
        </div>
      )}

      {/* Hover overlay — title + stack fade in over a scrim */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/30 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
          {frontmatter.stack.slice(0, 3).join(" · ")}
        </span>
        <h3 className="mt-1 flex items-center gap-1.5 text-lg font-medium tracking-tight">
          {frontmatter.title}
          <ArrowUpRight className="h-4 w-4" />
        </h3>
      </div>
    </Link>
  );
}
