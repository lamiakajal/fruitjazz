import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Search } from "lucide-react";
import { getSettings } from "@/lib/settings";
import FloatingHexes from "@/components/ui/FloatingHexes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default async function NotFound() {
  const { categories: CATEGORIES } = await getSettings();
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div className="hex-pattern absolute inset-0" aria-hidden="true" />
      <FloatingHexes />
      <div className="relative mx-auto max-w-2xl text-center">
        {/* 404 with a honeycomb "0" */}
        <div className="flex items-center justify-center gap-2 font-display text-[7rem] font-extrabold leading-none text-heading sm:text-[10rem]">
          <span>4</span>
          <span className="animate-float relative grid h-28 w-24 place-items-center hex bg-linear-to-br from-gold-300 to-gold-500 text-gold-ink sm:h-40 sm:w-36">
            <Search className="h-10 w-10 sm:h-16 sm:w-16" />
          </span>
          <span>4</span>
        </div>

        <h1 className="mt-6 font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
          This page is not on the shelf
        </h1>
        <p className="mx-auto mt-3 max-w-md text-stone-600">
          The link may be old or mistyped. Head back to the shop or jump into a
          category below.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <Link
            href="/shop"
            className="rounded-full border-2 border-stone-300 px-7 py-3 text-sm font-bold text-stone-800 transition hover:border-gold-500"
          >
            Browse all products
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/shop?cat=${cat.slug}`}
                className="rounded-full bg-gold-100 px-4 py-2 text-xs font-bold text-gold-800 transition hover:bg-gold-200"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
