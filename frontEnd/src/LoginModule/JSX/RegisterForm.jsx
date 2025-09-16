import React, { useState, useEffect } from 'react';

const RegisterForm = ({ onRegister, onSwitchPage, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: 'Password strength' });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const checkPasswordStrength = (password) => {
      let score = 0;
      let text = 'Password strength';
      if (password.length >= 8) score++;
      if (/\d/.test(password)) score++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

      if (password.length > 0) {
        if (score === 1) text = 'Weak password';
        else if (score === 2) text = 'Medium password';
        else if (score === 3) text = 'Strong password';
      }
      setPasswordStrength({ score, text });
    };
    checkPasswordStrength(formData.password);
  }, [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation before passing up
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onRegister(formData);
  };

  return (
    <div id="register-page" className="auth-page active">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join CINETRONE today</p>
        <form id="register-form" className="auth-form" onSubmit={handleSubmit}>
          {/* Form Groups */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="form-control" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
            <input type="tel" id="mobile" value={formData.mobile} onChange={handleInputChange} className="form-control" placeholder="Enter 10-digit mobile number" required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input">
              <input type={showPasswords.password ? "text" : "password"} id="password" value={formData.password} onChange={handleInputChange} className="form-control" placeholder="Create a password" required />
              <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('password')}>
                <span className="toggle-text">{showPasswords.password ? "Hide" : "Show"}</span>
              </button>
            </div>
            <div className="password-strength">
              <div className="strength-meter">
                <div className={`strength-bar ${passwordStrength.score === 1 ? 'weak' : passwordStrength.score === 2 ? 'medium' : passwordStrength.score === 3 ? 'strong' : ''}`}></div>
              </div>
              <div className="strength-text">{passwordStrength.text}</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="password-input">
              <input type={showPasswords.confirmPassword ? "text" : "password"} id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="form-control" placeholder="Confirm your password" required />
              <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('confirmPassword')}>
                <span className="toggle-text">{showPasswords.confirmPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn login-btn--primary login-btn--full-width" disabled={loading}>
            {loading ? <div className="login-btn-loader"></div> : <span className="login-btn-text">Create Account</span>}
          </button>
        </form>
        <div className="auth-divider"><span>Already have an account?</span></div>
        <button className="login-btn login-btn--outline login-btn--full-width" onClick={() => onSwitchPage('login')}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;