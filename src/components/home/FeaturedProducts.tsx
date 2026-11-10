"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";

const featuredProducts: Product[] = [
  {
    id: "prod-1",
    name: "Kashmiri Organic Wild Honey",
    slug: "kashmiri-organic-wild-honey",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Raw, unfiltered, and harvested straight from wild mountain blooms without heating or sugar.",
    rating: 4.9,
    reviewsCount: 142,
    variants: [
      { weight: "250g", price: 950, stock: 25 },
      { weight: "500g", price: 1800, stock: 18 },
      { weight: "1kg", price: 3400, stock: 10 },
    ],
  },
  {
    id: "prod-2",
    name: "California Jumbo Almonds (Giri)",
    slug: "california-jumbo-almonds",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Crisp, sweet, and rich in natural oils. Extra-large kernels picked for superior quality.",
    rating: 4.8,
    reviewsCount: 96,
    variants: [
      { weight: "250g", price: 750, stock: 30 },
      { weight: "500g", price: 1450, stock: 22 },
      { weight: "1kg", price: 2800, stock: 15 },
    ],
  },
  {
    id: "prod-3",
    name: "Mountain Walnuts (Akhrot Giri)",
    slug: "mountain-walnuts-akhrot",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Fresh light-kernel Gilgit mountain walnuts packed with Omega-3 and brain-boosting nutrients.",
    rating: 5.0,
    reviewsCount: 88,
    variants: [
      { weight: "250g", price: 850, stock: 20 },
      { weight: "500g", price: 1650, stock: 14 },
      { weight: "1kg", price: 3200, stock: 8 },
    ],
  },
  {
    id: "prod-4",
    name: "Royal Dry Fruit Gift Hamper",
    slug: "royal-dry-fruit-gift-hamper",
    category: "Gift Boxes",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "A handcrafted wooden chest containing premium cashews, roasted pistachios, raisins, and walnuts.",
    rating: 4.9,
    reviewsCount: 54,
    variants: [
      { weight: "500g", price: 2900, stock: 12 },
      { weight: "1kg", price: 5400, stock: 6 },
    ],
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#14532D]">
              Our Best Selling Harvest
            </h2>
            <p className="text-sm text-stone-500 mt-1 max-w-xl">
              Freshly sourced stock with zero artificial glazing or
              preservatives. Choose your weight pack.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition group self-start md:self-end"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
