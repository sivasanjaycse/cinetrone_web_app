import React, { useState } from 'react';

const ForgotPasswordForm = ({ onResetPassword, onSwitchPage, loading }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onResetPassword(email);
  };

  return (
    <div id="forgot-password-page" className="auth-page active">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a verification code</p>
        <form id="forgot-password-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="forgotEmail" className="form-label">Email Address</label>
            <input
              type="email"
              id="forgotEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="login-btn login-btn--primary login-btn--full-width" disabled={loading}>
            {loading ? <div className="login-btn-loader"></div> : <span className="login-btn-text">Send Verification Code</span>}
          </button>
        </form>
        <div className="auth-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchPage('login'); }} className="link">← Back to Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;