import React from "react";
import { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

// SEO Metadata for Contact Page
export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Get in touch with Mewazar customer service for inquiries about raw Sidr honey, mountain dry fruits, bulk corporate gift boxes, and fast nationwide COD delivery.",
};

export default function ContactPage() {
  return <ContactView />;
}
