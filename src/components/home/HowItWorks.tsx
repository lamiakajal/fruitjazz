import React from "react";
import Reveal from "@/components/ui/Reveal";

// This content really is a sequence, so numbered steps are appropriate.
const STEPS = [
  {
    title: "Sourced from growers",
    text: "We buy honey, walnuts and dried fruit directly from beekeepers and orchards in Neelum Valley, Gilgit and Karak.",
  },
  {
    title: "Sorted and checked",
    text: "Every batch is sorted by hand and checked for freshness, moisture and purity before it is approved.",
  },
  {
    title: "Packed in small batches",
    text: "Orders are packed in sealed jars and pouches so aroma and crunch stay intact until you open them.",
  },
  {
    title: "Delivered to your door",
    text: "Pay by Cash on Delivery or bank transfer. Not happy with freshness? Ask for a replacement within 7 days.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="how-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-heading sm:text-5xl"
          >
            From the mountains to your kitchen
          </h2>
          <p className="mt-3 text-stone-600">
            Four simple steps keep every order fresh, honest and on time.
          </p>
        </div>

        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Dashed connector on large screens */}
          <div
            className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-gold-400/60 lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 90} className="relative flex flex-col items-center text-center">
                <span className="hex relative z-10 grid h-16 w-[3.6rem] place-items-center bg-linear-to-br from-gold-300 to-gold-500 font-display text-2xl font-extrabold text-gold-ink">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-stone-900">{step.title}</h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-stone-600">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
