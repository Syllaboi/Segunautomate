import { useContent } from '../context/ContentContext';
import { Database, Zap, Cloud, Server, Code } from 'lucide-react';
import { GlowCard } from './ui/spotlight-card';
import useScrollReveal from '../utils/useScrollReveal';
import './Skills.css';

const Skills = () => {
    const { content } = useContent();
    const { skills } = content;
    useScrollReveal();

    const icons = {
        'Analytics': <Database size={24} />,
        'Automation': <Zap size={24} />,
        'Cloud & Tools': <Cloud size={24} />,
        'IT & Systems': <Server size={24} />
    };

    return (
        <section id="skills" className="section" aria-labelledby="skills-heading" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="global-shader-blob shader-mint" style={{ width: '500px', height: '500px', top: '20%', right: '-10%' }} aria-hidden="true" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="skills-header reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="header-eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>
                        <span className="header-eyebrow-dot" />
                        Expertise
                    </div>
                    <h2 id="skills-heading" className="header-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--sp-4)' }}>
                        <span className="line">Skills &amp;</span>
                        <span className="line line-gradient">Toolstack</span>
                    </h2>
                    <p className="header-subtitle" style={{ margin: '0 auto' }}>
                        A curated collection of technologies and tools I use to build
                        intelligent, scalable automation systems.
                    </p>
                </div>

                <div className="skills-grid" role="list">
                    {skills.map((category, index) => (
                        <GlowCard
                            key={index}
                            customSize={true}
                            glowColor="green"
                            className={`reveal reveal-delay-${(index % 4) + 1}`}
                        >
                            <article
                                className="skill-category"
                                role="listitem"
                                style={{ background: 'transparent', border: 'none', height: '100%' }}
                            >
                                <div className="skill-header">
                                    <div className="skill-icon" aria-hidden="true">
                                        {icons[category.title] || <Code size={24} />}
                                    </div>
                                    <h3>{category.title}</h3>
                                </div>
                                <ul className="skill-tags" aria-label={`${category.title} skills`}>
                                    {category.skills.map((skill, idx) => (
                                        <li key={idx} className="skill-tag">{skill}</li>
                                    ))}
                                </ul>
                            </article>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
