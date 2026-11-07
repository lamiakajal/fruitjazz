import type { Voucher } from "@/data/storeConfig";

export interface PricingInput {
  subtotal: number;
  /** A voucher that has already been validated with findValidVoucher. */
  voucher?: Voucher | null;
  paymentDiscountPercent: number;
  shipping: { fee: number; freeThreshold: number };
  /** Reward coins the customer wants to spend (already limited to their balance). */
  coins?: { requested: number; value: number; maxPercent: number };
}

export interface PricingResult {
  subtotal: number;
  voucherDiscount: number;
  paymentDiscount: number;
  totalDiscount: number;
  shippingFee: number;
  total: number;
  appliedVoucherCode: string | null;
  coinsUsed: number;
  coinDiscount: number;
}

/** Returns the coupon only if it exists, is active, not expired and the cart is big enough. */
export function findValidVoucher(
  vouchers: Voucher[],
  code: string | null | undefined,
  subtotal: number,
  now: Date = new Date(),
): Voucher | null {
  if (!code) return null;
  const clean = code.trim().toUpperCase();
  const voucher = vouchers.find((v) => v.isActive && v.code.toUpperCase() === clean);
  if (!voucher || subtotal < voucher.minSpend) return null;

  if (voucher.expiresAt) {
    const lastDay = new Date(`${voucher.expiresAt}T23:59:59`);
    if (!Number.isNaN(lastDay.getTime()) && now > lastDay) return null;
  }
  return voucher;
}

/**
 * Single pricing routine shared by the checkout screen and the order API,
 * so the amount shown to the customer is the amount the server charges.
 */
export function calculatePricing({
  subtotal,
  voucher,
  paymentDiscountPercent,
  shipping,
  coins,
}: PricingInput): PricingResult {
  const valid = voucher && subtotal >= voucher.minSpend ? voucher : null;

  let voucherDiscount = 0;
  if (valid) {
    voucherDiscount =
      valid.type === "percent"
        ? Math.round((subtotal * valid.discount) / 100)
        : valid.discount;
  }

  const paymentDiscount = paymentDiscountPercent
    ? Math.round((subtotal * paymentDiscountPercent) / 100)
    : 0;

  // Coins can pay for at most maxPercent of what is left after the other discounts
  let coinsUsed = 0;
  let coinDiscount = 0;
  if (coins && coins.requested > 0 && coins.value > 0) {
    const room = Math.max(0, subtotal - voucherDiscount - paymentDiscount);
    const maxCoins = Math.floor((room * (coins.maxPercent / 100)) / coins.value);
    coinsUsed = Math.max(0, Math.min(Math.floor(coins.requested), maxCoins));
    coinDiscount = coinsUsed * coins.value;
  }

  const totalDiscount = Math.min(subtotal, voucherDiscount + paymentDiscount + coinDiscount);
  const shippingFee =
    subtotal === 0 || subtotal >= shipping.freeThreshold ? 0 : shipping.fee;

  return {
    subtotal,
    voucherDiscount,
    paymentDiscount,
    totalDiscount,
    shippingFee,
    total: Math.max(0, subtotal - totalDiscount + shippingFee),
    appliedVoucherCode: valid ? valid.code : null,
    coinsUsed,
    coinDiscount,
  };
}
