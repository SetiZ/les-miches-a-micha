// https://whateverittech.medium.com/manage-shopping-cart-in-nextjs-13-with-zustand-99421fc6a2ec
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Product = {
  id: number;
  name: string;
  price: number;
};

interface CartItem extends Product {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  total: () => number;
  add: (product: Product) => void;
  remove: (idProduct: number) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => item.count)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      total: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => item.count * item.price)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      add: (product: Product) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
      },
      remove: (idProduct: number) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        set({ cart: updatedCart });
      },
      removeAll: () => set({ cart: [] }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

function updateCart(product: Product, cart: CartItem[]): CartItem[] {
  const cartItem = { ...product, count: 1 } as CartItem;

  const productOnCart = cart.map((item) => item.id).includes(product.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === product.id)
        return { ...item, count: item.count + 1 } as CartItem;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: number, cart: CartItem[]): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
