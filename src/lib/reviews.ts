import { connectToDatabase } from "@/lib/mongodb";
import ReviewModel from "@/models/Review";
import ProductModel from "@/models/Product";

export interface PublicReview {
  id: string;
  productName: string;
  productSlug: string;
  name: string;
  city?: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  createdAt: string;
}

type ReviewDoc = {
  _id: { toString(): string };
  productName: string;
  productSlug: string;
  name: string;
  city?: string;
  rating: number;
  comment: string;
  verifiedBuyer?: boolean;
  createdAt: Date;
};

const toPublic = (r: ReviewDoc): PublicReview => ({
  id: r._id.toString(),
  productName: r.productName,
  productSlug: r.productSlug,
  name: r.name,
  city: r.city,
  rating: r.rating,
  comment: r.comment,
  verifiedBuyer: !!r.verifiedBuyer,
  createdAt: new Date(r.createdAt).toISOString(),
});

export async function getApprovedReviews(productId: string): Promise<PublicReview[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    await connectToDatabase();
    const docs = await ReviewModel.find({ productId, status: "approved" })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean<ReviewDoc[]>();
    return docs.map(toPublic);
  } catch {
    return [];
  }
}

export async function getLatestReviews(limit: number): Promise<PublicReview[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    await connectToDatabase();
    const docs = await ReviewModel.find({ status: "approved", rating: { $gte: 4 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<ReviewDoc[]>();
    return docs.map(toPublic);
  } catch {
    return [];
  }
}

/** Updates a product's star rating and review count from its approved reviews. */
export async function recomputeProductRating(productId: string): Promise<void> {
  const rows = await ReviewModel.aggregate([
    { $match: { productId, status: "approved" } },
    { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  if (rows[0]) {
    await ProductModel.updateOne(
      { id: productId },
      { rating: Math.round(rows[0].avg * 10) / 10, reviewsCount: rows[0].count },
    );
  }
}
