"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { shipping: shippingSettings } = useSettings();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } =
    useCart();

  // Lock page scroll and support Escape while the drawer is open
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const threshold = shippingSettings.freeThreshold;
  const progress = Math.min((subtotal / threshold) * 100, 100);
  const remaining = Math.max(threshold - subtotal, 0);
  const shipping = subtotal >= threshold ? 0 : shippingSettings.fee;

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setIsCartOpen(false)}
        className="animate-fade-in absolute inset-0 bg-brand-950/60 backdrop-blur-sm cursor-default"
      />

      <aside className="animate-slide-in-right absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-gold-600" />
            <h2 className="font-display text-lg font-extrabold text-stone-900">Your cart</h2>
            {cart.length > 0 && (
              <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-bold text-gold-800">
                {cart.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free delivery progress */}
        {cart.length > 0 && (
          <div className="border-b border-stone-200 bg-gold-50 px-5 py-3.5">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Truck className="h-4 w-4 text-gold-600" />
              {remaining > 0 ? (
                <span>
                  Add <strong>{formatPrice(remaining)}</strong> more for free delivery
                </span>
              ) : (
                <span className="font-bold text-leaf-700">You unlocked free delivery</span>
              )}
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-gold-400 to-gold-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="grid h-20 w-20 place-items-center hex bg-gold-100 text-gold-700">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-800">Your cart is empty</h3>
              <p className="max-w-xs text-sm text-stone-500">
                Add raw honey, nuts, dates or saffron and they will show up here.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl border border-stone-200 bg-surface p-3"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                  <ProductImage src={item.image} alt={item.name} sizes="80px" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-stone-800">{item.name}</h3>
                      <span className="mt-1 inline-block rounded-md bg-gold-100 px-2 py-0.5 text-[11px] font-semibold text-gold-800">
                        {item.weight}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1 text-stone-400 transition hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-lg border border-stone-200">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-7 text-center text-sm font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-extrabold text-stone-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="space-y-3 border-t border-stone-200 bg-stone-50 p-5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-bold text-stone-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Delivery</span>
                <span className="font-bold text-stone-800">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between border-t border-stone-200 pt-3">
              <span className="text-sm font-bold text-stone-800">Total</span>
              <span className="text-2xl font-extrabold text-heading">
                {formatPrice(subtotal + shipping)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-primary-hover"
            >
              Go to checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
