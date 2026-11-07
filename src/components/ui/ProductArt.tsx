import React from "react";
import { CATEGORIES, categoryBySlug } from "@/data/categories";
import type { ArtKind, CategoryMeta } from "@/data/categories";

interface ProductArtProps {
  /** Category slug, e.g. "spices". Falls back to honey. */
  slug?: string;
  /** What is drawn on the pack label, e.g. "almond", "fig", "saffron". */
  motif?: string;
  /** Owner-managed category list (colours and pack shape). Defaults to the starter list. */
  categories?: CategoryMeta[];
  className?: string;
}

const hexPath = (r: number) => {
  const w = r * 0.866;
  return `M0 ${-r}L${w} ${-r / 2}L${w} ${r / 2}L0 ${r}L${-w} ${r / 2}L${-w} ${-r / 2}Z`;
};

/** Small illustrations drawn inside the label badge, centred on (0,0). */
function Motif({ name }: { name: string }) {
  switch (name) {
    case "honey":
      return (
        <g>
          <path d="M0-16c8 10 12 15 12 21a12 12 0 0 1-24 0c0-6 4-11 12-21z" fill="#e9a31a" />
          <path d="M-5 0c-2.5 4-2.5 8 0 11" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
    case "comb":
      return (
        <g fill="#f0b63f" stroke="#b97a08" strokeWidth="1.2" strokeLinejoin="round">
          <path d={hexPath(9)} transform="translate(-9 -5)" />
          <path d={hexPath(9)} transform="translate(9 -5)" />
          <path d={hexPath(9)} transform="translate(0 9)" />
        </g>
      );
    case "almond":
      return (
        <g fill="#b7814f" stroke="#7a5230" strokeWidth="1">
          <path d="M0-14c8 6 10 16 0 28-10-12-8-22 0-28z" transform="translate(-9 0) rotate(-22)" />
          <path d="M0-14c8 6 10 16 0 28-10-12-8-22 0-28z" transform="translate(9 0) rotate(22)" />
          <path d="M-1-7c2 4 2 9 0 13" fill="none" stroke="#e3b98a" strokeWidth="1.6" strokeLinecap="round" transform="translate(-9 0) rotate(-22)" />
          <path d="M-1-7c2 4 2 9 0 13" fill="none" stroke="#e3b98a" strokeWidth="1.6" strokeLinecap="round" transform="translate(9 0) rotate(22)" />
        </g>
      );
    case "pistachio":
      return (
        <g>
          <g transform="translate(-9 0) rotate(-15)">
            <ellipse rx="8" ry="12.5" fill="#e6d3a8" stroke="#b9a36f" strokeWidth="1" />
            <ellipse rx="5" ry="9" fill="#9bbf4f" />
            <path d="M0-12.5V-3" stroke="#e6d3a8" strokeWidth="2" />
          </g>
          <g transform="translate(9 1) rotate(18)">
            <ellipse rx="8" ry="12.5" fill="#e6d3a8" stroke="#b9a36f" strokeWidth="1" />
            <ellipse rx="5" ry="9" fill="#9bbf4f" />
            <path d="M0-12.5V-3" stroke="#e6d3a8" strokeWidth="2" />
          </g>
        </g>
      );
    case "cashew":
      return (
        <path
          d="M-14-6c9-9 24-4 25 8 .5 7-5 11-9 8 3-3 2-8-3-9-6-1-9 4-9 9-4 1-8-3-4-16z"
          fill="#e8c68a"
          stroke="#c79a52"
          strokeWidth="1.2"
          strokeLinejoin="round"
          transform="translate(-1 1)"
        />
      );
    case "walnut":
      return (
        <g>
          <circle r="13" fill="#b98a5b" stroke="#7a5532" strokeWidth="1.2" />
          <path d="M0-13v26" stroke="#7a5532" strokeWidth="1.6" />
          <path d="M-7-7c3 3 3 11 0 14M7-7c-3 3-3 11 0 14" fill="none" stroke="#8e6440" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      );
    case "hazelnut":
      return (
        <g>
          <circle r="11" cy="2" fill="#a8703a" />
          <path d="M-12-1a12 9 0 0 1 24 0z" fill="#7a4a22" />
          <path d="M0-10v-5" stroke="#5a3418" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "raisin":
    case "graisin": {
      const c = name === "raisin" ? "#5b2a4b" : "#9bbf4f";
      return (
        <g fill={c} stroke="#00000030" strokeWidth="1">
          {[[-10, 4], [0, 6], [10, 4], [-5, -6], [5, -6], [0, -13]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="6" ry="4.6" transform={`rotate(${i * 25} ${x} ${y})`} />
          ))}
        </g>
      );
    }
    case "fig":
      return (
        <g>
          <path d="M0-14c5 0 12 8 12 16a12 12 0 0 1-24 0c0-8 7-16 12-16z" fill="#7b3a6b" />
          <path d="M0-14v-3" stroke="#5a8a3a" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cy="9" rx="4" ry="2.4" fill="#e87a8a" />
        </g>
      );
    case "apricot":
      return (
        <g>
          <circle r="13" fill="#f29a3a" />
          <path d="M0-12c-4 8-4 16 0 24" fill="none" stroke="#c9701a" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M0-13c2-4 7-5 10-3-2 4-6 5-10 3z" fill="#6aa04a" />
        </g>
      );
    case "date":
      return (
        <g fill="#6b3a22" stroke="#43230f" strokeWidth="1">
          <ellipse rx="7.5" ry="13" transform="translate(-9 0) rotate(-18)" />
          <ellipse rx="7.5" ry="13" transform="translate(9 0) rotate(18)" />
          <path d="M-12-6c-1 4-1 8 0 11M6-6c1 4 1 8 0 11" fill="none" stroke="#a8693f" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    case "seed":
      return (
        <g fill="#d9b86c" stroke="#a8863d" strokeWidth="1">
          {[[-13, 4, -30], [-4, -3, 10], [6, 5, -15], [13, -4, 35], [0, 10, 70], [-8, -11, -50]].map(([x, y, r], i) => (
            <path key={i} d="M0-6c4 2 5 8 0 12-5-4-4-10 0-12z" transform={`translate(${x} ${y}) rotate(${r})`} />
          ))}
        </g>
      );
    case "saffron":
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M-12 12c2-14 6-22 10-26" stroke="#d2332b" strokeWidth="3" />
          <path d="M-2 14c1-14 3-24 5-30" stroke="#d2332b" strokeWidth="3" />
          <path d="M8 12c-1-12-1-20-4-26" stroke="#d2332b" strokeWidth="3" transform="translate(5 0)" />
          <path d="M-12 12c-1-1 0-1 0 0M-2 14c0-1 0-1 0 0" stroke="#f0b63f" strokeWidth="4" />
        </g>
      );
    case "cumin":
      return (
        <g fill="none" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round">
          {[[-10, 2, -30], [0, -6, 20], [10, 3, -10], [-2, 8, 60], [-12, -8, 40]].map(([x, y, r], i) => (
            <path key={i} d="M-5 0q5-6 10 0" transform={`translate(${x} ${y}) rotate(${r})`} />
          ))}
        </g>
      );
    case "salt":
      return (
        <g fill="#f0a6a6" stroke="#d97c7c" strokeWidth="1.2" strokeLinejoin="round">
          <rect x="-14" y="-4" width="13" height="13" transform="rotate(-14 -8 2)" />
          <rect x="1" y="-10" width="12" height="12" transform="rotate(18 7 -4)" />
          <rect x="0" y="2" width="10" height="10" fill="#f7c4c4" transform="rotate(-8 5 7)" />
        </g>
      );
    case "cardamom":
      return (
        <g fill="#8fb35a" stroke="#5f7f33" strokeWidth="1">
          <path d="M0-13c7 5 8 18 0 26-8-8-7-21 0-26z" transform="translate(-10 0) rotate(-20)" />
          <path d="M0-13c7 5 8 18 0 26-8-8-7-21 0-26z" transform="translate(10 0) rotate(20)" />
          <path d="M0-9v16" stroke="#5f7f33" strokeWidth="1.2" transform="translate(-10 0) rotate(-20)" />
          <path d="M0-9v16" stroke="#5f7f33" strokeWidth="1.2" transform="translate(10 0) rotate(20)" />
        </g>
      );
    case "leaf":
      return (
        <g>
          <path d="M-13 12c0-15 10-25 26-25 0 15-10 25-26 25z" fill="#5e9a63" />
          <path d="M-10 10C-4 2 3-4 9-9" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    case "ghee":
      return (
        <g>
          <ellipse cy="8" rx="14" ry="6" fill="#d9a21a" />
          <path d="M0-15c7 9 11 14 11 19a11 11 0 0 1-22 0c0-5 4-10 11-19z" fill="#f3c740" />
          <path d="M-4 0c-2 3-2 6 0 8" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "oil":
      return (
        <g>
          <path d="M0-15c7 9 11 14 11 19a11 11 0 0 1-22 0c0-5 4-10 11-19z" fill="#b3a02c" />
          <path d="M-4 0c-2 3-2 6 0 8" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12c4-1 9-5 10-10-5 0-9 4-10 10z" fill="#5e9a63" />
        </g>
      );
    case "butter":
      return (
        <g>
          <ellipse cy="4" rx="15" ry="10" fill="#c98f52" />
          <path d="M-9 4c4-6 14-6 17 0M-5 8c3-3 8-3 10 0" fill="none" stroke="#8a5a2a" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cy="-4" rx="12" ry="4" fill="#dca66a" />
        </g>
      );
    case "gift":
      return (
        <g>
          <path d="M0 2C-8-10-20-8-16-1c3 5 12 3 16 3zM0 2C8-10 20-8 16-1c-3 5-12 3-16 3z" fill="none" stroke="#e9a31a" strokeWidth="4" strokeLinejoin="round" />
          <circle cy="2" r="4" fill="#e9a31a" />
          <path d="M-3 6l-6 9M3 6l6 9" stroke="#e9a31a" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    case "combo":
      return (
        <g>
          <g transform="translate(-10 2) scale(0.7)">
            <path d="M0-16c8 10 12 15 12 21a12 12 0 0 1-24 0c0-6 4-11 12-21z" fill="#e9a31a" />
          </g>
          <g transform="translate(11 3) scale(0.85)">
            <circle r="13" fill="#b98a5b" stroke="#7a5532" strokeWidth="1.2" />
            <path d="M0-13v26" stroke="#7a5532" strokeWidth="1.6" />
          </g>
        </g>
      );
    default:
      return (
        <g>
          <path d="M0-14l11 6.5v13L0 12l-11-6.5v-13z" fill="#4a1942" />
          <path d="M0-8c4 5 6 7 6 10a6 6 0 0 1-12 0c0-3 2-5 6-10z" fill="#e9a31a" />
        </g>
      );
  }
}

/** White label badge with the product motif, drawn on every pack. */
function Label({ motif }: { motif: string }) {
  return (
    <g>
      <rect x="66" y="98" width="68" height="46" rx="10" fill="#fff" fillOpacity="0.95" />
      <g transform="translate(100 121) scale(1.3)">
        <Motif name={motif} />
      </g>
    </g>
  );
}

function Shape({ kind, from, to, motif }: { kind: ArtKind; from: string; to: string; motif: string }) {
  switch (kind) {
    case "jar":
      return (
        <g>
          <rect x="62" y="40" width="76" height="22" rx="7" fill="#4a1942" />
          <rect x="56" y="58" width="88" height="108" rx="20" fill={to} />
          <rect x="56" y="58" width="88" height="108" rx="20" fill="#fff" fillOpacity="0.12" />
          <rect x="62" y="66" width="8" height="30" rx="4" fill="#fff" fillOpacity="0.32" />
          <path d="M56 78h88v8c-10 10-14-4-22 4s-12-6-24 4-14-2-24 6-14-8-18 0z" fill={from} fillOpacity="0.85" className="animate-drip" />
          <Label motif={motif} />
        </g>
      );
    case "bottle":
      return (
        <g>
          <rect x="88" y="26" width="24" height="16" rx="4" fill="#4a1942" />
          <path d="M90 42h20v22c0 6 24 12 24 32v58a14 14 0 0 1-14 14H80a14 14 0 0 1-14-14V96c0-20 24-26 24-32z" fill={to} />
          <path d="M90 42h20v22c0 6 24 12 24 32v58a14 14 0 0 1-14 14H80a14 14 0 0 1-14-14V96c0-20 24-26 24-32z" fill="#fff" fillOpacity="0.12" />
          <rect x="72" y="92" width="7" height="60" rx="3.5" fill="#fff" fillOpacity="0.3" />
          <Label motif={motif} />
        </g>
      );
    case "tin":
      return (
        <g>
          <ellipse cx="100" cy="156" rx="52" ry="12" fill="#000" fillOpacity="0.12" />
          <rect x="52" y="64" width="96" height="92" rx="10" fill={to} />
          <rect x="52" y="64" width="96" height="92" rx="10" fill="#fff" fillOpacity="0.1" />
          <rect x="46" y="48" width="108" height="24" rx="9" fill="#4a1942" />
          <rect x="58" y="78" width="7" height="60" rx="3.5" fill="#fff" fillOpacity="0.3" />
          <Label motif={motif} />
        </g>
      );
    case "box":
      return (
        <g>
          <rect x="40" y="76" width="120" height="86" rx="10" fill={to} />
          <rect x="40" y="76" width="120" height="86" rx="10" fill="#fff" fillOpacity="0.1" />
          <rect x="34" y="58" width="132" height="26" rx="9" fill={from} />
          <rect x="92" y="58" width="16" height="104" fill="#e9a31a" />
          <Label motif={motif} />
        </g>
      );
    case "pouch":
    default:
      return (
        <g>
          <path d="M52 44h96l6 118a10 10 0 0 1-10 10H56a10 10 0 0 1-10-10z" fill={to} />
          <path d="M52 44h96l6 118a10 10 0 0 1-10 10H56a10 10 0 0 1-10-10z" fill="#fff" fillOpacity="0.1" />
          <path d="M52 44h96l1.4 14H50.6z" fill="#4a1942" />
          <path d="M56 50h88" stroke="#fff" strokeOpacity="0.35" strokeDasharray="3 4" />
          <rect x="56" y="70" width="7" height="60" rx="3.5" fill="#fff" fillOpacity="0.3" />
          <Label motif={motif} />
        </g>
      );
  }
}

/** Branded product illustration used instead of photos. */
export default function ProductArt({ slug, motif, categories, className = "" }: ProductArtProps) {
  const meta = categoryBySlug(slug, categories) ?? categoryBySlug(slug) ?? CATEGORIES[0];
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(160deg, ${meta.from}33, ${meta.to}55)` }}
      role="img"
      aria-label={`${meta.label} illustration`}
    >
      <div className="hex-pattern absolute inset-0 opacity-80" aria-hidden="true" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full" aria-hidden="true">
        <Shape kind={meta.art} from={meta.from} to={meta.to} motif={motif ?? "default"} />
      </svg>
    </div>
  );
}
