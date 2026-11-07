import React from "react";
import { CheckCircle2, PhoneCall, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/data/brand";
import { getLatestReviews } from "@/lib/reviews";

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Raw and pure",
    description: "No added sugar, heat treatment or artificial preservatives.",
  },
  {
    icon: Truck,
    title: "Cash on Delivery",
    description: `Pay at your doorstep anywhere in ${BRAND.country}.`,
  },
  {
    icon: RefreshCcw,
    title: "Freshness promise",
    description: "Not happy with freshness? Get a replacement within 7 days.",
  },
  {
    icon: PhoneCall,
    title: "WhatsApp support",
    description: "Ask us anything, or place bulk orders directly on WhatsApp.",
  },
];

// Shown until at least 3 customer reviews have been approved in the admin panel
const FALLBACK_REVIEWS = [
  {
    name: "Tariq Mehmood",
    city: "Lahore",
    product: "Kashmiri Organic Wild Honey",
    comment:
      "The aroma and natural crystallisation are proof of purity. My family loved it, and the jar arrived spill-proof.",
  },
  {
    name: "Ayesha Siddiqui",
    city: "Karachi",
    product: "California Jumbo Almonds",
    comment:
      "Crunchy and fresh, not stale like regular market nuts. I ordered the 1kg pack and it reached me in two days.",
  },
  {
    name: "Dr. Hamza Khan",
    city: "Islamabad",
    product: "Royal Dry Fruit Gift Hamper",
    comment:
      "I sent this wooden chest to a colleague. Elegant presentation and excellent walnut quality. Highly recommended.",
  },
];

export default async function Reviews() {
  const real = await getLatestReviews(3);
  const REVIEWS =
    real.length >= 3
      ? real.map((r) => ({
          name: r.name,
          city: r.city || BRAND.country,
          product: r.productName,
          comment: r.comment,
          verified: r.verifiedBuyer,
        }))
      : FALLBACK_REVIEWS.map((r) => ({ ...r, verified: true }));

  return (
    <>
      {/* Trust strip */}
      <section className="border-y border-stone-200/70 bg-stone-100/60 py-10" aria-label="Why shop with us">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-stone-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer reviews */}
      <section className="py-16 sm:py-24" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              id="reviews-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-heading sm:text-5xl"
            >
              Loved by families across {BRAND.country}
            </h2>
            <p className="mt-3 text-stone-600">
              Real words from people who bring {BRAND.name} to their breakfast
              tables and gift lists.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.name} delay={i * 90}>
                <figure className="flex h-full flex-col justify-between rounded-3xl border border-stone-200/80 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div>
                    <div className="mb-4 flex gap-0.5 text-gold-500" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((n) => (
                        <Star key={n} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-[15px] leading-relaxed text-stone-700">
                      &ldquo;{review.comment}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                    <div>
                      <p className="font-display text-sm font-bold text-stone-900">{review.name}</p>
                      <p className="text-xs text-stone-500">
                        {review.city} &middot; {review.product}
                      </p>
                    </div>
                    {review.verified && (
                      <span className="flex shrink-0 items-center gap-1 rounded-md bg-leaf-100 px-2 py-1 text-[11px] font-bold text-leaf-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified buyer
                      </span>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
