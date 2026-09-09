export const siteConfig = {
  name: "Najam Saeed",
  shortName: "najam.pk",
  url: "https://www.najam.pk",
  description:
    "Agentic AI & Voice AI Engineer building production agents, real-time voice, RAG and MCP. Remote from Karachi. Founder with one company exit.",
  author: "Najam Saeed",
  available: true,
  firstName: "Najam",
  lastName: "Saeed",
  eyebrow: "Agentic AI & Voice AI Engineer",
  positioning: "Agentic AI & Voice AI Engineer | Production AI Agents, Real-Time Voice, RAG & MCP | Founder with One Exit",
  resume: "/Najam_Saeed_Resume.pdf",
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
    "I build production AI agents and real-time voice systems, from orchestration and RAG to the APIs, telephony, and interfaces teams rely on.",
  nav: [
    { title: "Case studies", href: "/projects" },
    { title: "Experience", href: "/about" },
    { title: "Certifications", href: "/certifications" },
    { title: "Blog", href: "/blog" },
    { title: "Work with me", href: "/hire-me" },
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
