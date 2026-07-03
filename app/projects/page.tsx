import type { Metadata } from "next";

import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Projects",
  description: "A curated selection of work I'm proud of.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Work"
        title="Selected projects"
        description="A curated selection of work I'm proud of — not everything I've built, just the pieces worth showing."
      />

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
