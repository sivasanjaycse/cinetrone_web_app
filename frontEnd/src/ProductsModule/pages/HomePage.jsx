import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";
const HomePage = () => {
  const { products, navigateToPage, showProductDetails } = useAppContext();

  // Show the first 8 products as featured
  const featuredProducts = products.slice(0, 8);

  return (
    <section id="homePage" className="page">
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Premium Home Theater Experience</h1>
            <p>
              Discover our curated collection of high-end speakers, soundbars,
              and audio systems for the ultimate home entertainment setup.
            </p>
            <button
              className="btn btn--primary btn--lg"
              onClick={() => navigateToPage("products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="featured-products">
          <h2 style={{ marginTop: "32px", marginBottom: "32px" }}>
            Featured Products
          </h2>
          <div id="featuredGrid" className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={showProductDetails}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default HomePage;
