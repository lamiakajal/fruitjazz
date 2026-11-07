"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSettings } from "@/context/SettingsContext";
import { categoryByName } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Pass true for above-the-fold cards so the image loads eagerly. */
  priority?: boolean;
}

const emptySubscribe = () => () => {};

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { inventory } = useSettings();

  // Wishlist lives in localStorage, so only trust it after mount
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  const isSaved = mounted && isInWishlist(product.id);
  const variant = product.variants[variantIndex] ?? product.variants[0];
  const outOfStock = variant.stock <= 0;
  const lowStock = !outOfStock && variant.stock <= inventory.lowStockThreshold;
  const { categories } = useSettings();
  const categorySlug = categoryByName(product.category, categories)?.slug;
  const onSale = !!variant.comparePrice && variant.comparePrice > variant.price;
  const percentOff = onSale ? Math.round((1 - variant.price / (variant.comparePrice as number)) * 100) : 0;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      weight: variant.weight,
      price: variant.price,
      quantity: 1,
    });
    setIsAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-lift">
      {/* Media */}
      <div className="relative aspect-[4/3.4] w-full overflow-hidden bg-stone-100">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-105"
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            fallbackSlug={categorySlug}
            priority={priority}
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-bold text-heading shadow-xs backdrop-blur">
            {product.category}
          </span>
          {onSale && (
            <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white">
              -{percentOff}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-leaf-500 px-2.5 py-1 text-[11px] font-bold text-white">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isSaved}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface/90 shadow-xs backdrop-blur transition active:scale-90 hover:scale-110 cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isSaved ? "fill-rose-500 text-rose-500" : "text-stone-500 hover:text-rose-500"
            }`}
          />
        </button>

        {outOfStock && (
          <div className="absolute inset-0 grid place-items-center bg-stone-900/50 text-sm font-bold text-white">
            Out of stock
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
          <span className="font-bold text-stone-800">{product.rating.toFixed(1)}</span>
          <span className="text-stone-400">({product.reviewsCount})</span>
          {lowStock && (
            <span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-600">
              Only {variant.stock} left
            </span>
          )}
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.8rem] font-display text-[1.05rem] font-bold leading-snug text-stone-900 transition-colors group-hover:text-heading">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pack size">
          {product.variants.map((v, i) => (
            <button
              key={v.weight}
              type="button"
              onClick={() => setVariantIndex(i)}
              aria-pressed={variantIndex === i}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                variantIndex === i
                  ? "bg-primary text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {v.weight}
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <p className="text-xl font-extrabold tracking-tight text-stone-900">
            {formatPrice(variant.price)}
            {onSale && (
              <s className="ml-2 text-sm font-semibold text-stone-400">
                {formatPrice(variant.comparePrice as number)}
              </s>
            )}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`btn-shine flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
              isAdded
                ? "bg-leaf-500 text-white"
                : "bg-gold-500 text-gold-ink hover:bg-gold-400 hover:shadow-md"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
