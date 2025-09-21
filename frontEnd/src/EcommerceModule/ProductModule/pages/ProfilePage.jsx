
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../../api';
import Spinner from '../../components/Spinner/Spinner';
import OrderDetailsModal from '../components/OrderDetailsModal';
import './ProfilePage.css';
import '../ProductModule.css';

const ProfilePage = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrders = async () => {
        try {
          const { data } = await api.get('/api/orders');
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate('/store');
  };

    if (!isLoggedIn) {
    return (
      <div className="profile-container not-logged-in">
        <h1 className="profile-title">My Profile</h1>
        <p className="login-prompt-message">
          Please log in to view your profile and order history.
        </p>
        {/* This button now navigates to the login page */}
        <button 
          className="login-button" 
          onClick={() => navigate('/store/login')}>
          GO TO LOGIN
        </button>
      </div>
    );
  }

  const activeOrders = orders.filter(order => order.status !== 'Delivered');
  const pastOrders = orders.filter(order => order.status === 'Delivered');

  const renderOrderList = (orderList) => (
    <ul className="order-list">
      {orderList.map(order => (
        <li key={order.orderId} className="order-item" onClick={() => setSelectedOrder(order)}>
          <div><strong>Order:</strong> #{order.orderId}</div>
          <div><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
          <div><strong>Items:</strong> {order.products.length}</div>
          <div><strong>Total:</strong> ₹{order.totalAmount.toLocaleString('en-IN')}</div>
          <div><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      <div className="container profile-container">
        <h1 className="page-title">Welcome, {user?.name || 'User'}</h1>
        <div className="profile-layout">
       <div className="profile-details">
          <h2>Profile Information</h2>
          <div className="detail-item"><strong>Name:</strong> <span>{user?.name}</span></div>
          <div className="detail-item"><strong>Email:</strong> <span>{user?.email}</span></div>
          <div className="detail-item"><strong>Mobile:</strong> <span>{user?.mobile}</span></div>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
          <div className="order-history">
            {loading ? <Spinner /> : (
              <>
                <h2>Active Orders</h2>
                {activeOrders.length > 0 ? renderOrderList(activeOrders) : <p>You have no active orders.</p>}
                
                <h2 className="past-orders-title">Past Orders</h2>
                {pastOrders.length > 0 ? renderOrderList(pastOrders) : <p>You have no past orders.</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;