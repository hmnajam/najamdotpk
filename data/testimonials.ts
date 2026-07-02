export type TestimonialSource = "linkedin" | "twitter" | "email" | "upwork";

export type Testimonial = {
  quote: string;
  author: string;
  title?: string;
  company?: string;
  /** Where this testimonial came from — shown as a clickable badge. */
  source?: TestimonialSource;
  /** Public link to verify it (LinkedIn recommendation, tweet, etc.). */
  sourceUrl?: string;
};

// Real testimonials. Add `title`, `company`, `source` and a public `sourceUrl`
// where you have them so visitors can verify the quote is genuine.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Najam's ability to think strategically and deliver innovative solutions is truly remarkable. He consistently exceeds expectations and inspires those he works with to push their boundaries.",
    author: "Minhaj Mukhtar",
  },
  {
    quote:
      "Najam's a world class developer with an ability to think from the perspective of his customers. It's a privilege to witness his journey in tech.",
    author: "Zia Khan",
  },
  {
    quote:
      "Najam stands out as a forward-thinking founder who combines creativity with technical expertise. His passion for building AI-driven innovations is both inspiring and transformative.",
    author: "Syed Azfar Hussain",
  },
];
