"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  // Return nothing if drawer is not toggled open
  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2999;
  const progressPercent = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );

  return (
    <div className="fixed inset-0 z-9999 overflow-hidden">
      {/* Background Dimmed Overlay */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Slide-over Content Container */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#14532D]" />
              <h3 className="font-serif font-bold text-lg text-stone-800">
                Your Cart
              </h3>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Progress Tier */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-200/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 mb-1.5">
              <Truck className="w-4 h-4 text-amber-600" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add{" "}
                  <strong>
                    Rs. {remainingForFreeShipping.toLocaleString()}
                  </strong>{" "}
                  more for <strong>FREE Delivery</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold">
                  🎉 You unlocked FREE Delivery!
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#14532D] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-stone-700 text-lg">
                  Your cart is empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Explore our fresh Kashmiri honey, crisp almonds, and premium
                  walnuts.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-[#14532D] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#0f4022] transition cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl border border-stone-200 bg-white shadow-xs"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-stone-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-500 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-1">
                        {item.weight}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-50 rounded-l-lg transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-50 rounded-r-lg transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-stone-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-800">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-stone-800">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : "Rs. 250"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-sm text-stone-800">Total</span>
                <span className="text-xl font-extrabold text-[#14532D]">
                  Rs.{" "}
                  {(
                    subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250)
                  ).toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-[#14532D] hover:bg-[#0f4022] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
