import React, { useState, useEffect, useRef } from 'react';

const OtpForm = ({ email, onVerifyOtp, onResendOtp, onSwitchPage, loading, error }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [resendCountdown, setResendCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    startResendTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (isResendDisabled && resendCountdown > 0) {
      timerRef.current = setTimeout(() => setResendCountdown(c => c - 1), 1000);
    } else if (resendCountdown === 0) {
      setIsResendDisabled(false);
      clearInterval(timerRef.current);
    }
  }, [isResendDisabled, resendCountdown]);

  const startResendTimer = () => {
    setResendCountdown(30);
    setIsResendDisabled(true);
  };

  const handleResendClick = () => {
    onResendOtp();
    startResendTimer();
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerifyOtp(otp.join(""));
  };

  return (
    <div id="otp-page" className="auth-page active">
      <div className="auth-card">
        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-subtitle">Enter the 6-digit code sent to {email}</p>
        <form id="otp-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp-input" className="form-label">Verification Code</label>
            <div className="otp-inputs">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={`otp-digit ${data ? 'filled' : ''}`}
                  value={data}
                  onChange={e => handleOtpChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          <button type="submit" className="login-btn login-btn--primary login-btn--full-width" disabled={loading}>
            {loading ? <div className="login-btn-loader"></div> : <span className="btn-text">Verify Code</span>}
          </button>
        </form>
        <div className="auth-links">
          <button className="link-btn" onClick={handleResendClick} disabled={isResendDisabled}>
            Resend OTP {isResendDisabled && `(${resendCountdown}s)`}
          </button>
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchPage('login'); }} className="link">← Back to Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;