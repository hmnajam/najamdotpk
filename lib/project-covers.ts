import type { StaticImageData } from "next/image";
import cover0 from "@/public/projects/amazon-listing-automation.jpg";
import cover1 from "@/public/projects/chatify.jpg";
import cover2 from "@/public/projects/jobscout.jpg";
import cover3 from "@/public/projects/lawisor.jpg";
import cover4 from "@/public/projects/portfolio-site.jpg";
import cover5 from "@/public/projects/rapidcontent.jpg";
import cover6 from "@/public/projects/stylist-ai.jpg";
import cover7 from "@/public/projects/visawise.jpg";
import cover8 from "@/public/projects/zerohr.jpg";

// Static imports retain natural image dimensions for stable masonry layout.
export const projectCovers: Record<string, StaticImageData> = {
  "/projects/amazon-listing-automation.jpg": cover0,
  "/projects/chatify.jpg": cover1,
  "/projects/jobscout.jpg": cover2,
  "/projects/lawisor.jpg": cover3,
  "/projects/portfolio-site.jpg": cover4,
  "/projects/rapidcontent.jpg": cover5,
  "/projects/stylist-ai.jpg": cover6,
  "/projects/visawise.jpg": cover7,
  "/projects/zerohr.jpg": cover8,
};
