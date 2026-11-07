"use client";

import React from "react";
import { whatsappLink } from "@/data/brand";
import { useSettings } from "@/context/SettingsContext";

/** Floating WhatsApp shortcut. The label expands on hover or focus. */
export default function WhatsAppButton() {
  const { contact } = useSettings();
  return (
    <a
      href={whatsappLink("Hello Mewazar, I would like to place an order.", contact.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="site-chrome group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-transform duration-300 hover:scale-105 animate-pulse-ring"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-sm font-bold transition-all duration-300 group-hover:max-w-40 group-hover:pl-1 group-focus-visible:max-w-40 group-focus-visible:pl-1">
        Order on WhatsApp
      </span>
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
      </svg>
    </a>
  );
}
