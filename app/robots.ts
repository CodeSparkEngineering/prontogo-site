import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Crawlers de IA explicitamente autorizados (AEO): permite que a marca
// apareça nas respostas de ChatGPT, Claude, Perplexity e AI Overviews.
const crawlersIA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...crawlersIA.map((bot) => ({ userAgent: bot, allow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
