import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";
import { findValidVoucher } from "@/lib/pricing";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

/** Checks a coupon code. Only the matching coupon is returned, never the full list. */
export async function POST(req: Request) {
  if (!(await rateLimit(`voucher:${clientIp(req)}`, 20, 10 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code : "";
  const subtotal = Number(body.subtotal) || 0;

  const settings = await getSettings();
  const voucher = findValidVoucher(settings.vouchers, code, subtotal);

  if (!voucher) {
    const exists = settings.vouchers.find(
      (v) => v.isActive && v.code.toUpperCase() === code.trim().toUpperCase(),
    );
    const error = exists
      ? exists.minSpend > subtotal
        ? `Minimum order amount of Rs. ${exists.minSpend.toLocaleString()} required.`
        : "This coupon has expired."
      : "Invalid or expired coupon code.";
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({
    voucher: {
      code: voucher.code,
      type: voucher.type,
      discount: voucher.discount,
      minSpend: voucher.minSpend,
      isActive: true,
    },
  });
}
