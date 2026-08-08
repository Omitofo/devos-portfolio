import type { MetadataRoute } from "next";
import { projectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/work"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projects = projectSlugs.map((slug) => ({
    url: absoluteUrl(`/work/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...projects];
}
