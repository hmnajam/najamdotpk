import type { Metadata } from "next";

import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/page-header";
import { CaseStudies } from "@/components/case-studies";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering case studies: TalkifAI voice infrastructure, LabCloud laboratory software, and production AI projects.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects().filter((p) => !p.frontmatter.caseStudy);
  const featured = projects.filter((p) => p.frontmatter.featured);
  const rest = projects.filter((p) => !p.frontmatter.featured);

  return (
    <div className="space-y-14">
      <PageHeader
        eyebrow="Work"
        title="Case studies & technical work"
        description="Responsibilities, implementation, and outcomes — from real-time voice infrastructure to software used by working laboratories."
      />

      <section className="space-y-6"><h2 className="text-2xl font-semibold">Primary case studies</h2><CaseStudies /></section>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="space-y-14">
          {featured.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Featured
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {featured.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 60}>
                    <ProjectCard project={project} index={i} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="space-y-5">
              {featured.length > 0 && (
                <div className="flex items-center gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    More projects
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((project, i) => (
                  <Reveal key={project.slug} delay={(i % 3) * 60}>
                    <ProjectCard project={project} index={featured.length + i} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
