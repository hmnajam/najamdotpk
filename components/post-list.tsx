"use client";

import * as React from "react";

import type { Content, PostFrontmatter } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/post-card";

export function PostList({
  posts,
  categories,
}: {
  posts: Content<PostFrontmatter>[];
  categories: string[];
}) {
  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.frontmatter.category === active)
    : posts;

  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              active === null
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                active === cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
