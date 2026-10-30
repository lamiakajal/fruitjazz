"use client";

import React from "react";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  PhoneCall,
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "100% Raw & Certified",
    description: "No added sugar, heat treatment, or artificial preservatives.",
  },
  {
    icon: Truck,
    title: "Cash on Delivery",
    description: "Pay conveniently at your doorstep anywhere in Pakistan.",
  },
  {
    icon: RefreshCcw,
    title: "Freshness Guarantee",
    description: "Unhappy with freshness? 7-day hassle-free replacement.",
  },
  {
    icon: PhoneCall,
    title: "Instant Support",
    description: "Direct WhatsApp assistance for bulk inquiries & orders.",
  },
];

const customerReviews = [
  {
    id: 1,
    name: "Tariq Mehmood",
    city: "Lahore",
    product: "Kashmiri Organic Wild Honey",
    rating: 5,
    date: "Verified Buyer",
    comment:
      "The honey aroma and natural crystallization are authentic proofs of purity. My family loved it. Packaging was totally spill-proof.",
  },
  {
    id: 2,
    name: "Ayesha Siddiqui",
    city: "Karachi",
    product: "California Jumbo Almonds",
    rating: 5,
    date: "Verified Buyer",
    comment:
      "Almonds are crunchy and fresh, not bitter or stale like regular market nuts. Ordered the 1kg pack and received it in 2 days.",
  },
  {
    id: 3,
    name: "Dr. Hamza Khan",
    city: "Islamabad",
    product: "Royal Dry Fruit Gift Hamper",
    rating: 5,
    date: "Verified Buyer",
    comment:
      "Sent this wooden gift chest to a colleague. Extremely elegant presentation and supreme walnut quality. 10/10 recommended.",
  },
];

export default function Reviews() {
  return (
    <div className="bg-[#FDFBF7]">
      {/* ১. ভ্যালু প্রপোজিশন ও ট্রাস্ট ব্যাজ সেকশন */}
      <section className="border-b border-stone-200/70 bg-amber-50/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-stone-200/60 shadow-xs"
                >
                  <div className="p-3 rounded-xl bg-amber-100 text-[#14532D] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ২. ক্লায়েন্ট ও কাস্টমার রিভিউ সেকশন */}
      <section className="py-16 sm:py-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Real Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#14532D] mt-1">
              Loved by Healthy Families
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              See how FruitJazz brings farm purity directly to breakfast tables
              and gifts across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative"
              >
                <div>
                  {/* Top Quote Icon & Stars */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-amber-200" />
                  </div>

                  {/* Comment with escaped quotation entities */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-800">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      {rev.city}, Pakistan
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#14532D] bg-emerald-50 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
