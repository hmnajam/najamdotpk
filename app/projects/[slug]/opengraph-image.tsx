import { getProject, getProjectSlugs } from "@/lib/content";
import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — project`;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    tag: "Project",
    title: project?.frontmatter.title ?? "Project",
    subtitle: project?.frontmatter.description,
  });
}
