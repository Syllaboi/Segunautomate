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
        <header className="header">
            {/* Video Background */}
            <div className="header-video-container">
                <div className="header-video-overlay"></div>
                {/* Video will show once you add header-video.mp4 to public/video folder */}
                <video
                    className="header-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/video/header-video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Dark Mode Toggle */}
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
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
                        Vibe Coder & Automation Specialist
                    </p>
                    <p className="header-description">
                        Crafting delightful code experiences and automating workflows to
                        drive efficiency and innovation.
                    </p>

                    <div className="header-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('projects')}
                        >
                            View My Work
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('contact')}
                        >
                            Get In Touch
                        </button>
                    </div>

                    <div className="header-social">
                        <a href={`mailto:${contact.email}`} aria-label="Email">
                            <Mail size={20} />
                        </a>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href={contact.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume">
                            <FileText size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse"></div>
            </div>
        </header>
    );
};

export default Header;
