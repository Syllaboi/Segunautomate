import { Shield } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        Segun<span>.</span>
                    </div>
                    <nav className="footer-links" aria-label="Footer navigation">
                        <a href="/privacy">Privacy Policy</a>
                        <span className="footer-separator" aria-hidden="true">•</span>
                        <a href="/admin" className="admin-link" aria-label="Admin dashboard">
                            <Shield size={12} aria-hidden="true" />
                            Admin
                        </a>
                    </nav>
                    <p className="footer-copy">
                        © {currentYear} <span>Segun Salako</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
