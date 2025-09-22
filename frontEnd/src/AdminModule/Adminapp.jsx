import { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import ProductDashboard from './components/ProductDashboard';
import OrderDashboard from './components/OrderDashboard';
import AdminDisplayProducts from './components/AdminDisplayProducts';
import './AdminApp.css';

const AdminApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState('products'); // 'products', 'orders', or 'gallery'

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    const renderContent = () => {
        switch (view) {
            case 'products':
                return <ProductDashboard />;
            case 'orders':
                return <OrderDashboard />;
            case 'gallery':
                return <AdminDisplayProducts />;
            default:
                return <ProductDashboard />;
        }
    };

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
                <button
                    onClick={() => setView('gallery')}
                    className={view === 'gallery' ? 'active' : ''}
                >
                    Gallery Management
                </button>
            </nav>

            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminApp;