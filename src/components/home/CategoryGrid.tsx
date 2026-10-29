"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "honey",
    name: "Pure Raw Honey",
    description: "Wild Kashmiri, Sidr & Berry Honey",
    itemCount: "8 Products",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    href: "/shop?cat=honey",
  },
  {
    id: "nuts",
    name: "Almonds & Nuts",
    description: "California Jumbo Almonds, Pistachios & Cashews",
    itemCount: "14 Products",
    image:
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    href: "/shop?cat=nuts",
  },
  {
    id: "dry-fruits",
    name: "Organic Dry Fruits",
    description: "Dried Figs (Anjeer), Apricots & Dates",
    itemCount: "10 Products",
    image:
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    href: "/shop?cat=dry-fruits",
  },
  {
    id: "gift-boxes",
    name: "Luxury Gift Boxes",
    description: "Curated wooden hampers for family & events",
    itemCount: "6 Collections",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    href: "/shop?cat=gift-boxes",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 bg-stone-50/50 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Handpicked Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#14532D] mt-1">
              Shop by Category
            </h2>
            <p className="text-sm text-stone-500 mt-1 max-w-xl">
              Select directly from farm-sourced categories, packaged with
              highest hygiene and quality control standards.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition group self-start md:self-end"
          >
            <span>Explore All Harvest</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#14532D] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {cat.itemCount}
                </span>
              </div>

              {/* Text Meta Container */}
              <div className="p-5 grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-800 group-hover:text-amber-700 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#14532D]">
                  <span>Browse Products</span>
                  <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-[#14532D] group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
