import React, { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import "./Header.css";

const Header = () => {
  const {
    cart,
    isAuthenticated,
    logout,
    navigateToPage,
    setIsLoginModalOpen,
    setIsCartModalOpen,
    performSearch,
  } = useAppContext();

  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = () => {
    if (localSearchTerm.trim()) {
      performSearch(localSearchTerm.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div
            className="logo"
            onClick={() => navigateToPage("home")}
            style={{ cursor: "pointer" }}
          >
            <h2>AudioVision</h2>
          </div>

          <div className="search-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Search products..."
              className="search-input"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              id="searchBtn"
              className="search-btn"
              onClick={handleSearch}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          <nav className="nav-menu" id="navMenu">
            <a
              href="#"
              onClick={() => navigateToPage("home")}
              className="nav-link"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => navigateToPage("products")}
              className="nav-link"
            >
              Products
            </a>
            <a
              href="#"
              onClick={() => navigateToPage("categories")}
              className="nav-link"
            >
              Categories
            </a>
          </nav>

          <div className="header-actions">
            <button
              id="cartBtn"
              className="cart-btn"
              onClick={() => setIsCartModalOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 4 13 2-1 8H8"></path>
              </svg>
              {cartCount > 0 && (
                <span id="cartCount" className="cart-count">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button
                id="logoutBtn"
                className="btn btn--outline"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <button
                id="loginBtn"
                className="btn btn--primary"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
