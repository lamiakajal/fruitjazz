"use client";

import React, { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40";

/** Forgot-password and reset-password forms (one component, two modes). */
export default function AuthMessageForm({
  mode,
  token = "",
  email = "",
}: {
  mode: "forgot" | "reset";
  token?: string;
  email?: string;
}) {
  const [emailInput, setEmailInput] = useState(email);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(mode === "forgot" ? "/api/auth/forgot" : "/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "forgot" ? { email: emailInput } : { email: emailInput, token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-leaf-50 p-5 text-sm font-semibold text-leaf-700">
        {mode === "forgot" ? (
          "If an account with a password exists for that email, we have sent a reset link. Check your inbox and spam folder."
        ) : (
          <>
            Your password has been changed.{" "}
            <Link href="/login" className="underline">
              Sign in now
            </Link>
            .
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {(mode === "forgot" || !email) && (
        <input type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={inputClass} placeholder="Your email" autoComplete="email" />
      )}
      {mode === "reset" && (
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="New password (at least 6 characters)" autoComplete="new-password" />
      )}
      {error && <p role="alert" className="text-sm font-semibold text-rose-600">{error}</p>}
      <button type="submit" disabled={busy} className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60 cursor-pointer">
        {busy ? "Please wait..." : mode === "forgot" ? "Send reset link" : "Change password"}
      </button>
    </form>
  );
}
