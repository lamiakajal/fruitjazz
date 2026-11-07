import React from "react";
import type { Metadata } from "next";
import AuthMessageForm from "@/components/common/AuthMessageForm";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <h1 className="font-display text-3xl font-extrabold text-heading">Forgot your password?</h1>
      <p className="mb-6 mt-2 text-stone-600">Enter your email and we will send you a link to choose a new one.</p>
      <AuthMessageForm mode="forgot" />
    </div>
  );
}
