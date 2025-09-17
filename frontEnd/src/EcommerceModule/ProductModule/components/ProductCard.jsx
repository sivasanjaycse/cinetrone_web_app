// src/ProductModule/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import ImageWithLoader from '../../components/ImageWithLoader/ImageWithLoader';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {/* New: Wrapped ImageWithLoader in a correctly positioned div */}
          <div className={styles.imageContainerForLoader}>
            <ImageWithLoader
              src={product.images[0]}
              alt={product.name}
              // The containerClassName prop is no longer needed
            />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;