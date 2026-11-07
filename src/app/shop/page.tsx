import React, { Suspense } from "react";
import type { Metadata } from "next";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { getAllProducts } from "@/lib/catalog";

// Re-read the catalog at most once a minute (admin edits also revalidate on save)
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Shop honey, nuts, dry fruits, dates and more",
  description:
    "Browse raw mountain honey, California almonds, Gilgit walnuts, dates, saffron, tea, ghee and gift boxes with Cash on Delivery across Pakistan.",
};

function CatalogSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-busy="true">
      <div className="skeleton h-12 w-72 rounded-xl" />
      <div className="skeleton mt-4 h-5 w-96 max-w-full rounded-lg" />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-96 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <ShopCatalog products={products} />
    </Suspense>
  );
}
