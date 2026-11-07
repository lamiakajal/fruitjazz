import React from "react";
import type { Metadata } from "next";
import VerifyEmailForm from "@/components/common/VerifyEmailForm";

export const metadata: Metadata = { title: "Confirm your email", robots: { index: false } };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token = "", email = "" } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <h1 className="font-display text-3xl font-extrabold text-heading">Confirm your email</h1>
      <p className="mb-6 mt-2 text-stone-600">Press the button below to finish creating your account.</p>
      <VerifyEmailForm token={token} email={email} />
    </div>
  );
}
