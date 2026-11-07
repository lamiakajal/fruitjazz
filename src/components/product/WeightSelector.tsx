"use client";

import React from "react";
import { ProductVariant } from "@/types";
import { formatPrice } from "@/lib/format";

interface WeightSelectorProps {
  variants: ProductVariant[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

/** Reusable pack-size picker (radio-style buttons). */
export default function WeightSelector({ variants, selectedIndex, onChange }: WeightSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Pack size">
      {variants.map((v, i) => (
        <button
          key={v.weight}
          type="button"
          role="radio"
          aria-checked={selectedIndex === i}
          disabled={v.stock <= 0}
          onClick={() => onChange(i)}
          className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${
            selectedIndex === i
              ? "border-primary bg-primary text-white"
              : "border-stone-200 bg-surface text-stone-700 hover:border-gold-500"
          }`}
        >
          {v.weight} · {formatPrice(v.price)}
        </button>
      ))}
    </div>
  );
}
