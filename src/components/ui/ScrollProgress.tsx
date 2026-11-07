"use client";

import React, { useEffect, useRef } from "react";

/** Thin gradient bar at the top of the viewport showing page scroll progress. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-gold-400 via-gold-500 to-brand-600"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
