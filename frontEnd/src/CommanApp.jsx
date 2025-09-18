import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Global Contexts
import { AuthProvider, useAuth } from './EcommerceModule/context/AuthContext';
import { CartProvider } from './EcommerceModule/context/CartContext';
import { NotificationProvider } from './EcommerceModule/context/NotificationContext';

// Main Layout Component
import Layout from './EcommerceModule/components/Layout/Layout';

// Page Components
import LoginApp from './LoginModule/LoginApp';
import ProductListPage from './EcommerceModule/ProductModule/pages/ProductListPage';
import ProductDetailPage from './EcommerceModule/ProductModule/pages/ProductDetailPage';
import CartPage from './EcommerceModule/ProductModule/pages/CartPage';
import CheckoutPage from './EcommerceModule/ProductModule/pages/CheckoutPage';
import ProfilePage from './EcommerceModule/ProductModule/pages/ProfilePage';

// Global Styles - Assuming ecom.css contains the primary global styles
import "./EcommerceModule/ecom.css";

/**
 * A wrapper component to protect routes that require authentication.
 * If the user is logged in, it renders the requested component.
 * Otherwise, it redirects them to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  // The 'replace' prop is used to replace the current entry in the history stack
  // so the user doesn't get stuck in a loop with the back button.
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

/**
 * This component defines all the application routes.
 * The main layout wraps all pages, providing a consistent Header.
 * ProtectedRoute is used for pages that should only be accessible after login.
 */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* The Login page is a public route */}
        <Route path="/login" element={<LoginApp />} />

        {/* All other e-commerce routes are wrapped in the main Layout */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<ProductListPage />} /> {/* Homepage defaults to the shop */}
          <Route path="shop" element={<ProductListPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />

          {/* Protected Routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          
          {/* Add a catch-all or 404 page if needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

/**
 * The main application component.
 * It sets up all the context providers, ensuring that authentication state,
 * cart data, and notifications are available throughout the entire app.
 */
function CommanApp() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default CommanApp;