import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { getSettings } from "@/lib/settings";
import User from "@/models/User";
import CoinTransaction from "@/models/CoinTransaction";

/** The signed-in customer's coin balance and history. */
export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return NextResponse.json({ error: "Please sign in" }, { status: 401 });
  }

  await connectToDatabase();
  const [settings, user, history] = await Promise.all([
    getSettings(),
    User.findById(userId).select("coinBalance").lean<{ coinBalance?: number }>(),
    CoinTransaction.find({ userId }).sort({ createdAt: -1 }).limit(50).lean(),
  ]);

  return NextResponse.json({
    enabled: settings.rewards.enabled,
    balance: user?.coinBalance ?? 0,
    rules: settings.rewards,
    history: JSON.parse(JSON.stringify(history)),
  });
}
