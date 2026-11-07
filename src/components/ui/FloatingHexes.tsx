import React from "react";

const HEXES = [
  { top: "8%", left: "4%", size: 44, delay: 0, dur: 11 },
  { top: "64%", left: "9%", size: 28, delay: 2, dur: 9 },
  { top: "14%", left: "46%", size: 22, delay: 1, dur: 12 },
  { top: "78%", left: "52%", size: 36, delay: 3, dur: 10 },
  { top: "40%", left: "92%", size: 30, delay: 1.5, dur: 13 },
];

/** Soft honeycomb outlines that drift slowly in the background. Decorative only. */
export default function FloatingHexes({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {HEXES.map((h, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-hex-drift absolute text-gold-500/30"
          style={{ top: h.top, left: h.left, width: h.size, height: h.size, animationDelay: `${h.delay}s`, animationDuration: `${h.dur}s` }}
        >
          <path d="M12 1.5l9 5.25v10.5L12 22.5 3 17.25V6.75z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      ))}
    </div>
  );
}
