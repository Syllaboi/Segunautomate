import { useContent } from '../context/ContentContext';
import { Database, Zap, Cloud, Server, Code } from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const { content } = useContent();
    const { skills } = content;

    const icons = {
        'Analytics': <Database size={28} />,
        'Automation': <Zap size={28} />,
        'Cloud & Tools': <Cloud size={28} />,
        'IT & Systems': <Server size={28} />
    };

    return (
        <section id="skills" className="section" style={{ background: 'var(--gradient-surface)' }} aria-labelledby="skills-heading">
            <div className="container">
                <h2 id="skills-heading" className="section-title">Skills &amp; Expertise</h2>

                <div className="skills-grid grid grid-2" role="list">
                    {skills.map((category, index) => (
                        <article key={index} className="skill-category card" role="listitem">
                            <div className="skill-header">
                                <div className="skill-icon" aria-hidden="true">
                                    {icons[category.title] || <Code size={28} />}
                                </div>
                                <h3>{category.title}</h3>
                            </div>
                            <ul className="skill-tags" aria-label={`${category.title} skills`}>
                                {category.skills.map((skill, idx) => (
                                    <li key={idx} className="skill-tag">{skill}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
