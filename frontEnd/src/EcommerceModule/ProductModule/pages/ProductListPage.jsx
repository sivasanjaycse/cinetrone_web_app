import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import './ProductListPage.css';
import '../ProductModule.css';

const PRODUCTS_PER_PAGE = 20;

const ProductListPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setAllProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let searchableProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'price-asc':
        searchableProducts.sort((a, b) => a.discountedprice - b.discountedprice);
        break;
      case 'price-desc':
        searchableProducts.sort((a, b) => b.discountedprice - a.discountedprice);
        break;
      default:
        searchableProducts.sort((a, b) => a.product_id - b.product_id);
        break;
    }
    return searchableProducts;
  }, [searchTerm, sortBy, allProducts]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + PRODUCTS_PER_PAGE);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (loading) {
    return <div className="container product-list-container" style={{ textAlign: 'center', paddingTop: '100px' }}><Spinner /></div>;
  }

  if (error) {
    return <div className="container product-list-container"><p className="no-products-found">{error}</p></div>;
  }

  return (
    <div className="container product-list-container">
      <h1 className="page-title">Our Collection</h1>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search for a product..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <p className="no-products-found">No products match your criteria.</p>
      )}

      {visibleCount < filteredProducts.length && (
        <div className="show-more-container">
          <button onClick={handleShowMore} className="btn-primary">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;