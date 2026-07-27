export type VentureStatus = "live" | "building" | "acquired" | "sunset";

export type Venture = {
  /** Product / company name. */
  name: string;
  /** One-line positioning statement. */
  tagline: string;
  /** Two or three sentences on what it was and what you built. */
  description: string;
  /**
   * The honest story — what the bet was, and how it actually played out.
   * Shown on /ventures; the outcome matters more than the pitch.
   */
  story: string;
  /** Short outcome line for closed or acquired ventures. */
  outcome?: string;
  /** Your role — usually "Founder". */
  role: string;
  /** Years active, e.g. "2024 — 2026". Omit when uncertain. */
  period?: string;
  status: VentureStatus;
  /** Public site, if there is one. */
  url?: string;
  /** Label for the link when it isn't the venture's own site anymore. */
  urlLabel?: string;
  /** Cover image under /public/ventures/. Falls back to a gradient tile. */
  image?: string;
  /** Short capability tags. */
  tags: string[];
  /**
   * Pull this one out of the grid into a full-width spotlight. Reserved for the
   * exit — an equal-sized tile next to two closures undersells what it was.
   */
  spotlight?: boolean;
  /** The single number worth pulling out, shown large in the spotlight card. */
  metric?: { value: string; label: string };
};

// Startups founded — distinct from client project work. Two exits/closures are
// included deliberately: the outcomes are the point, not just the pitches.
export const ventures: Venture[] = [
  {
    name: "TalkifAI",
    tagline: "From idea to working voice agent — in minutes, no code",
    description:
      "A platform that makes it effortless to create, launch, and scale voice agents that sound human and deliver business outcomes.",
    story:
      "Voice is the interface most businesses actually want and almost none can build. TalkifAI collapses that: describe the agent, connect a number, go live. I built the whole product surface — agent orchestration and telephony through to the dashboard, docs, and billing — provisioned for 20 concurrent live calls, around 400 an hour, with per-call analytics on duration, recordings, and transcripts. Every layer was instrumented: API, telephony, database, recording and egress, batch jobs, and RAG memory, with automated end-to-end call testing behind a public status page — 99.9% uptime, reported per component. It ran for SIEHS, the Sindh government emergency health service, and for HealthCloud, in 90+ languages.",
    outcome: "Closed in 2026",
    role: "Founder",
    period: "2025 — 2026",
    status: "sunset",
    url: "https://talkifai.dev",
    image: "/ventures/talkifai.jpg",
    tags: ["Voice AI", "Agents", "SaaS"],
  },
  {
    name: "Orion",
    tagline: "Play-to-earn gaming for teens, on a revenue split",
    description:
      "Teens were given gaming NFTs, played to earn crypto, and split the earnings with the company — no capital required from the players.",
    story:
      "The model worked. Players earned around PKR 30,000 a month and we split it, so nobody needed money up front to start. Then the November 2022 crypto crash hit and token earnings fell roughly 99% — the same play that paid PKR 30,000 a month was suddenly worth about PKR 300. The unit economics never broke; the asset underneath them did. Players stopped logging in and I closed it rather than string them along.",
    outcome: "Closed after the Nov 2022 crypto crash",
    role: "Founder",
    period: "2021 — 2022",
    status: "sunset",
    image: "/ventures/orion.jpg",
    tags: ["Web3", "NFTs", "Marketplace"],
  },
  {
    name: "Artistica",
    tagline: "A marketplace for custom accessories and printing",
    description:
      "A two-sided marketplace connecting buyers and sellers of customized accessories — mugs, keychains, and print work.",
    story:
      "The bet was to take Pakistan Chowk — Karachi's dense, physical bazaar of small printers and accessory makers — online as a marketplace. Getting those sellers digital proved far harder than building the product, and it never reached the density a marketplace needs to work. It failed — but it taught me that marketplace liquidity, not software, is the real problem.",
    outcome: "Shut down — never reached marketplace liquidity",
    role: "Founder",
    period: "2020",
    status: "sunset",
    image: "/ventures/artistica.jpg",
    tags: ["Marketplace", "E-commerce", "Print"],
  },
  {
    name: "LabCloud",
    tagline: "Lab management, the better way",
    description:
      "A cloud LIMS for Pakistani diagnostic labs — sample and test workflows, report delivery, and a patient-facing portal.",
    story:
      "Labs here ran on paper registers and WhatsApp. LabCloud put the whole workflow — sample intake to report delivery — in one system, and gave patients a portal to pull their own results. I led development, recruited a CTO, ran product and commercial direction, and sold it into 30+ working laboratories before selling the company in 2019. It runs today as HealthCloud with 70+ clients under its new owners — who later became a client of mine, buying Chatify in 2024. The only one of my ventures that outlived my involvement.",
    outcome: "Acquired — now operating as HealthCloud",
    role: "Founder",
    period: "2015 — 2019",
    status: "acquired",
    url: "https://www.healthcloud.pk/",
    urlLabel: "Now HealthCloud",
    image: "/ventures/healthcloud.jpg",
    tags: ["LIMS", "HealthTech", "Exit"],
    spotlight: true,
    metric: {
      value: "70+",
      label: "labs still running it, under new owners",
    },
  },
];
