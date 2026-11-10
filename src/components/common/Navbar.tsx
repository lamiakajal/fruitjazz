"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  Phone,
  Truck,
  User as UserIcon,
  LogOut,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const wishlistCount = wishlist.length;

  const categories = [
    { name: "Pure Honey", href: "/shop?cat=honey" },
    { name: "Almonds & Nuts", href: "/shop?cat=nuts" },
    { name: "Organic Dry Fruits", href: "/shop?cat=dry-fruits" },
    { name: "Healthy Seeds", href: "/shop?cat=seeds" },
    { name: "Luxury Gift Boxes", href: "/shop?cat=gift-boxes" },
    { name: "Special Combos", href: "/shop?cat=combos", badge: "Sale" },
  ];

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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 group">
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
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-[13.5px] font-semibold text-stone-700">
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

          {/* Action Icons Section */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Search Button */}
            <button
              type="button"
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
              <Heart
                className={`w-5 h-5 transition-colors ${
                  mounted && wishlistCount > 0
                    ? "text-rose-500 fill-rose-500"
                    : "text-stone-600"
                }`}
              />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-600 hover:text-[#14532D] hover:bg-stone-100 rounded-full transition cursor-pointer flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            {mounted && status === "authenticated" && session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#14532D] text-white font-bold text-xs flex items-center justify-center shadow-xs hover:ring-2 hover:ring-amber-500 transition cursor-pointer overflow-hidden ml-1"
                >
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    session.user.name?.charAt(0).toUpperCase() || "U"
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in-50 duration-150">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-800 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[10px] text-stone-400 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 transition"
                    >
                      <Package className="w-4 h-4 text-[#14532D]" />
                      <span>My Orders</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 hover:border-[#14532D] text-stone-700 hover:text-[#14532D] hover:bg-stone-50 transition text-xs font-bold ml-1 cursor-pointer"
                aria-label="Sign In"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
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

        {/* 3. Search Dropdown */}
        {searchOpen && (
          <div className="border-t border-stone-200 bg-stone-50/90 py-3 px-4 sm:px-6">
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

        {/* 4. Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-5 pt-4 pb-6 space-y-4 shadow-xl">
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
                className="flex items-center justify-between py-2 text-sm font-medium text-stone-700 hover:text-red-500"
              >
                <div className="flex items-center gap-2">
                  <Heart
                    className={`w-4 h-4 ${
                      mounted && wishlistCount > 0
                        ? "text-rose-500 fill-rose-500"
                        : "text-stone-700"
                    }`}
                  />
                  <span>My Wishlist</span>
                </div>
                {mounted && wishlistCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Mobile Auth Button */}
              {mounted && status === "authenticated" ? (
                <div className="pt-2 border-t border-stone-100 space-y-1">
                  <Link
                    href="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm font-medium text-stone-700"
                  >
                    <Package className="w-4 h-4 text-[#14532D]" />
                    <span>My Past Orders</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-left py-2 text-sm font-semibold text-rose-600 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out ({session?.user?.name})</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-[#14532D]"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </Link>
              )}
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-bold shadow-xs"
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
