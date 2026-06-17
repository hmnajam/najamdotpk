# najam.pk

Personal portfolio site — projects, blog, and hire-me. Built with Next.js, MDX,
and Tailwind. See [PLANNING.md](./PLANNING.md) for architecture and decisions.

## Stack

- **Next.js (App Router)** + React + TypeScript
- **Tailwind CSS** + shadcn/ui — clean & minimal
- **MDX** for projects & blog (content in `content/`, single source of truth in git)
- **Resend** for the contact form
- **GitHub API** for programmatic blog publishing
- **Vercel** hosting + Analytics

## Develop

```bash
npm install
cp .env.example .env.local   # fill in keys (optional for local dev)
npm run dev
```

## Adding content

- **Project:** add `content/projects/<slug>.mdx` with frontmatter
  (`title`, `description`, `date`, `stack`, optional `featured`, `repo`, `demo`).
- **Blog post:** add `content/blog/<slug>.mdx` with frontmatter
  (`title`, `description`, `date`, `tags`, `published`).
- **Structured data** (skills, experience, testimonials, socials): edit files in
  `data/` and `config/site.ts`.

## Publishing a post via API

`POST /api/blog` commits a new MDX file to this repo (triggering a redeploy):

```bash
curl -X POST https://najam.pk/api/blog \
  -H "Authorization: Bearer $BLOG_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "description": "A short summary.",
    "tags": ["nextjs"],
    "content": "## Hello\n\nMarkdown body here."
  }'
```

Requires `BLOG_API_TOKEN`, `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`
(see `.env.example`).
