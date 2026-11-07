"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-hover cursor-pointer"
    >
      <Printer className="h-4 w-4" /> Print or save as PDF
    </button>
  );
}
