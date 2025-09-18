import { createContext, useState, useContext, useEffect } from 'react';
import api from '../../api'; // Use the central api instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

    useEffect(() => {
        const fetchUser = async () => {
           try {
             const response = await api.get('/api/profile');
             setUser(response.data.user);
             setIsLoggedIn(true);
           } catch (e) {
             logout();
           }
        }
        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const login = async (email, password) => {
        const response = await api.post('/login', { email, password });
        if (response.data && response.data.token) {
            storeToken(response.data.token);
            setUser(response.data.user);
            setIsLoggedIn(true);
        }
        return response.data;
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setAuthToken(null);
        localStorage.removeItem('authToken');
    };

    const sendRegistrationOtp = async (email) => {
        return await api.post('/registerOtp', { email });
    };

    const sendPasswordResetOtp = async (email) => {
        return await api.post('/forgetPasswordOtp', { email });
    };

    const verifyOtpAndRegister = async (otp, email, registrationData) => {
        await api.post('/verifyOtp', { email, otp });
        const response = await api.post('/register', registrationData);
        if (response.data && response.data.token) {
            storeToken(response.data.token);
            setUser(response.data.user);
            setIsLoggedIn(true);
        }
        return response.data;
    };
    
    const verifyPasswordResetOtp = async (otp, email) => {
        return await api.post('/verifyOtp', { email, otp });
    };

    const createNewPassword = async (email, newPassword) => {
        return await api.post('/reset-password', { email, newPassword });
    };

    const resendOtp = async (email, isForgotPassword) => {
        const endpoint = isForgotPassword ? '/forgetPasswordOtp' : '/registerOtp';
        return await api.post(endpoint, { email });
    };

    const value = { isLoggedIn, user, login, logout, sendRegistrationOtp, sendPasswordResetOtp, verifyOtpAndRegister, verifyPasswordResetOtp, createNewPassword, resendOtp };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);