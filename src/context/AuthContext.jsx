import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = sessionStorage.getItem('admin_authenticated');
        const lastActivity = sessionStorage.getItem('admin_last_activity');

        // Check if session is valid and not expired (20 minutes = 1200000 ms)
        if (saved === 'true' && lastActivity) {
            const now = Date.now();
            if (now - parseInt(lastActivity) < 20 * 60 * 1000) {
                return true;
            }
        }
        return false;
    });

    // Admin password

    // Update last activity timestamp
    const updateActivity = () => {
        if (isAuthenticated) {
            sessionStorage.setItem('admin_last_activity', Date.now().toString());
        }
    };

    // Check for inactivity every minute
    useEffect(() => {
        if (!isAuthenticated) return;

        const checkInactivity = () => {
            const lastActivity = sessionStorage.getItem('admin_last_activity');
            if (lastActivity) {
                const now = Date.now();
                if (now - parseInt(lastActivity) > 20 * 60 * 1000) {
                    logout();
                }
            }
        };

        const interval = setInterval(checkInactivity, 60000); // Check every minute

        // Add event listeners for user activity
        window.addEventListener('mousemove', updateActivity);
        window.addEventListener('keydown', updateActivity);
        window.addEventListener('click', updateActivity);

        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', updateActivity);
            window.removeEventListener('keydown', updateActivity);
            window.removeEventListener('click', updateActivity);
        };
    }, [isAuthenticated]);

    const ADMIN_PASSWORD = 'Royalty.1608@070221';

    const login = (password) => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            sessionStorage.setItem('admin_last_activity', Date.now().toString());
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
        sessionStorage.removeItem('admin_last_activity');
        localStorage.removeItem('admin_authenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
