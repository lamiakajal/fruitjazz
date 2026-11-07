"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, PackageSearch, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { categoryBySlug } from "@/data/categories";
import { useSettings } from "@/context/SettingsContext";
import { formatPrice, lowestPrice } from "@/lib/format";
import { Product } from "@/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const PAGE_SIZE = 12;

/** Grid with its own "show more" state; remounted (via key) when filters change. */
function ProductGrid({ products }: { products: Product[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, visible).map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>

      {visible < products.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border-2 border-primary px-8 py-3 text-sm font-bold text-heading transition hover:bg-primary hover:text-white cursor-pointer"
          >
            Show more ({products.length - visible} left)
          </button>
        </div>
      )}
    </>
  );
}

export default function ShopCatalog({ products: allProducts }: { products: Product[] }) {
  const searchParams = useSearchParams();

  // Round the slider ceiling up to the next 500 so every product is reachable.
  const PRICE_CEILING = useMemo(
    () =>
      Math.max(
        500,
        Math.ceil(Math.max(0, ...allProducts.map((p) => lowestPrice(p.variants))) / 500) * 500,
      ),
    [allProducts],
  );

  // The URL is the single source of truth, so navbar and footer links always work.
  const activeSlug = searchParams.get("cat") ?? "all";
  const searchQuery = (searchParams.get("search") ?? "").trim();
  const onSaleFilter = activeSlug === "sale";
  const { categories: CATEGORIES } = useSettings();
  const activeCategory = categoryBySlug(activeSlug, CATEGORIES);

  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [maxPriceInput, setMaxPrice] = useState<number | null>(null);
  // null means "no limit chosen yet", so new products are never hidden by an old ceiling
  const maxPrice = Math.min(maxPriceInput ?? PRICE_CEILING, PRICE_CEILING);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allProducts
      .filter((p) => {
        if (onSaleFilter && !p.variants.some((v) => v.comparePrice && v.comparePrice > v.price)) return false;
        if (activeCategory && p.category !== activeCategory.name) return false;
        if (
          q &&
          !p.name.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        ) {
          return false;
        }
        return lowestPrice(p.variants) <= maxPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return lowestPrice(a.variants) - lowestPrice(b.variants);
        if (sortBy === "price-desc") return lowestPrice(b.variants) - lowestPrice(a.variants);
        if (sortBy === "rating") return b.rating - a.rating;
        // "featured": featured products first, then best reviewed
        return Number(!!b.isFeatured) - Number(!!a.isFeatured) || b.reviewsCount - a.reviewsCount;
      });
  }, [allProducts, activeCategory, onSaleFilter, searchQuery, maxPrice, sortBy]);

  const gridKey = `${activeSlug}|${searchQuery}|${maxPrice}|${sortBy}`;
  const heading = onSaleFilter ? "On sale" : activeCategory ? activeCategory.label : "All products";
  const subheading = onSaleFilter
    ? "Discounted packs for a limited time."
    : activeCategory
    ? activeCategory.blurb
    : "Raw honey, nuts, dry fruits, dates, spices, tea, ghee and gift boxes.";

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-2 max-w-2xl text-stone-600">{subheading}</p>

          {searchQuery && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-100 py-1.5 pl-3.5 pr-2 text-sm font-semibold text-gold-800">
              Results for &ldquo;{searchQuery}&rdquo;
              <Link
                href={activeCategory ? `/shop?cat=${activeCategory.slug}` : "/shop"}
                aria-label="Clear search"
                className="grid h-5 w-5 place-items-center rounded-full bg-gold-200 hover:bg-gold-300"
              >
                <X className="h-3 w-3" />
              </Link>
            </p>
          )}
        </header>

        {/* Category chips */}
        <nav
          aria-label="Categories"
          className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {[{ slug: "all", label: "All products" }, ...(allProducts.some((p) => p.variants.some((v) => v.comparePrice && v.comparePrice > v.price)) ? [{ slug: "sale", label: "On sale" }] : []), ...CATEGORIES].map((cat) => {
            const isActive = activeSlug === cat.slug || (cat.slug === "all" && !activeCategory);
            return (
              <Link
                key={cat.slug}
                href={cat.slug === "all" ? "/shop" : `/shop?cat=${cat.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-soft"
                    : "border-stone-200 bg-surface text-stone-700 hover:border-gold-500 hover:text-heading"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">
            Showing <strong className="text-stone-900">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <label className="flex items-center gap-3 text-sm text-stone-600">
              <span className="shrink-0 font-semibold">
                Up to <strong className="text-heading">{formatPrice(maxPrice)}</strong>
              </span>
              <input
                type="range"
                min={500}
                max={PRICE_CEILING}
                step={250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum starting price"
                className="w-full min-w-40 accent-primary cursor-pointer sm:w-48"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-stone-600">
              <ArrowUpDown className="h-4 w-4 text-stone-400" />
              <span className="sr-only sm:not-sr-only">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </label>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-surface px-6 py-16 text-center">
            <PackageSearch className="mx-auto h-12 w-12 text-stone-400" />
            <h2 className="mt-4 font-display text-xl font-bold text-stone-800">
              No products match these filters
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
              Try a higher price limit, another category, or a different search word.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setMaxPrice(null)}
                className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-bold text-stone-700 hover:border-gold-500 cursor-pointer"
              >
                Reset price
              </button>
              <Link
                href="/shop"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-hover"
              >
                Show all products
              </Link>
            </div>
          </div>
        ) : (
          <ProductGrid key={gridKey} products={filtered} />
        )}
      </div>
    </div>
  );
}
