import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import ImageAsset from "@/models/ImageAsset";

type Ctx = { params: Promise<{ id: string }> };

/** Serves an uploaded product photo. Files never change, so they cache for a year. */
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return new Response("Not found", { status: 404 });

  await connectToDatabase();
  const image = await ImageAsset.findById(id);
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": String(image.data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
