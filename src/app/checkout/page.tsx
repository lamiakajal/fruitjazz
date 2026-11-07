import React from "react";
import { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Secure checkout",
  description:
    "Complete your order with Cash on Delivery, bank transfer or wallet payment across Pakistan.",
  robots: { index: false },
};

// Payment accounts and delivery fees are owner-editable, so always read them fresh
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const settings = await getSettings();

  return (
    <CheckoutView
      payments={settings.payments.filter((p) => p.isActive)}
      shipping={{ fee: settings.shipping.fee, freeThreshold: settings.shipping.freeThreshold }}
      rewards={settings.rewards}
      orders={settings.orders}
    />
  );
}
