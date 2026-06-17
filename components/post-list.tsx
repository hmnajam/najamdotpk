"use client";

import * as React from "react";
import Link from "next/link";

import type { Content, PostFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function PostList({
  posts,
  tags,
}: {
  posts: Content<PostFrontmatter>[];
  tags: string[];
}) {
  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.frontmatter.tags?.includes(active))
    : posts;

  return (
    <div className="space-y-8">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              active === null
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                active === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-5"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-medium tracking-tight group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <time className="shrink-0 text-sm text-muted-foreground">
                    {formatDate(post.frontmatter.date)}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground">
                  {post.frontmatter.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {post.frontmatter.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
