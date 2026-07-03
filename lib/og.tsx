import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

/** Shared dimensions/type for every `opengraph-image` route. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Site palette (dark), mirrored from app/globals.css brand tokens.
const BG = "#0a0910";
const BRAND = "#8b5cf6"; // hsl(262 90% 66%)
const BRAND_2 = "#a970f6"; // hsl(274 88% 70%)
const MUTED = "#9a95a6";

type OgOptions = {
  title: string;
  /** Small label above the title (e.g. "Blog", "Project"). */
  tag?: string;
  /** One-line supporting text under the title. */
  subtitle?: string;
};

/**
 * Renders a branded 1200×630 social-share card. Used by the root and per-slug
 * `opengraph-image.tsx` routes so every page gets a title-stamped OG image with
 * no static assets. Uses the default font (system sans) for zero-dependency
 * rendering at the edge/Node runtime.
 */
export function renderOgImage({ title, tag, subtitle }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(900px 500px at 50% -10%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(700px 400px at 92% 8%, rgba(169,112,246,0.16), transparent 62%)`,
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#fff",
        }}
      >
        {/* Top row — brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})`,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>
            {siteConfig.shortName}
          </div>
        </div>

        {/* Middle — tag + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {tag ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid rgba(139,92,246,0.5)`,
                color: BRAND_2,
                fontSize: 24,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {tag}
            </div>
          ) : null}
          <div
            style={{
              fontSize: title.length > 48 ? 64 : 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 30,
                color: MUTED,
                lineHeight: 1.35,
                maxWidth: 940,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Bottom — name + role */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <span style={{ color: "#fff", fontWeight: 600 }}>
            {siteConfig.name}
          </span>
          <span style={{ color: BRAND }}>·</span>
          <span>{siteConfig.eyebrow}</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
