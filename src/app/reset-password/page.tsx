import React from "react";
import type { Metadata } from "next";
import AuthMessageForm from "@/components/common/AuthMessageForm";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token = "", email = "" } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <h1 className="font-display text-3xl font-extrabold text-heading">Choose a new password</h1>
      <p className="mb-6 mt-2 text-stone-600">Pick a password you have not used before.</p>
      <AuthMessageForm mode="reset" token={token} email={email} />
    </div>
  );
}
