"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartItem } from "@/types";

interface ToastData {
  message: string;
  itemName: string;
  weight: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  toast: ToastData | null;
  clearToast: () => void;
}

const STORAGE_KEY = "mewazar_cart";
const MAX_QUANTITY_PER_LINE = 20;

const CartContext = createContext<CartContextType | undefined>(undefined);

/** Reads and validates the saved cart so corrupted storage cannot crash the app. */
function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        !!i &&
        typeof i.id === "string" &&
        typeof i.price === "number" &&
        typeof i.quantity === "number" &&
        i.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist the cart on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage may be unavailable (private mode); the cart still works in memory.
    }
  }, [cart]);

  // Clear any pending toast timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const clearToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "id"> & { id?: string }) => {
      const cartItemId = `${item.productId}-${item.weight}`;

      // Immutable update: safe under React StrictMode double invocation
      setCart((prev) => {
        const existing = prev.find((i) => i.id === cartItemId);
        if (existing) {
          return prev.map((i) =>
            i.id === cartItemId
              ? {
                  ...i,
                  quantity: Math.min(MAX_QUANTITY_PER_LINE, i.quantity + item.quantity),
                }
              : i,
          );
        }
        return [
          ...prev,
          { ...item, id: cartItemId, quantity: Math.min(MAX_QUANTITY_PER_LINE, item.quantity) },
        ];
      });

      setToast({
        message: "Added to your basket",
        itemName: item.name,
        weight: item.weight,
      });
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 3500);
    },
    [],
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(MAX_QUANTITY_PER_LINE, item.quantity + delta),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      subtotal,
      toast,
      clearToast,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      totalItems,
      subtotal,
      toast,
      clearToast,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
