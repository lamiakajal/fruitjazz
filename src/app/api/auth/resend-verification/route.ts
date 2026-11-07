import { NextResponse } from "next/server";
import crypto from "crypto";
import { BRAND } from "@/data/brand";
import { connectToDatabase } from "@/lib/mongodb";
import { sendVerificationEmail } from "@/lib/email";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import User from "@/models/User";

/** Sends a fresh verification link. Always answers "ok" so emails cannot be probed. */
export async function POST(req: Request) {
  if (!(await rateLimit(`resend:${clientIp(req)}`, 5, 60 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);

  if (/^\S+@\S+\.\S+$/.test(email)) {
    try {
      await connectToDatabase();
      const user = await User.findOne({ email }).select("name email emailVerified");
      if (user && user.emailVerified === null) {
        const token = crypto.randomBytes(32).toString("hex");
        user.verifyTokenHash = crypto.createHash("sha256").update(token).digest("hex");
        user.verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        const link = `${BRAND.siteUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
        await sendVerificationEmail(email, user.name, link);
      }
    } catch (error) {
      console.error("Resend verification error:", error);
    }
  }
  return NextResponse.json({ ok: true });
}
