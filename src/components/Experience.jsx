import { useContent } from '../context/ContentContext';
import { Briefcase, Calendar } from 'lucide-react';
import { GlowCard } from './ui/spotlight-card';
import useScrollReveal from '../utils/useScrollReveal';
import './Experience.css';

const Experience = () => {
    const { content } = useContent();
    const { experience } = content;
    useScrollReveal();

    return (
        <section id="experience" className="section" aria-labelledby="experience-heading" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="global-shader-blob shader-blue" style={{ width: '600px', height: '600px', top: '40%', left: '-15%' }} aria-hidden="true" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="experience-header reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="header-eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>
                        <span className="header-eyebrow-dot" />
                        Career
                    </div>
                    <h2 id="experience-heading" className="header-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--sp-4)' }}>
                        <span className="line">Professional</span>
                        <span className="line line-gradient">Experience</span>
                    </h2>
                    <p className="header-subtitle" style={{ margin: '0 auto' }}>
                        A track record of delivering impactful automation and AI solutions
                        across diverse industries.
                    </p>
                </div>

                <ol className="experience-timeline" aria-label="Work experience timeline">
                    {experience.map((exp, index) => (
                        <li key={index} className={`experience-item reveal reveal-delay-${(index % 4) + 1}`}>
                            <div className="experience-icon" aria-hidden="true">
                                <Briefcase size={22} />
                            </div>
                            <GlowCard
                                customSize={true}
                                glowColor="blue"
                                className="experience-glow-wrapper"
                                style={{ width: '100%' }}
                            >
                                <article
                                    className="experience-content"
                                    style={{ background: 'transparent', border: 'none', width: '100%' }}
                                >
                                    <header className="experience-header-row">
                                        <div>
                                            <h3>{exp.title}</h3>
                                            <p className="experience-company">{exp.company}</p>
                                        </div>
                                        <div className="experience-period">
                                            <Calendar size={14} aria-hidden="true" />
                                            <time>{exp.period}</time>
                                        </div>
                                    </header>
                                    <ul className="experience-responsibilities">
                                        {exp.responsibilities.map((resp, idx) => (
                                            <li key={idx}>{resp}</li>
                                        ))}
                                    </ul>
                                </article>
                            </GlowCard>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Experience;
