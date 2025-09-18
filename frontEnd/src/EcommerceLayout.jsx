import { AuthProvider } from './EcommerceModule/context/AuthContext';
import { CartProvider } from './EcommerceModule/context/CartContext';
import { NotificationProvider } from './EcommerceModule/context/NotificationContext';
import Layout from './EcommerceModule/components/Layout/Layout';
/**
 * This component wraps the entire e-commerce section.
 * Its only job is to provide the necessary contexts (Auth, Cart, etc.)
 * to the e-commerce pages. It then renders your original visual <Layout />.
 */
function EcommerceLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <Layout />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default EcommerceLayout;