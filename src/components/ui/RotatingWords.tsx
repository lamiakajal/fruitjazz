"use client";

import React, { useEffect, useState } from "react";

/** Cycles through short phrases with a soft slide-fade (used in the hero badge). */
export default function RotatingWords({ words, intervalMs = 2600 }: { words: string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom" aria-live="off">
      <span key={index} className="animate-word-in block whitespace-nowrap">
        {words[index]}
      </span>
    </span>
  );
}
