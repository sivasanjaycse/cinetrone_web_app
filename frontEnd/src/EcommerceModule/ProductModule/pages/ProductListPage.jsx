import { useState, useMemo } from 'react'; // Changed
import { products } from '../../data/products';
import ProductCard from '../components/ProductCard';
import './ProductListPage.css';
import '../ProductModule.css';

const PRODUCTS_PER_PAGE = 20;

const ProductListPage = () => {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState(''); // New: for search input
  const [sortBy, setSortBy] = useState('default');   // New: for sorting dropdown

  // New: Memoized calculation for filtered and sorted products
  const filteredProducts = useMemo(() => {
    let searchableProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'price-asc':
        searchableProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        searchableProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep original order or sort by ID
        searchableProducts.sort((a, b) => a.id - b.id);
        break;
    }
    return searchableProducts;
  }, [searchTerm, sortBy]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + PRODUCTS_PER_PAGE);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="container product-list-container">
      <h1 className="page-title">Our Collection</h1>

      {/* New: Filter and Search Controls */}
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* New: Conditional message if no products found */}
      {filteredProducts.length === 0 && (
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