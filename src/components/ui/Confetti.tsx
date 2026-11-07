import React from "react";

const COLORS = ["#f0b63f", "#4a1942", "#559a33", "#e9a31a", "#a44892", "#f5cb57"];

/** One-time celebration burst (pure CSS) shown on the order confirmed screen. */
export default function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i % 7) * 0.12,
    duration: 2.2 + (i % 5) * 0.35,
    color: COLORS[i % COLORS.length],
    size: 6 + (i % 4) * 2,
    rotate: (i * 53) % 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute -top-4 block rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
