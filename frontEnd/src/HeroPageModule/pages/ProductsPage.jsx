import { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import BackButton from "../components/BackButton/BackButton";
import styles from "./PageStyles.module.css";
import api from "../../api"; // Your configured axios instance

const ProductsPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // NEW: State to manage the selected image for the lightbox
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get('/api/display-products');
                setImages(response.data);
            } catch (err) {
                setError('Failed to load images. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
            <Header />
            <BackButton />
            <header className="pageHeader">
                <h1 className="pageTitle">Product Gallery</h1>
            </header>
            <div className="pageContent">
                <div className="container">
                    <p>Explore a selection of the high-performance equipment and elegant finishing materials we use in our turnkey projects.</p>
                    
                    {loading && <p>Loading images...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    {!loading && !error && (
                        <div className={styles.galleryGrid}>
                            {images.map((image) => (
                                // NEW: Added onClick to open the lightbox
                                <div 
                                    key={image._id} 
                                    className={styles.galleryItem} 
                                    onClick={() => setSelectedImage(image.url)}
                                >
                                    <img src={image.url} alt={`Product example`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* NEW: Lightbox JSX, rendered conditionally */}
            {selectedImage && (
                <div className={styles.lightboxOverlay} onClick={() => setSelectedImage(null)}>
                    <div className={styles.lightboxContent}>
                        <span className={styles.closeButton}>&times;</span>
                        <img src={selectedImage} alt="Enlarged product view" className={styles.lightboxImage} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsPage;