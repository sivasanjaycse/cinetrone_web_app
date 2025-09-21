import { Link } from "react-router-dom";
import styles from "./ProductGalleryTeaser.module.css";

// 1. Import each image from your assets folder
//    The path '../../' goes up from components/ProductGalleryTeaser/ to the root
import Product1 from '../../assets/product1.jpeg';
import Product2 from '../../assets/product2.jpeg';
import Product3 from '../../assets/product3.jpeg';



// 2. Use the imported variables in the images array
const images = [Product1, Product2, Product3];

const ProductGalleryTeaser = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="sectionTitle">Our Products</h2>
        <div className={styles.galleryGrid}>
          {images.map((src, index) => (
            <div key={index} className={styles.galleryItem}>
              {/* This will now work correctly */}
              <img src={src} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link to="/products" className={styles.btn}>Visit Full Gallery</Link>
        </div>
      </div>
    </section>
  );
};
export default ProductGalleryTeaser;