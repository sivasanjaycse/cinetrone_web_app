import styles from './OrderDetailsModal.module.css';

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Order Details</h2>
                <div className={styles.section}>
                    <h4>Order #{order.orderId}</h4>
                    <p><strong>Status:</strong> <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>{order.status}</span></p>
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className={styles.section}>
                    <h4>Shipping To</h4>
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.pincode}</p>
                    <p>Mobile: {order.shippingAddress.mobile}</p>
                </div>
                <div className={styles.section}>
                    <h4>Items ({order.products.length})</h4>
                    <ul className={styles.itemList}>
                        {order.products.map(item => (
                            <li key={item.productId.product_id} className={styles.item}>
                                <img src={item.productId.images[0]} alt={item.productId.name} />
                                <div className={styles.itemInfo}>
                                    <p className={styles.itemName}>{item.productId.name}</p>
                                    <p className={styles.itemQty}>Quantity: {item.quantity}</p>
                                </div>
                                <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;