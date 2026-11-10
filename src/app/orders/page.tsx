"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Calendar,
  Clock,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
}

interface OrderRecord {
  _id: string;
  orderNumber: string;
  createdAt: string;
  orderStatus: string;
  paymentMethod: string;
  totalAmount: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.orders) {
            setOrders(data.orders);
          }
        })
        .catch((err) => console.error("Error fetching orders:", err))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="bg-[#FDFBF7] min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#14532D]" />
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-amber-700 transition mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#14532D]">
                My Order History
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Track your organic harvests, invoice receipts, and dispatch
                progress.
              </p>
            </div>
            <div className="text-xs text-stone-500 bg-white border border-stone-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto font-medium shadow-xs">
              Account:{" "}
              <strong className="text-stone-800">{session?.user?.email}</strong>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-12 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-800">
                No Orders Placed Yet
              </h2>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Explore our pure Sidr honey, Gilgit walnuts, and premium dry
                fruit collections.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#14532D] text-white rounded-xl text-xs font-bold hover:bg-[#0f4022] transition shadow-xs"
            >
              Start Shopping <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4 hover:border-amber-300 transition"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Order ID
                    </span>
                    <span className="text-sm font-extrabold text-[#14532D]">
                      {order.orderNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {new Date(order.createdAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="capitalize px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="divide-y divide-stone-100">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-stone-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-800 line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-stone-500">
                            Weight: {item.weight} &times; {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-stone-800 shrink-0">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Breakdown */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-stone-500">
                    Payment Method:{" "}
                    <span className="uppercase font-bold text-stone-700">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-[#14532D]">
                    Total: Rs. {order.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
