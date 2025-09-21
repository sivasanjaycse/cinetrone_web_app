import { useState, useEffect } from 'react';
import api from '../../api';
import AddProductForm from './AddProductForm';
import EditProductModal from './EditProductModal';

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

    return (
        <div>
            <AddProductForm onProductAdded={fetchProducts} />
            <hr className="divider" />
            <h2>Existing Products</h2>
            {loading ? <p>Loading products...</p> : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.product_id}>
                                <td>{p.product_id}</td>
                                <td>{p.name}</td>
                                <td>₹{p.discountedprice.toLocaleString()}</td>
                                <td>
                                    <button className="btn-secondary" onClick={() => handleEdit(p)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(p.product_id)}>Delete</button>
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