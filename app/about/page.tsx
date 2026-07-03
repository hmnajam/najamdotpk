import type { Metadata } from "next";
import { Star } from "lucide-react";

import { skills, favoriteTool } from "@/data/skills";
import { experience } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am and what I work on.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <PageHeader eyebrow="About" title="Agentic AI developer" />
        <div className="max-w-2xl space-y-4 text-muted-foreground">
          <p>
            I&apos;m an Agentic AI developer. I build AI agents, voice AI
            agents, and sovereign AI systems — software that reasons, acts, and
            gets real work done, not just chat demos.
          </p>
          <p>
            My background is full-stack engineering, which means I can take an
            AI system the whole way: from the agent logic and tool integrations
            to the backend that runs it and the product people actually use. I
            care about systems that are reliable and that you own — especially
            when the AI is doing something that matters.
          </p>
          <p>
            I care about shipping. I&apos;d rather get something real in front
            of users and iterate than polish a plan forever — while keeping the
            fundamentals solid enough to move fast without things breaking.
          </p>
          <p>
            This is placeholder copy — replace it with your own story in{" "}
            <code>app/about/page.tsx</code>.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight">Skills</h2>
        <div className="space-y-4">
          {skills.map((group) => (
            <div key={group.category} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) =>
                  item === favoriteTool ? (
                    <Badge
                      key={item}
                      className="gap-1 border-transparent bg-brand font-normal text-brand-foreground hover:bg-brand/90"
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {item}
                    </Badge>
                  ) : (
                    <Badge key={item} variant="secondary" className="font-normal">
                      {item}
                    </Badge>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-brand text-brand" />
          {favoriteTool} is my favorite — it&apos;s where I do most of my work.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight">Experience</h2>
        <ul className="space-y-6">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="space-y-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium">
                  {job.role} · {job.company}
                </h3>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {job.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{job.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
