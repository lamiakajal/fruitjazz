import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  id: string; // public id, e.g. "prod-12" (also used in carts and orders)
  name: string;
  slug: string;
  category: string;
  images: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  variants: { weight: string; price: number; comparePrice?: number; stock: number }[];
  isFeatured: boolean;
  isNewArrival: boolean;
  active: boolean;
  sortOrder: number;
}

const VariantSchema = new Schema(
  {
    weight: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, default: "" },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    variants: { type: [VariantSchema], validate: (v: unknown[]) => v.length > 0 },
    isFeatured: { type: Boolean, default: false },
    // Not called "isNew": Mongoose reserves that name
    isNewArrival: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
