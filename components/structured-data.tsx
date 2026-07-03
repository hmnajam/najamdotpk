import { siteConfig } from "@/config/site";

/**
 * Site-wide structured data for the homepage: a `Person` entity (feeds
 * Google's knowledge panel / "Najam Saeed" entity results) plus a `WebSite`
 * node. Rendered once on `/`. Keep values in sync with `config/site.ts`.
 */
export function PersonWebsiteJsonLd() {
  const personId = `${siteConfig.url}/#person`;

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      givenName: siteConfig.firstName,
      familyName: siteConfig.lastName,
      url: siteConfig.url,
      jobTitle: siteConfig.eyebrow,
      description: siteConfig.description,
      email: `mailto:${siteConfig.socials.email}`,
      sameAs: [
        siteConfig.socials.github,
        siteConfig.socials.twitter,
        siteConfig.socials.linkedin,
      ],
      knowsAbout: [
        "Agentic AI",
        "AI Agents",
        "Voice AI",
        "Sovereign AI",
        "Model Context Protocol",
        "Multi-agent systems",
        "AI Infrastructure",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
