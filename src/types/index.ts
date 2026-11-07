/** Category name. The list of categories is managed in the admin panel. */
export type ProductCategory = string;

export interface ProductVariant {
  weight: string; // e.g. "250g", "500g", "1kg"
  price: number;
  /** Original price shown crossed out when the product is on sale. */
  comparePrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  /** Remote image URLs, or "art:<kind>" to use a built-in illustration. */
  images: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  variants: ProductVariant[];
  isFeatured?: boolean;
  isNew?: boolean;
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
