export const siteConfig = {
  name: "Najam Saeed",
  shortName: "najam.pk",
  url: "https://najam.pk",
  description:
    "Najam Saeed — Agentic AI developer who architects and builds autonomous AI agents, voice AI, and sovereign systems that run in production.",
  author: "Najam Saeed",
  available: true,
  firstName: "Najam",
  lastName: "Saeed",
  eyebrow: "Agentic AI Developer",
  // Colored role chips in the hero (color keys map to accent tokens).
  roles: [
    { label: "AI Agents", color: "brand" as const },
    { label: "Voice AI", color: "brand-3" as const },
    { label: "Sovereign AI", color: "brand-2" as const },
    { label: "MCP & Tooling", color: "brand" as const },
    { label: "AI Infrastructure", color: "brand-3" as const },
  ],
  headline: ["I build", "AI agents."],
  // Rotating typewriter phrases under the name in the hero.
  typewriter: [
    "I build AI agents.",
    "I build voice AI agents.",
    "I build sovereign AI systems.",
    "I orchestrate multi-agent workflows.",
  ],
  intro:
    "I architect and build autonomous AI agents, voice AI, and sovereign systems — the kind that run in production and earn their keep.",
  nav: [
    { title: "Projects", href: "/projects" },
    { title: "Certifications", href: "/certifications" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Hire me", href: "/hire-me" },
  ],
  socials: {
    github: "https://github.com/hmnajam",
    twitter: "https://x.com/hmnajam",
    linkedin: "https://www.linkedin.com/in/hmnajam",
    email: "hmnajam@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
