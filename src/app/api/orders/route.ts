import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

// GET: Retrieve authenticated user's order history
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in to view orders" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const orders = await Order.find({
      $or: [{ "shippingAddress.email": session.user.email?.toLowerCase() }],
    }).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

// POST: Save new order (Supports both Guest and Authenticated users)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const {
      orderNumber,
      items,
      shippingAddress,
      paymentMethod,
      transactionId,
      subtotal,
      discount,
      deliveryFee,
      totalAmount,
    } = body;

    if (!orderNumber || !items || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const newOrder = await Order.create({
      orderNumber,
      items,
      shippingAddress,
      paymentMethod,
      transactionId: transactionId || "",
      subtotal,
      discount: discount || 0,
      deliveryFee: deliveryFee || 0,
      totalAmount,
      isGuest: !session?.user,
      orderStatus: "placed",
    });

    return NextResponse.json(
      {
        message: "Order placed and saved successfully",
        order: newOrder,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
