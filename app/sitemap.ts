import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { guias } from "@/lib/guias";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/guias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...guias.map((g) => ({
      url: `${siteUrl}/guias/${g.slug}`,
      lastModified: new Date(g.data),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
