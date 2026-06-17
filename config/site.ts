export const siteConfig = {
  name: "Najam Saeed",
  shortName: "najam.pk",
  url: "https://najam.pk",
  description:
    "Najam Saeed — Agentic AI developer building AI agents, voice AI agents, and sovereign AI systems.",
  author: "Najam Saeed",
  available: true,
  headline: ["I build", "AI agents."],
  intro:
    "Najam Saeed — Agentic AI developer. I design and build AI agents, voice AI agents, and sovereign AI systems that do real work — not demos.",
  nav: [
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Hire me", href: "/hire-me" },
  ],
  socials: {
    github: "https://github.com/najamdotpk",
    twitter: "https://twitter.com/najamdotpk",
    linkedin: "https://www.linkedin.com/in/najamdotpk",
    email: "hmnajam@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
