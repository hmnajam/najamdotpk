export type Certification = {
  title: string;
  issuer: string;
  /** Year or month-year the credential was earned. */
  date: string;
  /** Public verification / credential link, if available. */
  url?: string;
};

// Real credentials. Add more as you earn them — the showcase scales.
export const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "2025",
  },
  {
    title: "Certified Cloud Applied Generative AI Engineer",
    issuer: "PIAIC",
    date: "2024",
  },
  {
    title: "Meta Certified Front-End Developer",
    issuer: "Coursera",
    date: "2023",
  },
];
