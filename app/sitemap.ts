import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPosts, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/projects",
    "/blog",
    "/about",
    "/hire-me",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
  }));

  const postRoutes = getPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
