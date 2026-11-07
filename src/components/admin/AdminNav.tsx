"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, MessageSquare, Package, Settings, ShoppingBag, Star, Store, Tags, Users } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="site-chrome lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl border border-stone-200 bg-surface p-3 shadow-soft">
        <p className="px-3 pb-2 pt-1 text-xs font-bold text-stone-500">Signed in as</p>
        <p className="truncate px-3 pb-3 text-sm font-bold text-stone-800">{email}</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Admin">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  active ? "bg-primary text-white" : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-stone-500 transition hover:bg-stone-100"
          >
            <Store className="h-4 w-4" />
            View store
          </Link>
        </nav>
      </div>
    </aside>
  );
}
