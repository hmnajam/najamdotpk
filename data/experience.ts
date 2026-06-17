export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

// Dummy content — replace with your real experience.
export const experience: Experience[] = [
  {
    role: "Agentic AI Developer",
    company: "Independent",
    period: "2023 — Present",
    description:
      "Design and build AI agents, voice AI agents, and sovereign AI systems for clients — from agent logic and tool integrations to the backend and product around them.",
  },
  {
    role: "Full-Stack Developer",
    company: "Northbeam",
    period: "2021 — 2023",
    description:
      "Built and scaled a Python/FastAPI backend serving millions of requests a day. Owned the API platform end to end.",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2019 — 2021",
    description:
      "Delivered web apps and APIs for startups and small businesses, from first wireframe to production deploy.",
  },
];
