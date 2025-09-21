import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import ImageWithLoader from '../../components/ImageWithLoader/ImageWithLoader';

const ProductCard = ({ product }) => {
  // NEW: Calculate discount
  const discountAmount = product.actualprice - product.discountedprice;
  const discountPercentage = Math.round((discountAmount / product.actualprice) * 100);

  return (
    <Link to={`/store/products/${product.product_id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        {/* NEW: Discount percentage badge */}
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>
            {discountPercentage}% OFF
          </div>
        )}

        <div className={styles.imageWrapper}>
          <div className={styles.imageContainerForLoader}>
            <ImageWithLoader
              src={product.images[0]}
              alt={product.name}
            />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.priceContainer}>
            <p className={styles.price}>
              ₹{product.discountedprice.toLocaleString('en-IN')}
            </p>
            {/* NEW: Show actual price and discount amount */}
            {discountAmount > 0 && (
              <p className={styles.actualPrice}>
                <del>₹{product.actualprice.toLocaleString('en-IN')}</del>
              </p>
            )}
          </div>
          {discountAmount > 0 && (
            <p className={styles.discountAmount}>
              Save ₹{discountAmount.toLocaleString('en-IN')}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;