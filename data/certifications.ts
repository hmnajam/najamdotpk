export type Certification = {
  title: string;
  issuer: string;
  /** Year or month-year the credential was earned. */
  date: string;
  /** Public verification / credential link, if available. */
  url?: string;
};

// Headline credentials — AI-focused plus the top-level professional certificate.
// Shown on the home page and /about. All links verified against the issuer.
export const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "2025",
  },
  {
    title: "Meta Front-End Developer (Professional Certificate)",
    issuer: "Meta",
    date: "Nov 2023",
    url: "https://coursera.org/verify/professional-cert/QXFUULYGWK54",
  },
  {
    title: "Generative AI for Everyone",
    issuer: "DeepLearning.AI",
    date: "Nov 2023",
    url: "https://coursera.org/verify/FLEHEZ3JGPX8",
  },
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "Sep 2023",
    url: "https://coursera.org/verify/BGN4MMRFPFKQ",
  },
];

// The individual course certificates behind the professional certificate.
// Listed compactly on /certifications so the headline set stays uncluttered.
export const courseCertifications: Certification[] = [
  {
    title: "Advanced React",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/QCFMTGF2Z8JM",
  },
  {
    title: "React Basics",
    issuer: "Meta",
    date: "Jun 2023",
    url: "https://coursera.org/verify/4WD2NZTNFJYA",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "May 2023",
    url: "https://coursera.org/verify/33L7M2KF2Z96",
  },
  {
    title: "Programming in Python",
    issuer: "Meta",
    date: "Dec 2023",
    url: "https://coursera.org/verify/N9M75L3H8WEG",
  },
  {
    title: "HTML and CSS in depth",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/LSJK84TWXZ6C",
  },
  {
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "Apr 2023",
    url: "https://coursera.org/verify/NLSS3AVV9JZ6",
  },
  {
    title: "Introduction to Back-End Development",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/L36YRXDMDRW8",
  },
  {
    title: "Principles of UX/UI Design",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/ZW5EHAAACJ3K",
  },
  {
    title: "Version Control",
    issuer: "Meta",
    date: "May 2023",
    url: "https://coursera.org/verify/FP5G7LNMNGTL",
  },
  {
    title: "Front-End Developer Capstone",
    issuer: "Meta",
    date: "Nov 2023",
    url: "https://coursera.org/verify/RKF2E8FDHW48",
  },
  {
    title: "Coding Interview Preparation",
    issuer: "Meta",
    date: "Sep 2023",
    url: "https://coursera.org/verify/J7ZDF7K3NWYF",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    date: "Oct 2023",
    url: "https://coursera.org/verify/C537XZ5YZT4A",
  },
  {
    title: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM",
    date: "Dec 2023",
    url: "https://coursera.org/verify/2SXFXBLKRX7P",
  },
  {
    title: "Introduction to Web Development with HTML, CSS, JavaScript",
    issuer: "IBM",
    date: "Oct 2023",
    url: "https://coursera.org/verify/GAM7VM4X2C2Q",
  },
  {
    title: "Introduction to HTML, CSS, & JavaScript",
    issuer: "IBM",
    date: "Nov 2023",
    url: "https://coursera.org/verify/CG96TWKL7Y78",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    date: "Oct 2023",
    url: "https://coursera.org/verify/3BVR835MRR5G",
  },
];
