import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import api from '../../api'; // Use the central api instance

const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn } = useAuth();

  const syncCartWithDB = async (itemsToSync) => {
    if (!isLoggedIn) return;
    const simplifiedCart = itemsToSync.map(item => ({ productId: item.id, quantity: item.quantity }));
    try {
      await api.post('/api/cart/sync', { products: simplifiedCart });
    } catch (error) {
      console.error("Failed to sync cart with DB:", error);
    }
  };

  const debouncedSync = useCallback(debounce(syncCartWithDB, 1500), [isLoggedIn]);

  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        try {
          const { data } = await api.get('/api/cart');
          if (data && data.products) {
            const fetchedItems = data.products.map(item => ({
              id: item.productId.product_id,
              name: item.productId.name,
              price: item.productId.discountedprice,
              images: item.productId.images,
              quantity: item.quantity,
            }));
            setCartItems(fetchedItems);
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      debouncedSync(cartItems);
    }
  }, [cartItems, debouncedSync, isLoggedIn]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// --- THIS IS THE CORRECTED LINE ---
export const useCart = () => useContext(CartContext);