import { connectToDatabase } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { allProducts as starterProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/types";

/**
 * Product data layer.
 * Products live in MongoDB and are managed from /admin. Until the database
 * is configured and seeded, the starter catalog in data/products.ts is used,
 * so the storefront always has something to show.
 */

type ProductDoc = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  variants: { weight: string; price: number; comparePrice?: number; stock: number }[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
};

function toProduct(doc: ProductDoc): Product {
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    category: doc.category as ProductCategory,
    images: doc.images?.length ? doc.images : ["art:honey:honey"],
    description: doc.description,
    rating: doc.rating,
    reviewsCount: doc.reviewsCount,
    variants: doc.variants.map((v) => ({
      weight: v.weight,
      price: v.price,
      ...(v.comparePrice && v.comparePrice > v.price ? { comparePrice: v.comparePrice } : {}),
      stock: v.stock,
    })),
    isFeatured: !!doc.isFeatured,
    isNew: !!doc.isNewArrival,
  };
}

/** Returns the active catalog from MongoDB, or the starter catalog as a fallback. */
export async function getAllProducts(): Promise<Product[]> {
  if (!process.env.MONGODB_URI) return starterProducts;
  try {
    await connectToDatabase();
    const docs = await ProductModel.find({ active: { $ne: false } })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean<ProductDoc[]>();
    return docs.length ? docs.map(toProduct) : starterProducts;
  } catch (error) {
    console.error("Catalog fallback (database unavailable):", error);
    return starterProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export const getFeaturedProducts = (products: Product[]) =>
  products.filter((p) => p.isFeatured);

export const getNewArrivals = (products: Product[]) =>
  products.filter((p) => p.isNew);

/** True when the catalog is served from MongoDB (stock can then be tracked). */
export async function catalogIsInDatabase(): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false;
  try {
    await connectToDatabase();
    return (await ProductModel.estimatedDocumentCount()) > 0;
  } catch {
    return false;
  }
}
