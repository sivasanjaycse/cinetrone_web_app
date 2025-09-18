import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './CheckoutPage.css';
import '../ProductModule.css';

const CheckoutPage = () => {
  const { isLoggedIn, user } = useAuth();
  const { clearCart, cartItems } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
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
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        address: '',
        pincode: ''
      });
      setShowLoginForm(false);
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, value }));
  };

  const handlePayment = (e) => {
      e.preventDefault();
      console.log("Order Details:", formData);

      // Simulate payment processing
      const orderId = `CIN-${Date.now()}`;
      showNotification(`Order confirmed! Your order number is: ${orderId}`, 'success');

      clearCart();
      setTimeout(() => navigate('/shop'), 4000); // Redirect after notification is seen
  }

  if (cartItems.length === 0) {
    navigate('/shop');
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

          <button type="submit" className="btn-primary pay-button">
            Pay Now (COD)
          </button>
          <p className="payment-note">Note: Payment Gateway integration coming soon. Currently supporting Cash on Delivery.</p>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;