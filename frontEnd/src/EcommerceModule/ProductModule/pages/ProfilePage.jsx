import { useAuth } from '../../context/AuthContext';
import './ProfilePage.css';
import '../ProductModule.css';

const ProfilePage = () => {
  // Destructure login from useAuth to use it directly
  const { isLoggedIn, user, logout, login } = useAuth();

  const handleLogout = () => {
    logout();
    // No need to navigate, page will re-render to the logged-out view
  };

  // The view for users who are NOT logged in
  if (!isLoggedIn) {
    return (
      <div className="profile-container not-logged-in">
        <h1 className="profile-title">My Profile</h1>
        <p className="login-prompt-message">
          Please log in to view your profile and order history.
        </p>
        {/* This button now simulates a login on click */}
        <button 
          className="login-button" 
          onClick={() => login('johndoe@example.com', 'password123')}>
          GO TO LOGIN
        </button>
      </div>
    );
  }

  // The view for users who ARE logged in (remains the same)
  return (
    <div className="container profile-container">
      <h1 className="page-title">Welcome, {user.name}</h1>
      <div className="profile-layout">
        <div className="profile-details">
          <h2>Profile Information</h2>
          <div className="detail-item"><strong>Name:</strong> <span>{user.name}</span></div>
          <div className="detail-item"><strong>Email:</strong> <span>{user.email}</span></div>
          <div className="detail-item"><strong>Mobile:</strong> <span>{user.mobile}</span></div>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
        <div className="order-history">
          <h2>Past Orders</h2>
          {user.pastOrders && user.pastOrders.length > 0 ? (
            <ul className="order-list">
              {user.pastOrders.map(order => (
                <li key={order.id} className="order-item">
                  <div><strong>Order ID:</strong> {order.id}</div>
                  <div><strong>Date:</strong> {order.date}</div>
                  <div><strong>Total:</strong> ₹{order.total.toLocaleString('en-IN')}</div>
                  <div><strong>Status:</strong> <span className="status delivered">{order.status}</span></div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no past orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;