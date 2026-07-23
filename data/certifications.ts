export type Certification = {
  title: string;
  issuer: string;
  /** Year or month-year the credential was earned. */
  date: string;
  /** Public verification / credential link, if available. */
  url?: string;
  /**
   * Local copy of the certificate under /public/certs/. Kept alongside `url`
   * on purpose: the issuer link is authoritative, the PDF survives link rot
   * and opens instantly.
   */
  pdf?: string;
};

// Headline credentials — AI-focused plus the top-level professional certificate.
// Shown on the home page and /about. All links verified against the issuer.
export const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "2025",
    pdf: "/certs/azure-ai-fundamentals.pdf",
  },
  {
    title: "Certified Cloud Applied Generative AI Engineer",
    issuer: "PIAIC",
    date: "2024",
  },
  {
    title: "Meta Front-End Developer (Professional Certificate)",
    issuer: "Meta",
    date: "Nov 2023",
    url: "https://coursera.org/verify/professional-cert/QXFUULYGWK54",
    pdf: "/certs/meta-front-end-developer.pdf",
  },
  {
    title: "Generative AI for Everyone",
    issuer: "DeepLearning.AI",
    date: "Nov 2023",
    url: "https://coursera.org/verify/FLEHEZ3JGPX8",
    pdf: "/certs/generative-ai-for-everyone.pdf",
  },
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "Sep 2023",
    url: "https://coursera.org/verify/BGN4MMRFPFKQ",
    pdf: "/certs/ai-for-everyone.pdf",
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
    pdf: "/certs/advanced-react.pdf",
  },
  {
    title: "React Basics",
    issuer: "Meta",
    date: "Jun 2023",
    url: "https://coursera.org/verify/4WD2NZTNFJYA",
    pdf: "/certs/react-basics.pdf",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "May 2023",
    url: "https://coursera.org/verify/33L7M2KF2Z96",
    pdf: "/certs/programming-with-javascript.pdf",
  },
  {
    title: "Programming in Python",
    issuer: "Meta",
    date: "Dec 2023",
    url: "https://coursera.org/verify/N9M75L3H8WEG",
    pdf: "/certs/programming-in-python.pdf",
  },
  {
    title: "HTML and CSS in depth",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/LSJK84TWXZ6C",
    pdf: "/certs/html-and-css-in-depth.pdf",
  },
  {
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "Apr 2023",
    url: "https://coursera.org/verify/NLSS3AVV9JZ6",
    pdf: "/certs/intro-front-end-development.pdf",
  },
  {
    title: "Introduction to Back-End Development",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/L36YRXDMDRW8",
    pdf: "/certs/intro-back-end-development.pdf",
  },
  {
    title: "Principles of UX/UI Design",
    issuer: "Meta",
    date: "Aug 2023",
    url: "https://coursera.org/verify/ZW5EHAAACJ3K",
    pdf: "/certs/principles-of-ux-ui-design.pdf",
  },
  {
    title: "Version Control",
    issuer: "Meta",
    date: "May 2023",
    url: "https://coursera.org/verify/FP5G7LNMNGTL",
    pdf: "/certs/version-control.pdf",
  },
  {
    title: "Front-End Developer Capstone",
    issuer: "Meta",
    date: "Nov 2023",
    url: "https://coursera.org/verify/RKF2E8FDHW48",
    pdf: "/certs/front-end-developer-capstone.pdf",
  },
  {
    title: "Coding Interview Preparation",
    issuer: "Meta",
    date: "Sep 2023",
    url: "https://coursera.org/verify/J7ZDF7K3NWYF",
    pdf: "/certs/coding-interview-preparation.pdf",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    date: "Oct 2023",
    url: "https://coursera.org/verify/C537XZ5YZT4A",
    pdf: "/certs/intro-software-engineering.pdf",
  },
  {
    title: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM",
    date: "Dec 2023",
    url: "https://coursera.org/verify/2SXFXBLKRX7P",
    pdf: "/certs/backend-apps-node-express.pdf",
  },
  {
    title: "Introduction to Web Development with HTML, CSS, JavaScript",
    issuer: "IBM",
    date: "Oct 2023",
    url: "https://coursera.org/verify/GAM7VM4X2C2Q",
    pdf: "/certs/intro-web-development.pdf",
  },
  {
    title: "Introduction to HTML, CSS, & JavaScript",
    issuer: "IBM",
    date: "Nov 2023",
    url: "https://coursera.org/verify/CG96TWKL7Y78",
    pdf: "/certs/intro-html-css-javascript.pdf",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    date: "Oct 2023",
    url: "https://coursera.org/verify/3BVR835MRR5G",
    pdf: "/certs/git-and-github.pdf",
  },
];
