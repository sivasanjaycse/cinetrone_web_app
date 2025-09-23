import { useState, useEffect } from 'react';
import api from '../../api';
import styles from './EditProductModal.module.css';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
    const [formData, setFormData] = useState({ ...product });

    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/admin/products/${product.product_id}`, formData);
            onProductUpdated();
        } catch (err) {
            alert('Failed to update product.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2 className={styles.modalTitle}>Edit Product #{product.product_id}</h2>
                <form onSubmit={handleSubmit} className={styles.editProductForm}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Actual Price</label>
                        <input name="actualprice" type="number" value={formData.actualprice} onChange={handleChange} />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Discounted Price</label>
                        <input name="discountedprice" type="number" value={formData.discountedprice} onChange={handleChange} />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea name="product_description" value={formData.product_description} onChange={handleChange}></textarea>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={styles.btnSecondary}>Cancel</button>
                        <button type="submit" className={styles.btnPrimary}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;