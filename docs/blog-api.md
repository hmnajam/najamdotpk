# Blog Publishing API

Programmatic endpoint for creating and updating blog posts. It writes an MDX
file to the site's GitHub repository (`content/blog/<slug>.mdx`) via a commit;
the site then rebuilds and publishes automatically.

This document is written to be handed directly to an AI agent so it can build an
automated publishing workflow.

---

## Endpoint

```
POST https://www.najam.pk/api/blog
```

Replace the host with your actual deployment origin if different (e.g. a preview
or staging URL). The path is always `/api/blog`.

- **Method:** `POST` only. Other methods are not supported.
- **Content-Type:** `application/json`
- **Auth:** `Authorization: Bearer <BLOG_API_TOKEN>` (required)

---

## Authentication

Send a shared secret as a Bearer token in the `Authorization` header:

```
Authorization: Bearer YOUR_BLOG_API_TOKEN
```

- The token is a static shared secret configured on the server as the
  `BLOG_API_TOKEN` environment variable.
- The request token must match **exactly**, or you get `401 Unauthorized`.
- If the server has no `BLOG_API_TOKEN` set, the endpoint returns
  `503` — publishing is disabled until it's configured.
- **Keep the token secret.** Store it in your agent's secret manager / env, never
  in source code or logs. Anyone with the token can publish to the site.

---

## Request body

JSON object. Fields:

| Field         | Type       | Required | Default        | Notes |
|---------------|------------|----------|----------------|-------|
| `title`       | string     | ✅       | —              | 1–200 chars. Post title. |
| `description` | string     | ✅       | —              | 1–300 chars. One-line summary / SEO description. |
| `content`     | string     | ✅       | —              | The post body as Markdown/MDX. Min length 1. |
| `tags`        | string[]   | no       | `[]`           | Topic tags. |
| `category`    | string     | no       | (none)         | Should match a known category (see below) for correct styling. |
| `image`       | string     | no       | (none)         | Root-relative cover image path, e.g. `/blog/foo.jpg`. Omit to auto-generate a cover. |
| `date`        | string     | no       | today (UTC)    | `YYYY-MM-DD`. Used for sort order. |
| `slug`        | string     | no       | from `title`   | URL slug. If omitted, derived from the title. |
| `published`   | boolean    | no       | `true`         | `false` = committed but hidden draft. |

### Slug behavior

- If you omit `slug`, it's generated from `title` by lowercasing, stripping
  non-alphanumerics, and hyphenating spaces (e.g. `"My First Post!"` →
  `my-first-post`).
- If you pass `slug`, it's run through the same normalizer.
- The resulting slug is the filename and the URL: `content/blog/<slug>.mdx`
  served at `/blog/<slug>`.

### Create vs. update (idempotency)

The slug determines the target file:

- If `content/blog/<slug>.mdx` **does not exist** → it's created → `201 Created`.
- If it **already exists** → it's overwritten with the new content → `200 OK`.

So re-POSTing with the same slug is an **upsert**. To guarantee a new post, use a
unique title/slug. To edit an existing post, POST the same slug again.

### Valid categories

For correct badge/cover colors, `category` should be one of (case-sensitive):

- `AI & Agents`
- `Engineering`
- `Governance`
- `Blockchain`
- `Books`

Any other value still publishes but renders with a neutral fallback style.

---

## Responses

### Success

`201 Created` (new post) or `200 OK` (updated existing post):

```json
{
  "ok": true,
  "slug": "why-agents-need-memory",
  "path": "content/blog/why-agents-need-memory.mdx",
  "url": "/blog/why-agents-need-memory",
  "commit": "a1b2c3d4e5f6..."
}
```

- `url` is root-relative; prepend the site origin for the full link.
- `commit` is the GitHub commit SHA that created/updated the file.
- The post is live only **after the site finishes rebuilding** — allow time for
  the deployment pipeline (typically under a minute). The API returning success
  means the commit landed, not that the CDN has the new page yet.

### Errors

