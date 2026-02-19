import { useContent } from '../context/ContentContext';
import { User, Target, Award } from 'lucide-react';
import './About.css';

const About = () => {
    const { content } = useContent();
    const { about } = content;

    const icons = [<User size={32} />, <Target size={32} />, <Award size={32} />];

    return (
        <section id="about" className="section" aria-labelledby="about-heading">
            <div className="container">
                <h2 id="about-heading" className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-text">
                        {about.intro.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="about-highlights grid grid-3" role="list">
                        {about.highlights.map((highlight, index) => (
                            <article key={index} className="highlight-card card" role="listitem">
                                <div className="highlight-icon" aria-hidden="true">
                                    {icons[index] || <User size={32} />}
                                </div>
                                <h3>{highlight.title}</h3>
                                <p>{highlight.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
