import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import { z } from "zod";

import { slugify } from "@/lib/slug";

// Force Node.js runtime — Octokit and gray-matter need Node APIs.
export const runtime = "nodejs";

const schema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(300),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  image: z.string().optional(),
  date: z.string().optional(),
  slug: z.string().optional(),
  published: z.boolean().default(true),
});

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  // --- Auth: Bearer token ---------------------------------------------------
  const token = process.env.BLOG_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Publishing is not configured (BLOG_API_TOKEN unset)." },
      { status: 503 }
    );
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${token}`) return unauthorized();

  // --- Validate body --------------------------------------------------------
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { title, description, content, tags, category, image, published } =
    parsed.data;
  const date = parsed.data.date ?? new Date().toISOString().slice(0, 10);
  const slug = slugify(parsed.data.slug ?? title);
  if (!slug) {
    return NextResponse.json({ error: "Could not derive slug" }, { status: 422 });
  }

  // --- Build MDX file -------------------------------------------------------
  // Only emit optional keys when provided, so files stay clean.
  const fileContent = matter.stringify(content, {
    title,
    description,
    date,
    tags,
    ...(category ? { category } : {}),
    ...(image ? { image } : {}),
    published,
  });
  const filePath = `content/blog/${slug}.mdx`;

  // --- Commit via GitHub API ------------------------------------------------
  const ghToken = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!ghToken || !owner || !repo) {
    return NextResponse.json(
      { error: "GitHub publishing env vars are not configured." },
      { status: 503 }
    );
  }

  const octokit = new Octokit({ auth: ghToken });

  try {
    // Detect an existing file so we can update (provide its sha) vs create.
    let sha: string | undefined;
    try {
      const existing = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: branch,
      });
      if (!Array.isArray(existing.data) && "sha" in existing.data) {
        sha = existing.data.sha;
      }
    } catch {
      // 404 — new file, leave sha undefined.
    }

    const result = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      branch,
      message: `${sha ? "Update" : "Add"} blog post: ${title}`,
      content: Buffer.from(fileContent, "utf-8").toString("base64"),
      sha,
    });

    return NextResponse.json(
      {
        ok: true,
        slug,
        path: filePath,
        url: `/blog/${slug}`,
        commit: result.data.commit.sha,
      },
      { status: sha ? 200 : 201 }
    );
  } catch (err) {
    console.error("GitHub commit failed:", err);
    return NextResponse.json(
      { error: "Failed to commit post to repository." },
      { status: 502 }
    );
  }
}
