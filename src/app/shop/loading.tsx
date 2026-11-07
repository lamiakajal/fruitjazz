import React from "react";

/** Instant skeleton while the shop page loads. */
export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-busy="true" role="status">
      <div className="skeleton h-12 w-72 rounded-xl" />
      <div className="skeleton mt-4 h-5 w-96 max-w-full rounded-lg" />
      <div className="mt-8 flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-10 w-28 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-96 rounded-3xl" />
        ))}
      </div>
      <span className="sr-only">Loading products</span>
    </div>
  );
}
