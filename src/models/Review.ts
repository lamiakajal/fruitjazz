import mongoose, { Schema, Model } from "mongoose";

export interface IReview {
  productId: string;
  productName: string;
  productSlug: string;
  name: string;
  city?: string;
  rating: number;
  comment: string;
  status: "pending" | "approved";
  verifiedBuyer: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: String, required: true, index: true },
    productName: { type: String, required: true },
    productSlug: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    city: { type: String, trim: true, maxlength: 60 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["pending", "approved"], default: "pending", index: true },
    verifiedBuyer: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
