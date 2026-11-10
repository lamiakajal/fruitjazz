"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-liner-to-b from-amber-50/70 via-[#FDFBF7] to-[#FDFBF7] py-12 sm:py-20 lg:py-24 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-900 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>100% Raw, Pure & Chemical-Free</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#14532D] leading-[1.15] tracking-tight">
              Pure Nature Delivered <br className="hidden sm:inline" />
              to Your{" "}
              <span className="text-amber-600 underline decoration-amber-300 decoration-wavy underline-offset-8">
                Doorstep
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Indulge in harvest-fresh Kashmiri wild honey, premium export-grade
              almonds, crunchy walnuts, and curated gift boxes. Delivered fast
              with Cash on Delivery nationwide.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#14532D] hover:bg-[#0f4022] text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Fresh Harvest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop?cat=combos"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl font-bold text-sm sm:text-base shadow-xs transition cursor-pointer"
              >
                Special Combos & Deals
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-stone-700">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#14532D]">
                  100%
                </p>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  Organic Certified
                </p>
              </div>
              <div className="border-x border-stone-200 px-2 sm:px-4">
                <p className="text-xl sm:text-2xl font-extrabold text-[#14532D]">
                  3500+
                </p>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  Happy Families
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#14532D]">
                  COD
                </p>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  All Over Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=900"
                alt="FruitJazz Premium Dry Fruits Box"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-stone-200/70 flex items-center gap-3 animate-in fade-in zoom-in duration-500">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                <Star className="w-6 h-6 fill-current text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <span>★ ★ ★ ★ ★</span>
                  <span className="text-stone-800 ml-1 font-extrabold">
                    4.9 / 5
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium">
                  Verified Customer Feedback
                </p>
              </div>
            </div>

            {/* Floating Purity Badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#14532D] text-white px-4 py-2 rounded-xl shadow-lg items-center gap-2 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Lab-Tested Purity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
