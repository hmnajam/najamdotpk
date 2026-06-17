import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const components = {
  a: ({ href = "", ...props }: React.ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noreferrer" {...props} />;
  },
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg border border-border" alt="" {...props} />
  ),
  Image,
};

const options = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        { theme: { dark: "github-dark", light: "github-light" } },
      ],
    ],
  },
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-pre:bg-muted prose-pre:border prose-pre:border-border">
      <MDXRemote
        source={source}
        components={components}
        options={options as MDXRemoteProps["options"]}
      />
    </div>
  );
}
