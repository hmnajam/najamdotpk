import type { Metadata } from "next";

import { getAllTags, getPosts } from "@/lib/content";
import { PostList } from "@/components/post-list";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about software and what I learn.",
};

export default function BlogPage() {
  const posts = getPosts();
  const tags = getAllTags();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Notes on building AI agents, voice systems, and shipping software that does real work."
      />

      <PostList posts={posts} tags={tags} />
    </div>
  );
}
