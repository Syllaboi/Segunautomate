import React, { useEffect } from 'react';
import { useProjects } from '../context/ProjectsContext';
import { OtherProjectsGrid } from './ui/other-projects-grid';
import SEO from './SEO';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

const ArchivesPage = () => {
    const { projects } = useProjects();
    const otherProjects = projects.filter(p => p.featured === false || p.featured === 'false');
    console.log('DEBUG: All projects count:', projects.length);
    console.log('DEBUG: Other projects count:', otherProjects.length);
    console.log('DEBUG: Project featured flags:', projects.map(p => ({ id: p.id, featured: p.featured })));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const goBack = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO title="Project Archives | Segun Salako" description="Explore my other automation scripts, workflows, and integrations." />
            
            <header style={{ padding: '2rem', display: 'flex', alignItems: 'center' }}>
                <a href="/" onClick={goBack} className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} />
                    Back to Home
                </a>
            </header>

            <main style={{ flex: 1, padding: '0 1rem' }}>
                {/* The OtherProjectsGrid already has the "And Many More" heading and the accordion */}
                <OtherProjectsGrid projects={otherProjects} />
            </main>

            <Footer />
        </div>
    );
};

export default ArchivesPage;
