"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.\n\nTip: use "Hidden" in the editor to hide a product without deleting it.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert("Could not delete the product.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      aria-label={`Delete ${name}`}
      className="rounded-lg p-2 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 cursor-pointer"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
