import React from "react";
import { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Secure Checkout (Cash on Delivery) | FruitJazz Pakistan",
  description:
    "Complete your order of pure mountain honey and organic dry fruits with fast Cash on Delivery across Pakistan.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
