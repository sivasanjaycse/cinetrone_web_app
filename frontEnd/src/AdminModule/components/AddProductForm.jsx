import { useState } from 'react';
import api from '../../api';
import styles from './AddProductForm.module.css'; // Import the CSS module

const AddProductForm = ({ onProductAdded }) => {
    const initialState = {
        name: '', actualprice: '', discountedprice: '', product_description: '',
        images: ['', '', '', '', ''],
        product_spec: [{ key: '', value: '' }]
    };
    const [newProduct, setNewProduct] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };
    
    const handleImageChange = (index, value) => {
        const updatedImages = [...newProduct.images];
        updatedImages[index] = value;
        setNewProduct(prev => ({ ...prev, images: updatedImages }));
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...newProduct.product_spec];
        updatedSpecs[index][field] = value;
        setNewProduct(prev => ({ ...prev, product_spec: updatedSpecs }));
    };

    const addSpecField = () => {
        setNewProduct(prev => ({...prev, product_spec: [...prev.product_spec, { key: '', value: ''}]}));
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/admin/products', newProduct);
            onProductAdded();
            setNewProduct(initialState); // Reset form
            alert('Product added successfully!');
        } catch (err) {
            alert('Failed to add product.');
        }
    };

    return (
        <div className={styles.addProductContainer}>
            <h2 className={styles.formTitle}>Add New Product</h2>
            <form onSubmit={handleAddProduct} className={styles.addProductForm}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label>Product Name</label>
                        <input name="name" placeholder="Luxury Sound System X1" value={newProduct.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Actual Price</label>
                        <input name="actualprice" type="number" placeholder="e.g., 90000" value={newProduct.actualprice} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Discounted Price</label>
                        <input name="discountedprice" type="number" placeholder="e.g., 85000" value={newProduct.discountedprice} onChange={handleChange} required />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea name="product_description" placeholder="Describe the product..." value={newProduct.product_description} onChange={handleChange} required></textarea>
                </div>

                <h3 className={styles.subheading}>Image URLs (up to 5)</h3>
                <div className={styles.imageInputs}>
                    {newProduct.images.map((url, index) => (
                        <div className={styles.formGroup} key={index}>
                            <input placeholder={`Image URL ${index + 1}`} value={url} onChange={e => handleImageChange(index, e.target.value)} />
                        </div>
                    ))}
                </div>

                <h3 className={styles.subheading}>Product Specs</h3>
                {newProduct.product_spec.map((spec, index) => (
                    <div key={index} className={styles.specInputGroup}>
                        <input placeholder="Spec Key (e.g., Resolution)" value={spec.key} onChange={e => handleSpecChange(index, 'key', e.target.value)} />
                        <input placeholder="Spec Value (e.g., 4K UHD)" value={spec.value} onChange={e => handleSpecChange(index, 'value', e.target.value)} />
                    </div>
                ))}
                
                <div className={styles.formActions}>
                    <button type="button" onClick={addSpecField} className={styles.btnSecondary}>Add Another Spec</button>
                    <button type="submit" className={styles.btnPrimary}>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;