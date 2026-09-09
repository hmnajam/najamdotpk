import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function WorkPaths() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section id="roles" className="scroll-mt-24 space-y-5 rounded-2xl border border-brand/40 bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">For engineering teams</p>
        <h2 className="text-2xl font-semibold">Hire me for a role</h2>
        <p className="text-muted-foreground">Looking for a remote Agentic AI or Voice AI engineer? I bring hands-on implementation, production ownership, and the judgment to connect technical decisions to customer needs.</p>
        <p className="text-sm text-muted-foreground">{siteConfig.location}<br />{siteConfig.availability}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild><a href={siteConfig.resume} target="_blank" rel="noreferrer">View Résumé <span className="sr-only">(PDF, opens a new tab)</span></a></Button>
          <Button asChild variant="outline"><Link href="/contact">Discuss a role</Link></Button>
        </div>
        <div className="flex flex-wrap gap-5 text-sm underline underline-offset-4">
          <Link href="/about#experience">Experience</Link>
          <Link href="/projects">Technical case studies</Link>
          <a href={siteConfig.resume} download>Download résumé (PDF)</a>
        </div>
      </section>
      <section id="consulting" className="scroll-mt-24 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">For founders &amp; clients</p>
        <h2 className="text-2xl font-semibold">Discuss an AI project</h2>
        <p className="text-muted-foreground">Bring a workflow, a voice use case, or an existing product. We can work through the integrations, scope, and what a useful first release needs to achieve.</p>
        <p className="text-sm text-muted-foreground">AI agents · Voice and telephony · RAG and MCP · Business-system integrations</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline"><a href={siteConfig.calendly} target="_blank" rel="noreferrer">Book a discovery call</a></Button>
          <Button asChild variant="outline"><Link href="/contact">Send a project brief</Link></Button>
        </div>
        <div className="flex flex-wrap gap-5 text-sm underline underline-offset-4">
          <Link href="/hire-me#services">Consulting services</Link>
          <Link href="/projects">Project outcomes</Link>
        </div>
      </section>
    </div>
  );
}
