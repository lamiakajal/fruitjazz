import React from "react";
import Link from "next/link";
import { parseRichText, type Inline } from "@/lib/rich-text";

function renderInline(parts: Inline[]): React.ReactNode[] {
  return parts.map((p, i) => {
    if (p.type === "bold") return <strong key={i}>{p.value}</strong>;
    if (p.type === "link") {
      const external = p.href.startsWith("https://");
      return external ? (
        <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="font-bold text-heading underline underline-offset-2">
          {p.label}
        </a>
      ) : p.href.startsWith("/") ? (
        <Link key={i} href={p.href} className="font-bold text-heading underline underline-offset-2">
          {p.label}
        </Link>
      ) : (
        <a key={i} href={p.href} className="font-bold text-heading underline underline-offset-2">
          {p.label}
        </a>
      );
    }
    return <React.Fragment key={i}>{p.value}</React.Fragment>;
  });
}

/** Renders the owner-written page text. Nothing is injected as HTML, so it is always safe. */
export default function RichText({ source }: { source: string }) {
  const blocks = parseRichText(source);

  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{renderInline(b.inline)}</h2>;
        if (b.type === "h3") return <h3 key={i} className="mb-2 font-display text-lg font-bold text-stone-900">{renderInline(b.inline)}</h3>;
        if (b.type === "ul") {
          return (
            <ul key={i}>
              {b.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{renderInline(b.inline)}</p>;
      })}
    </>
  );
}
