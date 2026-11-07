import React from "react";
import { Check, ExternalLink, Truck, XCircle } from "lucide-react";

const STEPS = [
  { key: "placed", label: "Order placed" },
  { key: "processing", label: "Packing" },
  { key: "dispatched", label: "On the way" },
  { key: "delivered", label: "Delivered" },
];

interface OrderProgressProps {
  status: string;
  courier?: string;
  trackingId?: string;
  trackingUrl?: string;
}

/** Step tracker with courier details, shared by "My orders" and the public Track page. */
export default function OrderProgress({ status, courier, trackingId, trackingUrl }: OrderProgressProps) {
  if (status === "cancelled") {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
        <XCircle className="h-4 w-4" /> This order was cancelled.
      </p>
    );
  }

  const current = Math.max(0, STEPS.findIndex((s) => s.key === status));

  return (
    <div className="space-y-3">
      <ol className="flex items-start" aria-label="Order progress">
        {STEPS.map((step, i) => {
          const done = i <= current;
          return (
            <li key={step.key} className="relative flex flex-1 flex-col items-center text-center">
              {i > 0 && (
                <span
                  className={`absolute right-1/2 top-3.5 h-0.5 w-full ${i <= current ? "bg-leaf-500" : "bg-stone-200"}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                  done ? "bg-leaf-500 text-white" : "bg-stone-200 text-stone-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`mt-1.5 text-[11px] font-semibold ${done ? "text-stone-800" : "text-stone-400"}`}>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      {trackingId && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-gold-50 px-4 py-3 text-sm text-stone-700">
          <Truck className="h-4 w-4 text-gold-600" />
          <span>
            {courier ? <strong>{courier}</strong> : "Courier"} tracking ID: <strong>{trackingId}</strong>
          </span>
          {trackingUrl && (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-heading underline underline-offset-2"
            >
              Track parcel <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </p>
      )}
    </div>
  );
}
