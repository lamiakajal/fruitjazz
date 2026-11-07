"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
import ProductImage from "@/components/ui/ProductImage";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { categoryByName } from "@/data/categories";
import { useSettings } from "@/context/SettingsContext";
import { formatPrice } from "@/lib/format";

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
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Wishlist lives in localStorage, so only trust it after mount
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isWishlisted = mounted && isInWishlist(product.id);
  const { categories } = useSettings();
  const categorySlug = categoryByName(product.category, categories)?.slug;

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  const activeVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const outOfStock = activeVariant.stock <= 0;
  const maxQuantity = Math.max(1, Math.min(20, activeVariant.stock));

  // Increase quantity (capped by available stock)
  const handleQuantityIncrease = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
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
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setIsAdded(false), 1500);
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
    <div className="bg-canvas min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-8">
          <Link href="/" className="hover:text-gold-700 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/shop" className="hover:text-gold-700 transition">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Hero Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-surface p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs">
          {/* 1. Left: Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 shadow-inner">
              <ProductImage
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fallbackSlug={categorySlug}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 bg-surface/95 backdrop-blur-xs text-heading text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {product.category}
              </span>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 p-2.5 bg-surface/90 backdrop-blur-xs rounded-full text-stone-500 hover:text-red-500 hover:bg-surface transition shadow-xs cursor-pointer"
                aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                aria-pressed={isWishlisted}
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
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-stone-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <ProductImage
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fallbackSlug={categorySlug}
                      sizes="80px"
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
                <div className="flex items-center gap-1.5 text-gold-500 text-sm font-bold">
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
                    ({product.reviewsCount} reviews)
                  </span>
                </div>

                {outOfStock ? (
                  <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full">
                    Out of stock
                  </span>
                ) : (
                  <span className="text-xs font-bold text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full">
                    {activeVariant.stock <= 10
                      ? `Only ${activeVariant.stock} left`
                      : "In stock"}
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2 pt-1 border-b border-stone-100 pb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                  {formatPrice(activeVariant.price)}
                </span>
                {activeVariant.comparePrice && activeVariant.comparePrice > activeVariant.price && (
                  <>
                    <s className="text-lg font-semibold text-stone-400">
                      {formatPrice(activeVariant.comparePrice)}
                    </s>
                    <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                      Save {Math.round((1 - activeVariant.price / activeVariant.comparePrice) * 100)}%
                    </span>
                  </>
                )}
                <span className="text-xs text-stone-400 font-medium ml-2">
                  (inclusive of taxes)
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
                  <span className="text-gold-800 font-semibold">
                    {activeVariant.weight} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.weight}
                      type="button"
                      onClick={() => {
                        setSelectedVariantIndex(index);
                        setQuantity((q) => Math.min(q, Math.max(1, Math.min(20, variant.stock))));
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedVariantIndex === index
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-surface text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50"
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
                  <div className="flex items-center border border-stone-300 rounded-xl bg-surface shadow-2xs">
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
                  disabled={outOfStock}
                  className={`disabled:opacity-50 disabled:cursor-not-allowed py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                    isAdded
                      ? "bg-primary text-white"
                      : "bg-gold-500 hover:bg-gold-400 text-gold-ink hover:shadow-md"
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
                  disabled={outOfStock}
                  className="disabled:opacity-50 disabled:cursor-not-allowed py-3.5 px-6 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md hover:shadow-lg"
                >
                  <Zap className="w-4 h-4 text-gold-300" />
                  <span>Buy now</span>
                </button>
              </div>

              {/* Guarantees Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-center">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-heading" />
                  <span className="text-[10px] font-bold text-stone-700">
                    100% Organic & Raw
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50 rounded-xl">
                  <Truck className="w-4 h-4 text-heading" />
                  <span className="text-[10px] font-bold text-stone-700">
                    Nationwide Fast COD
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-stone-50 rounded-xl">
                  <RotateCcw className="w-4 h-4 text-heading" />
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
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  Recommended for you
                </span>
                <h2 className="text-2xl font-display font-bold text-stone-900 mt-1">
                  You may also like
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-gold-800 hover:text-gold-900 underline"
              >
                View catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
