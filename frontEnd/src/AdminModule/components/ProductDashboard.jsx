import { useState, useEffect } from 'react';
import api from '../../api';
import AddProductForm from './AddProductForm';
import EditProductModal from './EditProductModal';
import styles from './ProductDashboard.module.css'; // Import the new theme

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        setLoading(true);
        api.get('/api/admin/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error("Failed to fetch products", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/api/admin/products/${productId}`);
                fetchProducts(); // Refresh the list
            } catch (err) {
                alert('Failed to delete product.');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateSuccess = () => {
        setEditingProduct(null); // Close the modal
        fetchProducts(); // Refresh the list
    };

    const handleToggleStock = async (productId) => {
        try {
            await api.put(`/api/admin/products/${productId}/stock`);
            fetchProducts(); // Refresh the list to show the new status
        } catch (err) {
            alert('Failed to update stock status.');
        }
    };

    return (
        <div className={styles.productDashboardContainer}>
            <AddProductForm onProductAdded={fetchProducts} />
            <hr className={styles.divider} />
            <h2 className={styles.sectionTitle}>Existing Products</h2>
            {loading ? <p className={styles.infoText}>Loading products...</p> : (
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.product_id}>
                                <td>{p.product_id}</td>
                                <td>{p.name}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${p.outOfStock ? styles.statusOos : styles.statusInstock}`}>
                                        {p.outOfStock ? 'Out of Stock' : 'In Stock'}
                                    </span>
                                </td>
                                <td className={styles.actionButtons}>
                                    <button className={styles.btnSecondary} onClick={() => handleToggleStock(p.product_id)}>
                                        Toggle Stock
                                    </button>
                                    <button className={styles.btnSecondary} onClick={() => handleEdit(p)}>Edit</button>
                                    <button className={styles.btnDanger} onClick={() => handleDelete(p.product_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onProductUpdated={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default ProductDashboard;