import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Default social card for the homepage and any route without its own image.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — ${siteConfig.eyebrow}`;

export default function Image() {
  return renderOgImage({
    title: "I build AI agents.",
    subtitle: siteConfig.intro,
  });
}
