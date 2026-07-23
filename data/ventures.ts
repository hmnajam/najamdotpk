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
      "Voice is the interface most businesses actually want and almost none can build. TalkifAI collapses that: describe the agent, connect a number, go live. I built the whole product surface — agent orchestration and telephony through to the dashboard, docs, and billing.",
    role: "Founder",
    period: "2025 — Present",
    status: "live",
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
    period: "Until 2022",
    status: "sunset",
    image: "/ventures/orion.svg",
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
    status: "sunset",
    image: "/ventures/artistica.svg",
    tags: ["Marketplace", "E-commerce", "Print"],
  },
  {
    name: "LabCloud",
    tagline: "Lab management, the better way",
    description:
      "A cloud LIMS for Pakistani diagnostic labs — sample and test workflows, report delivery, and a patient-facing portal.",
    story:
      "Labs here ran on paper registers and WhatsApp. LabCloud put the whole workflow — sample intake to report delivery — in one system, and gave patients a portal to pull their own results. I built it, sold it to real labs, and then sold the company. It runs today as HealthCloud — the only one of my ventures that outlived my involvement.",
    outcome: "Acquired — now operating as HealthCloud",
    role: "Founder",
    period: "Founded 2015",
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
