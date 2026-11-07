"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductArt from "@/components/ui/ProductArt";
import { useSettings } from "@/context/SettingsContext";

interface ProductImageProps {
  src: string;
  alt: string;
  /** Category slug used for the illustrated fallback. */
  fallbackSlug?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders a product photo with `next/image`. Values like "art:spices" and
 * images that fail to load fall back to the built-in illustration, so the
 * storefront never shows a broken image.
 */
export default function ProductImage({
  src,
  alt,
  fallbackSlug,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
  className = "object-cover",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const { categories } = useSettings();

  // "art:<category-slug>:<motif>" renders a matching illustration
  if (src.startsWith("art:")) {
    const [, slug, motif] = src.split(":");
    return <ProductArt slug={slug} motif={motif} categories={categories} />;
  }

  if (failed || !src) {
    return <ProductArt slug={fallbackSlug} categories={categories} />;
  }

  // Our own files (/...) go through the image optimizer. Links from other sites
  // load as-is so any host the admin pastes works without extra configuration.
  const isExternal = /^https?:\/\//.test(src);

  return (
    <Image
      src={src}
      unoptimized={isExternal}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
