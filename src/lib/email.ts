import { BRAND } from "@/data/brand";
import { formatPrice } from "@/lib/format";
import { adminEmails } from "@/lib/admin-emails";
import { getSettings } from "@/lib/settings";

/**
 * Transactional email through the Resend HTTP API (no extra package needed).
 * Set RESEND_API_KEY and EMAIL_FROM in .env.local. Without a key, emails are
 * skipped and logged so local development keeps working.
 */
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[email skipped: RESEND_API_KEY not set] ${subject} -> ${to}`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || `${BRAND.name} <onboarding@resend.dev>`,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Email API error:", res.status, await res.text());
    }
  } catch (error) {
    // An email failure must never break order placement
    console.error("Email send failed:", error);
  }
}

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export interface OrderEmailData {
  orderNumber: string;
  items: { name: string; weight: string; price: number; quantity: number }[];
  shippingAddress: { fullName: string; phone: string; email: string; address: string; city: string };
  paymentMethod: string;
  transactionId?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
}

function layout(title: string, body: string, phone: string = BRAND.phoneDisplay, shop: string = BRAND.name): string {
  const split = Math.ceil(shop.length * 0.55);
  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#f8f7f2;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e3dedc">
    <div style="background:#4a1942;padding:20px 24px;color:#fff;font-size:22px;font-weight:700">${esc(shop.slice(0, split))}<span style="color:#f0b63f">${esc(shop.slice(split))}</span></div>
    <div style="padding:24px;color:#2e2630;font-size:15px;line-height:1.55">
      <h2 style="margin:0 0 12px;color:#4a1942">${esc(title)}</h2>${body}
    </div>
    <div style="padding:16px 24px;background:#f8f6f4;color:#7e7479;font-size:12px">Questions? Reply to this email or message us on WhatsApp ${esc(phone)}.</div>
  </div></div>`;
}

