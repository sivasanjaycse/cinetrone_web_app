import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpOverlay from './OtpOverlay';
import SuccessMessage from './SuccessMessage';
import ErrorOverlay from './ErrorOverlay'; 
import ResetPasswordForm from "./ResetPasswordForm";
import '../Styles/comman.css';
import '../Styles/layout.css';
import '../Styles/LoginVariables.css';
import '../Styles/theme.css';
import '../Styles/utilities.css';
import '../Styles/button.css';
import '../Styles/card.css';
import '../Styles/form.css';

const backendUrl="http://localhost:3000"
const api = axios.create({
  baseURL: backendUrl,
});

const AuthContainer = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null); // <-- NEW state for error overlay
  
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showOtpOverlay, setShowOtpOverlay] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      setSuccessInfo({ title: "Welcome Back!", text: response.data.msg });
    } catch (error) {
      setErrorInfo({ title: "Login Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      setRegistrationData(formData); 
      setCurrentUserEmail(formData.email);
      setIsForgotPassword(false);
      const response = await axios.post('http://localhost:3000/registerOtp', { email: formData.email });
      setShowOtpOverlay(true);
    } catch (error) {
      setErrorInfo({ title: "Registration Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email) => {
    setLoading(true);
    try {
      setCurrentUserEmail(email);
      setIsForgotPassword(true);
      const response = await api.post('/forgetPasswordOtp', { email });
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
      await api.post('/verifyOtp', { email: currentUserEmail, otp });
      setShowOtpOverlay(false);
      if (isForgotPassword) {
        setCurrentPage('create-new-password');
      } else {
        const response = await api.post('/register', registrationData);
        setSuccessInfo({ title: "Account Created!", text: response.data.msg });
      }
    } catch (error) {
      // Set the error for the OTP overlay specifically if it's still open
      setShowOtpOverlay(false);
      setErrorInfo({ title: "Verification Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPassword = async (password) => {
    setLoading(true);
    try {
      const response = await api.post('/reset-password', {
        email: currentUserEmail,
        newPassword: password
      });
      setSuccessInfo({ title: "Password Updated!", text: response.data.msg });
    } catch (error) {
      setErrorInfo({ title: "Update Failed", text: error.response?.data?.msg || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const endpoint = isForgotPassword ? '/forgetPasswordOtp' : '/registerOtp';
      await api.post(endpoint, { email: currentUserEmail });
    } catch (error) {
       setErrorInfo({ title: "Resend Failed", text: 'Could not resend OTP. Please try again.' });
    }
  };

  const handleCloseSuccess = () => {
    setSuccessInfo(null);
    setCurrentPage('login');
  };
  
  const handleCloseError = () => {
    setErrorInfo(null);
  };

  const switchPage = (page) => {
    setCurrentPage(page);
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterForm onRegister={handleRegister} onSwitchPage={switchPage} loading={loading} />;
      case 'forgot-password':
        return <ForgotPasswordForm onResetPassword={handleResetPassword} onSwitchPage={switchPage} loading={loading} />;
      case 'create-new-password':
        return <ResetPasswordForm onCreateNewPassword={handleCreateNewPassword} loading={loading} />;
      case 'login':
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
          <SuccessMessage
            title={successInfo.title}
            text={successInfo.text}
            onClose={handleCloseSuccess}
          />
        )}

        {errorInfo && (
          <ErrorOverlay
            title={errorInfo.title}
            text={errorInfo.text}
            onClose={handleCloseError}
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