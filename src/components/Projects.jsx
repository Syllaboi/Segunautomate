import { useProjects } from '../context/ProjectsContext';
import useScrollReveal from '../utils/useScrollReveal';
import { ProjectShowcase } from './ui/project-showcase';
import { ArrowRight } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const { projects } = useProjects();
    useScrollReveal(0.12, [projects]);

    const featuredProjects = projects.filter(p => p.featured !== false && p.featured !== 'false');

    // Map projects to ProjectData expected by ProjectShowcase
    const showcaseProjects = featuredProjects.map(p => {
        let imageUrl = null;
        if (p.image) imageUrl = p.image;
        else if (p.images && p.images.length > 0) imageUrl = p.images[0];

        // Ensure description is a clean string (stripping out any <br/> or <a> tags for the sleeker UI)
        let cleanDesc = '';
        if (typeof p.description === 'string') {
            cleanDesc = p.description.replace(/<[^>]+>/g, '');
        }

        return {
            title: p.title || 'Untitled',
            description: cleanDesc,
            link: p.link || null,
            image: imageUrl,
            tags: p.tags || []
        };
    });

    return (
        <section id="projects" className="section" aria-labelledby="projects-heading" style={{ position: 'relative', overflowX: 'hidden' }}>
            <div className="global-shader-blob shader-purple" style={{ width: '800px', height: '800px', top: '20%', left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="projects-header reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="header-eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>
                        <span className="header-eyebrow-dot" />
                        Portfolio
                    </div>
                    <h2 id="projects-heading" className="header-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--sp-4)' }}>
                        <span className="line">Selected</span>
                        <span className="line line-gradient">Projects</span>
                    </h2>
                    <p className="header-subtitle" style={{ margin: '0 auto' }}>
                        A showcase of automation systems, AI integrations, and scalable
                        cloud solutions I've built for clients worldwide.
                    </p>
                </div>

                {featuredProjects.length === 0 ? (
                    <div className="no-projects">
                        <p>No featured projects yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="reveal reveal-delay-2 mt-8 w-full">
                        <ProjectShowcase projects={showcaseProjects} />
                    </div>
                )}

                <div className="reveal reveal-delay-3" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                    <a 
                        href="/archives" 
                        className="btn btn-secondary" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', '/archives');
                            window.dispatchEvent(new Event('popstate'));
                        }}
                    >
                        And Many More Projects
                        <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
