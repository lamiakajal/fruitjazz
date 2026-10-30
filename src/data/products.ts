import { Product } from "@/types";

export const allProducts: Product[] = [
  {
    id: "prod-1",
    name: "Kashmiri Organic Wild Honey",
    slug: "kashmiri-organic-wild-honey",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Raw, unfiltered, and harvested straight from wild mountain blooms without heating or sugar.",
    rating: 4.9,
    reviewsCount: 142,
    variants: [
      { weight: "250g", price: 950, stock: 25 },
      { weight: "500g", price: 1800, stock: 18 },
      { weight: "1kg", price: 3400, stock: 10 },
    ],
  },
  {
    id: "prod-2",
    name: "California Jumbo Almonds (Giri)",
    slug: "california-jumbo-almonds",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Crisp, sweet, and rich in natural oils. Extra-large kernels picked for superior quality.",
    rating: 4.8,
    reviewsCount: 96,
    variants: [
      { weight: "250g", price: 750, stock: 30 },
      { weight: "500g", price: 1450, stock: 22 },
      { weight: "1kg", price: 2800, stock: 15 },
    ],
  },
  {
    id: "prod-3",
    name: "Mountain Walnuts (Akhrot Giri)",
    slug: "mountain-walnuts-akhrot",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Fresh light-kernel Gilgit mountain walnuts packed with Omega-3 and brain-boosting nutrients.",
    rating: 5.0,
    reviewsCount: 88,
    variants: [
      { weight: "250g", price: 850, stock: 20 },
      { weight: "500g", price: 1650, stock: 14 },
      { weight: "1kg", price: 3200, stock: 8 },
    ],
  },
  {
    id: "prod-4",
    name: "Royal Dry Fruit Gift Hamper",
    slug: "royal-dry-fruit-gift-hamper",
    category: "Gift Boxes",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "A handcrafted wooden chest containing premium cashews, roasted pistachios, raisins, and walnuts.",
    rating: 4.9,
    reviewsCount: 54,
    variants: [
      { weight: "500g", price: 2900, stock: 12 },
      { weight: "1kg", price: 5400, stock: 6 },
    ],
  },
  {
    id: "prod-5",
    name: "Roasted Salted Pistachios (Pista)",
    slug: "roasted-salted-pistachios",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Naturally opened, gently roasted with Himalayan pink salt for the perfect healthy crunch.",
    rating: 4.7,
    reviewsCount: 65,
    variants: [
      { weight: "250g", price: 900, stock: 18 },
      { weight: "500g", price: 1750, stock: 12 },
      { weight: "1kg", price: 3350, stock: 6 },
    ],
  },
  {
    id: "prod-6",
    name: "Organic Chia & Basil Seeds Trio",
    slug: "chia-basil-seeds-trio",
    category: "Seeds",
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Nutrient-dense superfoods packed with fiber, protein, and essential micronutrients.",
    rating: 4.8,
    reviewsCount: 42,
    variants: [
      { weight: "250g", price: 450, stock: 40 },
      { weight: "500g", price: 850, stock: 25 },
      { weight: "1kg", price: 1600, stock: 14 },
    ],
  },
  {
    id: "prod-7",
    name: "Sidr (Beri) Honey Premium Blend",
    slug: "sidr-beri-honey-premium",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Monofloral nectar collected from ancient wild Sidr trees. Renowned for natural immunity support.",
    rating: 5.0,
    reviewsCount: 110,
    variants: [
      { weight: "250g", price: 1200, stock: 15 },
      { weight: "500g", price: 2300, stock: 10 },
      { weight: "1kg", price: 4400, stock: 5 },
    ],
  },
  {
    id: "prod-8",
    name: "Ramadan Energy Mega Combo",
    slug: "ramadan-energy-mega-combo",
    category: "Combos",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Combo set of 500g Wild Honey, 500g California Almonds, and 500g Mountain Walnuts at discounted bundle price.",
    rating: 4.9,
    reviewsCount: 78,
    variants: [{ weight: "1.5kg Combo", price: 4499, stock: 20 }],
  },
];
