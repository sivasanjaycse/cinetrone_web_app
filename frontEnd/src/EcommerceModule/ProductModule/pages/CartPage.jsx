import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './CartPage.css';
import '../ProductModule.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const shippingCharges = 0;
  const discount = cartTotal > 100000 ? cartTotal * 0.1 : 0;
  const grandTotal = cartTotal - discount + shippingCharges;
  
  // This is the updated block for the empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="container cart-container empty-cart">
        <h1 className="empty-cart-title">Your Cart is Empty</h1>
        <p className="empty-cart-message">
          Looks like you haven't added anything yet. Explore our collection to find your perfect sound experience.
        </p>
        <Link to="/shop" className="empty-cart-button">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // The rest of the component for a cart with items remains unchanged
  return (
    <div className="container cart-container">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {/* ... JSX for cart items ... */}
        </div>
        <div className="cart-summary">
          {/* ... JSX for cart summary ... */}
        </div>
      </div>
    </div>
  );
};

export default CartPage;