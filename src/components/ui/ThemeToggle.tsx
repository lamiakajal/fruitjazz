"use client";

import React, { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "mewazar-theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

/** Light / dark switch. The initial theme is applied by an inline script in layout.tsx. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the theme still switches.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-gold-700 cursor-pointer ${className}`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
    </button>
  );
}
