"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  Phone,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Pure Honey", href: "/shop?cat=honey" },
    { name: "Almonds & Nuts", href: "/shop?cat=nuts" },
    { name: "Organic Dry Fruits", href: "/shop?cat=dry-fruits" },
    { name: "Healthy Seeds", href: "/shop?cat=seeds" },
    { name: "Luxury Gift Boxes", href: "/shop?cat=gift-boxes" },
    { name: "Special Combos", href: "/shop?cat=combos", badge: "Sale" },
  ];

  // Handle live search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#14532D] text-amber-200 text-xs sm:text-sm py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-amber-300 hidden sm:inline" />
            <span>
              🎉 <strong>Free Delivery</strong> across Pakistan on orders above
              Rs. 2,999! Cash on Delivery Available.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-amber-100 font-medium">
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Helpline: +92 300 0000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-linear-to-tr from-amber-600 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              🌿
            </div>
            <div>
              <span className="text-2xl font-serif font-extrabold tracking-tight text-[#14532D]">
                Fruit<span className="text-amber-600">Jazz</span>
              </span>
              <p className="text-[10px] tracking-widest uppercase text-stone-500 font-semibold">
                Organic Dry Fruits & Honey
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold text-stone-700">
            <Link
              href="/"
              className="text-amber-600 hover:text-amber-700 transition"
            >
              Home
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="hover:text-amber-600 transition relative flex items-center gap-1 group py-1"
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 group-hover:bg-red-200 transition">
                    {cat.badge}
                  </span>
                )}
              </Link>
            ))}

            <Link href="/about" className="hover:text-amber-600 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-amber-600 transition">
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition cursor-pointer ${
                searchOpen
                  ? "bg-amber-100 text-amber-700"
                  : "text-stone-600 hover:text-amber-600 hover:bg-stone-100"
              }`}
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-stone-600 hover:text-red-500 hover:bg-stone-100 rounded-full transition relative hidden sm:flex cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-stone-200 text-stone-700 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition shadow-xs cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 lg:hidden rounded-lg hover:bg-stone-100 transition cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 3. Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-stone-200 bg-stone-50/90 py-3 px-4 sm:px-6 animate-in slide-in-from-top-2 duration-200">
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-3xl mx-auto flex items-center gap-2"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search pure honey, almonds, walnuts, gift boxes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10 text-stone-800"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#14532D] text-white rounded-xl text-sm font-semibold hover:bg-[#0f4022] transition shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* 4. Mobile Responsive Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-5 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-3 duration-200">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-amber-600"
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-medium text-stone-700 hover:text-amber-600 border-b border-stone-100"
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                      {cat.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-stone-700 hover:text-amber-600"
              >
                About Our Farm
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-stone-700 hover:text-amber-600"
              >
                Contact & Support
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm font-medium text-stone-700 hover:text-red-500"
              >
                <Heart className="w-4 h-4" />
                <span>My Wishlist</span>
              </Link>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-bold shadow-sm"
              >
                <Phone className="w-4 h-4" /> Order Directly on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
