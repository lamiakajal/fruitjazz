import { Product } from "@/types";

export const allProducts: Product[] = [
  // ===================== 1. PURE HONEY (6 Products) =====================
  {
    id: "prod-1",
    name: "Kashmiri Organic Wild Honey",
    slug: "kashmiri-organic-wild-honey",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Raw, 100% unfiltered and harvested straight from pristine Neelum Valley wild mountain blooms without heating or processing.",
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
    name: "Sidr (Beri) Honey Premium Blend",
    slug: "sidr-beri-honey-premium",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Monofloral nectar collected from ancient wild Sidr trees across the Karak region. Globally celebrated for supreme purity and immune vitality.",
    rating: 5.0,
    reviewsCount: 110,
    variants: [
      { weight: "250g", price: 1250, stock: 15 },
      { weight: "500g", price: 2400, stock: 10 },
      { weight: "1kg", price: 4600, stock: 5 },
    ],
  },
  {
    id: "prod-3",
    name: "Organic Acacia White Flower Honey",
    slug: "organic-acacia-white-flower-honey",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Clear, delicate floral nectar with low glycemic index. Naturally fluid, subtly sweet, and light amber in texture.",
    rating: 4.8,
    reviewsCount: 64,
    variants: [
      { weight: "250g", price: 850, stock: 30 },
      { weight: "500g", price: 1600, stock: 20 },
      { weight: "1kg", price: 3100, stock: 12 },
    ],
  },
  {
    id: "prod-4",
    name: "Black Forest Mountain Honey",
    slug: "black-forest-mountain-honey",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Dark aromatic honeydew collected from pine forest flora. Rich in natural minerals, potassium, and antioxidants.",
    rating: 4.9,
    reviewsCount: 52,
    variants: [
      { weight: "250g", price: 1100, stock: 14 },
      { weight: "500g", price: 2150, stock: 8 },
      { weight: "1kg", price: 4100, stock: 4 },
    ],
  },
  {
    id: "prod-5",
    name: "Clover Blossom Raw Honey",
    slug: "clover-blossom-raw-honey",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Classic mild golden honey harvested from sunny clover meadows. Smooth floral finish perfect for teas and baking.",
    rating: 4.7,
    reviewsCount: 41,
    variants: [
      { weight: "250g", price: 800, stock: 35 },
      { weight: "500g", price: 1500, stock: 22 },
      { weight: "1kg", price: 2900, stock: 15 },
    ],
  },
  {
    id: "prod-6",
    name: "Raw Honeycomb with Pure Mountain Nectar",
    slug: "raw-honeycomb-pure-mountain-nectar",
    category: "Honey",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "100% pure raw honeycomb cut straight from natural frames. Edible beeswax packed with living bee pollen and propolis.",
    rating: 5.0,
    reviewsCount: 38,
    variants: [
      { weight: "350g Comb", price: 1750, stock: 12 },
      { weight: "700g Comb", price: 3300, stock: 6 },
    ],
  },

  // ===================== 2. ALMONDS & NUTS (6 Products) =====================
  {
    id: "prod-7",
    name: "California Jumbo Almonds (Giri)",
    slug: "california-jumbo-almonds",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Crisp, sweet, and bursting with beneficial natural oils. Extra-large kernels handpicked for daily energy and vitality.",
    rating: 4.8,
    reviewsCount: 96,
    variants: [
      { weight: "250g", price: 750, stock: 45 },
      { weight: "500g", price: 1450, stock: 32 },
      { weight: "1kg", price: 2800, stock: 20 },
    ],
  },
  {
    id: "prod-8",
    name: "Kaghzi Badam (Soft Shell Pakistani Almonds)",
    slug: "kaghzi-badam-soft-shell-almonds",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Native Balochistan paper-shell almonds easily cracked with bare fingers. Rich aroma with high oil concentration.",
    rating: 4.9,
    reviewsCount: 82,
    variants: [
      { weight: "500g", price: 1350, stock: 28 },
      { weight: "1kg", price: 2600, stock: 18 },
    ],
  },
  {
    id: "prod-9",
    name: "Roasted Salted Pistachios (Pista)",
    slug: "roasted-salted-pistachios",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Naturally opened, gently slow-roasted with Himalayan pink salt. Crisp texture and deeply satisfying crunch.",
    rating: 4.7,
    reviewsCount: 73,
    variants: [
      { weight: "250g", price: 900, stock: 28 },
      { weight: "500g", price: 1750, stock: 19 },
      { weight: "1kg", price: 3400, stock: 11 },
    ],
  },
  {
    id: "prod-10",
    name: "Whole Roasted Cashews (Kaju)",
    slug: "whole-roasted-cashews-kaju",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "W240 export grade creamy white cashews. Lightly toasted to enhance their naturally buttery and rich texture.",
    rating: 4.9,
    reviewsCount: 81,
    variants: [
      { weight: "250g", price: 850, stock: 35 },
      { weight: "500g", price: 1650, stock: 24 },
      { weight: "1kg", price: 3200, stock: 15 },
    ],
  },
  {
    id: "prod-11",
    name: "Raw Brazil Nuts",
    slug: "raw-brazil-nuts",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Unmatched source of dietary selenium. Large, nutty, crunchy kernels harvested from tropical Amazon rainforest canopies.",
    rating: 4.6,
    reviewsCount: 39,
    variants: [
      { weight: "250g", price: 990, stock: 16 },
      { weight: "500g", price: 1920, stock: 9 },
    ],
  },
  {
    id: "prod-12",
    name: "Raw Hazelnuts (Bunduq)",
    slug: "raw-hazelnuts-bunduq",
    category: "Nuts",
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Premium European round hazelnuts with a crisp earthy crunch. Ideal for smoothies, homemade nut butters, and energy bites.",
    rating: 4.8,
    reviewsCount: 34,
    variants: [
      { weight: "250g", price: 820, stock: 20 },
      { weight: "500g", price: 1600, stock: 14 },
    ],
  },

  // ===================== 3. ORGANIC DRY FRUITS (6 Products) =====================
  {
    id: "prod-13",
    name: "Mountain Walnuts (Akhrot Giri)",
    slug: "mountain-walnuts-akhrot",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Fresh light-kernel Gilgit mountain walnuts packed with plant-based Omega-3 fatty acids and memory enhancers.",
    rating: 5.0,
    reviewsCount: 88,
    variants: [
      { weight: "250g", price: 850, stock: 30 },
      { weight: "500g", price: 1650, stock: 22 },
      { weight: "1kg", price: 3200, stock: 14 },
    ],
  },
  {
    id: "prod-14",
    name: "Sundried Afghan Green Raisins (Kishmish)",
    slug: "sundried-afghan-green-raisins",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Extra long green raisins naturally dried under warm alpine sun. Sweet, seedless, and loaded with natural iron.",
    rating: 4.8,
    reviewsCount: 62,
    variants: [
      { weight: "250g", price: 450, stock: 50 },
      { weight: "500g", price: 850, stock: 35 },
      { weight: "1kg", price: 1600, stock: 20 },
    ],
  },
  {
    id: "prod-15",
    name: "Kandahar Dried Organic Figs (Anjeer)",
    slug: "kandahar-dried-organic-figs-anjeer",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Jumbo hand-threaded dried figs with natural crunchy seeds inside. Traditional superfood for digestive health and stamina.",
    rating: 4.9,
    reviewsCount: 94,
    variants: [
      { weight: "250g", price: 890, stock: 25 },
      { weight: "500g", price: 1700, stock: 18 },
      { weight: "1kg", price: 3300, stock: 10 },
    ],
  },
  {
    id: "prod-16",
    name: "Dried Seedless Turkish Apricots",
    slug: "dried-seedless-turkish-apricots",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Golden sweet sundried whole apricots. Moist, tender, and rich in natural Vitamin A and dietary fiber.",
    rating: 4.7,
    reviewsCount: 45,
    variants: [
      { weight: "250g", price: 550, stock: 38 },
      { weight: "500g", price: 1050, stock: 24 },
      { weight: "1kg", price: 2000, stock: 16 },
    ],
  },
  {
    id: "prod-17",
    name: "Royal Black Raisins (Munakka)",
    slug: "royal-black-raisins-munakka",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Large fleshy seeded black raisins known in Ayurvedic and Unani traditions for strengthening bone density and blood circulation.",
    rating: 4.8,
    reviewsCount: 57,
    variants: [
      { weight: "250g", price: 520, stock: 30 },
      { weight: "500g", price: 990, stock: 20 },
      { weight: "1kg", price: 1900, stock: 12 },
    ],
  },
  {
    id: "prod-18",
    name: "Medjool Luxury Dates (Khajoor)",
    slug: "medjool-luxury-dates-khajoor",
    category: "Dry Fruits",
    images: [
      "https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "King of Dates: Large, plump, naturally caramel-sweet fruit with velvety soft texture. Handpicked during peak harvest.",
    rating: 5.0,
    reviewsCount: 115,
    variants: [
      { weight: "500g Box", price: 1450, stock: 40 },
      { weight: "1kg Box", price: 2800, stock: 25 },
    ],
  },

  // ===================== 4. HEALTHY SEEDS (4 Products) =====================
  {
    id: "prod-19",
    name: "Organic Chia & Basil Seeds Trio",
    slug: "chia-basil-seeds-trio",
    category: "Seeds",
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Cleaned, raw whole black chia seeds and sweet tukhm-e-balanga. Essential morning companion for weight balance.",
    rating: 4.8,
    reviewsCount: 51,
    variants: [
      { weight: "250g", price: 450, stock: 60 },
      { weight: "500g", price: 850, stock: 40 },
      { weight: "1kg", price: 1600, stock: 25 },
    ],
  },
  {
    id: "prod-20",
    name: "Roasted Pumpkin & Sunflower Seeds",
    slug: "roasted-pumpkin-sunflower-seeds",
    category: "Seeds",
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Crunchy pepitas and shelled sunflower seeds lightly salted. Abundant in zinc, magnesium, and plant protein.",
    rating: 4.9,
    reviewsCount: 38,
    variants: [
      { weight: "250g", price: 490, stock: 35 },
      { weight: "500g", price: 950, stock: 20 },
    ],
  },
  {
    id: "prod-21",
    name: "Golden Raw Flaxseeds (Alsi)",
    slug: "golden-raw-flaxseeds-alsi",
    category: "Seeds",
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "High-lignan golden flaxseeds packed with soluble dietary fiber and cardiovascular support nutrients.",
    rating: 4.6,
    reviewsCount: 29,
    variants: [
      { weight: "250g", price: 320, stock: 50 },
      { weight: "500g", price: 600, stock: 30 },
    ],
  },
  {
    id: "prod-22",
    name: "Organic Raw White Sesame Seeds (Til)",
    slug: "organic-raw-white-sesame-seeds-til",
    category: "Seeds",
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Pristine natural white sesame seeds. Exceptional plant-based calcium provider for bones and winter traditional sweets.",
    rating: 4.7,
    reviewsCount: 33,
    variants: [
      { weight: "250g", price: 350, stock: 45 },
      { weight: "500g", price: 680, stock: 25 },
    ],
  },

  // ===================== 5. LUXURY GIFT BOXES (4 Products) =====================
  {
    id: "prod-23",
    name: "Royal Dry Fruit Gift Hamper",
    slug: "royal-dry-fruit-gift-hamper",
    category: "Gift Boxes",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Handcrafted pine-wood chest loaded with 4 partitioned compartments containing premium cashews, pistachios, raisins, and walnuts.",
    rating: 5.0,
    reviewsCount: 84,
    variants: [
      { weight: "800g Hamper", price: 3499, stock: 15 },
      { weight: "1.5kg Luxury Chest", price: 6200, stock: 8 },
    ],
  },
  {
    id: "prod-24",
    name: "Festive Velvet Celebration Box",
    slug: "festive-velvet-celebration-box",
    category: "Gift Boxes",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Regal emerald green velvet box packaged with royal roasted almonds, saffron infusion jar, and golden dried figs.",
    rating: 4.9,
    reviewsCount: 47,
    variants: [{ weight: "1kg Box", price: 4799, stock: 12 }],
  },
  {
    id: "prod-25",
    name: "Imperial Saffron & Nut Treasure Box",
    slug: "imperial-saffron-nut-treasure-box",
    category: "Gift Boxes",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Exclusive artisanal gold-foil embossed box featuring 2g pure Kashmiri Mongra Saffron, jumbo pistachios, and roasted cashews.",
    rating: 5.0,
    reviewsCount: 31,
    variants: [{ weight: "750g Box", price: 5899, stock: 7 }],
  },
  {
    id: "prod-26",
    name: "Corporate Executive Gift Platter",
    slug: "corporate-executive-gift-platter",
    category: "Gift Boxes",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Laser-etched bamboo presentation platter arranged with premium dry fruit assortment and miniature pure Sidr honey jar.",
    rating: 4.8,
    reviewsCount: 26,
    variants: [{ weight: "1.2kg Platter", price: 5200, stock: 10 }],
  },

  // ===================== 6. SPECIAL COMBOS (4 Products) =====================
  {
    id: "prod-27",
    name: "Ramadan Energy Mega Combo",
    slug: "ramadan-energy-mega-combo",
    category: "Combos",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Complete wellness trio: 500g Pure Wild Honey, 500g California Almonds, and 500g Gilgit Walnuts at special discounted pack pricing.",
    rating: 4.9,
    reviewsCount: 118,
    variants: [{ weight: "1.5kg Combo Pack", price: 4499, stock: 30 }],
  },
  {
    id: "prod-28",
    name: "Immunity Boost Breakfast Duo",
    slug: "immunity-boost-breakfast-duo",
    category: "Combos",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Morning power bundle featuring 500g Kashmiri Organic Wild Honey paired with 500g Chia & Basil Seeds mix.",
    rating: 4.8,
    reviewsCount: 67,
    variants: [{ weight: "1kg Duo Pack", price: 2350, stock: 22 }],
  },
  {
    id: "prod-29",
    name: "Student Memory & Focus Bundle",
    slug: "student-memory-focus-bundle",
    category: "Combos",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Exam preparation pack containing 500g Mountain Walnuts and 500g California Jumbo Almonds for sustained mental focus.",
    rating: 4.9,
    reviewsCount: 85,
    variants: [{ weight: "1kg Bundle", price: 2950, stock: 35 }],
  },
  {
    id: "prod-30",
    name: "Winter Warmth Traditional Pack",
    slug: "winter-warmth-traditional-pack",
    category: "Combos",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    ],
    description:
      "Traditional cold weather bundle: 500g Sidr Honey, 500g Roasted Salted Pistachios, and 250g Kandahar Dried Figs.",
    rating: 5.0,
    reviewsCount: 92,
    variants: [{ weight: "1.25kg Winter Pack", price: 4850, stock: 18 }],
  },
];
