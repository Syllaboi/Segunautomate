import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Moon, Sun, Mail, Linkedin, FileText, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { content } = useContent();
    const { contact } = content;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const stats = [
        { value: '50', suffix: '+', label: 'Projects Delivered' },
        { value: '3',  suffix: 'yrs', label: 'Experience' },
        { value: '100', suffix: '%', label: 'Remote Ready' },
    ];

    return (
        <header className="header" role="banner">

            {/* ── Shader Background ── */}
            <div className="header-shader-bg" aria-hidden="true">
                <div className="shader-blob shader-blob-1" />
                <div className="shader-blob shader-blob-2" />
                <div className="shader-blob shader-blob-3" />
            </div>
            <div className="header-grid"   aria-hidden="true" />
            <div className="header-vignette" aria-hidden="true" />

            {/* ── Fixed Nav ── */}
            <nav className={`header-nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary navigation">
                <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Segun<span>.</span>
                </div>
                <div className="nav-links" role="list">
                    {['about','skills','experience','projects','contact'].map(id => (
                        <button key={id} onClick={() => scrollToSection(id)} role="listitem">
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="nav-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}
                        onClick={() => scrollToSection('contact')}
                    >
                        Hire Me
                    </button>
                </div>
            </nav>

            {/* ── Hero Content — 21st.dev split-line style ── */}
            <div className="header-content">

                {/* Live badge */}
                <div className="header-eyebrow">
                    <span className="header-eyebrow-dot" />
                    Available for freelance &amp; remote work
                </div>

                {/* Dramatic split-line title */}
                <h1 className="header-title">
                    <span className="line">Hi, I'm</span>
                    <span className="line line-gradient">Segun Salako</span>
                </h1>

                <p className="header-subtitle">
                    No-Code Automation Engineer, AI Systems Architect &amp; Vibe Coder —
                    building intelligent workflows and scalable cloud systems for businesses worldwide.
                </p>

                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => scrollToSection('projects')}
                        aria-label="View projects"
                    >
                        View My Work <ArrowRight size={17} />
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => scrollToSection('contact')}
                        aria-label="Contact me"
                    >
                        Get In Touch
                    </button>
                </div>

                <nav className="header-social" aria-label="Social links">
                    <a href={`mailto:${contact.email}`} aria-label="Email"><Mail size={17} /></a>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                    <a href={contact.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume"><FileText size={17} /></a>
                </nav>

                {/* Stats */}
                <div className="header-stats">
                    {stats.map(({ value, suffix, label }) => (
                        <div key={label} className="stat-item">
                            <span className="stat-value">{value}<span>{suffix}</span></span>
                            <span className="stat-label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── 21st.dev Pulsing Circle ── */}
            <div className="pulsing-circle-wrapper" aria-hidden="true">
                <div className="pulsing-circle">
                    <div className="pulse-ring" />
                    <div className="pulse-ring" />
                    <div className="pulse-ring" />
                    <div className="pulse-ring" />
                    <div className="pulse-core" />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator" aria-hidden="true">
                <div className="scroll-mouse" />
                <span>Scroll</span>
            </div>
        </header>
    );
};

export default Header;
