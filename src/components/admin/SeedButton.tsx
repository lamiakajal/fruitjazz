"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

/** Imports the starter catalog (data/products.ts) into MongoDB once. */
export default function SeedButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const run = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setMessage(`Imported ${data.imported} products.`);
      router.refresh();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Import failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-gold-ink transition hover:bg-gold-400 disabled:opacity-60 cursor-pointer"
      >
        <Download className="h-4 w-4" />
        {busy ? "Importing..." : "Import starter catalog"}
      </button>
      {message && <span className="text-sm font-semibold text-stone-600">{message}</span>}
    </div>
  );
}
