import { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import ProductDashboard from './components/ProductDashboard';
import OrderDashboard from './components/OrderDashboard';
import './AdminApp.css'; // Import the stylesheet

const AdminApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState('products'); // 'products' or 'orders'

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <nav className="admin-nav">
                <button 
                    onClick={() => setView('products')} 
                    className={view === 'products' ? 'active' : ''}
                >
                    Product Management
                </button>
                <button 
                    onClick={() => setView('orders')}
                    className={view === 'orders' ? 'active' : ''}
                >
                    Order Management
                </button>
            </nav>

            <div className="admin-content">
                {view === 'products' ? <ProductDashboard /> : <OrderDashboard />}
            </div>
        </div>
    );
};

export default AdminApp;