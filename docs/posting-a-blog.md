# How to post a blog post (manually)

Blog posts live in git as MDX files. There is **no database and no CMS** — you
add a file, commit it, and the site rebuilds. This is the "content-as-code"
setup.

---

## TL;DR

1. Create a new file: `content/blog/my-post-slug.mdx`
2. Add the frontmatter block (see template below).
3. Write your post in Markdown/MDX below the frontmatter.
4. Commit and push to the `main` branch.
5. The deployment rebuilds and your post appears at `/blog/my-post-slug`.

---

## 1. Create the file

- **Location:** `content/blog/`
- **Filename:** becomes the URL slug. Use lowercase words separated by hyphens.
  - `content/blog/why-agents-need-memory.mdx` → `https://www.najam.pk/blog/why-agents-need-memory`
- **Extension:** must be `.mdx`.

## 2. Add the frontmatter

Every post starts with a YAML frontmatter block fenced by `---`:

```mdx
---
title: "Why agents need memory"
description: "A short one-line summary shown in listings and as the SEO description."
date: "2026-07-02"
tags: ["agents", "memory", "architecture"]
category: "AI & Agents"
image: "/blog/why-agents-need-memory.jpg"
published: true
---

Your post body starts here. This first paragraph shows up as the intro.

## A heading

Regular **Markdown** works: lists, `code`, [links](https://example.com),
blockquotes, images, etc.
```

### Field reference

| Field         | Required | What it does |
|---------------|----------|--------------|
| `title`       | ✅ yes   | Post title (H1 + browser tab + listings). |
| `description` | ✅ yes   | One-line summary. Shown in cards and used as the SEO/meta description. Keep it under ~160 chars. |
| `date`        | ✅ yes   | Publish date, `YYYY-MM-DD`. Posts are sorted newest-first by this. |
| `tags`        | recommended | Array of topic tags. Drives tag pages and RSS. |
| `category`    | recommended | One of the fixed categories below. Sets the badge color and the auto-generated cover color. |
| `image`       | optional | Path to a cover image under `public/`. If omitted, an on-brand gradient cover is generated automatically. |
| `published`   | optional | `true` (default) to show it; set `false` to keep it as a hidden draft. |

### Valid categories

`category` must match one of these exactly (defined in `data/categories.ts`).
Anything else falls back to a neutral "Writing" style.

- `AI & Agents`
- `Engineering`
- `Governance`
- `Blockchain`
- `Books`

## 3. (Optional) Add a cover image

- Drop the image file in `public/blog/` (create the folder if needed), e.g.
  `public/blog/why-agents-need-memory.jpg`.
- Reference it in frontmatter as a root-relative path: `image: "/blog/why-agents-need-memory.jpg"`.
- Recommended size: roughly **1600×1000** (16:10). Landscape works best — the
  home page shows the newest post as a large lead tile.
- **No image?** Leave `image` out. The site generates a clean category-colored
  cover with the title on it, so every post always looks finished.

## 4. Write the body

Below the closing `---`, write normal Markdown/MDX:

- `##` / `###` headings
- **bold**, *italic*, `inline code`
- fenced code blocks with language hints
- lists, tables, blockquotes
- links and images

## 5. Publish

```bash
git add content/blog/my-post-slug.mdx
git commit -m "Add blog post: My post title"
git push
```

Once pushed to `main`, the host rebuilds and the post goes live at
`/blog/my-post-slug`. It also automatically appears in:

- the `/blog` index
- the home-page "Latest writing" section (the newest post becomes the lead tile)
- the RSS feed
- its tag pages

---

## Draft workflow

To stage a post without publishing it, set `published: false`. It stays in the
repo but is hidden from all listings and the RSS feed. Flip it to `true` (or
remove the line) when you're ready.

---

## Prefer automation?

If you want an AI agent or script to publish for you instead of editing files by
hand, use the HTTP API — see [`blog-api.md`](./blog-api.md).
