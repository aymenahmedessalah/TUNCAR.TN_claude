import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const SHIPPING_FEE = 7.0;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  /**
   * Adds a part to the cart.
   * Business rule: used parts are physically one-of-a-kind, so their
   * quantity is always locked to 1. New parts can be stacked freely.
   */
  function addItem(part) {
    setItems((current) => {
      const existing = current.find((item) => item.id === part.id);
      if (existing) {
        if (existing.condition === "used") return current; // already at max (1)
        return current.map((item) => (item.id === part.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { ...part, qty: 1 }];
    });
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function changeQty(id, delta) {
    setItems((current) => {
      return current
        .map((item) => {
          if (item.id !== id) return item;
          if (item.condition === "used") return item; // locked quantity
          return { ...item, qty: item.qty + delta };
        })
        .filter((item) => item.qty > 0);
    });
  }

  function clearCart() {
    setItems([]);
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = items.length > 0 ? SHIPPING_FEE : 0;
    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
    return { subtotal, shipping, total: subtotal + shipping, totalQty };
  }, [items]);

  const value = { items, addItem, removeItem, changeQty, clearCart, totals };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
