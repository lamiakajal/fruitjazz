"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Star, Trash2 } from "lucide-react";

export interface AdminReview {
  _id: string;
  productName: string;
  name: string;
  city?: string;
  rating: number;
  comment: string;
  status: "pending" | "approved";
  verifiedBuyer: boolean;
  createdAt: string;
}

export default function ReviewsManager({ reviews }: { reviews: AdminReview[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState("");

  const act = async (id: string, method: "PATCH" | "DELETE", status?: string) => {
    if (method === "DELETE" && !window.confirm("Delete this review permanently?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: status ? JSON.stringify({ status }) : undefined,
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert("Could not update the review.");
    } finally {
      setBusyId("");
    }
  };

  if (reviews.length === 0) {
    return <p className="rounded-2xl border border-dashed border-stone-300 bg-surface p-10 text-center text-stone-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <article key={r._id} className="rounded-2xl border border-stone-200 bg-surface p-4 shadow-soft">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${r.status === "pending" ? "bg-gold-100 text-gold-800" : "bg-leaf-100 text-leaf-700"}`}>
              {r.status === "pending" ? "Waiting for approval" : "Published"}
            </span>
            <span className="flex gap-0.5 text-gold-500">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className={`h-3.5 w-3.5 ${n <= r.rating ? "fill-current" : "text-stone-300"}`} />
              ))}
            </span>
            {r.verifiedBuyer && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-leaf-700">
                <CheckCircle2 className="h-3 w-3" /> Verified buyer
              </span>
            )}
            <span className="ml-auto text-xs text-stone-500">{r.productName}</span>
          </div>
          <p className="mt-3 text-sm text-stone-700">{r.comment}</p>
          <p className="mt-2 text-xs font-semibold text-stone-500">
            {r.name}
            {r.city ? `, ${r.city}` : ""} &middot; <span suppressHydrationWarning>{new Date(r.createdAt).toLocaleDateString("en-PK")}</span>
          </p>
          <div className="mt-3 flex gap-2">
            {r.status === "pending" ? (
              <button type="button" disabled={busyId === r._id} onClick={() => act(r._id, "PATCH", "approved")} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover disabled:opacity-50 cursor-pointer">
                Approve and publish
              </button>
            ) : (
              <button type="button" disabled={busyId === r._id} onClick={() => act(r._id, "PATCH", "pending")} className="rounded-full border border-stone-300 px-4 py-2 text-xs font-bold text-stone-700 hover:border-gold-500 disabled:opacity-50 cursor-pointer">
                Unpublish
              </button>
            )}
            <button type="button" disabled={busyId === r._id} onClick={() => act(r._id, "DELETE")} aria-label="Delete review" className="rounded-full p-2 text-stone-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 cursor-pointer">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
