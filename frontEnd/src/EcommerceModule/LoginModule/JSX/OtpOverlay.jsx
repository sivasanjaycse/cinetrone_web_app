import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const OtpOverlay = ({ email, onVerifyOtp, onResendOtp, onClose, loading, error }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [resendCountdown, setResendCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(-1);
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

  const overlayStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    transition: 'opacity 0.3s ease',
    opacity: '1'
  };

  const cardStyles = {
    background: '#1a1a1a',
    borderRadius: '12px',
    padding: '32px',
    border: '1px solid #2a2a2a',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    maxWidth: '420px',
    width: '90%'
  };

  const otpInputsContainerStyles = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    margin: '16px 0'
  };

  const getOtpDigitStyle = (index, hasValue) => {
    const style = {
      width: '45px',
      height: '50px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '600',
      background: '#000000',
      border: '2px solid #2a2a2a',
      borderRadius: '8px',
      color: '#c0a068',
      transition: 'all 0.3s ease',
      outline: 'none'
    };

    if (hasValue) {
      style.background = '#c0a068';
      style.color = '#000000';
    }

    if (index === focusedIndex) {
      style.borderColor = '#c0a068';
      style.boxShadow = '0 0 0 3px rgba(192, 160, 104, 0.1)';
    }

    return style;
  };

  const otpOverlayJSX = (
    <div style={overlayStyles}>
      <div style={cardStyles}>
        <h2 className="auth-title">Verify Your Account</h2>
        <p className="auth-subtitle">Enter the 6-digit code sent to {email}.<br/>Kindly check spam if not received.</p>
        <form id="otp-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp-input" className="form-label">Verification Code</label>
            <div style={otpInputsContainerStyles}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  style={getOtpDigitStyle(index, data)}
                  value={data}
                  onChange={e => handleOtpChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(-1)}
                />
              ))}
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          <button type="submit" className="login-btn login-btn--primary login-btn--full-width" disabled={loading}>
            {loading ? <div className="login-btn-loader"></div> : <span>Verify Code</span>}
          </button>
        </form>
        <div className="auth-links">
          <button className="link-btn" onClick={handleResendClick} disabled={isResendDisabled}>
            Resend OTP {isResendDisabled && `(${resendCountdown}s)`}
          </button>
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} className="link">← Cancel</a>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(otpOverlayJSX, document.body);
};

export default OtpOverlay;