import React from "react";
import Link from "next/link";

const LINKS = [
  { href: "/delivery-policy", label: "Delivery" },
  { href: "/return-policy", label: "Returns" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/policy", label: "FAQ" },
];

/** Shared layout for the policy pages: title, quick links and readable body text. */
export default function PolicyShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <nav aria-label="Policies" className="mb-8 flex flex-wrap gap-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-stone-200 bg-surface px-4 py-1.5 text-xs font-bold text-stone-700 transition hover:border-gold-500 hover:text-heading"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">{title}</h1>
      {intro && <p className="mt-3 text-stone-600">{intro}</p>}
      <div className="mt-10 space-y-10 text-stone-700 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
