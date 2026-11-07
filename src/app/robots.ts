import type { MetadataRoute } from "next";
import { BRAND } from "@/data/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/checkout", "/orders", "/login", "/forgot-password", "/reset-password"],
    },
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
  };
}
