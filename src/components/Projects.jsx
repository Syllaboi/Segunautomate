import { useProjects } from '../context/ProjectsContext';
import { ExternalLink, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import './Projects.css';

const Projects = () => {
    const { projects } = useProjects();

    // Function to render description with HTML links
    const renderDescription = (text) => {
        if (!text) return text;

        // Parse HTML links and render them
        const parts = [];
        const linkRegex = /<a\s+href="([^"]*)">([^<]+)<\/a>/g;
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            // Add text before the link
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            // Add the link
            parts.push(
                <a
                    key={match.index}
                    href={match[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                >
                    {match[2]}
                </a>
            );
            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    const ImageCarousel = ({ images }) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        if (!images || images.length === 0) return null;
        if (images.length === 1) {
            return (
                <div className="project-image single">
                    <img src={images[0]} alt="Project" />
                </div>
            );
        }

        const nextImage = () => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        };

        const prevImage = () => {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        };

        return (
            <div className="project-image-carousel">
                <div className="carousel-image">
                    <img src={images[currentIndex]} alt={`Project ${currentIndex + 1}`} />
                </div>
                {images.length > 1 && (
                    <>
                        <button className="carousel-btn prev" onClick={prevImage}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className="carousel-btn next" onClick={nextImage}>
                            <ChevronRight size={24} />
                        </button>
                        <div className="carousel-dots">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(idx)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <section id="projects" className="section" style={{ background: 'var(--gradient-surface)' }}>
            <div className="container">
                <h2 className="section-title">Projects</h2>

                {projects.length === 0 ? (
                    <div className="no-projects">
                        <p>No projects yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="projects-grid grid grid-2">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card card">
                                <ImageCarousel images={project.images || (project.image ? [project.image] : [])} />

                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{renderDescription(project.description)}</p>

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="project-tags">
                                            {project.tags.map((tag, idx) => (
                                                <span key={idx} className="project-tag">
                                                    <Tag size={14} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            View Project <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
