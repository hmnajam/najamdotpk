import Link from "next/link";

import type { Content, PostFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { getCategory } from "@/data/categories";
import { cn } from "@/lib/utils";
import { PostCover } from "@/components/post-cover";

export function PostCard({ post }: { post: Content<PostFrontmatter> }) {
  const { slug, frontmatter, readingTime } = post;
  const cat = getCategory(frontmatter.category);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40"
    >
      <PostCover
        title={frontmatter.title}
        category={frontmatter.category}
        image={frontmatter.image}
        className="aspect-[16/10]"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {frontmatter.category && (
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
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
        <p className="text-sm text-muted-foreground">
          {frontmatter.description}
        </p>
      </div>
    </Link>
  );
}
