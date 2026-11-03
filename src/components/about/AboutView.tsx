"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Sparkles,
  ChevronRight,
  Mountain,
  Flower2,
} from "lucide-react";

export default function AboutView() {
  // Core value propositions and harvesting commitments
  const values = [
    {
      icon: Mountain,
      title: "Wild Mountain Sourcing",
      description:
        "Every drop of honey and harvest of dry fruits is sourced directly from remote alpine regions of Gilgit, Neelum Valley, and Karak.",
    },
    {
      icon: Award,
      title: "Zero Heat & Unprocessed",
      description:
        "We never pasteurize or micro-filter our raw honey, preserving 100% of the active pollen, enzymes, and antioxidant nutrition.",
    },
    {
      icon: HeartHandshake,
      title: "Fair Trade With Local Beekeepers",
      description:
        "We partner directly with native indigenous harvesting families, cutting out middlemen to empower local farming communities.",
    },
    {
      icon: ShieldCheck,
      title: "Rigorous Lab Certification",
      description:
        "Every seasonal harvest undergoes strict analytical laboratory testing to ensure zero sucrose adulteration and zero artificial feed.",
    },
  ];

  // Company growth timeline and key milestones
  const milestones = [
    {
      year: "2018",
      title: "Our Alpine Beginning",
      desc: "Started as a small mountain passion project collecting wild Karak Sidr honey for local families.",
    },
    {
      year: "2021",
      title: "Gilgit Walnut & Nut Expansion",
      desc: "Partnered directly with high-altitude farmers across Hunza and Skardu for export-grade hand-cracked nuts.",
    },
    {
      year: "2024",
      title: "Nationwide Organic Network",
      desc: "Established cold-storage facilities in Karachi and Lahore to deliver farm-fresh raw harvest nationwide in 48 hours.",
    },
    {
      year: "2026",
      title: "100% Pure Organic Standard",
      desc: "Serving over 50,000+ Pakistani households with certified raw unheated honey and mountain dry fruits.",
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 lg:space-y-24">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-stone-500"
        >
          <Link href="/" className="hover:text-amber-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-800">About Our Harvest</span>
        </nav>

        {/* Hero Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-4 sm:space-y-6">
            {/* Origin Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/70 border border-emerald-300 text-[#14532D] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Pure Kashmiri & Karak Harvest</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-900 leading-tight">
              Honoring Nature&apos;s Purest Mountain Harvest.
            </h1>

            {/* Mission Statement */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              At <strong>FruitJazz</strong>, our mission is simple yet
              uncompromising: to rescue authentic, raw organic dry fruits and
              unheated monofloral mountain honey from commercial
              industrialization.
            </p>

            {/* Sourcing Details */}
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              We travel directly to the ancient wild Sidr forests of Karak and
              the pristine altitudes of Gilgit-Baltistan and Neelum Valley. We
              bottle nectar straight from the hive and deliver hand-shelled
              almonds and walnuts untouched by chemical bleaching or artificial
              waxes.
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#14532D] hover:bg-[#0f4022] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition text-center shadow-md hover:shadow-lg"
              >
                Explore Organic Catalog
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-stone-300 hover:border-stone-500 text-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider transition text-center"
              >
                Speak with Our Team
              </Link>
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div className="relative aspect-4/3 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/80 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1000"
              alt="Raw Honey Harvesting in Pakistani Mountains"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-5 sm:p-8">
              <div className="text-white space-y-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 block">
                  Neelum Valley Apiaries
                </span>
                <p className="text-base sm:text-lg font-serif font-bold">
                  Wild Honeycomb Harvested at 8,000 Feet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Feature Grid */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Uncompromising Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Why Pakistani Families Trust FruitJazz
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-7 rounded-2xl border border-stone-200/80 shadow-xs space-y-3 sm:space-y-4 hover:shadow-md hover:-translate-y-0.5 transition duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900">
                    {val.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Journey and Milestones */}
        <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-xs space-y-8 sm:space-y-10">
          <div className="max-w-xl space-y-1.5 sm:space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-stone-900">
              From Mountain Hives to Your Family Table
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-stone-100 pt-6 sm:pt-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="space-y-2 sm:space-y-3">
                <span className="text-2xl sm:text-3xl font-serif font-extrabold text-[#14532D] block">
                  {m.year}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                  {m.title}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Purity Guarantee Call to Action Banner */}
        <div className="bg-[#14532D] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 text-center space-y-4 sm:space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3 relative z-10">
            <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 mx-auto" />
            <h3 className="text-xl sm:text-3xl font-serif font-bold">
              100% Cash Back Purity Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              We stand by every ounce of dry fruit and jar of raw honey. If any
              certified lab proves the presence of added syrup or adulterants in
              our harvest, we offer an unconditional 100% money-back guarantee.
            </p>
          </div>

          <div className="pt-2 flex justify-center relative z-10">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition text-center shadow-md hover:shadow-lg"
            >
              Shop Authentic Harvest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
