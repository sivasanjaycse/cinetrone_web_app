import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../../api';
import Spinner from '../../components/Spinner/Spinner';
import './CheckoutPage.css';
import '../ProductModule.css';

const CheckoutPage = () => {
  const { isLoggedIn, user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(!isLoggedIn);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: ''
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        email: user.email || '',
        address: '',
        pincode: ''
      });
      setShowLoginForm(false);
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Prepare the data payload for the backend
      const orderPayload = {
        shippingAddress: formData,
        cartItems: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
      };

      // Send the order to the backend API
      const response = await api.post('/api/orders', orderPayload);

      showNotification(`Order confirmed! Your order number is: ${response.data.order.orderId}`, 'success');
      clearCart();
      
      // Redirect to the profile page to see the new order
      setTimeout(() => navigate('/store/profile'), 4000);

    } catch (error) {
      showNotification(error.response?.data?.msg || 'Failed to place order. Please try again.', 'error');
      setIsProcessing(false);
    }
  };

  // Redirect if cart is empty and an order is not being processed
  if (cartItems.length === 0 && !isProcessing) {
    navigate('/store');
    return null;
  }

  return (
    <div className="container checkout-container">
      <h1 className="page-title">Order Summary</h1>

      {showLoginForm && (
        <div className="login-prompt">
          <h2>You are not logged in</h2>
          <p>Login for a faster checkout experience or continue as a guest.</p>
          <div className="prompt-buttons">
            <button className="btn-primary" onClick={() => navigate('/store/login')}>Proceed to Login</button>
            <button className="btn-secondary" onClick={() => setShowLoginForm(false)}>Continue as Guest</button>
          </div>
        </div>
      )}

      {!showLoginForm && (
        <form className="checkout-form" onSubmit={handlePayment}>
          <h2>Delivery Information</h2>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="address">Delivery Address</label>
            <textarea id="address" name="address" className="form-control" rows="3" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="pincode">Pincode</label>
            <input type="text" id="pincode" name="pincode" className="form-control" value={formData.pincode} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary pay-button" disabled={isProcessing}>
            {isProcessing ? <Spinner /> : `Place Order (COD) - ₹${cartTotal.toLocaleString('en-IN')}`}
          </button>
          <p className="payment-note">Currently supporting Cash on Delivery.</p>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;