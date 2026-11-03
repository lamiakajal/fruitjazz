import React from "react";
import { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

// SEO Metadata for About Page
export const metadata: Metadata = {
  title: "About Our Harvest | FruitJazz Pakistan",
  description:
    "Discover how FruitJazz sources 100% pure raw Sidr honey, wild mountain nectar, and unbleached organic dry fruits directly from Gilgit and Neelum Valley.",
};

export default function AboutPage() {
  return <AboutView />;
}
