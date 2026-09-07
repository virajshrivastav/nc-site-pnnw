import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.VERCEL_ENV === "preview" ? undefined : "/",
      disallow: process.env.VERCEL_ENV === "preview" ? "/" : "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
