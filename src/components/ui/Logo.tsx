import React from "react";
import { BRAND } from "@/data/brand";

interface LogoMarkProps {
  className?: string;
  title?: string;
  /** Uploaded logo image. When set it replaces the built-in honeycomb mark. */
  logoUrl?: string;
}

/**
 * Mewazar logo mark: a honeycomb cell holding a golden honey drop,
 * with a leaf vein that also reads as an almond.
 */
export function LogoMark({ className = "w-10 h-10", title, logoUrl }: LogoMarkProps) {
  if (logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoUrl} alt={title ?? ""} className={`${className} object-contain`} />;
  }

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M24 1.5 43.5 12.75v22.5L24 46.5 4.5 35.25v-22.5z"
        fill="#4a1942"
      />
      <path
        d="M24 10.5c5.6 7.4 9.5 12.6 9.5 18a9.5 9.5 0 0 1-19 0c0-5.4 3.9-10.6 9.5-18z"
        fill="#f0b63f"
      />
      <path
        d="M24 21.5c-3 3.4-3.6 7.2-1.8 11.5"
        fill="none"
        stroke="#4a1942"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 1.5 43.5 12.75v22.5L24 46.5 4.5 35.25v-22.5z"
        fill="none"
        stroke="#e9a31a"
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />
      <circle cx="28.4" cy="26.2" r="1.5" fill="#fff" fillOpacity="0.8" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  name?: string;
  tagline?: string;
  logoUrl?: string;
  /** Light text for dark backgrounds (footer, loader). */
  inverted?: boolean;
  showTagline?: boolean;
}

/** Full logo lock-up: mark + wordmark + optional tagline. */
export default function Logo({
  className = "",
  name = BRAND.name,
  tagline = BRAND.tagline,
  logoUrl,
  inverted = false,
  showTagline = true,
}: LogoProps) {
  // The last part of the name gets the gold colour
  const split = Math.ceil(name.length * 0.55);

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-10 h-10 shrink-0 drop-shadow-sm" logoUrl={logoUrl} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.6rem] font-extrabold tracking-tight ${
            inverted ? "text-white" : "text-heading"
          }`}
        >
          {name.slice(0, split)}
          <span className="text-gold-500">{name.slice(split)}</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[10px] font-semibold tracking-wide ${
              inverted ? "text-white/60" : "text-stone-500"
            }`}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
