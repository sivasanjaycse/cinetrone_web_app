import { useState, useEffect } from 'react';
import api from '../../api';
// We are reusing the modal component from the main product module
import OrderDetailsModal from '../../EcommerceModule/ProductModule/components/OrderDetailsModal';
import styles from './OrderDashboard.module.css'; // Import the new theme

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = () => {
        setLoading(true);
        api.get('/api/admin/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error("Failed to fetch orders", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/api/admin/orders/${orderId}/status`, { status: newStatus });
            fetchOrders(); // Refresh list after update
        } catch (err) {
            alert('Failed to update status.');
        }
    };
    
    const activeOrders = orders.filter(o => o.status !== 'Delivered');
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');

    const renderOrderTable = (orderList) => (
        <table className={styles.adMoOrderTable}>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orderList.map(order => (
                    <tr key={order.orderId} onClick={() => setSelectedOrder(order)} className={styles.adMoClickableRow}>
                        <td>{order.orderId}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.email}</td>
                        <td>₹{order.totalAmount.toLocaleString()}</td>
                        <td>
                            <select 
                                value={order.status} 
                                onChange={e => handleStatusChange(order.orderId, e.target.value)} 
                                onClick={e => e.stopPropagation()}
                                className={styles.adMoStatusDropdown}
                            >
                                <option value="Placed">Placed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    if (loading) return <p className={styles.adMoInfoText}>Loading orders...</p>;

    return (
        <div className={styles.adMoDashboardContainer}>
            <h2 className={styles.adMoSectionTitle}>Active Orders ({activeOrders.length})</h2>
            {activeOrders.length > 0 ? renderOrderTable(activeOrders) : <p className={styles.adMoInfoText}>No active orders.</p>}
            
            <hr className={styles.adMoDivider} />

            <h2 className={styles.adMoSectionTitle}>Delivered Orders ({deliveredOrders.length})</h2>
            {deliveredOrders.length > 0 ? renderOrderTable(deliveredOrders) : <p className={styles.adMoInfoText}>No delivered orders found.</p>}

            {selectedOrder && (
                <OrderDetailsModal 
                    order={selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                />
            )}
        </div>
    );
};

export default OrderDashboard;