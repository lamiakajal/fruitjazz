import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

/**
 * Returns the signed-in admin's email, or null.
 * The role is re-checked in the database on every call, so removing the
 * role takes effect immediately instead of when the session token expires.
 */
export async function getAdminEmail(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  if (!email) return null;

  try {
    await connectToDatabase();
    const user = await User.findOne({ email, role: "admin" }).select("_id").lean();
    return user ? email : null;
  } catch {
    return null;
  }
}
