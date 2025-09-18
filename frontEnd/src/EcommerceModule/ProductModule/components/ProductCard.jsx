// src/ProductModule/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import ImageWithLoader from '../../components/ImageWithLoader/ImageWithLoader';

const ProductCard = ({ product }) => {
  // New: Logic to handle discounted products
  const hasDiscount = product.price.discount && product.price.discount < product.price.original;
  let discountPercent = 0;
  if (hasDiscount) {
    discountPercent = Math.round(
      ((product.price.original - product.price.discount) / product.price.original) * 100
    );
  }

  const displayPrice = hasDiscount ? product.price.discount : product.price.original;

  return (
    <Link to={`/store/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {/* New: Display discount badge if applicable */}
          {hasDiscount && (
            <div className={styles.discountBadge}>{discountPercent}% OFF</div>
          )}
          <div className={styles.imageContainerForLoader}>
            <ImageWithLoader
              src={product.images[0]}
              alt={product.name}
            />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          {/* New: Updated price display */}
          <div className={styles.priceWrapper}>
            <span className={styles.currentPrice}>
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <span className={styles.originalPrice}>
                ₹{product.price.original.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;