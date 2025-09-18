import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components & Contexts
import Layout from './components/Layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

// Product Module Pages
import ProductListPage from './ProductModule/pages/ProductListPage';
import ProductDetailPage from './ProductModule/pages/ProductDetailPage';
import CartPage from './ProductModule/pages/CartPage';
import CheckoutPage from './ProductModule/pages/CheckoutPage';
import ProfilePage from './ProductModule/pages/ProfilePage';
import "./ecom.css";

function EcommerceApp() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<ProfilePage />} />
                <Route path="shop" element={<ProductListPage />} />
                <Route path="products/:productId" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="login" element={<ProfilePage/>} />
              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default EcommerceApp;