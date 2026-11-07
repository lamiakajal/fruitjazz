// Central brand configuration. Change the shop name, contact details and
// social links here and the whole storefront updates automatically.

export const BRAND = {
  name: "Mewazar",
  tagline: "Honey, nuts & dry fruits",
  slogan: "Golden harvest from the northern mountains",
  country: "Pakistan",
  currency: "Rs.",
  // TODO: replace the placeholder contact details before going live.
  whatsappNumber: "923000000000",
  phoneDisplay: "+92 300 0000000",
  supportEmail: "support@mewazar.pk",
  salesEmail: "sales@mewazar.pk",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mewazar.pk",
  freeShippingThreshold: 2999,
  flatShippingFee: 200,
} as const;

/** Builds a WhatsApp deep link with an optional pre-filled message. */
export function whatsappLink(message?: string, number: string = BRAND.whatsappNumber): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
