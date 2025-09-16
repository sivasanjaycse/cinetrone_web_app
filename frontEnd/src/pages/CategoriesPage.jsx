import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import './CategoriesPage.css'

const CategoriesPage = () => {
  const { categories, products, navigateToPage } = useAppContext();

  // A simple click handler for demonstration
  // In a real app with routing, this would navigate to `/products?category=...`
  const handleCategoryClick = (categoryName) => {
    // For our SPA simulation, we can navigate to the products page.
    // A more advanced implementation could set the category filter in context.
    alert(
      `Navigating to ${categoryName}. This would typically change the route and filter the products page.`
    );
    navigateToPage("products");
  };

  return (
    <section id="categoriesPage" className="page">
      <div className="container">
        <h1>Shop by Categories</h1>
        <div id="categoriesGrid" className="categories-grid">
          {categories.map((category) => {
            const count = products.filter(
              (p) => p.category === category
            ).length;
            return (
              <div
                key={category}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <h3>{category}</h3>
                <p className="category-count">{count} products</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;
