import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import ImageWithLoader from '../../components/ImageWithLoader/ImageWithLoader';

const ProductCard = ({ product }) => {
  const discountAmount = product.actualprice - product.discountedprice;
  const discountPercentage = Math.round((discountAmount / product.actualprice) * 100);

  return (
    <Link to={`/store/products/${product.product_id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        {/* Discount percentage badge */}
        {discountPercentage > 0 && !product.outOfStock && (
          <div className={styles.discountBadge}>
            {discountPercentage}% OFF
          </div>
        )}

        {/* Out of Stock Badge */}
        {product.outOfStock && (
          <div className={styles.stockBadge}>Out of Stock</div>
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