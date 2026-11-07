import { BRAND } from "@/data/brand";

/** Formats a number as a store price, e.g. "Rs. 1,250". */
export function formatPrice(value: number): string {
  return `${BRAND.currency} ${Math.round(value).toLocaleString("en-PK")}`;
}

/** Returns the cheapest variant price of a product. */
export function lowestPrice(variants: { price: number }[]): number {
  return variants.length ? Math.min(...variants.map((v) => v.price)) : 0;
}
