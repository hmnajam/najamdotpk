import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Content, ProjectFrontmatter } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({
  project,
}: {
  project: Content<ProjectFrontmatter>;
}) {
  const { slug, frontmatter } = project;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium tracking-tight">{frontmatter.title}</h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className="text-sm text-muted-foreground">{frontmatter.description}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {frontmatter.stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="font-normal">
            {tech}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
