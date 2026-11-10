export interface ProductVariant {
  weight: string; // e.g. "250g", "500g", "1kg"
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Honey" | "Dry Fruits" | "Nuts" | "Seeds" | "Gift Boxes" | "Combos";
  images: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  variants: ProductVariant[];
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
}