function itemsTable(o: OrderEmailData): string {
  const rows = o.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${esc(i.name)} <span style="color:#7e7479">(${esc(i.weight)}) x ${i.quantity}</span></td><td style="padding:6px 0;text-align:right">${formatPrice(i.price * i.quantity)}</td></tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;border-top:1px solid #e3dedc;border-bottom:1px solid #e3dedc;margin:12px 0">${rows}</table>
  <p style="margin:4px 0;text-align:right">Subtotal: ${formatPrice(o.subtotal)}<br>Discount: -${formatPrice(o.discount)}<br>Delivery: ${o.deliveryFee ? formatPrice(o.deliveryFee) : "Free"}<br><strong style="font-size:17px;color:#4a1942">Total: ${formatPrice(o.totalAmount)}</strong></p>`;
}

/** Order confirmation to the customer plus a new-order alert to the shop owner. */
export async function sendOrderPlacedEmails(o: OrderEmailData): Promise<void> {
  const { contact, brand } = await getSettings();
  const a = o.shippingAddress;
  const isCod = o.paymentMethod === "cod";
  const payNote = isCod
    ? "You will pay in cash when the parcel arrives."
    : `We received your ${esc(o.paymentMethod)} payment reference${o.transactionId ? ` (${esc(o.transactionId)})` : ""}. We will confirm it shortly.`;

  const customerBody = `<p>Hi ${esc(a.fullName)}, thank you for your order. Your order number is <strong>${esc(o.orderNumber)}</strong>.</p>
    ${itemsTable(o)}
    <p><strong>Delivery to:</strong><br>${esc(a.address)}, ${esc(a.city)}<br>${esc(a.phone)}</p>
    <p>${payNote}</p>`;

  const owner = process.env.ADMIN_NOTIFY_EMAIL || adminEmails()[0];
  const jobs: Promise<void>[] = [];

  // Guest checkout falls back to a placeholder address, which we must not email
  if (a.email && !a.email.endsWith("@mewazar.pk")) {
    jobs.push(sendEmail(a.email, `Order ${o.orderNumber} confirmed`, layout("Thank you for your order", customerBody, contact.phone, brand.name)));
  }
  if (owner) {
    const adminBody = `<p>New order <strong>${esc(o.orderNumber)}</strong> from ${esc(a.fullName)} (${esc(a.phone)}), ${esc(a.city)}.</p>
      ${itemsTable(o)}<p>Payment: <strong>${esc(o.paymentMethod)}</strong>${o.transactionId ? ` (ref ${esc(o.transactionId)})` : ""}</p>`;
    jobs.push(sendEmail(owner, `New order ${o.orderNumber} - ${formatPrice(o.totalAmount)}`, layout("New order received", adminBody, contact.phone, brand.name)));
  }
  await Promise.all(jobs);
}

const STATUS_COPY: Record<string, { subject: string; text: string }> = {
  processing: { subject: "is being prepared", text: "We are packing your order now." },
  dispatched: { subject: "is on its way", text: "Your parcel has been handed to the courier." },
  delivered: { subject: "was delivered", text: "Your order has been delivered. We hope you enjoy it." },
  cancelled: { subject: "was cancelled", text: "Your order has been cancelled. Contact us if this is a surprise." },
};

/** Tells the customer when the admin moves the order to a new stage. */
export async function sendStatusEmail(opts: {
  to: string;
  customerName: string;
  orderNumber: string;
  status: string;
  courier?: string;
  trackingId?: string;
  trackingUrl?: string;
}): Promise<void> {
  const { contact, brand } = await getSettings();
  const copy = STATUS_COPY[opts.status];
  if (!copy || !opts.to || opts.to.endsWith("@mewazar.pk")) return;

  const tracking =
    opts.status === "dispatched" && opts.trackingId
      ? `<p><strong>Courier:</strong> ${esc(opts.courier || "-")}<br><strong>Tracking ID:</strong> ${esc(opts.trackingId)}</p>${opts.trackingUrl ? `<p><a href="${esc(opts.trackingUrl)}" style="display:inline-block;background:#4a1942;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-weight:700">Track your parcel</a></p>` : ""}`
      : "";

  await sendEmail(
    opts.to,
    `Order ${opts.orderNumber} ${copy.subject}`,
    layout(`Order ${opts.orderNumber} ${copy.subject}`, `<p>Hi ${esc(opts.customerName)},</p><p>${copy.text}</p>${tracking}`, contact.phone, brand.name),
  );
}

/** Generic alert to the shop owner (contact messages, etc.). */
export async function sendOwnerAlert(subject: string, title: string, bodyHtml: string): Promise<void> {
  const owner = process.env.ADMIN_NOTIFY_EMAIL || adminEmails()[0];
  if (!owner) return;
  await sendEmail(owner, subject, layout(title, bodyHtml));
}

/** True when emails can really be sent (a Resend key is configured). */
export const emailsEnabled = () => !!process.env.RESEND_API_KEY;

/** Asks a new customer to confirm their email address. */
export async function sendVerificationEmail(to: string, name: string, link: string): Promise<void> {
  await sendEmail(
    to,
    "Confirm your email",
    layout(
      "Confirm your email",
      `<p>Hi ${esc(name)}, welcome! Please confirm your email address to finish creating your account. The link works for 24 hours.</p>
       <p><a href="${esc(link)}" style="display:inline-block;background:#4a1942;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700">Confirm my email</a></p>`,
    ),
  );
}

/** Password reset link for customers who signed up with email and password. */
export async function sendPasswordResetEmail(to: string, name: string, link: string): Promise<void> {
  await sendEmail(
    to,
    "Reset your password",
    layout(
      "Reset your password",
      `<p>Hi ${esc(name)},</p><p>We received a request to reset your password. This link works for 1 hour:</p>
       <p><a href="${esc(link)}" style="display:inline-block;background:#4a1942;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700">Choose a new password</a></p>
       <p style="color:#7e7479;font-size:13px">If you did not ask for this, you can ignore this email. Your password stays the same.</p>`,
    ),
  );
}
