import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminEmail } from "@/lib/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { sanitizeContent } from "@/lib/content-input";
import SettingsModel from "@/models/Settings";

export async function PUT(req: Request) {
  if (!(await getAdminEmail())) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const parsed = sanitizeContent(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  await connectToDatabase();
  const $set = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [`data.${k}`, v]));
  await SettingsModel.findOneAndUpdate({ key: "main" }, { $set }, { upsert: true });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
