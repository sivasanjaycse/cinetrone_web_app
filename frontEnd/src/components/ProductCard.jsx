// src/components/ProductCard.jsx
import React from "react";
import { getDiscountedPrice } from "../context/AppContext";
import "./ProductCard.css";
const ProductCard = ({ product, onViewDetails }) => {
  const discountedPrice = getDiscountedPrice(product);

  return (
    <div className="product-card" onClick={() => onViewDetails(product.id)}>
      <div className="discount-badge">{product.discount}% OFF</div>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/placeholder.svg";
        }}
      />
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-pricing">
          <span className="current-price">
            ₹{discountedPrice.toLocaleString()}
          </span>
          <span className="original-price">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
