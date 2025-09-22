import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './CartPage.css';
import '../ProductModule.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const shippingCharges = 0;
  // Note: The discount logic from your original file was removed for clarity.
  // You can re-add it if needed.
  const grandTotal = cartTotal + shippingCharges;
  
  if (cartItems.length === 0) {
    return (
      <div className="container cart-container empty-cart">
        <h1 className="empty-cart-title">Your Cart is Empty</h1>
        <p className="empty-cart-message">
          Looks like you haven't added anything yet. Explore our collection to find your perfect sound experience.
        </p>
        <Link to="/store" className="empty-cart-button">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product Description</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-desc">
                <img src={item.images[0]} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                </div>
              </div>
              
              <div className="item-quantity" data-label="Quantity">
                {/* Wrapper div for proper alignment and sizing */}
                <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FaMinus/></button>
                    <input type="text" readOnly value={item.quantity} />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FaPlus/></button>
                </div>
              </div>

              <div className="item-price" data-label="Price">₹{item.price.toLocaleString('en-IN')}</div>
              <div className="item-total" data-label="Total">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
              <button className="item-remove" onClick={() => removeFromCart(item.id)}><FaTrash/></button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Actual Total Cost:</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Charges:</span>
            <span>{shippingCharges === 0 ? 'Free Shipping' : `₹${shippingCharges.toLocaleString('en-IN')}`}</span>
          </div>
          <div className="summary-total">
            <span>GRAND TOTAL</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <Link to="/store/checkout" className="btn-primary checkout-btn">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;