# Job-first portfolio update

## Local preview

On Windows, run npm.cmd run dev -- --port 3100, then open http://localhost:3100.
Nothing in this update publishes or deploys the site.

## Changed areas

- Homepage: engineering positioning, real résumé, six proof points, TalkifAI and LabCloud case studies, engineering-team capabilities, employer/client paths, compact earlier ventures.
- New content: content/projects/talkifai.mdx and labcloud.mdx.
- Shared components: case-studies.tsx and work-paths.tsx; existing gallery and certifications retained.
- About and hiring pages: engineering-first copy, experience anchor, dedicated role and consulting paths.
- Navigation, metadata, structured data, keyboard focus, reduced motion, image loading, static attributable recommendations.
- Existing local About and LabCloud card edits are preserved.

## Factual TODOs for Najam

- Collect at least five verifiable recommendations, with approval to publish, author/role/company, and public source or approved evidence. Existing quote records are preserved but not displayed until verified.
- Replace the three scaffold blog posts with your real writing.
- Supply the consulting résumé if you want the downloadable engineering résumé updated. The final supplied PDF is copied unchanged.
- Optional supporting evidence: historical TalkifAI uptime report and reporting interval. 99.9% is described as reported; capacity is not presented as measured traffic.
- Growing Orbit details and ZeroHR/OraSurge outcomes are still needed for the other planned case studies.
- Blog publishing still needs the GitHub credential and a separate end-to-end verification when configured. No secrets were inspected or changed in this update.

## Content rules

One company acquisition refers to LabCloud. The separate Chatify sale remains in the history.
TalkifAI is explicitly closed. HealthCloud's 70+ clients belong to the new owners, not Najam's pre-sale count.
Do not mark a testimonial verified merely because a URL has been added; confirm the quotation and permission first.

## Verification completed

- ESLint and TypeScript: passed.
- Production build: passed, 45 static pages generated.
- 32 page checks: eight routes at 390px and 1440px, in dark and light themes. All returned HTTP 200, had one main H1 and no horizontal overflow.
- Additional interaction checks passed: menu and Escape, skip link, experience/services anchors, consent decline, closed-chat keyboard exclusion, résumé PDF response.
- Desktop and mobile screenshots reviewed for hierarchy, wrapping, contrast, and case-study layout.
- No emails submitted, paid agent calls made, publishing credentials changed, or deployment triggered.
- Existing lint command was incompatible with Next 16; it now calls the installed ESLint directly. Two pre-existing lint failures were fixed without behavior changes.
- No automated test suite existed; the browser checks ran using the already available Playwright and installed Chrome.

## Files in the working diff

- app/about/page.tsx
- app/globals.css
- app/hire-me/page.tsx
- app/layout.tsx
- app/opengraph-image.tsx
- app/page.tsx
- app/projects/[slug]/page.tsx
- app/projects/page.tsx
- components/case-studies.tsx
- components/chat/chat-widget.tsx
- components/cookie-consent.tsx
- components/featured-tile.tsx
- components/navbar.tsx
- components/project-card.tsx
- components/project-icon.tsx
- components/structured-data.tsx
- components/testimonials.tsx
- components/ui/input.tsx
- components/ventures.tsx (pre-existing local change, preserved)
- components/work-paths.tsx
- config/site.ts
- content/projects/labcloud.mdx
- content/projects/talkifai.mdx
- data/stats.ts
- data/testimonials.ts
- docs/job-first-review.md
- lib/content.ts
- lib/project-covers.ts
- package.json
- public/Najam_Saeed_Resume.pdf
