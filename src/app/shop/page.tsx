import React, { Suspense } from "react";
import ShopCatalog from "../../components/shop/ShopCatalog";

export const metadata = {
  title: "Shop All Harvest & Gift Packs | FruitJazz Pakistan",
  description:
    "Browse 100% pure mountain honey, California almonds, and premium walnuts.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 border-4 border-[#14532D] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-stone-600">
              Loading catalog...
            </p>
          </div>
        </div>
      }
    >
      <ShopCatalog />
    </Suspense>
  );
}
