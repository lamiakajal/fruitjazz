"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Check,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const activeVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  // Increase quantity
  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Add item with current variant & quantity to cart
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      weight: activeVariant.weight,
      price: activeVariant.price,
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Buy now: add to cart and immediately route to checkout
  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      weight: activeVariant.weight,
      price: activeVariant.price,
      quantity: quantity,
    });
    router.push("/checkout");
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-8">
          <Link href="/" className="hover:text-amber-700 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/shop" className="hover:text-amber-700 transition">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Hero Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs">
          {/* 1. Left: Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 shadow-inner">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#14532D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {product.category}
              </span>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-xs rounded-full text-stone-500 hover:text-red-500 hover:bg-white transition shadow-xs cursor-pointer"
                aria-label="Save to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails list if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                      selectedImage === index
                        ? "border-[#14532D] ring-2 ring-[#14532D]/20"
                        : "border-stone-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Right: Information & Purchasing Options */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Reviews & Stock Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-current"
                            : "text-stone-300 fill-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  In Stock ({activeVariant.stock} units left)
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2 pt-1 border-b border-stone-100 pb-4">
                <span className="text-sm font-bold text-[#14532D]">PKR</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                  Rs. {activeVariant.price.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400 font-medium ml-2">
                  (Inclusive of all taxes)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Variant / Weight Selector */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-stone-700">
                    Select Packaging Size:
                  </span>
                  <span className="text-amber-800 font-semibold">
                    {activeVariant.weight} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.weight}
                      type="button"
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedVariantIndex === index
                          ? "bg-[#14532D] text-white border-[#14532D] shadow-xs"
                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      {variant.weight} - Rs. {variant.price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Quantity:
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={handleQuantityDecrease}
                      className="p-2.5 text-stone-600 hover:text-stone-900 transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-sm text-stone-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleQuantityIncrease}
                      className="p-2.5 text-stone-600 hover:text-stone-900 transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-stone-500">
                    Total:{" "}
                    <strong>
                      Rs. {(activeVariant.price * quantity).toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                    isAdded
                      ? "bg-[#14532D] text-white"
                      : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 hover:shadow-md"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-[#14532D] hover:bg-[#0f4022] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md hover:shadow-lg"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Buy Now (COD)</span>
                </button>
              </div>

              {/* Guarantees Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-center">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#14532D]" />
                  <span className="text-[10px] font-bold text-stone-700">
                    100% Organic & Raw
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50 rounded-xl">
                  <Truck className="w-4 h-4 text-[#14532D]" />
                  <span className="text-[10px] font-bold text-stone-700">
                    Nationwide Fast COD
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50 rounded-xl">
                  <RotateCcw className="w-4 h-4 text-[#14532D]" />
                  <span className="text-[10px] font-bold text-stone-700">
                    7 Days Easy Return
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="flex justify-between items-end mb-8 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Recommended For You
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  You May Also Like
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-amber-800 hover:text-amber-900 underline"
              >
                View Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-stone-200/80 p-4 flex flex-col justify-between hover:shadow-lg transition"
                >
                  <Link href={`/product/${p.slug}`}>
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-stone-100 mb-3">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover hover:scale-105 transition duration-300"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase">
                      {p.category}
                    </span>
                    <h3 className="text-xs font-bold text-stone-800 line-clamp-1 mt-0.5">
                      {p.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100">
                    <span className="text-xs font-bold text-[#14532D]">
                      Rs. {p.variants[0].price.toLocaleString()}
                    </span>
                    <Link
                      href={`/product/${p.slug}`}
                      className="text-[11px] font-bold text-amber-700 hover:underline"
                    >
                      View &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
