"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating button that appears after scrolling and returns to the top. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`site-chrome fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover cursor-pointer ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
