import mongoose from "mongoose";
import ImageAsset from "@/models/ImageAsset";

const UPLOAD = /^\/api\/images\/([a-f0-9]{24})$/;

/** Removes uploaded photos from the database once no product uses them any more. */
export async function deleteUnusedUploads(before: string[], after: string[]): Promise<void> {
  const keep = new Set(after);
  const ids = before
    .filter((url) => !keep.has(url))
    .map((url) => UPLOAD.exec(url)?.[1])
    .filter((id): id is string => !!id && mongoose.isValidObjectId(id));

  if (ids.length) await ImageAsset.deleteMany({ _id: { $in: ids } });
}
