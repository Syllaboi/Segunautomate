import { useContent } from '../context/ContentContext';
import { Briefcase, Calendar } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    const { content } = useContent();
    const { experience } = content;

    return (
        <section id="experience" className="section">
            <div className="container">
                <h2 className="section-title">Professional Experience</h2>

                <div className="experience-timeline">
                    {experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <div className="experience-icon">
                                <Briefcase size={24} />
                            </div>
                            <div className="experience-content card">
                                <div className="experience-header">
                                    <div>
                                        <h3>{exp.title}</h3>
                                        <p className="experience-company">{exp.company}</p>
                                    </div>
                                    <div className="experience-period">
                                        <Calendar size={18} />
                                        <span>{exp.period}</span>
                                    </div>
                                </div>
                                <ul className="experience-responsibilities">
                                    {exp.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
