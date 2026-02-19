import { useContent } from '../context/ContentContext';
import { Moon, Sun, Mail, Linkedin, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { content } = useContent();
    const { contact } = content;

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header" role="banner">
            {/* Video Background */}
            <div className="header-video-container" aria-hidden="true">
                <div className="header-video-overlay"></div>
                <video
                    className="header-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/video/header-video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Dark Mode Toggle */}
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Header Content */}
            <div className="header-content container">
                <div className="header-text">
                    <h1 className="header-title">
                        Hi, I'm <span className="text-gradient">Segun Salako</span>
                    </h1>
                    <p className="header-subtitle">
                        No-Code Automation Engineer, Vibe Coder &amp; AI Systems Architect
                    </p>
                    <p className="header-description">
                        Building intelligent automation workflows, AI agents, and scalable cloud systems.
                        Specialising in n8n, Zapier, Make.com, Generative AI, and no-code/low-code solutions
                        for businesses worldwide — available for freelance &amp; remote work.
                    </p>

                    <div className="header-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('projects')}
                            aria-label="View Segun Salako's automation and AI projects"
                        >
                            View My Work
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('contact')}
                            aria-label="Get in touch with Segun Salako"
                        >
                            Get In Touch
                        </button>
                    </div>

                    <nav className="header-social" aria-label="Social media and contact links">
                        <a href={`mailto:${contact.email}`} aria-label="Send Segun Salako an email">
                            <Mail size={20} />
                        </a>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Segun Salako on LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href={contact.resume} target="_blank" rel="noopener noreferrer" aria-label="View Segun Salako's resume">
                            <FileText size={20} />
                        </a>
                    </nav>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator" aria-hidden="true">
                <div className="scroll-mouse"></div>
            </div>
        </header>
    );
};

export default Header;
