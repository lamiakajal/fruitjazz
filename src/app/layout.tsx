import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartToast from "@/components/cart/CartToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FruitJazz | 100% Organic Honey & Premium Dry Fruits Pakistan",
  description:
    "Buy premium quality almonds, walnuts, pure organic honey, and luxury gift boxes with cash on delivery across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-[#FDFBF7] text-stone-800`}
        suppressHydrationWarning
      >
        <CartProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
