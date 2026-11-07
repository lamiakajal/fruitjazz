import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import ProductModel from "@/models/Product";
import ReviewModel from "@/models/Review";
import Order from "@/models/Order";

/** Customers submit a review; it appears after the shop owner approves it. */
export async function POST(req: Request) {
  if (!(await rateLimit(`review:${clientIp(req)}`, 5, 60 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  // Hidden "website" field: real people leave it empty, bots fill it
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 60);
  const city = String(body.city ?? "").trim().slice(0, 60);
  const comment = String(body.comment ?? "").trim().slice(0, 1000);
  const rating = Math.round(Number(body.rating));
  const productId = String(body.productId ?? "");

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  if (comment.length < 10) {
    return NextResponse.json({ error: "Please write at least 10 characters" }, { status: 400 });
  }
  if (!(rating >= 1 && rating <= 5)) {
    return NextResponse.json({ error: "Please choose 1 to 5 stars" }, { status: 400 });
  }

  await connectToDatabase();
  const product = await ProductModel.findOne({ id: productId }).lean();
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // "Verified buyer" when the signed-in customer has a non-cancelled order with this product
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  const verifiedBuyer = email
    ? !!(await Order.exists({
        "shippingAddress.email": email,
        "items.productId": productId,
        orderStatus: { $ne: "cancelled" },
      }))
    : false;

  await ReviewModel.create({
    productId,
    productName: product.name,
    productSlug: product.slug,
    name,
    city,
    rating,
    comment,
    verifiedBuyer,
    status: "pending",
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
