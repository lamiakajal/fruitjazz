import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailView from "@/components/product/ProductDetailView";
import { allProducts } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | FruitJazz",
    };
  }

  return {
    title: `${product.name} | FruitJazz Pakistan`,
    description: product.description,
  };
}

// Pre-render known slugs at build time
export async function generateStaticParams() {
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Pick related products matching category (excluding current item)
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  return (
    <ProductDetailView
      product={product}
      relatedProducts={
        relatedProducts.length > 0 ? relatedProducts : allProducts.slice(0, 4)
      }
    />
  );
}
