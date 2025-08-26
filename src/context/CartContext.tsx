"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Coffee = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Coffee & {
  quantity: number;
  size: "S" | "M" | "L";
  coffeePrice: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    coffee: Coffee,
    size: "S" | "M" | "L",
    coffeePrice: number,
    quantity?: number
  ) => void;
  updateQuantity: (
    coffeeId: number,
    size: "S" | "M" | "L",
    quantity: number
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const updateQuantity = (coffeeId: number, size: "S" | "M" | "L", quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === coffeeId && item.size === size
          ? { ...item, quantity: quantity < 1 ? 1 : quantity }
          : item
      )
    );
  };

  const addToCart = (
    coffee: Coffee,
    size: "S" | "M" | "L",
    coffeePrice: number,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === coffee.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === coffee.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...coffee, size, coffeePrice, quantity }];
      }
    });
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
