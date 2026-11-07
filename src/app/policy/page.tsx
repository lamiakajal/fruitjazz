import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import PolicyShell from "@/components/common/PolicyShell";
import { whatsappLink } from "@/data/brand";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "FAQ and policies",
  description: "Answers to common questions about honey, storage, payment, delivery and returns.",
};

export default async function PolicyPage() {
  const { contact, faq: FAQ } = await getSettings();

  return (
    <PolicyShell title="FAQ and policies" intro="Quick answers, and links to the full policies.">
      <section>
        <h2>Policies</h2>
        <ul>
          <li><Link href="/delivery-policy" className="font-bold text-heading underline">Delivery policy</Link></li>
          <li><Link href="/return-policy" className="font-bold text-heading underline">Return and refund policy</Link></li>
          <li><Link href="/privacy-policy" className="font-bold text-heading underline">Privacy policy</Link></li>
          <li><Link href="/terms" className="font-bold text-heading underline">Terms and conditions</Link></li>
        </ul>
      </section>
      <section>
        <h2>Frequently asked questions</h2>
        <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-surface">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-stone-900">
                {item.q}
                <span className="text-gold-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-stone-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <p>
        Still need help?{" "}
        <a href={whatsappLink(undefined, contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="font-bold text-heading underline underline-offset-2">
          Message us on WhatsApp
        </a>
        .
      </p>
    </PolicyShell>
  );
}
