import React, { useState } from "react";
import { useAppContext } from "./hooks/useAppContext";
import { getDiscountedPrice } from "./context/AppContext";

// Layout and Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  const {
    currentPage,
    searchTerm,
    products,
    showProductDetails,
    message,
    // Modal states and handlers
    isLoginModalOpen,
    setIsLoginModalOpen,
    isCartModalOpen,
    setIsCartModalOpen,
    productForDetail,
    setProductForDetail,
    // Auth and Cart
    login,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useAppContext();

  // --- Page Rendering Logic ---
  const renderPage = () => {
    if (currentPage === "search") {
      const searchResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        <section id="searchPage" className="page">
          <div className="container">
            <h1 id="searchTitle">Search Results for "{searchTerm}"</h1>
            <div id="searchGrid" className="product-grid">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={showProductDetails}
                  />
                ))
              ) : (
                <div className="text-center">
                  <p>No products found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "categories":
        return <CategoriesPage />;
      default:
        return <HomePage />;
    }
  };

  // --- Modal Content Rendering ---
  const LoginModalContent = () => {
    const [showOtp, setShowOtp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSendOtp = (e) => {
      e.preventDefault();
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (phoneRegex.test(phoneNumber)) {
        setShowOtp(true);
      } else {
        alert("Please enter a valid phone number");
      }
    };

    const handleVerifyOtp = (e) => {
      e.preventDefault();
      // Dummy OTP verification
      login(phoneNumber);
    };

    return (
      <>
        {!showOtp ? (
          <form id="loginForm" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control"
                placeholder="+91 98765 43210"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn--primary btn--full-width"
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form id="otpForm" onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otpCode" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otpCode"
                className="form-control"
                placeholder="123456"
                required
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn--primary btn--full-width"
              >
                Verify OTP
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  const ProductDetailModalContent = () => {
    if (!productForDetail) return null;
    const discountedPrice = getDiscountedPrice(productForDetail);
    return (
      <div className="product-detail">
        <div className="product-detail-image-container">
          <img
            src={productForDetail.image}
            alt={productForDetail.name}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <div className="product-detail-brand">{productForDetail.brand}</div>
          <h2>{productForDetail.name}</h2>
          <div className="product-detail-pricing">
            <span className="current-price">
              ₹{discountedPrice.toLocaleString()}
            </span>
            <span className="original-price">
              ₹{productForDetail.originalPrice.toLocaleString()}
            </span>
            <span className="discount-badge">
              {productForDetail.discount}% OFF
            </span>
          </div>
          <p className="product-detail-description">
            {productForDetail.description}
          </p>
          <div className="product-specifications">
            <h4>Specifications</h4>
            <ul>
              {productForDetail.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
          <div className="add-to-cart-section">
            <button
              className="btn btn--primary"
              onClick={() => addToCart(productForDetail.id)}
            >
              Add to Cart
            </button>
            <button
              className="btn btn--outline"
              onClick={() => setProductForDetail(null)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartModalContent = () => {
    if (cart.length === 0) {
      return (
        <div className="cart-empty">
          <p>Your cart is empty</p>
        </div>
      );
    }

    const cartTotal = cart.reduce(
      (sum, item) => sum + getDiscountedPrice(item) * item.quantity,
      0
    );

    return (
      <>
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">
                  ₹{getDiscountedPrice(item).toLocaleString()}
                </div>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">Total: ₹{cartTotal.toLocaleString()}</div>
          <button className="btn btn--primary btn--full-width">
            Proceed to Checkout
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <main className="main">{renderPage()}</main>
      <Footer />

      {/* --- Global Modals --- */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Login with Phone Number"
      >
        <LoginModalContent />
      </Modal>

      <Modal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        title="Shopping Cart"
      >
        <CartModalContent />
      </Modal>

      <Modal
        isOpen={!!productForDetail}
        onClose={() => setProductForDetail(null)}
        title="Product Details"
        size="large"
      >
        <ProductDetailModalContent />
      </Modal>

      {/* --- Global Notification Message --- */}
      {message.visible && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
          }}
        >
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
