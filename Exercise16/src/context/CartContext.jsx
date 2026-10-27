import { createContext, useContext, useMemo, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }

  const value = useMemo(() => ({ cartItems, addToCart, removeFromCart }), [cartItems]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider.');
  return context;
}
