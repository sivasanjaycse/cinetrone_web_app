import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// --- Axios Instance Setup ---
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// --- Auth Context ---
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

    // Effect to check for existing token on app load
    useEffect(() => {
        if (authToken) {
            // Optional: You could add an API call here to verify the token
            // and fetch user data to persist the session across browser refreshes.
            // For now, we will assume the token is valid if it exists.
            // A real implementation would fetch user from a /me or /profile endpoint.
            // For example:
            // const fetchUser = async () => {
            //    try {
            //      const response = await api.get('/profile');
            //      setUser(response.data.user);
            //      setIsLoggedIn(true);
            //    } catch (e) {
            //      // Token is invalid/expired
            //      logout();
            //    }
            // }
            // fetchUser();

            // Simplified version for this example:
             setIsLoggedIn(true); // Assume logged in if token exists
        }
    }, [authToken]);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    // --- API Functions ---

    const login = async (email, password) => {
        const response = await api.post('/login', { email, password });
        if (response.data && response.data.token) {
            storeToken(response.data.token);
            setUser(response.data.user); // Assuming the backend returns user data on login
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
        // First, verify the OTP
        await api.post('/verifyOtp', { email, otp });
        // If OTP is correct, proceed with registration
        const response = await api.post('/register', registrationData);
        // After successful registration, log the user in
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


    const value = {
        isLoggedIn,
        user,
        login,
        logout,
        sendRegistrationOtp,
        sendPasswordResetOtp,
        verifyOtpAndRegister,
        verifyPasswordResetOtp,
        createNewPassword,
        resendOtp,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);