/**
 * Tiny, safe text format the shop owner can write without any coding:
 *   ## Heading        ### Smaller heading
 *   - bullet point
 *   **bold**   [link text](https://example.com)
 * A blank line starts a new paragraph.
 */
export type Inline =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

export type Block =
  | { type: "h2" | "h3"; inline: Inline[] }
  | { type: "p"; inline: Inline[] }
  | { type: "ul"; items: Inline[][] };

const SAFE_LINK = /^(\/|https:\/\/|mailto:|tel:)/;

export function parseInline(source: string): Inline[] {
  const out: Inline[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(source))) {
    if (m.index > last) out.push({ type: "text", value: source.slice(last, m.index) });
    if (m[1] !== undefined) {
      out.push({ type: "bold", value: m[1] });
    } else if (SAFE_LINK.test(m[3])) {
      out.push({ type: "link", label: m[2], href: m[3] });
    } else {
      out.push({ type: "text", value: m[2] }); // unsafe link: show only the text
    }
    last = m.index + m[0].length;
  }
  if (last < source.length) out.push({ type: "text", value: source.slice(last) });
  return out;
}

export function parseRichText(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: Inline[][] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "p", inline: parseInline(paragraph.join(" ")) });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "ul", items: list });
    list = [];
  };

  for (const raw of source.replace(/\r/g, "").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", inline: parseInline(line.slice(4)) });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", inline: parseInline(line.slice(3)) });
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(parseInline(line.slice(2)));
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

/** Replaces {{name}} placeholders with values (unknown placeholders are left empty). */
export function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => vars[key] ?? "");
}
