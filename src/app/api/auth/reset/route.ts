import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import User from "@/models/User";

export async function POST(req: Request) {
  if (!(await rateLimit(`reset:${clientIp(req)}`, 10, 60 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const token = String(body.token ?? "");
  const password = String(body.password ?? "");
  const invalid = () =>
    NextResponse.json({ error: "This reset link is invalid or has expired. Please request a new one." }, { status: 400 });

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }
  if (!email || token.length !== 64) return invalid();

  await connectToDatabase();
  const user = await User.findOne({ email }).select("+resetTokenHash +resetTokenExpires");
  if (!user?.resetTokenHash || !user.resetTokenExpires || user.resetTokenExpires < new Date()) return invalid();

  const given = crypto.createHash("sha256").update(token).digest();
  const stored = Buffer.from(user.resetTokenHash, "hex");
  if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) return invalid();

  user.password = await bcrypt.hash(password, 12);
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  return NextResponse.json({ ok: true });
}
