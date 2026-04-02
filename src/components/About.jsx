import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { User, Target, Award } from 'lucide-react';
import { GlowCard } from './ui/spotlight-card';
import useScrollReveal from '../utils/useScrollReveal';
import './About.css';

const About = () => {
    const { content } = useContent();
    const { about } = content;
    useScrollReveal();

    const icons = [<User size={28} />, <Target size={28} />, <Award size={28} />];

    return (
        <section id="about" className="section" aria-labelledby="about-heading" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="global-shader-blob shader-purple" style={{ width: '600px', height: '600px', top: '-10%', left: '-10%' }} aria-hidden="true" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="about-header reveal">
                    <div className="header-eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>
                        <span className="header-eyebrow-dot" />
                        About Me
                    </div>
                    <h2 id="about-heading" className="header-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: 'var(--sp-6)' }}>
                        <span className="line">Building the future,</span>
                        <span className="line line-gradient">one automation at a time</span>
                    </h2>
                </div>

                <div className="about-content">
                    <div className="about-text reveal">
                        {about.intro.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="about-highlights" role="list">
                        {about.highlights.map((highlight, index) => (
                            <GlowCard
                                key={index}
                                customSize={true}
                                glowColor="purple"
                                className={`reveal reveal-delay-${index + 1}`}
                            >
                                <article
                                    className="highlight-card"
                                    role="listitem"
                                    style={{ background: 'transparent', border: 'none', height: '100%' }}
                                >
                                    <div className="highlight-icon" aria-hidden="true">
                                        {icons[index] || <User size={28} />}
                                    </div>
                                    <h3>{highlight.title}</h3>
                                    <p>{highlight.description}</p>
                                </article>
                            </GlowCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
