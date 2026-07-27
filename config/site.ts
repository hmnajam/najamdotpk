export const siteConfig = {
  name: "Najam Saeed",
  shortName: "najam.pk",
  url: "https://www.najam.pk",
  description:
    "Najam Saeed — Agentic AI engineer building multi-agent workflows, real-time voice agents, and LLM integrations into existing business software. 6+ years of production systems; earlier, a lab management SaaS grown to 30+ laboratories and sold in 2019.",
  author: "Najam Saeed",
  available: true,
  firstName: "Najam",
  lastName: "Saeed",
  eyebrow: "Agentic AI Engineer",
  // Timezone / overlap — the first thing an overseas client checks.
  location: "Remote — Karachi (UTC+5)",
  availability:
    "Full overlap with UK/EU hours · 4+ hrs daily overlap with US Eastern",
  phone: "+92 312 2981028",
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
    { title: "Blog", href: "/blog" },
    { title: "Projects", href: "/projects" },
    { title: "Ventures", href: "/ventures" },
    { title: "Certifications", href: "/certifications" },
    { title: "About", href: "/about" },
    { title: "Hire me", href: "/hire-me" },
  ],
  socials: {
    github: "https://github.com/hmnajam",
    twitter: "https://x.com/hmnajam",
    linkedin: "https://www.linkedin.com/in/hmnajam",
    email: "hmnajam@gmail.com",
  },
  calendly: "https://calendly.com/hmnajam/meet-the-founder",
  // WhatsApp click-to-chat (resolves by number; usernames aren't linkable yet).
  whatsapp:
    "https://wa.me/923122981028?text=Hi%20Najam%2C%20I%27d%20like%20to%20discuss%20a%20project",
} as const;

export type SiteConfig = typeof siteConfig;
