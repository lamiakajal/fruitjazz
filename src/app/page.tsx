import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <Reviews />
    </div>
  );
}
