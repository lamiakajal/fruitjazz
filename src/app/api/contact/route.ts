import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendOwnerAlert } from "@/lib/email";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import ContactMessageModel from "@/models/ContactMessage";

/** Contact form: saved in the admin inbox and emailed to the shop owner. */
export async function POST(req: Request) {
  if (!(await rateLimit(`contact:${clientIp(req)}`, 5, 60 * 60 * 1000))) return tooManyRequests();

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot caught a bot

  const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const subject = clean(body.subject, 80) || "Other";
  const message = clean(body.message, 2000);

  if (name.length < 2 || message.length < 5) {
    return NextResponse.json({ error: "Please enter your name and a message" }, { status: 400 });
  }
  if (!phone && !email) {
    return NextResponse.json({ error: "Please add a phone number or an email so we can reply" }, { status: 400 });
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    await ContactMessageModel.create({ name, phone, email, subject, message });
  } catch (error) {
    console.error("Contact save error:", error);
    return NextResponse.json({ error: "We could not send your message. Please try WhatsApp." }, { status: 500 });
  }

  await sendOwnerAlert(
    `New message: ${subject}`,
    "New contact message",
    `<p><strong>${name}</strong><br>${phone || ""} ${email || ""}</p><p>${message.replace(/</g, "&lt;").replace(/\n/g, "<br>")}</p>`,
  );
  return NextResponse.json({ ok: true }, { status: 201 });
}
