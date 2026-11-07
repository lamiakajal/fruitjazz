import React from "react";
import { Metadata } from "next";
import WishlistView from "@/components/wishlist/WishlistView";

// SEO Metadata for Wishlist Page
export const metadata: Metadata = {
  title: "My Saved Wishlist",
  description:
    "Review your saved organic mountain dry fruits, Sidr honey, and luxury gift boxes on Mewazar.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
