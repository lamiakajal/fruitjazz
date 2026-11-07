import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/catalog";

/** Lightweight product search used by the navbar suggestions. */
export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 60);
  if (q.length < 2) return NextResponse.json({ results: [] });

  const products = await getAllProducts();
  const results = products
    .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: Math.min(...p.variants.map((v) => v.price)),
    }));

  return NextResponse.json({ results });
}
