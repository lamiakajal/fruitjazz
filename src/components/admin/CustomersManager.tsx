"use client";

import React, { useState } from "react";
import { Coins } from "lucide-react";

export interface AdminCustomer {
  _id: string;
  name: string;
  email: string;
  provider?: string;
  coinBalance?: number;
  createdAt: string;
}

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40";

function Row({ customer }: { customer: AdminCustomer }) {
  const [balance, setBalance] = useState(customer.coinBalance ?? 0);
  const [coins, setCoins] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const adjust = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/customers/${customer._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coins: Number(coins), note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not update");
      setBalance(data.balance);
      setCoins("");
      setNote("");
      setMessage("Updated");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not update");
    } finally {
      setBusy(false);
    }
  };

  return (
    <tr className="align-top">
      <td className="px-4 py-3">
        <p className="font-bold text-stone-800">{customer.name}</p>
        <p className="text-xs text-stone-500">{customer.email}</p>
      </td>
      <td className="px-4 py-3 text-xs text-stone-500" suppressHydrationWarning>
        {customer.provider ?? "email"} &middot; {new Date(customer.createdAt).toLocaleDateString("en-PK")}
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-sm font-bold text-gold-800">
          <Coins className="h-3.5 w-3.5" /> {balance}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <input type="number" value={coins} onChange={(e) => setCoins(e.target.value)} placeholder="+50 or -20" className={`${inputClass} w-28`} />
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reason" maxLength={200} className={`${inputClass} w-40`} />
          <button type="button" onClick={adjust} disabled={busy || !coins} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover disabled:opacity-50 cursor-pointer">
            Apply
          </button>
          {message && <span className="text-xs font-semibold text-stone-600">{message}</span>}
        </div>
      </td>
    </tr>
  );
}

export default function CustomersManager({ customers }: { customers: AdminCustomer[] }) {
  if (customers.length === 0) {
    return <p className="rounded-2xl border border-dashed border-stone-300 bg-surface p-10 text-center text-stone-500">No customer accounts yet.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-surface shadow-soft">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="border-b border-stone-200 text-xs font-bold text-stone-500">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Joined</th>
            <th className="px-4 py-3">Coins</th>
            <th className="px-4 py-3">Adjust coins</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {customers.map((c) => (
            <Row key={c._id} customer={c} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
