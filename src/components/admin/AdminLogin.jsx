import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const success = login(password);

        if (!success) {
            setError('Invalid password');
            setPassword('');
        }
        setIsLoading(false);
    };

    return (
        <div className="admin-login">
            <div className="admin-login-card card">
                <div className="admin-login-icon">
                    <Lock size={48} />
                </div>
                <h2>Admin Login</h2>
                <p>Enter your password to access the admin panel</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter admin password"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AdminLogin;
