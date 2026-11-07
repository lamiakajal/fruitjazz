"use client";

import React, { createContext, useContext } from "react";
import type { PublicSettings } from "@/lib/settings-types";

const SettingsContext = createContext<PublicSettings | null>(null);

/** Gives client components the owner-editable contact and delivery settings. */
export function SettingsProvider({
  value,
  children,
}: {
  value: PublicSettings;
  children: React.ReactNode;
}) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): PublicSettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
