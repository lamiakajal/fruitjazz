"use client";

import React, { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import type { PublicReview } from "@/lib/reviews";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-gold-500" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-4 w-4 ${n <= value ? "fill-current" : "text-stone-300"}`} />
      ))}
    </div>
  );
}

/** Approved reviews for a product plus a form to add a new one (shown after approval). */
export default function ProductReviews({
  productId,
  reviews,
  canReview,
}: {
  productId: string;
  reviews: PublicReview[];
  canReview: boolean;
}) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, must stay empty
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name, city, rating, comment, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send your review");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your review");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="font-display text-2xl font-extrabold text-heading sm:text-3xl">
        Customer reviews
      </h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-stone-300 bg-surface p-8 text-center text-stone-500">
              No reviews yet. Be the first to share your experience.
            </p>
          ) : (
            reviews.map((r) => (
              <article key={r.id} className="rounded-2xl border border-stone-200 bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Stars value={r.rating} />
                  {r.verifiedBuyer && (
                    <span className="flex items-center gap-1 rounded-md bg-leaf-100 px-2 py-1 text-[11px] font-bold text-leaf-700">
                      <CheckCircle2 className="h-3 w-3" /> Verified buyer
                    </span>
                  )}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{r.comment}</p>
                <p className="mt-3 text-xs font-semibold text-stone-500">
                  {r.name}
                  {r.city ? `, ${r.city}` : ""} &middot;{" "}
                  <span suppressHydrationWarning>{new Date(r.createdAt).toLocaleDateString("en-PK")}</span>
                </p>
              </article>
            ))
          )}
        </div>

        {canReview && (
          <div className="rounded-2xl border border-stone-200 bg-surface p-5 shadow-soft lg:self-start">
            <h3 className="font-display text-lg font-bold text-stone-900">Write a review</h3>
            {done ? (
              <p className="mt-4 rounded-xl bg-leaf-50 p-4 text-sm font-semibold text-leaf-700">
                Thank you! Your review will appear once our team approves it.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-3">
                <div role="radiogroup" aria-label="Rating" className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={rating === n}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      onClick={() => setRating(n)}
                      className="cursor-pointer"
                    >
                      <Star className={`h-7 w-7 ${n <= rating ? "fill-gold-500 text-gold-500" : "text-stone-300"}`} />
                    </button>
                  ))}
                </div>
                <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" maxLength={60} />
                <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} placeholder="City (optional)" maxLength={60} />
                <textarea required rows={4} value={comment} onChange={(e) => setComment(e.target.value)} className={inputClass} placeholder="How was the product?" minLength={10} maxLength={1000} />
                {/* Honeypot field for bots, hidden from people */}
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" name="website" />
                {error && <p role="alert" className="text-sm font-semibold text-rose-600">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60 cursor-pointer"
                >
                  {busy ? "Sending..." : "Submit review"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
