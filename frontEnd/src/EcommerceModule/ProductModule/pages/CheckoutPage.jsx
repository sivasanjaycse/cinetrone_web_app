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
    // New state to control the maintenance overlay
    const [showMaintenanceOverlay, setShowMaintenanceOverlay] = useState(false);
    const [formData, setFormData] = useState({
        name: '', mobile: '', email: '', address: '', pincode: ''
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
        }
    }, [isLoggedIn, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setShowMaintenanceOverlay(true);

        /* // --- TODO: Re-enable this block for payment gateway integration ---
        setIsProcessing(true);
        try {
            const orderPayload = {
                shippingAddress: formData,
                cartItems: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
            };
            const response = await api.post('/api/orders', orderPayload);
            showNotification(`Order confirmed! Your order number is: ${response.data.order.orderId}`, 'success');
            clearCart();
            setTimeout(() => navigate('/store/profile'), 4000);
        } catch (error) {
            showNotification(error.response?.data?.msg || 'Failed to place order. Please try again.', 'error');
            setIsProcessing(false);
        }
        */
    };

    // New function to handle WhatsApp redirection
    const handleWhatsAppEnquiry = () => {
        const itemsText = cartItems.map(item => 
            `- ${item.name} (Qty: ${item.quantity})`
        ).join('\n');

        const message = `
*New Order Enquiry*

Hello, I would like to place an order for the following items:
${itemsText}

*Total Amount:* ₹${cartTotal.toLocaleString('en-IN')}

*Delivery Details:*
Name: ${formData.name}
Mobile: ${formData.mobile}
Address: ${formData.address}, ${formData.pincode}
        `;

        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappUrl = `https://wa.me/919360977893?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    if (cartItems.length === 0 && !isProcessing) {
        navigate('/store');
        return null;
    }

    return (
        <div className="container checkout-container">
            <h1 className="page-title">Order Summary</h1>

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
                    {isProcessing ? <Spinner /> : `Place Order - ₹${cartTotal.toLocaleString('en-IN')}`}
                </button>
            </form>

            {/* New: Conditionally rendered maintenance overlay */}
            {showMaintenanceOverlay && (
                <div className="maintenance-overlay">
                    <div className="maintenance-card">
                        <h3>Payment Gateway Under Maintenance</h3>
                        <p>Our online payment system is temporarily unavailable. You can complete your order by sending the details to us via WhatsApp.</p>
                        <div className="maintenance-buttons">
                            <button className="btn-secondary" onClick={() => setShowMaintenanceOverlay(false)}>Close</button>
                            <button className="btn-primary" onClick={handleWhatsAppEnquiry}>Enquire via WhatsApp</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;