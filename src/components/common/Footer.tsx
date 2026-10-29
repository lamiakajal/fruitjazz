import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              🌿
            </div>
            <span className="text-xl font-serif font-bold text-white tracking-tight">
              Fruit<span className="text-amber-500">Jazz</span>
            </span>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed">
            Supplying pure Kashmiri raw honey, premium export-grade dry fruits,
            and handpicked organic nuts across Pakistan. Freshness and purity
            guaranteed.
          </p>
          <div className="text-xs text-amber-400 font-medium">
            Cash on Delivery • Direct Bank Transfer
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Quick Shop
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <Link
                href="/shop?cat=honey"
                className="hover:text-amber-400 transition"
              >
                Pure Honey
              </Link>
            </li>
            <li>
              <Link
                href="/shop?cat=nuts"
                className="hover:text-amber-400 transition"
              >
                Almonds & Pistachios
              </Link>
            </li>
            <li>
              <Link
                href="/shop?cat=dry-fruits"
                className="hover:text-amber-400 transition"
              >
                Premium Walnuts & Figs
              </Link>
            </li>
            <li>
              <Link
                href="/shop?cat=gift-boxes"
                className="hover:text-amber-400 transition"
              >
                Luxury Gift Hampers
              </Link>
            </li>
            <li>
              <Link
                href="/shop?cat=combos"
                className="hover:text-amber-400 transition"
              >
                Discounted Combos
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Customer Support
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                About Our Harvest
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact & WhatsApp
              </Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-amber-400 transition">
                Shipping & Delivery Times
              </Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-amber-400 transition">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-amber-400 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter / Contact */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Direct Order
          </h4>
          <p className="text-xs text-stone-400">
            Have questions or need bulk/gift orders? Reach our support team on
            WhatsApp anytime.
          </p>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:bg-[#20ba5a] transition"
          >
            Chat with Support
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
        <p>
          © {new Date().getFullYear()} FruitJazz Pakistan. All rights reserved.
        </p>
        <p className="text-stone-400">100% Secure Checkout</p>
      </div>
    </footer>
  );
}
