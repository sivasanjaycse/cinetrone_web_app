import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // MODIFIED: Import useNavigate
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import ImageSlider from '../components/ImageSlider';
import Spinner from '../../components/Spinner/Spinner';
import './ProductDetailPage.css';
import '../ProductModule.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); // NEW: Initialize the navigate hook
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found or an error occurred.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="container product-detail-container" style={{ textAlign: 'center', paddingTop: '100px' }}><Spinner /></div>;
  }
  
  if (error || !product) {
    return <div className="container product-detail-container"><h2 className="page-title">{error || 'Product not found.'}</h2></div>;
  }

  const handleAddToCart = () => {
    const productForCart = {
        id: product.product_id,
        name: product.name,
        price: product.discountedprice,
        images: product.images,
        brand: product.brand || 'Cinetrone'
    };
    addToCart(productForCart);
    showNotification(`${product.name} added to cart!`, 'success');
  }

  return (
    <div className="container product-detail-container">
      {/* NEW: Back button */}
      <button onClick={() => navigate(-1)} className="back-button">← Go Back</button>

      <div className="product-detail-grid">
        <div className="product-images">
          <ImageSlider images={product.images} />
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.product_description}</p>
          <div className="price-container">
            <span className="product-price">₹{product.discountedprice.toLocaleString('en-IN')}</span>
            <span className="product-mrp">M.R.P.: <del>₹{product.actualprice.toLocaleString('en-IN')}</del></span>
          </div>
          <button onClick={handleAddToCart} className="btn-primary">Add to Cart</button>
        </div>
      </div>
      <div className="product-specs">
        <h2 className="specs-title">Specifications</h2>
        <ul className="specs-list">
          {product.product_spec.map((spec, index) => (
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