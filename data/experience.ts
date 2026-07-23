export type Experience = {
  role: string;
  company: string;
  /** Years active. Omit when the dates aren't confirmed. */
  period?: string;
  description: string;
};

// The founder years are the spine of this history — the individual companies
// live on /ventures, so this timeline names them rather than repeating them.
export const experience: Experience[] = [
  {
    role: "Agentic AI Developer",
    company: "Independent",
    period: "2023 — Present",
    description:
      "Design and build AI agents, voice AI agents, and sovereign AI systems for clients — from agent logic and tool integrations to the backend and product around them.",
  },
  {
    role: "AI & Automation Consultant",
    company: "Jungle Mug",
    description:
      "Built listing automation for an Amazon seller — generating and optimizing titles, bullets, and backend keywords across the catalogue, with Amazon's field limits and content rules enforced in code.",
  },
  {
    role: "Founder",
    company: "LabCloud · Artistica · Orion",
    description:
      "Started four companies and took them to market. LabCloud, a cloud LIMS for diagnostic labs, was sold and runs today as HealthCloud. Artistica and Orion were closed — the write-ups on the ventures page include why.",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2019 — 2021",
    description:
      "Delivered web apps and APIs for startups and small businesses, from first wireframe to production deploy.",
  },
];
