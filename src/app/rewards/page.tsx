"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Coins } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface Tx {
  _id: string;
  type: string;
  coins: number;
  orderNumber?: string;
  note?: string;
  createdAt: string;
}

interface RewardsData {
  enabled: boolean;
  balance: number;
  rules: { earnPercent: number; coinValue: number; maxRedeemPercent: number };
  history: Tx[];
}

export default function RewardsPage() {
  const { status } = useSession();
  const [data, setData] = useState<RewardsData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/rewards")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <Coins className="mx-auto h-12 w-12 text-gold-500" />
        <h1 className="mt-4 font-display text-3xl font-extrabold text-heading">Reward coins</h1>
        <p className="mt-2 text-stone-600">Sign in to see your coins and use them at checkout.</p>
        <Link href="/login" className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-sm font-bold text-white">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-heading">Reward coins</h1>

      {!loaded ? (
        <div className="skeleton mt-8 h-40 rounded-3xl" />
      ) : !data || !data.enabled ? (
        <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-surface p-8 text-center text-stone-500">
          Reward coins are not running right now.
        </p>
      ) : (
        <>
          <div className="mt-8 rounded-3xl bg-linear-to-br from-brand-800 to-brand-950 p-8 text-white shadow-lift">
            <p className="text-sm font-semibold text-white/70">Your balance</p>
            <p className="mt-1 flex items-center gap-3 font-display text-5xl font-extrabold">
              <Coins className="h-10 w-10 text-gold-400" /> {data.balance}
            </p>
            <p className="mt-2 text-sm text-gold-200">
              Worth {formatPrice(data.balance * data.rules.coinValue)} at checkout
            </p>
          </div>

          <ul className="mt-6 list-disc space-y-1.5 pl-5 text-sm text-stone-600">
            <li>Earn {data.rules.earnPercent}% of what you pay as coins when your order is delivered.</li>
            <li>1 coin = {formatPrice(data.rules.coinValue)}.</li>
            <li>Coins can cover up to {data.rules.maxRedeemPercent}% of an order. Switch them on at checkout.</li>
          </ul>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-stone-900">History</h2>
          {data.history.length === 0 ? (
            <p className="text-sm text-stone-500">No coin activity yet. Your first coins arrive after a delivered order.</p>
          ) : (
            <ul className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-surface">
              {data.history.map((tx) => (
                <li key={tx._id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div>
                    <p className="font-bold text-stone-800">
                      {tx.note || tx.type}
                      {tx.orderNumber ? ` (${tx.orderNumber})` : ""}
                    </p>
                    <p className="text-xs text-stone-500" suppressHydrationWarning>
                      {new Date(tx.createdAt).toLocaleDateString("en-PK")}
                    </p>
                  </div>
                  <span className={`font-extrabold ${tx.coins >= 0 ? "text-leaf-700" : "text-rose-600"}`}>
                    {tx.coins > 0 ? "+" : ""}
                    {tx.coins}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
