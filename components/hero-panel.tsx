import Image from "next/image";
import Link from "next/link";

import type { Content, ProjectFrontmatter } from "@/lib/content";
import { ProjectIcon } from "@/components/project-icon";
import { AgentLog } from "@/components/agent-log";

// Tinted gradient fallback (matches the bento tiles) used until a real cover
// image is provided for a project.
const tints = [
  "from-violet-500/25 to-indigo-700/10",
  "from-sky-500/25 to-blue-700/10",
  "from-fuchsia-500/25 to-purple-700/10",
];

function HeroTile({
  project,
  index,
  className,
}: {
  project: Content<ProjectFrontmatter>;
  index: number;
  className?: string;
}) {
  const { slug, frontmatter } = project;
  const isSvg = frontmatter.image?.endsWith(".svg");

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative block overflow-hidden rounded-xl border border-border transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 ${className ?? ""}`}
    >
      {frontmatter.image ? (
        isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        )
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${tints[index % tints.length]}`}>
          <ProjectIcon
            slug={slug}
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-foreground/30"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
          {frontmatter.stack[0]}
        </span>
        <h3 className="text-sm font-medium leading-tight tracking-tight">
          {frontmatter.title}
        </h3>
      </div>
    </Link>
  );
}

export function HeroPanel({
  projects,
}: {
  projects: Content<ProjectFrontmatter>[];
}) {
  const tiles = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-3">
      <AgentLog />

      {tiles.length === 3 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-3 [grid-template-columns:1.35fr_1fr] [&>*]:h-[112px] sm:[&>*]:h-[124px]">
          <HeroTile
            project={tiles[0]}
            index={0}
            className="row-span-2 !h-auto"
          />
          <HeroTile project={tiles[1]} index={1} />
          <HeroTile project={tiles[2]} index={2} />
        </div>
      )}

      <Link
        href="/projects"
        className="self-end font-mono text-xs text-brand transition-colors hover:text-brand/80"
      >
        view all work →
      </Link>
    </div>
  );
}
