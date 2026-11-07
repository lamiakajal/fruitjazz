import React from "react";

/** Golden honey drips hanging from the top edge of the band below. Decorative only. */
export default function HoneyDrip() {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-0 h-8 w-full text-gold-500 sm:h-12"
      aria-hidden="true"
    >
      <path
        d="M0 0h1200v8c-30 0-34 28-48 28s-14-20-34-20-22 40-40 40-18-30-40-30-20 18-38 18-18-36-40-36-26 22-44 22-14-28-36-28-24 34-42 34-18-24-38-24-26 26-44 26-14-30-36-30-22 22-40 22-18-34-40-34-24 28-42 28-16-18-36-18-22 38-40 38-18-28-40-28-24 20-42 20-14-32-36-32-24 26-42 26-18-20-38-20-22 30-40 30-16-26-38-26-24 24-42 24-14-34-36-34-22 18-40 18-20-28-42-28-22 36-40 36-14-24-36-24-24 20-42 20-18-30-40-30-22 26-40 26-14-18-36-18-24 32-42 32-18-26-38-26-22 22-40 22-14-34-36-34-24 28-42 28-16-18-36-18-20 24-40 24-18-30-40-30-22 22-40 22-16-24-36-24-22 36-40 36-14-26-36-26-24 20-42 20-18-28-38-28-20 30-38 30-18-22-40-22-22 26-40 26-14-34-36-34-24 24-42 24-16-20-36-20z"
        fill="currentColor"
      />
      <ellipse cx="300" cy="46" rx="5" ry="8" fill="currentColor" className="animate-drip" />
      <ellipse cx="860" cy="44" rx="4" ry="7" fill="currentColor" className="animate-drip" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}
