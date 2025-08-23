"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Coffee = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Coffee & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (coffee: Coffee, quantity?: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (coffee: Coffee, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === coffee.id);
      if (existing) {
        return prev.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...coffee, quantity }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
