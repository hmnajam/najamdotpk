import type { Metadata } from "next";

import { getPosts, getUsedCategories } from "@/lib/content";
import { PostList } from "@/components/post-list";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about software and what I learn.",
};

export default function BlogPage() {
  const posts = getPosts();
  const categories = getUsedCategories();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Notes on agentic AI, engineering, and using AI and blockchain for better governance — published weekly."
      />

      <PostList posts={posts} categories={categories} />
    </div>
  );
}
