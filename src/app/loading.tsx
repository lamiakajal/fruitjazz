import React from "react";

/** Shown instantly while a route segment loads. */
export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Loading">
      <div className="relative h-16 w-14">
        <div className="hex animate-spin-slow absolute inset-0 bg-linear-to-br from-gold-300 to-gold-600" />
        <div className="hex absolute inset-[6px] bg-canvas" />
        <div className="hex animate-float absolute inset-[16px] bg-gold-500" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
