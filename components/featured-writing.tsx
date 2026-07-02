import Link from "next/link";

import type { Content, PostFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { getCategory } from "@/data/categories";
import { cn } from "@/lib/utils";
import { PostCover } from "@/components/post-cover";

// Prominent "Latest writing" block: one large lead post beside a stacked list
// of the next few. Gives blog posts real visual weight up near the hero.
export function FeaturedWriting({ posts }: { posts: Content<PostFrontmatter>[] }) {
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Lead post — large cover, big title */}
      <Link
        href={`/blog/${lead.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40"
      >
        <PostCover
          title={lead.frontmatter.title}
          category={lead.frontmatter.category}
          image={lead.frontmatter.image}
          size="hero"
          className="aspect-[16/10]"
        />
        <div className="flex flex-1 flex-col gap-3 p-6">
          <PostMeta post={lead} />
          <p className="text-base text-muted-foreground">
            {lead.frontmatter.description}
          </p>
        </div>
      </Link>

      {/* The next posts as compact horizontal rows */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-1 gap-4 overflow-hidden rounded-2xl border border-border bg-card/40 p-3 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40"
            >
              <PostCover
                title={post.frontmatter.title}
                category={post.frontmatter.category}
                image={post.frontmatter.image}
                className="hidden w-40 shrink-0 rounded-xl sm:flex"
              />
              <div className="flex flex-1 flex-col justify-center gap-2 py-1 pr-2">
                <PostMeta post={post} />
                <h3 className="text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-brand">
                  {post.frontmatter.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.frontmatter.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function PostMeta({ post }: { post: Content<PostFrontmatter> }) {
  const cat = getCategory(post.frontmatter.category);
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {post.frontmatter.category && (
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
            cat.badge
          )}
        >
          {post.frontmatter.category}
        </span>
      )}
      <time>{formatDate(post.frontmatter.date)}</time>
      <span>·</span>
      <span>{post.readingTime}</span>
    </div>
  );
}
