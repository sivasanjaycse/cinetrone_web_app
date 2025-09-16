import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpOverlay from './OtpOverlay'; // <-- IMPORT the new overlay
import SuccessMessage from './SuccessMessage';
import ResetPasswordForm from "./ResetPasswordForm";
import CinetroneLogo from "../../assets/logo.png";
import '../Styles/comman.css';
import '../Styles/layout.css';
import '../Styles/LoginVariables.css';
import '../Styles/theme.css';
import '../Styles/utilities.css';
import '../Styles/button.css';
import '../Styles/card.css';
import '../Styles/form.css';

const AuthContainer = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [otpError, setOtpError] = useState('');
  
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // --- NEW STATE to control the OTP overlay visibility ---
  const [showOtpOverlay, setShowOtpOverlay] = useState(false);

  const simulateApiCall = () => {
    setLoading(true);
    return new Promise(resolve => setTimeout(() => {
      setLoading(false);
      resolve();
    }, 1500));
  };

  const generateAndLogOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    console.log(`New OTP for ${currentUserEmail}: ${newOtp}`);
  };

  const handleLogin = async (email, password) => {
    await simulateApiCall();
    setSuccessInfo({ title: "Welcome Back!", text: "You've successfully signed in to CINETRONE." });
  };

  const handleRegister = async (formData) => {
    await simulateApiCall();
    setCurrentUserEmail(formData.email);
    setIsForgotPassword(false);
    generateAndLogOtp();
    setShowOtpOverlay(true); // <-- SHOW OVERLAY instead of changing page
  };

  const handleResetPassword = async (email) => {
    await simulateApiCall();
    setCurrentUserEmail(email);
    setIsForgotPassword(true);
    generateAndLogOtp();
    setShowOtpOverlay(true); // <-- SHOW OVERLAY instead of changing page
  };

  const handleVerifyOtp = async (otp) => {
    await simulateApiCall();
    if (otp === generatedOtp) {
      setOtpError('');
      setShowOtpOverlay(false); // <-- CLOSE OVERLAY on success
      
      if (isForgotPassword) {
        setCurrentPage('create-new-password');
      } else {
        setSuccessInfo({ title: "Email Verified!", text: "Your account is active. You can now sign in." });
      }
    } else {
      setOtpError('Invalid verification code. Please try again.');
    }
  };

  const handleCreateNewPassword = async (password) => {
    await simulateApiCall();
    console.log(`Password for ${currentUserEmail} has been reset to: ${password}`);
    setSuccessInfo({ title: "Password Updated!", text: "Your password has been successfully updated. Please sign in." });
  };

  const handleResendOtp = () => {
    generateAndLogOtp();
  };

  const handleCloseSuccess = () => {
    setSuccessInfo(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterForm onRegister={handleRegister} onSwitchPage={setCurrentPage} loading={loading} />;
      case 'forgot-password':
        return <ForgotPasswordForm onResetPassword={handleResetPassword} onSwitchPage={setCurrentPage} loading={loading} />;
      // <-- OTP CASE IS REMOVED FROM HERE
      case 'create-new-password':
        return <ResetPasswordForm onCreateNewPassword={handleCreateNewPassword} loading={loading} />;
      case 'login':
      default:
        return <LoginForm onLogin={handleLogin} onSwitchPage={setCurrentPage} loading={loading} />;
    }
  };

  return (
    <div className='login-body'>
      <div className="login-app">
        <header className="login-header">
          <div className="header__content">
            <div className="logo">
              <img className="logoImage" src={CinetroneLogo}/>
              <h1 className="logo__text">CINETRONE</h1>
            </div>
          </div>
        </header>
        <main className="main">
          <div className="auth-container">
            {renderPage()}
          </div>
        </main>
        
        {/* Conditionally render the OTP overlay */}
        {showOtpOverlay && (
          <OtpOverlay
            email={currentUserEmail}
            onVerifyOtp={handleVerifyOtp}
            onResendOtp={handleResendOtp}
            onClose={() => setShowOtpOverlay(false)}
            loading={loading}
            error={otpError}
          />
        )}

        {successInfo && (
          <SuccessMessage
            title={successInfo.title}
            text={successInfo.text}
            onClose={handleCloseSuccess}
          />
        )}
      </div>
    </div>
  );
};

function LoginApp() {
  return <AuthContainer />;
}

export default LoginApp;