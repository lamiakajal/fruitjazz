import mongoose, { Schema, Model } from "mongoose";

export interface IImageAsset {
  contentType: string;
  data: Buffer;
  size: number;
}

/** Product photos uploaded from the admin panel, stored in MongoDB. */
const ImageAssetSchema = new Schema<IImageAsset>(
  {
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true },
);

const ImageAsset: Model<IImageAsset> =
  mongoose.models.ImageAsset || mongoose.model<IImageAsset>("ImageAsset", ImageAssetSchema);

export default ImageAsset;
