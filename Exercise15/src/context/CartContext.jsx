import { createContext, useContext, useState } from 'react';

const startingItems = [
  { id: 1, name: 'Stoneware cup', price: 28, quantity: 1 },
  { id: 2, name: 'Linen tea towel', price: 19, quantity: 1 }
];

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(startingItems);

  function addItem(product) {
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id);
      if (existing) {
        return currentItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id, change) {
    setItems((currentItems) => currentItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  return <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
