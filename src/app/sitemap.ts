import type { MetadataRoute } from "next";
import { BRAND } from "@/data/brand";
import { getSettings } from "@/lib/settings";
import { getAllProducts } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BRAND.siteUrl;
  const now = new Date();
  const [allProducts, { categories: CATEGORIES }] = await Promise.all([getAllProducts(), getSettings()]);

  const pages = ["", "/shop", "/about", "/contact", "/policy", "/delivery-policy", "/return-policy", "/privacy-policy", "/terms", "/track"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const categories = CATEGORIES.map((c) => ({
    url: `${base}/shop?cat=${c.slug}`,
    lastModified: now,
  }));

  const products = allProducts.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
  }));

  return [...pages, ...categories, ...products];
}
