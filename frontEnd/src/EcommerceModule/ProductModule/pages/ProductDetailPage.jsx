import { useParams } from 'react-router-dom';
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

  const handleAddToCart = () => {
      addToCart(product);
      showNotification(`${product.name} added to cart!`, 'success');
  }

  return (
    <div className="container product-detail-container">
      <div className="product-detail-grid">
        <div className="product-images">
          <ImageSlider images={product.images} />
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-brand">by {product.brand}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
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