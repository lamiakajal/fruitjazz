"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Building2,
  Tag,
  Coins,
  Check,
  X,
  Smartphone,
  Sparkles,
  QrCode,
  ExternalLink,
  Copy,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { initialStoreConfig, PaymentOption, Voucher } from "@/data/storeConfig";

const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Peshawar",
  "Multan",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Abbottabad",
  "Gilgit",
  "Other City",
];

const emptySubscribe = () => () => {};

export default function CheckoutView() {
  const { cart, subtotal, clearCart } = useCart();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [storeConfig] = useState(initialStoreConfig);

  const AVAILABLE_COINS = 350;
  const [applyCoins, setApplyCoins] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [voucherError, setVoucherError] = useState("");

  const [selectedPaymentId, setSelectedPaymentId] =
    useState<PaymentOption["id"]>("cod");

  // Payment Transaction Reference State
  const [transactionRef, setTransactionRef] = useState("");
  const [copiedText, setCopiedText] = useState("");

  const activePaymentMethod =
    storeConfig.paymentMethods.find((p) => p.id === selectedPaymentId) ||
    storeConfig.paymentMethods[0];

  // 1. Voucher Discount
  let voucherDiscountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.type === "percent") {
      voucherDiscountAmount = Math.round(
        (subtotal * appliedVoucher.discount) / 100,
      );
    } else {
      voucherDiscountAmount = appliedVoucher.discount;
    }
  }

  // 2. Dynamic Payment Method Discount
  const paymentDiscountPercent = activePaymentMethod.discountPercent || 0;
  const paymentDiscountAmount =
    paymentDiscountPercent > 0
      ? Math.round((subtotal * paymentDiscountPercent) / 100)
      : 0;

  // 3. Jazz Coins Discount
  const coinDiscountAmount =
    applyCoins && storeConfig.coinsEnabled
      ? Math.min(AVAILABLE_COINS * storeConfig.coinConversionRate, subtotal)
      : 0;

  const totalDiscounts =
    voucherDiscountAmount + paymentDiscountAmount + coinDiscountAmount;

  // Delivery charge (Free over Rs. 2,999)
  const shippingFee = subtotal >= 2999 || subtotal === 0 ? 0 : 200;
  const grandTotal = Math.max(0, subtotal - totalDiscounts + shippingFee);

  // Customer shipping details
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Karachi",
    address: "",
    postalCode: "",
    orderNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  // Smart 1-Click Pay Handler for Mobile Apps & Desktop Portals
  const handleOneClickPay = () => {
    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && activePaymentMethod.appScheme) {
      window.location.href = activePaymentMethod.appScheme;
      setTimeout(() => {
        if (activePaymentMethod.webFallbackUrl) {
          window.open(activePaymentMethod.webFallbackUrl, "_blank");
        }
      }, 2000);
    } else if (activePaymentMethod.webFallbackUrl) {
      window.open(activePaymentMethod.webFallbackUrl, "_blank");
    } else {
      handleCopy(activePaymentMethod.accountDetails.accountNumber);
      alert(
        `Account Number ${activePaymentMethod.accountDetails.accountNumber} copied! Please complete payment via your banking app.`,
      );
    }
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError("");
    const cleanCode = voucherInput.trim().toUpperCase();

    const matched = storeConfig.vouchers.find(
      (v) => v.code === cleanCode && v.isActive,
    );

    if (!matched) {
      setVoucherError("Invalid or expired coupon code.");
      return;
    }

    if (subtotal < matched.minSpend) {
      setVoucherError(
        `Minimum order amount of Rs. ${matched.minSpend.toLocaleString()} required.`,
      );
      return;
    }

    setAppliedVoucher(matched);
    setVoucherInput("");
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherError("");
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `FJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderId(orderId);
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (!mounted) {
    return (
      <div className="bg-[#FDFBF7] min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#14532D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Order Confirmed Screen
  if (orderPlaced) {
    return (
      <div className="bg-[#FDFBF7] min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 text-center shadow-lg space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-[#14532D] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Shukriya For Your Order!
            </h1>
            <p className="text-xs text-stone-500">
              Your order has been logged. Our dispatch center will verify and
              send tracking details to your WhatsApp.
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-4 text-left space-y-2 text-xs border border-stone-100">
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">Order Number:</span>
              <strong className="text-stone-900">{generatedOrderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">Customer:</span>
              <span className="text-stone-800 font-semibold">
                {formData.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">WhatsApp:</span>
              <span className="text-stone-800 font-semibold">
                {formData.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">Destination:</span>
              <span className="text-stone-800 font-semibold">
                {formData.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">Payment Mode:</span>
              <span className="text-stone-800 font-bold">
                {activePaymentMethod.name}
              </span>
            </div>
            {transactionRef && (
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">
                  Txn / Ref ID:
                </span>
                <span className="text-emerald-700 font-bold">
                  {transactionRef}
                </span>
              </div>
            )}
            {totalDiscounts > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Total Savings:</span>
                <span>- Rs. {totalDiscounts.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-stone-900 text-sm">
              <span>Final Amount:</span>
              <span className="text-[#14532D]">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/shop"
              className="w-full py-3.5 bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0f4022] transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-stone-500 hover:text-stone-800 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart fallback
  if (cart.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 text-center shadow-xs space-y-4">
          <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-800">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-stone-500">
            Please add organic honey or fresh dry fruits to your cart before
            proceeding.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-2 px-6 py-3 bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0f4022] transition"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* 1. Left Form: Address & Payment Methods (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-stone-900">
                  Shipping & Delivery Address
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Deliveries handled with care across all major cities of
                  Pakistan.
                </p>
              </div>

              <form
                id="checkout-form"
                onSubmit={handleSubmitOrder}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-stone-700 mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-stone-700 mb-1.5"
                    >
                      Phone / WhatsApp Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-stone-700 mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-bold text-stone-700 mb-1.5"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                    >
                      {PAKISTAN_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-xs font-bold text-stone-700 mb-1.5"
                    >
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 74200"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-xs font-bold text-stone-700 mb-1.5"
                  >
                    Complete Street Address / House / Flat No.{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House number, Street, Sector / Area name..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="orderNotes"
                    className="block text-xs font-bold text-stone-700 mb-1.5"
                  >
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    id="orderNotes"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="e.g. Call before delivery, deliver in morning..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:bg-white"
                  />
                </div>
              </form>
            </div>

            {/* Popular Pakistani Payment Methods */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div>
                <h2 className="text-base font-serif font-bold text-stone-900">
                  Select Payment Method
                </h2>
                <p className="text-xs text-stone-500">
                  Choose digital payment to get up to 7% instant discount!
                </p>
              </div>

              <div className="space-y-3">
                {storeConfig.paymentMethods
                  .filter((p) => p.isActive)
                  .map((method) => {
                    const isSelected = selectedPaymentId === method.id;
                    return (
                      <div
                        key={method.id}
                        className={`border-2 rounded-2xl p-4 transition ${
                          isSelected
                            ? "border-[#14532D] bg-emerald-50/30 shadow-xs"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <label className="flex items-start gap-3.5 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethodRadio"
                            value={method.id}
                            checked={isSelected}
                            onChange={() => setSelectedPaymentId(method.id)}
                            className="mt-1 accent-[#14532D]"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {method.id === "cod" && (
                                  <Truck className="w-4 h-4 text-[#14532D]" />
                                )}
                                {method.id === "jazzcash" && (
                                  <Smartphone className="w-4 h-4 text-orange-600" />
                                )}
                                {method.id === "easypaisa" && (
                                  <Smartphone className="w-4 h-4 text-emerald-600" />
                                )}
                                {method.id === "sadapay" && (
                                  <CreditCard className="w-4 h-4 text-teal-600" />
                                )}
                                {method.id === "meezan" && (
                                  <Building2 className="w-4 h-4 text-[#14532D]" />
                                )}
                                <span className="font-bold text-xs text-stone-800">
                                  {method.name}
                                </span>
                              </div>

                              {method.discountPercent > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
                                  <Sparkles className="w-3 h-3" />
                                  {method.discountPercent}% OFF
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] text-stone-500 mt-1">
                              {method.subtitle}
                            </p>
                          </div>
                        </label>

                        {/* Interactive 1-Click Pay & QR Box for Selected Digital Method */}
                        {isSelected && method.id !== "cod" && (
                          <div className="mt-4 pt-4 space-y-3 bg-white p-4 rounded-xl border border-stone-200">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="space-y-1 text-xs text-stone-700 w-full sm:w-auto">
                                <p className="font-bold text-[#14532D]">
                                  Account Information:
                                </p>
                                <p>
                                  Title:{" "}
                                  <strong>{method.accountDetails.title}</strong>
                                </p>
                                <div className="flex items-center gap-2">
                                  <span>
                                    Number / ID:{" "}
                                    <strong>
                                      {method.accountDetails.accountNumber}
                                    </strong>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopy(
                                        method.accountDetails.accountNumber,
                                      )
                                    }
                                    className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                                    title="Copy Number"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  {copiedText ===
                                    method.accountDetails.accountNumber && (
                                    <span className="text-[10px] text-emerald-600 font-bold">
                                      Copied!
                                    </span>
                                  )}
                                </div>
                                {method.accountDetails.raastId && (
                                  <p>
                                    Raast ID:{" "}
                                    <strong>
                                      {method.accountDetails.raastId}
                                    </strong>
                                  </p>
                                )}
                                {method.accountDetails.iban && (
                                  <p className="text-[11px]">
                                    IBAN:{" "}
                                    <strong>
                                      {method.accountDetails.iban}
                                    </strong>
                                  </p>
                                )}
                              </div>

                              {/* Instant Scan QR Code */}
                              {method.qrCodeUrl && (
                                <div className="flex flex-col items-center bg-stone-50 p-2 rounded-xl border border-stone-200 shrink-0">
                                  <div className="relative w-24 h-24">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={method.qrCodeUrl}
                                      alt={`${method.name} QR Code`}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <span className="text-[9px] font-bold text-stone-500 mt-1 flex items-center gap-1">
                                    <QrCode className="w-3 h-3 text-[#14532D]" />{" "}
                                    Scan to Pay
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* 1-Click Mobile App / Web Launcher Button */}
                            <button
                              type="button"
                              onClick={handleOneClickPay}
                              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>
                                Launch {method.name.split(" ")[0]} Pay (App /
                                Web)
                              </span>
                            </button>

                            {/* Transaction ID / Ref input */}
                            <div className="pt-2">
                              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                Enter Transaction ID / Reference (After
                                Payment):
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. TID-9876543210 or Bank Reference"
                                value={transactionRef}
                                onChange={(e) =>
                                  setTransactionRef(e.target.value)
                                }
                                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* 2. Right: Order Summary + Discounts, Vouchers & Coins (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6 sticky top-28">
              <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  Order Summary
                </h2>
                <span className="text-xs font-semibold text-stone-500">
                  {cart.length} item{cart.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-52 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {item.weight} &times; {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-[#14532D]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Voucher Code Box */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Apply Voucher Code</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    Try: FRUIT10 or WELCOME
                  </span>
                </label>

                {appliedVoucher ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Check className="w-4 h-4" />
                      <span>Code: {appliedVoucher.code}</span>
                      <span className="text-[11px] font-medium text-emerald-600">
                        (
                        {appliedVoucher.type === "percent"
                          ? `${appliedVoucher.discount}% OFF`
                          : `Rs. ${appliedVoucher.discount} OFF`}
                        )
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveVoucher}
                      className="text-stone-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo coupon..."
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs uppercase font-medium focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#14532D] hover:bg-[#0f4022] text-white rounded-xl text-xs font-bold transition cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {voucherError && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {voucherError}
                  </p>
                )}
              </div>

              {/* Jazz Rewards Coins Switch */}
              {storeConfig.coinsEnabled && (
                <div className="pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                        <Coins className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800">
                          Redeem Jazz Coins
                        </p>
                        <p className="text-[10px] text-stone-500">
                          Available: <strong>{AVAILABLE_COINS} coins</strong>{" "}
                          (Save Rs. {AVAILABLE_COINS})
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyCoins}
                        onChange={(e) => setApplyCoins(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#14532D]"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-stone-900">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                {appliedVoucher && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher ({appliedVoucher.code}):</span>
                    <span>- Rs. {voucherDiscountAmount.toLocaleString()}</span>
                  </div>
                )}

                {paymentDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>
                      {activePaymentMethod.name.split(" ")[0]} (
                      {paymentDiscountPercent}% OFF):
                    </span>
                    <span>- Rs. {paymentDiscountAmount.toLocaleString()}</span>
                  </div>
                )}

                {applyCoins && coinDiscountAmount > 0 && (
                  <div className="flex justify-between text-amber-700 font-semibold">
                    <span>Jazz Coins:</span>
                    <span>- Rs. {coinDiscountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Nationwide Courier:</span>
                  <span className="font-bold text-stone-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                        FREE
                      </span>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>

                {subtotal < 2999 && (
                  <p className="text-[10px] text-amber-700 italic">
                    Tip: Add Rs. {(2999 - subtotal).toLocaleString()} more for
                    Free Delivery!
                  </p>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-stone-200 text-base">
                  <span className="font-bold text-stone-900">
                    Total Payable:
                  </span>
                  <span className="text-2xl font-serif font-extrabold text-[#14532D]">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#14532D] hover:bg-[#0f4022] disabled:bg-stone-300 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Placing Your Order...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      Confirm Order (Rs. {grandTotal.toLocaleString()})
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
                <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                <span>100% Secure Checkout Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
