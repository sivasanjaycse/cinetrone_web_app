import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductGalleryTeaser.module.css";
import Product1 from '../../assets/product1.jpeg';
import Product2 from '../../assets/product2.jpeg';
import Product3 from '../../assets/product3.jpeg';

const images = [Product1, Product2, Product3];

const ProductGalleryTeaser = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="section">
            <div className="container">
                <h2 className="sectionTitle">Our Products</h2>
                <div className={styles.galleryGrid}>
                    {images.map((src, index) => (
                        <div 
                            key={index} 
                            className={styles.galleryItem}
                            onClick={() => setSelectedImage(src)}
                        >
                            <img src={src} alt={`Product ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className={styles.cta}>
                    <Link to="/products" className={styles.btn}>Visit Full Gallery</Link>
                </div>
            </div>
            {selectedImage && (
                <div className={styles.lightboxOverlay} onClick={() => setSelectedImage(null)}>
                    <div className={styles.lightboxContent}>
                        <span className={styles.closeButton}>&times;</span>
                        <img src={selectedImage} alt="Enlarged product view" className={styles.lightboxImage} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductGalleryTeaser;