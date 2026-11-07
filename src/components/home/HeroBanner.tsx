import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Star, Truck } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import ProductImage from "@/components/ui/ProductImage";
import RotatingWords from "@/components/ui/RotatingWords";
import FloatingHexes from "@/components/ui/FloatingHexes";
import type { HomeContent } from "@/lib/settings-types";

// Honeycomb mosaic. Cells are positioned on a 3-column pointy-top hex grid:
// each cell is 33.333% wide and 40% tall, rows are offset by 30% of the height.
interface Cell {
  left: number;
  top: number;
  kind: "photo" | "art" | "logo";
  src?: string;
  alt?: string;
  delay: number;
  floatDuration: number;
}

const CELLS: Cell[] = [
  { left: 16.667, top: 0, kind: "art", src: "art:honey:honey", delay: 0.1, floatDuration: 7 },
  { left: 50, top: 0, kind: "art", src: "art:dates:date", delay: 0.2, floatDuration: 8 },
  { left: 0, top: 30, kind: "art", src: "art:nuts:almond", delay: 0.3, floatDuration: 9 },
  { left: 33.333, top: 30, kind: "logo", delay: 0.4, floatDuration: 6 },
  { left: 66.667, top: 30, kind: "art", src: "art:dry-fruits:walnut", delay: 0.5, floatDuration: 8 },
  { left: 16.667, top: 60, kind: "art", src: "art:tea:leaf", delay: 0.6, floatDuration: 7.5 },
  { left: 50, top: 60, kind: "art", src: "art:gift-boxes:gift", delay: 0.7, floatDuration: 9 },
];

const PERKS = [
  { icon: Leaf, text: "Raw and unheated" },
  { icon: Truck, text: "Cash on Delivery" },
  { icon: ShieldCheck, text: "7-day freshness promise" },
];

export default function HeroBanner({ home }: { home: HomeContent }) {
  // The highlighted word gets the moving colour effect
  const at = home.heroHighlight ? home.heroTitle.indexOf(home.heroHighlight) : -1;
  const before = at >= 0 ? home.heroTitle.slice(0, at) : home.heroTitle;
  const after = at >= 0 ? home.heroTitle.slice(at + home.heroHighlight.length) : "";

  return (
    <section className="relative overflow-hidden">
      {/* Background glow and honeycomb texture */}
      <div className="hex-pattern absolute inset-0" aria-hidden="true" />
      <FloatingHexes />
      <div
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-brand-300/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        {/* Copy */}
        <div className="animate-fade-up text-center lg:col-span-6 lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-100 px-3.5 py-1.5 text-xs font-bold text-gold-800">
            <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
            Fresh today: <RotatingWords words={home.rotatingWords} />
          </p>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-heading sm:text-5xl lg:text-[4.1rem]">
            {before}
            {at >= 0 && <span className="text-shimmer">{home.heroHighlight}</span>}
            {after}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg lg:mx-0">
            {home.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/shop"
              className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-primary-hover sm:w-auto"
            >
              {home.primaryButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop?cat=gift-boxes"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-stone-300 bg-surface/60 px-8 py-[0.95rem] text-base font-bold text-stone-800 backdrop-blur transition hover:border-gold-500 hover:text-heading sm:w-auto"
            >
              {home.secondaryButton}
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-stone-600 lg:justify-start">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold-600" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Honeycomb mosaic */}
        <div className="lg:col-span-6">
          <div
            className="relative mx-auto w-full max-w-[34rem]"
            style={{ aspectRatio: "1 / 0.962" }}
            aria-hidden="true"
          >
            {CELLS.map((cell, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: `${cell.left}%`, top: `${cell.top}%`, width: "33.333%", height: "40%" }}
              >
                <div
                  className="animate-float h-full w-full"
                  style={{ animationDuration: `${cell.floatDuration}s`, animationDelay: `${i * 0.35}s` }}
                >
                  <div
                    className="animate-hex-rise hex relative h-full w-full scale-[0.96] bg-stone-200"
                    style={{ animationDelay: `${cell.delay}s` }}
                  >
                    {cell.kind === "logo" ? (
                      <div className="grid h-full w-full place-items-center bg-linear-to-br from-gold-300 to-gold-500">
                        <LogoMark className="h-[62%] w-[62%] drop-shadow" />
                      </div>
                    ) : (
                      <ProductImage
                        src={cell.src as string}
                        alt={cell.alt ?? ""}
                        sizes="(max-width: 1024px) 40vw, 200px"
                        priority={i < 3}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
