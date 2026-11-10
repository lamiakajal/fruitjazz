"use client";

import React from "react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { toast, clearToast, setIsCartOpen } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-10000 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white border-2 border-[#14532D] shadow-2xl rounded-2xl p-4 max-w-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-[#14532D]">
          <CheckCircle2 className="w-6 h-6 text-[#14532D]" />
        </div>

        <div className="flex-1 pr-2">
          <p className="text-xs font-bold text-[#14532D] uppercase tracking-wider">
            Item Added
          </p>
          <p className="text-xs font-semibold text-stone-800 line-clamp-1">
            {toast.itemName}{" "}
            <span className="text-amber-700">({toast.weight})</span>
          </p>
          <button
            type="button"
            onClick={() => {
              clearToast();
              setIsCartOpen(true);
            }}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline mt-0.5 flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>View Cart & Checkout &rarr;</span>
          </button>
        </div>

        <button
          type="button"
          onClick={clearToast}
          className="text-stone-400 hover:text-stone-700 p-1 rounded-md transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
