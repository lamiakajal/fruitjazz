import React from "react";
import type { Metadata } from "next";
import TrackForm from "@/components/orders/TrackForm";

export const metadata: Metadata = {
  title: "Track your order",
  description: "Enter your order number and phone number to see where your order is.",
};

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-heading">Track your order</h1>
      <p className="mt-3 text-stone-600">
        Enter the order number from your confirmation and the phone number you used at checkout.
      </p>
      <TrackForm />
    </div>
  );
}
