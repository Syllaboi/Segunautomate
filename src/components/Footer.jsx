import { Shield } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="/privacy">Privacy Policy</a>
                        <span className="footer-separator">•</span>
                        <a href="/admin" className="admin-link">
                            <Shield size={14} />
                            Admin
                        </a>
                    </div>
                    <p>&copy; {currentYear} Segun Salako. All rights reserved.</p>
                    <p>Built with React & passion for data and automation</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
