import React, { useState, useMemo } from "react";
import { useAppContext } from "../hooks/useAppContext";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { getDiscountedPrice } from "../context/AppContext";
import "./ProductsPage.css";
const PRODUCTS_PER_PAGE = 20;

const ProductsPage = () => {
  const { products, categories, showProductDetails } = useAppContext();

  // State for filters and pagination is local to this page
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    switch (sortFilter) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
        break;
      case "price-high":
        filtered.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, categoryFilter, sortFilter]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
  };

  return (
    <section id="productsPage" className="page">
      <div className="container">
        <div className="page-header">
          <h1>All Products</h1>
          <div className="filters">
            <select
              id="categoryFilter"
              className="form-control filter-select"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              id="sortFilter"
              className="form-control filter-select"
              value={sortFilter}
              onChange={handleSortChange}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        <div id="productsGrid" className="product-grid">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={showProductDetails}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ProductsPage;
