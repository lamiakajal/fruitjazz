import React from "react";
import PolicyShell from "@/components/common/PolicyShell";
import RichText from "@/components/common/RichText";
import { BRAND, whatsappLink } from "@/data/brand";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";
import { interpolate } from "@/lib/rich-text";
import { getSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/format";
import type { PageKey } from "@/lib/settings-types";

/** Values the page text can use as {{placeholders}}; they follow the Settings page. */
export async function pageVariables(): Promise<Record<string, string>> {
  const s = await getSettings();
  return {
    shopName: s.brand.name,
    country: BRAND.country,
    freeThreshold: formatPrice(s.shipping.freeThreshold),
    shippingFee: formatPrice(s.shipping.fee),
    deliveryDays: s.shipping.deliveryDays,
    returnDays: String(s.shipping.returnDays),
    supportEmail: s.contact.supportEmail,
    phone: s.contact.phone,
    whatsappUrl: whatsappLink(undefined, s.contact.whatsapp),
    couriers: s.couriers.map((c) => c.name).join(", ") || "our courier partners",
  };
}

/** A content page whose text the owner can edit in Admin > Content (or the built-in text). */
export default async function ContentPage({ pageKey }: { pageKey: PageKey }) {
  const [settings, vars] = await Promise.all([getSettings(), pageVariables()]);
  const def = PAGE_DEFAULTS[pageKey];
  const body = settings.pages[pageKey]?.trim() || def.body;

  return (
    <PolicyShell title={def.title} intro={interpolate(def.intro, vars)}>
      <RichText source={interpolate(body, vars)} />
    </PolicyShell>
  );
}
