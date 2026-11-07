import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import User from "@/models/User";

/** Confirms an email address using the link from the verification email. */
export async function POST(req: Request) {
  if (!(await rateLimit(`verify:${clientIp(req)}`, 15, 60 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const token = String(body.token ?? "");
  const invalid = () =>
    NextResponse.json({ error: "This link is invalid or has expired. Request a new one from the sign-in page." }, { status: 400 });

  if (!email || token.length !== 64) return invalid();

  await connectToDatabase();
  const user = await User.findOne({ email }).select("+verifyTokenHash +verifyTokenExpires");
  if (!user) return invalid();

  // Already confirmed (or an older account): nothing to do
  if (user.emailVerified !== null) return NextResponse.json({ ok: true });

  if (!user.verifyTokenHash || !user.verifyTokenExpires || user.verifyTokenExpires < new Date()) return invalid();

  const given = crypto.createHash("sha256").update(token).digest();
  const stored = Buffer.from(user.verifyTokenHash, "hex");
  if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) return invalid();

  user.emailVerified = new Date();
  user.verifyTokenHash = undefined;
  user.verifyTokenExpires = undefined;
  await user.save();

  return NextResponse.json({ ok: true });
}
