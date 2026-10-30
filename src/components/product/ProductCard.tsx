"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Default to the first weight variant (e.g. 250g)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const activeVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  // Add item with currently selected weight package to CartContext
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      weight: activeVariant.weight,
      price: activeVariant.price,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Media & Tags */}
        <div className="relative h-56 w-full overflow-hidden bg-stone-100">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Category Tag */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#14532D] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
            {product.category}
          </span>

          {/* Wishlist Toggle Button */}
          <button
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs rounded-full text-stone-500 hover:text-red-500 hover:bg-white transition shadow-xs cursor-pointer"
            aria-label="Add to Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Product Meta Information */}
        <div className="p-5 space-y-3">
          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
            <span className="text-stone-400 font-normal">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-stone-800 text-base leading-snug hover:text-amber-700 transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Brief Description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Weight Package Selection */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Pack Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, i) => (
                <button
                  key={v.weight}
                  onClick={() => setSelectedVariantIndex(i)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition cursor-pointer ${
                    selectedVariantIndex === i
                      ? "bg-[#14532D] text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Price Display & Cart Button */}
      <div className="p-5 pt-0 mt-2 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-stone-400 block">
            Price
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-[#14532D]">Rs.</span>
            <span className="text-xl font-extrabold text-stone-900 tracking-tight">
              {activeVariant.price.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            isAdded
              ? "bg-[#14532D] text-white"
              : "bg-amber-500 hover:bg-amber-600 text-white shadow-xs hover:shadow-md"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
