import type { Metadata } from "next";
import Link from "next/link";
import { AppWindow, ArrowRight, Bot, CalendarClock, Mail, Phone, ShieldCheck } from "lucide-react";

import { siteConfig } from "@/config/site";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/testimonials";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Hire me",
  description: "AI agents, voice AI, and sovereign AI systems — built for you.",
  alternates: { canonical: "/hire-me" },
};

const services = [
  {
    title: "AI Agents",
    icon: Bot,
    description:
      "Autonomous agents that handle real workflows end to end — tools, memory, and reliable execution.",
  },
  {
    title: "Voice AI Agents",
    icon: Phone,
    description:
      "Natural, low-latency voice assistants with SIP and local telephony — for support, booking, and outbound that actually closes the loop.",
  },
  {
    title: "Sovereign & Air-Gapped AI",
    icon: ShieldCheck,
    description:
      "Self-hosted LLMs running on your own infrastructure — private, on-prem, and air-gapped for enterprise. Your data never leaves the building.",
  },
  {
    title: "AI-powered products",
    icon: AppWindow,
    description:
      "Full products around AI — from LLM backend to polished web app, shipped and maintained.",
  },
];

export default function HireMePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Hire me"
        title="Let's build something intelligent"
        description="I help teams and founders ship AI that does real work — agents, voice assistants, and systems you own. Here's what I can do for you."
      />

      {/* Primary CTA — up top so hiring is one click away */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            size="lg"
            className="glow-brand bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarClock className="h-4 w-4" />
              Book a call
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] text-white hover:bg-[#1ebe5b]"
          >
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${siteConfig.socials.email}?subject=Project inquiry`}>
              <Mail className="h-4 w-4" />
              Email me
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Or email me directly at{" "}
          <a
            href={`mailto:${siteConfig.socials.email}?subject=Project inquiry`}
            className="font-medium text-foreground underline underline-offset-4 hover:text-brand"
          >
            {siteConfig.socials.email}
          </a>
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-xl border border-border p-6 transition-colors hover:border-brand/40"
          >
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <service.icon className="h-5 w-5" />
            </span>
            <h2 className="font-medium tracking-tight">{service.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </section>

      {testimonials.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-lg font-medium tracking-tight">
            What people say
          </h2>
          <Testimonials items={testimonials} />
        </section>
      )}

      <section className="flex flex-col items-start gap-4 rounded-lg border border-border bg-muted/30 p-8">
        <h2 className="text-xl font-semibold tracking-tight">
          Ready to start?
        </h2>
        <p className="text-muted-foreground">
          Grab a time that works for you, or send me the details and I&apos;ll
          get back to you.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="glow-brand bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarClock className="h-4 w-4" />
              Book a call
            </a>
          </Button>
          <Button
            asChild
            className="bg-[#25D366] text-white hover:bg-[#1ebe5b]"
          >
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Send a message
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
