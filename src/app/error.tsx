"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";

/** Route-level error boundary: shows a friendly message and a retry button. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <section className="px-4 py-24 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto grid h-20 w-[4.5rem] place-items-center hex bg-rose-100 text-rose-600">
          <RefreshCcw className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-stone-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-stone-600">
          We could not load this page. Please try again, and contact us on
          WhatsApp if it keeps happening.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border-2 border-stone-300 px-7 py-3 text-sm font-bold text-stone-800 transition hover:border-gold-500"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
