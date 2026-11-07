import React from "react";
import type { Metadata } from "next";
import ContentPage from "@/components/common/ContentPage";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";

export const metadata: Metadata = {
  title: PAGE_DEFAULTS.terms.title,
  description: PAGE_DEFAULTS.terms.description,
};

export default function Page() {
  return <ContentPage pageKey="terms" />;
}
