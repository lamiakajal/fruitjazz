import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { BRAND } from "@/data/brand";
import { emailsEnabled, sendVerificationEmail } from "@/lib/email";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { isAdminEmail } from "@/lib/admin-emails";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export async function POST(req: Request) {
  if (!(await rateLimit(`register:${clientIp(req)}`, 5, 60 * 60 * 1000))) return tooManyRequests();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
    }

    // Admin emails must sign in with Google or GitHub (verified email), so
    // nobody can claim an admin address by registering with a password.
    if (isAdminEmail(email)) {
      return NextResponse.json(
        { error: "This email must sign in with Google or GitHub" },
        { status: 403 },
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // When emails are configured the address must be confirmed before the first sign-in
    const needsVerification = emailsEnabled();
    const token = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      name: String(name).trim().slice(0, 100),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      provider: "credentials",
      role: "customer",
      ...(needsVerification
        ? {
            emailVerified: null,
            verifyTokenHash: crypto.createHash("sha256").update(token).digest("hex"),
            verifyTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          }
        : {}),
    });

    if (needsVerification) {
      const link = `${BRAND.siteUrl}/verify-email?token=${token}&email=${encodeURIComponent(newUser.email)}`;
      await sendVerificationEmail(newUser.email, newUser.name, link);
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        requiresVerification: needsVerification,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
