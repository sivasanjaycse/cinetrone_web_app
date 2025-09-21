import React, { useState } from 'react';

const ResetPasswordForm = ({ onCreateNewPassword, loading }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({});

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onCreateNewPassword(password);
  };

  return (
    <div id="create-new-password-page" className="auth-page active">
      <div className="auth-card">
        <h2 className="auth-title">Create New Password</h2>
        <p className="auth-subtitle">Your new password must be different from previous passwords.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <div className="password-input">
              <input 
                type={showPasswords.new ? "text" : "password"} 
                id="newPassword" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control" 
                placeholder="Enter new password" 
                required 
              />
              <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('new')}>
                <span className="toggle-text">{showPasswords.new ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
            <div className="password-input">
              <input 
                type={showPasswords.confirm ? "text" : "password"} 
                id="confirmNewPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="form-control" 
                placeholder="Confirm new password" 
                required 
              />
              <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('confirm')}>
                <span className="toggle-text">{showPasswords.confirm ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn login-btn--primary login-btn--full-width" disabled={loading}>
            {loading ? <div className="login-btn-loader"></div> : <span className="login-btn-text">Reset Password</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;