import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type BaseFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
};

export type ProjectFrontmatter = BaseFrontmatter & {
  stack: string[];
  featured?: boolean;
  image?: string;
  repo?: string;
  demo?: string;
};

export type PostFrontmatter = BaseFrontmatter & {
  tags: string[];
  category?: string;
  published?: boolean;
  image?: string; // optional cover; falls back to generated PostCover
};

export type Content<T> = {
  slug: string;
  frontmatter: T;
  body: string;
  readingTime: string;
};

function contentTypeDir(type: string) {
  return path.join(CONTENT_DIR, type);
}

export function getSlugs(type: string): string[] {
  const dir = contentTypeDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBySlug<T extends BaseFrontmatter>(
  type: string,
  slug: string
): Content<T> | null {
  const filePath = path.join(contentTypeDir(type), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as T,
    body: content,
    readingTime: readingTime(content).text,
  };
}

export function getAll<T extends BaseFrontmatter>(type: string): Content<T>[] {
  return getSlugs(type)
    .map((slug) => getBySlug<T>(type, slug))
    .filter((item): item is Content<T> => item !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

// --- Typed convenience wrappers ---------------------------------------------

export const getProjects = () => getAll<ProjectFrontmatter>("projects");
export const getProject = (slug: string) =>
  getBySlug<ProjectFrontmatter>("projects", slug);
export const getProjectSlugs = () => getSlugs("projects");

export const getPosts = () =>
  getAll<PostFrontmatter>("blog").filter(
    (p) => p.frontmatter.published !== false
  );
export const getPost = (slug: string) =>
  getBySlug<PostFrontmatter>("blog", slug);
export const getPostSlugs = () => getSlugs("blog");

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getPosts()) {
    for (const tag of post.frontmatter.tags ?? []) tags.add(tag);
  }
  return [...tags].sort();
}

// Categories actually used by published posts, in the order they're defined.
export function getUsedCategories(): string[] {
  const used = new Set<string>();
  for (const post of getPosts()) {
    if (post.frontmatter.category) used.add(post.frontmatter.category);
  }
  return [...used];
}
