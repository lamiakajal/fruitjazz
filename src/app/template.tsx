import React from "react";

/** Re-mounts on every navigation, so each page fades in smoothly. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
