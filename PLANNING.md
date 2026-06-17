# najam.pk — Personal Portfolio Site

> Living planning document. Update as decisions change.

## Goals
Showcase projects · Get hired / freelance · Blog / write · Personal brand.

## Tech Stack
| Concern | Choice |
|---|---|
| Framework | Next.js (latest), App Router, React Server Components, TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Long-form content | MDX files in `content/` with frontmatter |
| Structured content | Typed TS data files in `data/` |
| Contact | Server Action → Resend email |
| Theme | next-themes (dark/light) |
| Analytics | Vercel Analytics |
| Hosting | Vercel (auto-deploy on push) |
| Backend | None (Next.js only). FastAPI not needed for v1. |

## Design
Clean & minimal — typography-led, generous whitespace, fast. shadcn primitives,
subtle transitions only (no heavy animation library in v1).

## Content Strategy
- **MDX in git** is the single source of truth — versioned, portable, no vendor lock-in.
- Author is the only editor (a developer), so file-based editing is ideal.
- **Blog publishing via API (required):** an authenticated `POST /api/blog` endpoint
  takes post content and commits a new `.mdx` file to the repo via the GitHub API
  (Octokit). The commit triggers a Vercel redeploy. This keeps MDX as the source of
  truth while enabling programmatic publishing. The content-loading layer is
  abstracted so this slots in cleanly.

## Routes
```
/                 Hero + pitch, featured projects, latest posts, CTA
/projects         All projects (grid)
/projects/[slug]  Case study (MDX)
/blog             Posts list + tag filter
/blog/[slug]      Post (MDX) + RSS
/about            Story, skills, experience
/hire-me          Services + strong CTA
/contact          Resend-backed form + socials
/resume           Web resume + PDF download (optional, later)
```

## Directory Layout
```
app/                routes, layout, metadata, sitemap, rss, og
  api/blog/         authenticated publishing endpoint (Phase 8)
components/          Hero, ProjectCard, BlogCard, Navbar, Footer, ThemeToggle, ContactForm
components/ui/       shadcn primitives (kept from scaffold)
content/projects/    *.mdx
content/blog/        *.mdx
data/                skills.ts, testimonials.ts, socials.ts, experience.ts
lib/                 mdx.ts (load/parse), utils.ts, metadata.ts
public/              images, og, resume.pdf
```

## Cross-cutting Concerns
- SEO: per-page metadata, Open Graph images, sitemap, RSS, JSON-LD.
- Dark/light theme (next-themes).
- Performance: static generation, `next/image`.
- Accessibility: semantic HTML, keyboard nav, contrast.

## Build Phases
1. **Reset** — strip Sanity & old scaffold; keep config, `components/ui`, fonts, `lib/utils`.
2. **Foundation** — Next latest, layout, Navbar/Footer, theme, typography, home shell.
3. **Content engine** — MDX loading + frontmatter types, `data/` files.
4. **Projects** — list + case study template.
5. **Blog** — list, post, tags, RSS.
6. **About / Hire-me** — content pages.
7. **Contact** — form UI + Resend server action.
8. **Blog publishing API** — authenticated GitHub-commit endpoint.
9. **Polish** — SEO, analytics, a11y, perf, deploy.
