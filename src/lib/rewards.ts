import mongoose from "mongoose";
import User from "@/models/User";
import CoinTransaction from "@/models/CoinTransaction";
import type { RewardSettings } from "@/lib/settings-types";

interface OrderLike {
  orderNumber: string;
  userId?: mongoose.Types.ObjectId | string;
  subtotal: number;
  discount: number;
  coinsUsed?: number;
  coinsEarned?: number;
  coinsCredited?: boolean;
  coinsRefunded?: boolean;
}

/** Coins a customer earns for an order: a share of what they actually paid for the goods. */
export function coinsEarnedFor(order: Pick<OrderLike, "subtotal" | "discount">, rewards: RewardSettings): number {
  if (!rewards.enabled || rewards.earnPercent <= 0 || rewards.coinValue <= 0) return 0;
  const paidForGoods = Math.max(0, order.subtotal - order.discount);
  return Math.floor((paidForGoods * (rewards.earnPercent / 100)) / rewards.coinValue);
}

/** Credits the coins once, when an order is delivered. Mutates the order flags (caller saves). */
export async function creditCoinsForDelivery(order: OrderLike, rewards: RewardSettings): Promise<void> {
  if (!order.userId || order.coinsCredited) return;
  const earned = coinsEarnedFor(order, rewards);
  if (earned <= 0) return;

  await User.updateOne({ _id: order.userId }, { $inc: { coinBalance: earned } });
  await CoinTransaction.create({
    userId: order.userId,
    type: "earn",
    coins: earned,
    orderNumber: order.orderNumber,
    note: "Earned on delivery",
  });
  order.coinsEarned = earned;
  order.coinsCredited = true;
}

/** On cancellation: give back coins that were spent and take back coins that were earned. */
export async function reverseCoinsForCancellation(order: OrderLike): Promise<void> {
  if (!order.userId) return;

  if ((order.coinsUsed ?? 0) > 0 && !order.coinsRefunded) {
    await User.updateOne({ _id: order.userId }, { $inc: { coinBalance: order.coinsUsed } });
    await CoinTransaction.create({
      userId: order.userId,
      type: "refund",
      coins: order.coinsUsed,
      orderNumber: order.orderNumber,
      note: "Order cancelled",
    });
    order.coinsRefunded = true;
  }

  if (order.coinsCredited && (order.coinsEarned ?? 0) > 0) {
    const user = await User.findById(order.userId).select("coinBalance").lean<{ coinBalance?: number }>();
    const take = Math.min(user?.coinBalance ?? 0, order.coinsEarned ?? 0);
    if (take > 0) {
      await User.updateOne({ _id: order.userId }, { $inc: { coinBalance: -take } });
      await CoinTransaction.create({
        userId: order.userId,
        type: "clawback",
        coins: -take,
        orderNumber: order.orderNumber,
        note: "Order cancelled after delivery",
      });
    }
    order.coinsEarned = 0;
    order.coinsCredited = false;
  }
}
