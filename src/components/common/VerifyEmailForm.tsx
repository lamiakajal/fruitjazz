"use client";

import React, { useState } from "react";
import Link from "next/link";

/** Button the customer presses to confirm their email (so mail scanners cannot use the link up). */
export default function VerifyEmailForm({ token, email }: { token: string; email: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const confirm = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not confirm your email");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not confirm your email");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-leaf-50 p-5 text-sm font-semibold text-leaf-700">
        Your email is confirmed.{" "}
        <Link href="/login" className="underline">
          Sign in now
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p role="alert" className="text-sm font-semibold text-rose-600">{error}</p>}
      <button type="button" onClick={confirm} disabled={busy || !token} className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60 cursor-pointer">
        {busy ? "Confirming..." : "Confirm my email"}
      </button>
    </div>
  );
}
