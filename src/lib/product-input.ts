import type { CategoryMeta } from "@/data/categories";

/** Any pack of the product has a discount (original price above selling price). */
export const isOnSale = (variants: { price: number; comparePrice?: number }[]) =>
  variants.some((v) => v.comparePrice !== undefined && v.comparePrice > v.price);

export interface ProductInput {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  variants: { weight: string; price: number; comparePrice?: number; stock: number }[];
  isFeatured: boolean;
  isNewArrival: boolean;
  active: boolean;
}

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const num = (v: unknown, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/** Validates and cleans product data coming from the admin form. */
export function parseProductInput(
  body: unknown,
  CATEGORIES: CategoryMeta[],
): { ok: true; data: ProductInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid data" };
  const b = body as Record<string, unknown>;

  const name = String(b.name ?? "").trim().slice(0, 140);
  if (!name) return { ok: false, error: "Product name is required" };

  const slug = slugify(String(b.slug || name));
  if (!slug) return { ok: false, error: "A valid slug is required" };

  const category = String(b.category ?? "");
  if (!CATEGORIES.some((c) => c.name === category)) {
    return { ok: false, error: "Please choose a valid category" };
  }

  const images = (Array.isArray(b.images) ? b.images : [])
    .map((i) => String(i).trim())
    .filter(Boolean)
    .slice(0, 8);
  if (images.some((i) => !/^(art:|\/|https:\/\/)/.test(i) || i.length > 500)) {
    return { ok: false, error: "Images must start with https://, / (a file in /public) or art:" };
  }

  const rawVariants = Array.isArray(b.variants) ? b.variants : [];
  const variants = rawVariants.slice(0, 8).map((v) => {
    const r = (v ?? {}) as Record<string, unknown>;
    const price = Math.round(num(r.price, -1));
    const compare = Math.round(num(r.comparePrice, 0));
    return {
      weight: String(r.weight ?? "").trim().slice(0, 30),
      price,
      // The crossed-out original price only counts when it is higher than the real price
      ...(compare > price ? { comparePrice: compare } : {}),
      stock: Math.floor(num(r.stock, -1)),
    };
  });
  if (
    variants.length === 0 ||
    variants.some((v) => !v.weight || v.price < 0 || v.stock < 0)
  ) {
    return { ok: false, error: "Add at least one pack size with a valid price and stock" };
  }
  if (new Set(variants.map((v) => v.weight)).size !== variants.length) {
    return { ok: false, error: "Pack sizes must have different names" };
  }

  return {
    ok: true,
    data: {
      name,
      slug,
      category,
      description: String(b.description ?? "").trim().slice(0, 3000),
      images: images.length ? images : [`art:${CATEGORIES.find((c) => c.name === category)?.slug}:honey`],
      rating: Math.min(5, Math.max(0, num(b.rating, 4.5))),
      reviewsCount: Math.max(0, Math.floor(num(b.reviewsCount, 0))),
      variants,
      isFeatured: !!b.isFeatured,
      isNewArrival: !!b.isNew,
      active: b.active === undefined ? true : !!b.active,
    },
  };
}
