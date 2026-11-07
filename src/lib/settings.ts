import { connectToDatabase } from "@/lib/mongodb";
import SettingsModel from "@/models/Settings";
import { defaultSettings } from "@/lib/settings-defaults";
import type { PublicSettings, StoreSettings } from "@/lib/settings-types";
import type { PaymentOption } from "@/data/storeConfig";

/** QR code image for a wallet/bank account (generated, so it always matches the saved number). */
function qrFor(method: PaymentOption): string | undefined {
  const data = method.accountDetails.raastId || method.accountDetails.iban || method.accountDetails.accountNumber;
  if (method.id === "cod" || !data || data === "N/A") return undefined;
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(data)}`;
}

/** Combines saved settings with the defaults so a missing field never breaks the store. */
export function mergeSettings(stored: Partial<StoreSettings> | undefined): StoreSettings {
  const d = defaultSettings();
  const s = stored ?? {};

  // Keep every default payment method, but let the saved version override its fields
  const payments = d.payments.map((def) => {
    const saved = s.payments?.find((p) => p.id === def.id);
    return saved
      ? { ...def, ...saved, accountDetails: { ...def.accountDetails, ...saved.accountDetails } }
      : def;
  });

  return {
    contact: { ...d.contact, ...s.contact },
    shipping: { ...d.shipping, ...s.shipping },
    announcement: { ...d.announcement, ...s.announcement },
    sale: { ...d.sale, ...s.sale },
    payments: payments.map((p) => ({ ...p, qrCodeUrl: qrFor(p) })),
    vouchers: Array.isArray(s.vouchers) ? s.vouchers : d.vouchers,
    couriers: Array.isArray(s.couriers) ? s.couriers : d.couriers,
    rewards: { ...d.rewards, ...s.rewards },
    orders: { ...d.orders, ...s.orders },
    inventory: { ...d.inventory, ...s.inventory },
    social: { ...d.social, ...s.social },
    categories: Array.isArray(s.categories) && s.categories.length ? s.categories : d.categories,
    brand: { ...d.brand, ...s.brand },
    home: { ...d.home, ...s.home },
    faq: Array.isArray(s.faq) ? s.faq : d.faq,
    pages: { ...d.pages, ...s.pages },
  };
}

/** Loads the store settings (defaults when the database is not configured). */
export async function getSettings(): Promise<StoreSettings> {
  if (!process.env.MONGODB_URI) return mergeSettings(undefined);
  try {
    await connectToDatabase();
    const doc = await SettingsModel.findOne({ key: "main" }).lean<{ data: Partial<StoreSettings> }>();
    return mergeSettings(doc?.data);
  } catch (error) {
    console.error("Settings fallback (database unavailable):", error);
    return mergeSettings(undefined);
  }
}

export function toPublicSettings(settings: StoreSettings, saleCount: number): PublicSettings {
  return {
    contact: settings.contact,
    shipping: settings.shipping,
    announcement: settings.announcement,
    rewards: settings.rewards,
    orders: settings.orders,
    inventory: settings.inventory,
    social: settings.social,
    categories: settings.categories,
    brand: settings.brand,
    saleCount,
  };
}
