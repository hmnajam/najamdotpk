export type Experience = {
  role: string;
  company: string;
  /** Years active. Omit when the dates aren't confirmed. */
  period?: string;
  description: string;
};

// Mirrors the résumé exactly — every role, date, and claim here is confirmed.
// The founded companies get their full write-ups on /ventures; this timeline
// keeps them short so the client and teaching work isn't buried.
export const experience: Experience[] = [
  {
    role: "AI Engineer",
    company: "Freelance & Contract",
    period: "2023 — Present",
    description:
      "Build AI agents, voice AI systems, and backend automation for clients across healthcare, government, e-commerce, and legal services — agent logic, integrations, backend, and deployment. Custom API and webhook integrations connect LLM agents to existing business software, replacing expensive off-the-shelf automation with systems clients own outright. Multi-agent workflows (planner → researcher → writer → critic) on the OpenAI and Anthropic Agents SDKs with MCP tooling.",
  },
  {
    role: "Lead Engineer & Founder",
    company: "TalkifAI",
    period: "2025 — 2026",
    description:
      "Built and operated a multi-tenant voice AI platform end to end — agent orchestration, telephony, dashboard, docs, and billing. Provisioned for 20 concurrent live calls (~400 calls/hour) with per-call analytics on duration, recordings, and transcripts. Instrumented the full stack with automated end-to-end call testing and a public status page. Deployed for SIEHS, the Sindh government emergency health service, and for HealthCloud, with support for 90+ languages.",
  },
  {
    role: "Instructor",
    company: "PIAIC (Presidential Initiative for AI & Computing)",
    period: "2024 — 2025",
    description:
      "Taught Python, TypeScript, FastAPI, and Next.js to 700+ students across cohorts of Pakistan's national AI and cloud computing training programme. Mentored developers moving into AI engineering, from language fundamentals through to building with LLMs.",
  },
  {
    role: "Voice AI Developer (Contract)",
    company: "OraSurge · United States",
    period: "2024",
    description:
      "Sole developer for a US startup selling AI voice agents to dental clinics — built the product end to end and delivered it to production. Voice agent on Retell AI with Twilio telephony for inbound and outbound patient calls, backend on Azure, and custom middleware integrating with Open Dental so the agent could book appointments and answer enquiries against live practice records.",
  },
  {
    role: "Developer & Founder",
    company: "Orion",
    period: "2021 — 2022",
    description:
      "Built the player-facing web platform — registration, onboarding, and player management — for a gaming venture lending in-game assets to teenage players on a revenue split. Scaled from an initial cohort funded with personal capital; players earned around PKR 30,000/month. Closed when the November 2022 crypto crash cut in-game earnings by roughly 99%.",
  },
  {
    role: "Developer & Founder",
    company: "Artistica",
    period: "2020",
    description:
      "Built and shipped the platform end to end as sole developer — a marketplace bringing Karachi's Pakistan Chowk printers and accessory makers online. Closed after the marketplace did not reach the seller density it needed to work.",
  },
  {
    role: "Founder & CEO",
    company: "LabCloud · Acquired 2019",
    period: "2015 — 2019",
    description:
      "Led development of a laboratory management platform covering sample intake through report delivery, plus a patient portal for online results. Sold into 30+ working laboratories and grew the business to acquisition in 2019. Recruited a CTO and led product and commercial direction. Operates today as HealthCloud with 70+ clients under its new owners — who later became a client of mine, buying Chatify in 2024.",
  },
];
