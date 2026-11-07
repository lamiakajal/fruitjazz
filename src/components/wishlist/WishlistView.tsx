"use client";

import React, { useState, useSyncExternalStore } from "react";
import ProductImage from "@/components/ui/ProductImage";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";

const emptySubscribe = () => () => {};

export default function WishlistView() {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Mount state verification to prevent hydration mismatches
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [notification, setNotification] = useState<string | null>(null);

  // Move product directly to active shopping cart
  const handleMoveToCart = (product: Product) => {
    const selectedVariant = product.variants?.[0] || {
      weight: "Standard",
      price: 1000,
    };

    addToCart({
      id: `${product.id}-${selectedVariant.weight}`,
      productId: product.id,
      name: product.name,
      price: selectedVariant.price,
      weight: selectedVariant.weight,
      image: product.images?.[0] || "/placeholder.jpg",
      quantity: 1,
    } as Parameters<typeof addToCart>[0]);

    removeFromWishlist(product.id);
    setNotification(`${product.name} moved to your shopping cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!mounted) {
    return (
      <div className="bg-canvas min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-canvas min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-stone-500"
        >
          <Link href="/" className="hover:text-gold-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-800">My Saved Harvest</span>
        </nav>

        {/* Temporary Notification Toast */}
        {notification && (
          <div className="p-4 bg-leaf-50 border border-leaf-200 rounded-2xl flex items-center gap-3 text-leaf-800 text-xs shadow-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-leaf-600 shrink-0" />
            <span className="font-semibold">{notification}</span>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Collection</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-stone-900">
              My Saved Wishlist
            </h1>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} Saved
          </span>
        </div>

        {/* Empty Wishlist State */}
        {wishlist.length === 0 ? (
          <div className="max-w-md mx-auto bg-surface rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 bg-gold-50 text-gold-700 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-display font-bold text-stone-800">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Explore our fresh Gilgit dry fruits and authentic raw Sidr honey
              to save your family favorites for later.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Browse Organic Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlist.map((product) => {
              const defaultVariant = product.variants?.[0] || {
                price: 1000,
                weight: "Standard",
              };
              const displayImage =
                product.images?.[0] ||
                "art:honey:honey";

              return (
                <div
                  key={product.id}
                  className="group bg-surface rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image Container */}
                    <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                      <ProductImage
                        src={displayImage}
                        alt={product.name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        title="Remove from Wishlist"
                        className="absolute top-3 right-3 p-2 rounded-full bg-surface/90 text-stone-400 hover:text-red-500 hover:bg-surface shadow-xs transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="absolute bottom-3 left-3 bg-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                        {product.category || "Organic"}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 sm:p-6 space-y-2">
                      <Link href={`/product/${product.slug || product.id}`}>
                        <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 group-hover:text-heading transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-2 flex items-baseline justify-between">
                        <span className="text-lg font-display font-extrabold text-heading">
                          Rs. {Number(defaultVariant.price).toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold text-stone-400">
                          {defaultVariant.weight}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 sm:p-6 pt-0 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Move to Cart</span>
                    </button>
                    <Link
                      href={`/product/${product.slug || product.id}`}
                      className="p-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition cursor-pointer flex items-center justify-center"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
