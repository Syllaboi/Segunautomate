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
        <section id="skills" className="section" style={{ background: 'var(--gradient-surface)' }}>
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>

                <div className="skills-grid grid grid-2">
                    {skills.map((category, index) => (
                        <div key={index} className="skill-category card">
                            <div className="skill-header">
                                <div className="skill-icon">
                                    {icons[category.title] || <Code size={28} />}
                                </div>
                                <h3>{category.title}</h3>
                            </div>
                            <div className="skill-tags">
                                {category.skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
