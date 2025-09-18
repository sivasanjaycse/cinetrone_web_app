import React, { useState } from 'react';

const LoginForm = ({ onLogin, onSwitchPage, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div id="login-page" className="auth-page active">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your CINETRONE account</p>
        <form id="login-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail" className="form-label">Email Address</label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                <span className="toggle-text">{showPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn login-btn--primary login-btn--full-width" disabled={loading}>
            {loading ? <div className="login-btn-loader"></div> : <span className="login-btn-text">Sign In</span>}
          </button>
        </form>
        <div className="auth-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchPage('forgot-password'); }} className="link">Forgot Password?</a>
        </div>
        <div className="auth-divider"><span>Don't have an account?</span></div>
        <button className="login-btn login-btn--outline login-btn--full-width" onClick={() => onSwitchPage('register')}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;