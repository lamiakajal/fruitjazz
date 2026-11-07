import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailView from "@/components/product/ProductDetailView";
import { getAllProducts, catalogIsInDatabase } from "@/lib/catalog";
import { getApprovedReviews } from "@/lib/reviews";
import ProductReviews from "@/components/product/ProductReviews";

// Re-read the catalog at most once a minute (admin edits also revalidate on save)
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getAllProducts()).find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0]?.startsWith("http") ? [product.images[0]] : undefined,
    },
  };
}

// Pre-render known slugs at build time
export async function generateStaticParams() {
  return (await getAllProducts()).map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allProducts = await getAllProducts();
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Pick related products matching category (excluding current item)
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const [reviews, reviewsEnabled] = await Promise.all([getApprovedReviews(product.id), catalogIsInDatabase()]);

  // schema.org Product data so search engines can show price and rating
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.images.filter((src) => src.startsWith("http")),
    ...(product.reviewsCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewsCount,
          },
        }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PKR",
      lowPrice: Math.min(...product.variants.map((v) => v.price)),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductDetailView
        product={product}
        relatedProducts={
          relatedProducts.length > 0 ? relatedProducts : allProducts.slice(0, 4)
        }
      />
      <ProductReviews productId={product.id} reviews={reviews} canReview={reviewsEnabled} />
    </>
  );
}
