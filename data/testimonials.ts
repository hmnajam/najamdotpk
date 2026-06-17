export type TestimonialSource = "linkedin" | "twitter" | "email" | "upwork";

export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
  /** Where this testimonial came from — shown as a clickable badge. */
  source: TestimonialSource;
  /** Public link to verify it (LinkedIn recommendation, tweet, etc.). */
  sourceUrl?: string;
};

// Dummy content — replace with real testimonials.
// For authenticity, fill `sourceUrl` with a public link (e.g. a LinkedIn
// recommendation) so visitors can verify the quote is genuine.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Najam shipped our MVP in five weeks and it's still running two years later without a hitch. He thinks about the product, not just the ticket.",
    author: "Sarah Whitfield",
    title: "Founder & CEO",
    company: "Loopwork",
    source: "linkedin",
    sourceUrl: "https://www.linkedin.com/in/example/details/recommendations/",
  },
  {
    quote:
      "Rare combination of fast and careful. Our API latency dropped 40% after his rework, and the docs were so clean we onboarded a new team in a day.",
    author: "Daniel Okafor",
    title: "Engineering Lead",
    company: "Northbeam",
    source: "linkedin",
    sourceUrl: "https://www.linkedin.com/in/example/details/recommendations/",
  },
  {
    quote:
      "We came in with a vague idea and left with a polished product. Najam asked the right questions and pushed back when it mattered.",
    author: "Priya Nair",
    title: "Product Manager",
    company: "Cadence Health",
    source: "upwork",
    sourceUrl: "https://www.upwork.com/freelancers/example",
  },
];
