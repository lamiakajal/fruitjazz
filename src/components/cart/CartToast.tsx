"use client";

import React from "react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

/** Small confirmation toast shown after an item is added to the cart. */
export default function CartToast() {
  const { toast, clearToast, setIsCartOpen } = useCart();

  if (!toast) return null;

  return (
    <div
      className="animate-fade-up fixed bottom-24 left-4 right-4 z-[9000] sm:left-auto sm:right-6 sm:w-96"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-leaf-200 bg-surface p-4 shadow-lift">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-leaf-700">{toast.message}</p>
          <p className="truncate text-sm font-semibold text-stone-800">
            {toast.itemName} <span className="text-gold-700">({toast.weight})</span>
          </p>
          <button
            type="button"
            onClick={() => {
              clearToast();
              setIsCartOpen(true);
            }}
            className="mt-0.5 flex items-center gap-1 text-xs font-bold text-heading underline-offset-2 hover:underline cursor-pointer"
          >
            <ShoppingBag className="h-3 w-3" />
            View cart and checkout
          </button>
        </div>

        <button
          type="button"
          onClick={clearToast}
          aria-label="Dismiss"
          className="rounded-md p-1 text-stone-400 transition hover:text-stone-700 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
