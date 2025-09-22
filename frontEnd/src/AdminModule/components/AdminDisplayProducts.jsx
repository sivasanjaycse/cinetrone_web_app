import { useState, useEffect } from 'react';
import api from '../../api';
import styles from './AdminDisplayProducts.module.css'; // Import the new theme

const AdminDisplayProducts = () => {
    const [images, setImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Function to fetch all images
    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/display-products');
            setImages(response.data);
        } catch (err) {
            setError('Failed to fetch images.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    // Handler for adding a new image
    const handleAddImage = async (e) => {
        e.preventDefault();
        if (!newImageUrl.trim()) {
            setError('Please enter an image URL.');
            return;
        }
        setError('');
        setMessage('');
        try {
            await api.post('/api/display-products', { url: newImageUrl });
            setNewImageUrl('');
            setMessage('Image added successfully!');
            await fetchImages(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to add image.');
        }
    };

    // Handler for deleting an image
    const handleDeleteImage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) {
            return;
        }
        setError('');
        setMessage('');
        try {
            await api.delete(`/api/display-products/${id}`);
            setMessage('Image deleted successfully!');
            await fetchImages(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to delete image.');
        }
    };

    return (
        <div className={styles.galleryContainer}>
            <h2 className={styles.sectionTitle}>Manage Product Gallery Images</h2>

            <form onSubmit={handleAddImage} className={styles.addForm}>
                <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    required
                />
                <button type="submit" className={styles.btnPrimary}>Add Image</button>
            </form>

            {error && <p className={styles.errorMessage}>{error}</p>}
            {message && <p className={styles.successMessage}>{message}</p>}

            <div className={styles.imageList}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    images.map((image) => (
                        <div key={image._id} className={styles.imageItem}>
                            <img src={image.url} alt="Display Product" />
                            <button onClick={() => handleDeleteImage(image._id)} className={styles.btnDanger}>
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDisplayProducts;