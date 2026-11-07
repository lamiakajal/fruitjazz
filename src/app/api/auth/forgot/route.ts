import { NextResponse } from "next/server";
import crypto from "crypto";
import { BRAND } from "@/data/brand";
import { connectToDatabase } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import User from "@/models/User";

/** Emails a one-hour reset link. Always answers "ok" so emails cannot be probed. */
export async function POST(req: Request) {
  if (!(await rateLimit(`forgot:${clientIp(req)}`, 5, 60 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);

  if (/^\S+@\S+\.\S+$/.test(email)) {
    try {
      await connectToDatabase();
      // Only accounts created with a password can reset it (Google/GitHub users have none)
      const user = await User.findOne({ email }).select("+password name");
      if (user?.password) {
        const token = crypto.randomBytes(32).toString("hex");
        user.resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");
        user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
        await user.save();

        const link = `${BRAND.siteUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
        await sendPasswordResetEmail(email, user.name, link);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
