"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Trash2 } from "lucide-react";

export interface AdminMessage {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const waDigits = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.startsWith("0") ? `92${d.slice(1)}` : d;
};

export default function MessagesManager({ messages }: { messages: AdminMessage[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState("");

  const call = async (id: string, method: "PATCH" | "DELETE", read?: boolean) => {
    if (method === "DELETE" && !window.confirm("Delete this message?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "PATCH" ? JSON.stringify({ read }) : undefined,
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert("Could not update the message.");
    } finally {
      setBusy("");
    }
  };

  if (messages.length === 0) {
    return <p className="rounded-2xl border border-dashed border-stone-300 bg-surface p-10 text-center text-stone-500">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <article key={m._id} className={`rounded-2xl border bg-surface p-4 shadow-soft ${m.read ? "border-stone-200" : "border-gold-400"}`}>
          <div className="flex flex-wrap items-center gap-3">
            {!m.read && <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-bold text-gold-ink">New</span>}
            <p className="font-bold text-stone-900">{m.name}</p>
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-600">{m.subject}</span>
            <span className="ml-auto text-xs text-stone-500" suppressHydrationWarning>{new Date(m.createdAt).toLocaleString("en-PK")}</span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-stone-700">{m.message}</p>
          <p className="mt-2 text-xs text-stone-500">{[m.phone, m.email].filter(Boolean).join(" · ")}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {m.phone && (
              <a href={`https://wa.me/${waDigits(m.phone)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white">
                <MessageCircle className="h-3.5 w-3.5" /> Reply on WhatsApp
              </a>
            )}
            {m.email && (
              <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`} className="rounded-full border border-stone-300 px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:border-gold-500">
                Reply by email
              </a>
            )}
            <button type="button" disabled={busy === m._id} onClick={() => call(m._id, "PATCH", !m.read)} className="rounded-full border border-stone-300 px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:border-gold-500 disabled:opacity-50 cursor-pointer">
              {m.read ? "Mark as new" : "Mark as read"}
            </button>
            <button type="button" disabled={busy === m._id} onClick={() => call(m._id, "DELETE")} aria-label="Delete message" className="ml-auto rounded-full p-2 text-stone-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 cursor-pointer">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
