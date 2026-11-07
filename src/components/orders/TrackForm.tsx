"use client";

import React, { useState } from "react";
import OrderProgress from "@/components/orders/OrderProgress";
import { formatPrice } from "@/lib/format";

interface TrackedOrder {
  orderNumber: string;
  createdAt: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  courier?: string;
  trackingId?: string;
  trackingUrl?: string;
  itemCount: number;
}

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40";

export default function TrackForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not find your order");
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not find your order");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-stone-200 bg-surface p-5 shadow-soft">
        <input required value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className={inputClass} placeholder="Order number, e.g. MZ-ABC123-XYZ" />
        <input required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="Phone number" inputMode="tel" />
        {error && <p role="alert" className="text-sm font-semibold text-rose-600">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60 cursor-pointer">
          {busy ? "Looking..." : "Track order"}
        </button>
      </form>

      {order && (
        <div className="space-y-5 rounded-2xl border border-stone-200 bg-surface p-5 shadow-soft">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-extrabold text-stone-900">{order.orderNumber}</h2>
            <p className="text-sm text-stone-500">
              {order.itemCount} items &middot; {formatPrice(order.totalAmount)}
            </p>
          </div>
          <OrderProgress status={order.orderStatus} courier={order.courier} trackingId={order.trackingId} trackingUrl={order.trackingUrl} />
          <p className="text-xs text-stone-500">Payment: {order.paymentStatus}</p>
        </div>
      )}
    </div>
  );
}
