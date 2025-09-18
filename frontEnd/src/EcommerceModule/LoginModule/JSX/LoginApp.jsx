import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import all your form and overlay components
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpOverlay from './OtpOverlay';
import SuccessMessage from './SuccessMessage';
import ErrorOverlay from './ErrorOverlay'; 
import ResetPasswordForm from "./ResetPasswordForm";

// Import all your CSS
import '../Styles/comman.css';
import '../Styles/layout.css';
import '../Styles/LoginVariables.css';
import '../Styles/theme.css';
import '../Styles/utilities.css';
import '../Styles/button.css';
import '../Styles/card.css';
import '../Styles/form.css';

const LoginApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showOtpOverlay, setShowOtpOverlay] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const navigate = useNavigate();
  const auth = useAuth(); // Use the authentication context

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await auth.login(email, password);
      setSuccessInfo({ title: "Welcome Back!", text: data.msg });
    } catch (error) {
      setErrorInfo({ title: "Login Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      await auth.sendRegistrationOtp(formData.email);
      setRegistrationData(formData); 
      setCurrentUserEmail(formData.email);
      setIsForgotPassword(false);
      setShowOtpOverlay(true);
    } catch (error) {
      setErrorInfo({ title: "Registration Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordRequest = async (email) => {
    setLoading(true);
    try {
      await auth.sendPasswordResetOtp(email);
      setCurrentUserEmail(email);
      setIsForgotPassword(true);
      setShowOtpOverlay(true);
    } catch (error) {
      setErrorInfo({ title: "Request Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      if (isForgotPassword) {
        await auth.verifyPasswordResetOtp(otp, currentUserEmail);
        setShowOtpOverlay(false);
        setCurrentPage('create-new-password');
      } else {
        const data = await auth.verifyOtpAndRegister(otp, currentUserEmail, registrationData);
        setShowOtpOverlay(false);
        setSuccessInfo({ title: "Account Created!", text: data.msg });
      }
    } catch (error) {
      setShowOtpOverlay(false);
      setErrorInfo({ title: "Verification Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPassword = async (password) => {
    setLoading(true);
    try {
      const data = await auth.createNewPassword(currentUserEmail, password);
      setSuccessInfo({ title: "Password Updated!", text: data.msg });
    } catch (error) {
      setErrorInfo({ title: "Update Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await auth.resendOtp(currentUserEmail, isForgotPassword);
    } catch (error) {
       setErrorInfo({ title: "Resend Failed", text: 'Could not resend OTP. Please try again.' });
    }
  };

  const handleCloseSuccess = () => {
    setSuccessInfo(null);
    navigate('/profile'); // Redirect user to their profile after success
  };
  
  const handleCloseError = () => setErrorInfo(null);
  const switchPage = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterForm onRegister={handleRegister} onSwitchPage={switchPage} loading={loading} />;
      case 'forgot-password':
        return <ForgotPasswordForm onResetPassword={handleResetPasswordRequest} onSwitchPage={switchPage} loading={loading} />;
      case 'create-new-password':
        return <ResetPasswordForm onCreateNewPassword={handleCreateNewPassword} loading={loading} />;
      default:
        return <LoginForm onLogin={handleLogin} onSwitchPage={switchPage} loading={loading} />;
    }
  };

  return (
    <div className='login-body'>
      <div className="login-app">
        <main className="main">
          <div className="auth-container">
            {renderPage()}
          </div>
        </main>
        
        {showOtpOverlay && (
          <OtpOverlay
            email={currentUserEmail}
            onVerifyOtp={handleVerifyOtp}
            onResendOtp={handleResendOtp}
            onClose={() => setShowOtpOverlay(false)}
            loading={loading}
          />
        )}
        {successInfo && (
          <SuccessMessage title={successInfo.title} text={successInfo.text} onClose={handleCloseSuccess} />
        )}
        {errorInfo && (
          <ErrorOverlay title={errorInfo.title} text={errorInfo.text} onClose={handleCloseError} />
        )}
      </div>
    </div>
  );
};

export default LoginApp;