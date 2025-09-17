import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // In a real app, this would check localStorage/sessionStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Mock login function
    const login = (email, password) => {
        // Placeholder for real authentication logic
        console.log("Logging in with", email, password);
        setUser({
            name: 'John Doe',
            email: email,
            mobile: '9876543210',
            pastOrders: [
                { id: 'ORD123', date: '2025-09-15', total: 170200, status: 'Delivered' },
                { id: 'ORD124', date: '2025-08-21', total: 85500, status: 'Delivered' }
            ]
        });
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);