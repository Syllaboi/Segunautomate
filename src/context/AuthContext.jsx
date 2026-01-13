import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Firebase Auth handles authentication

    // Update last activity timestamp
    const updateActivity = () => {
        if (isAuthenticated) {
            sessionStorage.setItem('admin_last_activity', Date.now().toString());
        }
    };

    // Subscribe to Firebase auth state
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsub();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (e) {
            console.error('Login failed', e);
            return false;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error('Sign out error', e);
        } finally {
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
