// src/store/cart.store.ts
import { create } from "zustand";

export type CartItem = {
  id_producto: number;
  nombre: string;
  precio: number;       // precio unitario
  cantidad: number;
  imagen_url?: string;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "cantidad">) => void;
  clearCart: () => void;
  subtotal: () => number;
  removeFromCart: (id_producto: number) => void; 
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) => {
    const items = get().items;
    const existente = items.find((i) => i.id_producto === item.id_producto);

    if (existente) {
      set({
        items: items.map((i) =>
          i.id_producto === item.id_producto
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        ),
      });
    } else {
      set({
        items: [...items, { ...item, cantidad: 1 }],
      });
    }
  },

  clearCart: () => set({ items: [] }),

  subtotal: () =>
    get().items.reduce((acc, item) => acc + item.precio * item.cantidad, 0),

  removeFromCart: (id_producto) => {
    const { items } = get();
    const filtrados = items.filter(
      (item) => item.id_producto !== id_producto
    );
    set({ items: filtrados });
  },
}));
