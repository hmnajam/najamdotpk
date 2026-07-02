import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getPost, getPostSlugs } from "@/lib/content";
import { formatDate, cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { Mdx } from "@/components/mdx";
import { PostCover } from "@/components/post-cover";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.frontmatter.published === false) notFound();

  const { frontmatter, body, readingTime } = post;
  const cat = getCategory(frontmatter.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: siteConfig.author },
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </Link>

      <PostCover
        title={frontmatter.title}
        category={frontmatter.category}
        size="hero"
        className="aspect-[16/9] rounded-2xl border border-border"
      />

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {frontmatter.category && (
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                cat.badge
              )}
            >
              {frontmatter.category}
            </span>
          )}
          <time>{formatDate(frontmatter.date)}</time>
          <span>·</span>
          <span>{readingTime}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <Mdx source={body} />
    </article>
  );
}
