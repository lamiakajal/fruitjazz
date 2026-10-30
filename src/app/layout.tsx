import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CartToast from "@/components/cart/CartToast";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FruitJazz | 100% Organic Honey & Premium Dry Fruits Pakistan",
  description:
    "Buy raw Sidr honey, Kashmiri organic honey, Gilgit walnuts, and California almonds online with nationwide Cash on Delivery in Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-stone-900 bg-[#FDFBF7]">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
