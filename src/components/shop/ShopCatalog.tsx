"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/data/products";

const categories = [
  "All",
  "Honey",
  "Nuts",
  "Dry Fruits",
  "Seeds",
  "Gift Boxes",
  "Combos",
];

export default function ShopCatalog() {
  const searchParams = useSearchParams();

  // Read URL query parameters
  const initialCategoryParam = searchParams.get("cat");
  const searchQueryParam = searchParams.get("search") || "";

  // Map URL category slug to readable filter name
  const resolveInitialCategory = () => {
    if (!initialCategoryParam) return "All";
    const mapped: Record<string, string> = {
      honey: "Honey",
      nuts: "Nuts",
      "dry-fruits": "Dry Fruits",
      seeds: "Seeds",
      "gift-boxes": "Gift Boxes",
      combos: "Combos",
    };
    return mapped[initialCategoryParam] || "All";
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(
    resolveInitialCategory,
  );
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating"
  >("featured");
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort items dynamically
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filtering
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        // Search query filtering
        const matchesSearch =
          searchQueryParam === "" ||
          product.name.toLowerCase().includes(searchQueryParam.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQueryParam.toLowerCase());

        // Price filtering (based on lowest variant price)
        const lowestPrice = Math.min(...product.variants.map((v) => v.price));
        const matchesPrice = lowestPrice <= maxPrice;

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        const aMinPrice = Math.min(...a.variants.map((v) => v.price));
        const bMinPrice = Math.min(...b.variants.map((v) => v.price));

        if (sortBy === "price-asc") return aMinPrice - bMinPrice;
        if (sortBy === "price-desc") return bMinPrice - aMinPrice;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // Default: featured
      });
  }, [selectedCategory, searchQueryParam, maxPrice, sortBy]);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-stone-200 pb-8 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Catalog & Harvest
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#14532D] mt-1">
            Shop Pure & Organic Collection
          </h1>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            Browse through our lab-tested organic honey, mountain walnuts, crisp
            California almonds, and luxury hampers.
          </p>

          {/* Active search filter badge */}
          {searchQueryParam && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-100/80 text-amber-800 text-xs px-3 py-1.5 rounded-full font-semibold">
              <span>Search query: &ldquo;{searchQueryParam}&rdquo;</span>
            </div>
          )}
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#14532D]" />
            <span>Filter Catalog</span>
          </button>

          {/* Items count indicator */}
          <p className="text-xs font-medium text-stone-500">
            Showing{" "}
            <strong className="text-stone-800">
              {filteredProducts.length}
            </strong>{" "}
            products
          </p>

          {/* Sort Selection */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-stone-400" />
            <label
              htmlFor="sortBy"
              className="text-xs font-medium text-stone-600"
            >
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white border border-stone-200 text-stone-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-xs"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Layout Grid (Sidebar + Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 1. Sidebar Filters (Desktop & Mobile Drawer) */}
          <aside
            className={`${
              mobileFilterOpen ? "block" : "hidden"
            } md:block lg:col-span-1 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs h-fit space-y-8`}
          >
            <div className="flex justify-between items-center pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-800 text-base">
                <Filter className="w-4 h-4 text-[#14532D]" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="md:hidden text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Categories
              </h4>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-xs font-semibold py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-[#14532D] text-white shadow-xs"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-600">
                  Max Price
                </span>
                <span className="font-extrabold text-[#14532D]">
                  Rs. {maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#14532D] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>Rs. 500</span>
                <span>Rs. 6,000</span>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice(6000);
                setSortBy("featured");
              }}
              className="w-full py-2.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </aside>

          {/* 2. Products Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
                <p className="font-serif font-bold text-stone-700 text-lg">
                  No matching products found
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try adjusting your category selection, max price threshold, or
                  search keyword.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setMaxPrice(6000);
                  }}
                  className="mt-2 px-5 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
