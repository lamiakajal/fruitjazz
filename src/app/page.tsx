import HeroBanner from "@/components/home/HeroBanner";
import Marquee from "@/components/ui/Marquee";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import HowItWorks from "@/components/home/HowItWorks";
import Reviews from "@/components/home/Reviews";
import { getAllProducts, getFeaturedProducts, getNewArrivals } from "@/lib/catalog";
import { getSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/format";

// Re-read the catalog at most once a minute (admin edits also revalidate on save)
export const revalidate = 60;

export default async function Home() {
  const [products, settings] = await Promise.all([getAllProducts(), getSettings()]);

  return (
    <>
      <HeroBanner home={settings.home} />
      <Marquee words={settings.home.marqueeWords} notes={settings.home.marqueeNotes} freeShippingFrom={formatPrice(settings.shipping.freeThreshold)} />
      <CategoryGrid products={products} categories={settings.categories} />
      <FeaturedProducts
        bestSellers={getFeaturedProducts(products).slice(0, 8)}
        newArrivals={getNewArrivals(products).slice(0, 10)}
      />
      <PromoBanner />
      <HowItWorks />
      <Reviews />
    </>
  );
}
