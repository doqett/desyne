import type { MetadataRoute } from "next";
import { isIndexable, siteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