| Status | Meaning | Cause |
|--------|---------|-------|
| `400 Bad Request` | Invalid JSON | Body wasn't valid JSON. |
| `401 Unauthorized` | Bad/missing token | `Authorization` header missing or doesn't match. |
| `422 Unprocessable Entity` | Validation failed | A field failed validation. Response includes `details` from Zod (`error.flatten()`). Also returned if a usable slug can't be derived. |
| `502 Bad Gateway` | Commit failed | The GitHub commit step failed (bad GitHub token, repo/permission issue, etc.). |
| `503 Service Unavailable` | Not configured | Server is missing `BLOG_API_TOKEN` or the GitHub env vars. |

`422` example:

```json
{
  "error": "Validation failed",
  "details": {
    "formErrors": [],
    "fieldErrors": { "title": ["String must contain at least 1 character(s)"] }
  }
}
```

---

## Examples

### curl

```bash
curl -X POST https://www.najam.pk/api/blog \
  -H "Authorization: Bearer $BLOG_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Why agents need memory",
    "description": "A short summary shown in listings and search results.",
    "content": "Agents that forget everything between turns cannot plan.\n\n## The problem\n\nWithout persistence...",
    "tags": ["agents", "memory"],
    "category": "AI & Agents",
    "published": true
  }'
```

### JavaScript / TypeScript (fetch)

```ts
async function publishPost(post: {
  title: string;
  description: string;
  content: string;      // Markdown/MDX
  tags?: string[];
  category?: string;
  image?: string;
  date?: string;        // YYYY-MM-DD
  slug?: string;
  published?: boolean;
}) {
  const res = await fetch("https://www.najam.pk/api/blog", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.BLOG_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Publish failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data; // { ok, slug, path, url, commit }
}
```

### Python (requests)

```python
import os, requests

def publish_post(post: dict) -> dict:
    res = requests.post(
        "https://www.najam.pk/api/blog",
        headers={
            "Authorization": f"Bearer {os.environ['BLOG_API_TOKEN']}",
            "Content-Type": "application/json",
        },
        json=post,
        timeout=30,
    )
    res.raise_for_status()  # raises on non-2xx
    return res.json()

publish_post({
    "title": "Why agents need memory",
    "description": "A short summary.",
    "content": "## Intro\n\nBody text in Markdown...",
    "tags": ["agents", "memory"],
    "category": "AI & Agents",
})
```

---

## Guidance for an automated agent

When building a workflow that posts blogs through this API:

1. **Store the token securely.** Read `BLOG_API_TOKEN` from a secret store / env
   var. Never hardcode or log it.
2. **Write the `content` as clean Markdown.** Use `\n` for newlines in JSON.
   Headings (`##`), lists, code fences, and links all render. Do **not** include
   your own frontmatter in `content` — the API generates the frontmatter from the
   structured fields. Don't repeat the `title` as an H1 in the body; the page
   renders the title separately.
3. **Set `category`** to one of the valid values for correct styling.
4. **Decide slugs deliberately.** Omit `slug` to auto-derive from the title, or
   pass an explicit slug. Remember: reusing a slug **updates** that post.
5. **Draft first if unsure.** POST with `"published": false`, review at the
   (hidden) file/preview, then re-POST the same slug with `"published": true`.
6. **Handle responses:** treat `200`/`201` as success (read `url`/`commit`).
   On `422`, inspect `details.fieldErrors` and fix the offending field. On
   `401`, the token is wrong. On `502`/`503`, it's a server-side/config issue —
   retry later or alert a human; don't spam retries.
7. **Publish latency:** the API commits to git; the live page appears after the
   next rebuild. Don't assume the URL is fetchable the instant you get `201`.

---

## Server configuration (for the site owner)

The endpoint needs these environment variables set on the deployment:

| Variable            | Purpose |
|---------------------|---------|
| `BLOG_API_TOKEN`    | Shared secret clients send as the Bearer token. |
| `GITHUB_TOKEN`      | GitHub fine-grained PAT with **Contents: read & write** on the repo. |
| `GITHUB_REPO_OWNER` | Repo owner (e.g. `hmnajam`). |
| `GITHUB_REPO_NAME`  | Repo name (e.g. `najamdotpk`). |
| `GITHUB_BRANCH`     | Target branch. Defaults to `main` if unset. |

If `BLOG_API_TOKEN` is missing, or any of the GitHub vars are missing, the
endpoint responds `503` and no posts can be published.
