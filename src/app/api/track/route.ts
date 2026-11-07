import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getSettings } from "@/lib/settings";
import { trackingLink } from "@/lib/tracking";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import Order from "@/models/Order";

const digits = (v: string) => v.replace(/\D/g, "");

/** Public order lookup. The order number AND the phone used at checkout must match. */
export async function POST(req: Request) {
  if (!(await rateLimit(`track:${clientIp(req)}`, 15, 10 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => ({}));
  const orderNumber = String(body.orderNumber ?? "").trim().toUpperCase().slice(0, 40);
  const phone = digits(String(body.phone ?? ""));
  const notFound = () =>
    NextResponse.json({ error: "We could not find an order with those details." }, { status: 404 });

  if (!orderNumber || phone.length < 7) return notFound();

  await connectToDatabase();
  const order = await Order.findOne({ orderNumber }).lean();
  if (!order || digits(order.shippingAddress.phone).slice(-9) !== phone.slice(-9)) return notFound();

  const settings = await getSettings();
  return NextResponse.json({
    order: {
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      totalAmount: order.totalAmount,
      courier: order.courier,
      trackingId: order.trackingId,
      trackingUrl: trackingLink(settings.couriers, order.courier, order.trackingId),
      itemCount: order.items.reduce((s: number, i: { quantity: number }) => s + i.quantity, 0),
    },
  });
}
