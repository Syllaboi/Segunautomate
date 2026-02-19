import { useContent } from '../context/ContentContext';
import { Briefcase, Calendar } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    const { content } = useContent();
    const { experience } = content;

    return (
        <section id="experience" className="section" aria-labelledby="experience-heading">
            <div className="container">
                <h2 id="experience-heading" className="section-title">Professional Experience</h2>

                <ol className="experience-timeline" aria-label="Work experience timeline">
                    {experience.map((exp, index) => (
                        <li key={index} className="experience-item">
                            <div className="experience-icon" aria-hidden="true">
                                <Briefcase size={24} />
                            </div>
                            <article className="experience-content card">
                                <header className="experience-header">
                                    <div>
                                        <h3>{exp.title}</h3>
                                        <p className="experience-company">{exp.company}</p>
                                    </div>
                                    <div className="experience-period">
                                        <Calendar size={18} aria-hidden="true" />
                                        <time>{exp.period}</time>
                                    </div>
                                </header>
                                <ul className="experience-responsibilities">
                                    {exp.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            </article>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Experience;
