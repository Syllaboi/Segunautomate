import { useContent } from '../context/ContentContext';
import { User, Target, Award } from 'lucide-react';
import './About.css';

const About = () => {
    const { content } = useContent();
    const { about } = content;

    const icons = [<User size={32} />, <Target size={32} />, <Award size={32} />];

    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-text">
                        {about.intro.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="about-highlights grid grid-3">
                        {about.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-card card">
                                <div className="highlight-icon">
                                    {icons[index] || <User size={32} />}
                                </div>
                                <h3>{highlight.title}</h3>
                                <p>{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
