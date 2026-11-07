/** Emails listed in ADMIN_EMAILS are promoted to admin when they sign in with Google or GitHub. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const isAdminEmail = (email?: string | null) =>
  !!email && adminEmails().includes(email.toLowerCase());
