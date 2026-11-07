import mongoose, { Schema, Model } from "mongoose";

export interface ICoinTransaction {
  userId: mongoose.Types.ObjectId;
  type: "earn" | "redeem" | "refund" | "adjust" | "clawback";
  coins: number; // positive adds to the balance, negative removes
  orderNumber?: string;
  note?: string;
  createdAt: Date;
}

/** Every change to a customer's reward coin balance, for a clear history. */
const CoinTransactionSchema = new Schema<ICoinTransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: ["earn", "redeem", "refund", "adjust", "clawback"], required: true },
    coins: { type: Number, required: true },
    orderNumber: { type: String },
    note: { type: String, maxlength: 200 },
  },
  { timestamps: true },
);

const CoinTransactionModel: Model<ICoinTransaction> =
  mongoose.models.CoinTransaction ||
  mongoose.model<ICoinTransaction>("CoinTransaction", CoinTransactionSchema);

export default CoinTransactionModel;
