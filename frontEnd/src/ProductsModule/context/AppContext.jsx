import React, { createContext, useState, useEffect } from "react";
import {
  products as productData,
  categories as categoryData,
} from "../data/products";

export const AppContext = createContext();

export const getDiscountedPrice = (product) => {
  if (
    !product ||
    typeof product.originalPrice !== "number" ||
    typeof product.discount !== "number"
  ) {
    return 0;
  }
  return Math.round(product.originalPrice * (1 - product.discount / 100));
};

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products] = useState(productData);
  const [categories] = useState(categoryData);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  // State for modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [productForDetail, setProductForDetail] = useState(null);

  // State for notifications
  const [message, setMessage] = useState({
    text: "",
    type: "",
    visible: false,
  });

  const showMessage = (text, type = "success") => {
    setMessage({ text, type, visible: true });
    setTimeout(() => {
      setMessage({ text: "", type: "", visible: false });
    }, 3000);
  };

  const login = (phoneNumber) => {
    setIsAuthenticated(true);
    setCurrentUser({ phoneNumber });
    setIsLoginModalOpen(false);
    showMessage("Successfully logged in!", "success");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCart([]);
    showMessage("Successfully logged out!", "success");
  };

  const addToCart = (productId) => {
    if (!isAuthenticated) {
      if (productForDetail) setProductForDetail(null); // Close product modal if open
      setIsLoginModalOpen(true);
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showMessage("Product added to cart!", "success");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setSearchTerm(""); // Clear search when navigating manually
  };

  const performSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage("search");
  };

  const showProductDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setProductForDetail(product);
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    cart,
    products,
    categories,
    currentPage,
    searchTerm,
    isLoginModalOpen,
    isCartModalOpen,
    productForDetail,
    message,

    login,
    logout,
    addToCart,
    updateQuantity,
    removeFromCart,
    navigateToPage,
    performSearch,
    setIsLoginModalOpen,
    setIsCartModalOpen,
    showProductDetails,
    setProductForDetail,
    showMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
