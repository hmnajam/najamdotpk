import { getPost, getPostSlugs } from "@/lib/content";
import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — blog post`;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    tag: "Blog",
    title: post?.frontmatter.title ?? "Blog",
    subtitle: post?.frontmatter.description,
  });
}
