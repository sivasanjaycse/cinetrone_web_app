import { Link, useParams } from 'react-router-dom'; // Import Link
import { FaArrowLeft } from 'react-icons/fa'; // Import an icon
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import ImageSlider from '../components/ImageSlider';
import './ProductDetailPage.css';
import '../ProductModule.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div className="container product-detail-container"><h2 className="page-title">Product not found.</h2></div>;
  }
  
  // Corrected: Logic to handle the new price object
  const hasDiscount = product.price.discount && product.price.discount < product.price.original;
  let discountPercent = 0;
  if (hasDiscount) {
    discountPercent = Math.round(
      ((product.price.original - product.price.discount) / product.price.original) * 100
    );
  }
  const displayPrice = hasDiscount ? product.price.discount : product.price.original;

  const handleAddToCart = () => {
      addToCart(product);
      showNotification(`${product.name} added to cart!`, 'success');
  }

  return (
    <div className="container product-detail-container">
      {/* New: Back button to return to the store */}
      <Link to="/store" className="back-link">
        <FaArrowLeft />
        <span>Back to Collection</span>
      </Link>

      <div className="product-detail-grid">
        <div className="product-images">
          {hasDiscount && (
            <div className="detail-discount-badge">{discountPercent}% OFF</div>
          )}
          <ImageSlider images={product.images} />
        </div>
        <div className="product-info">
  <h1 className="product-name">{product.name}</h1>
  <p className="product-brand">by {product.brand}</p>
  <p className="product-description">{product.description}</p>
  
  {/* Updated: Price display JSX structure */}
  <div className="detail-price-wrapper">
    <span className="detail-current-price">
      ₹{displayPrice.toLocaleString('en-IN')}
    </span>
    {hasDiscount && (
      <>
        <span className="detail-original-price">
          <s>₹{product.price.original.toLocaleString('en-IN')}</s>
        </span>
        <span className="price-discount-percent">
          ({discountPercent}% OFF)
        </span>
      </>
    )}
  </div>

  <button onClick={handleAddToCart} className="btn-primary">Add to Cart</button>
</div>
      </div>
      <div className="product-specs">
        <h2 className="specs-title">Specifications</h2>
        <ul className="specs-list">
          {product.specifications.map((spec, index) => (
            <li key={index} className="spec-item">
              <strong>{spec.key}:</strong>
              <span>{spec.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailPage;