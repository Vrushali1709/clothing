import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. LocalStorage માંથી સાચવેલો ડેટા લોડ કરો
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart_data');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("LocalStorage error:", error);
      return [];
    }
  });

  // 2. જ્યારે પણ કાર્ટ અપડેટ થાય ત્યારે તેને LocalStorage માં સેવ કરો
  useEffect(() => {
    localStorage.setItem('cart_data', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product, size, color) => {
    const newItem = {
      ...product,
      selectedSize: size || 'Standard',
      selectedColor: color || 'Default',
      cartId: `${product.id}-${size || 'Std'}-${color || 'Def'}` // Unique ID for variation
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartId === newItem.cartId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === newItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart_data');
  };

  // Total price calculation (વિના ભૂલે નંબર કન્વર્ઝન સાથે)
  const totalPrice = cart.reduce(
    (total, item) => total + (Number(item.price || 0) * Number(item.quantity || 1)), 
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}