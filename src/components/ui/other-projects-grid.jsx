import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import './other-projects.css';

export function OtherProjectsGrid({ projects }) {
  const [openId, setOpenId] = useState(null);

  const toggleProject = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const unescapeHTML = (htmlStr) => {
    if (!htmlStr) return '';
    let str = htmlStr.replace(/&nbsp;/g, ' ');
    str = str.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    return str;
  };

  return (
    <div className="other-projects-section">
      <div className="projects-header" style={{ marginTop: '6rem', marginBottom: '3rem', textAlign: 'center' }}>
        <h3 className="header-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <span className="line opacity-80">And</span>
          <span className="line line-gradient">Many More</span>
        </h3>
        <p className="header-subtitle" style={{ margin: '0 auto' }}>
          Explore other scripts, workflows, and integrations I've built.
        </p>
      </div>

      {(!projects || projects.length === 0) ? (
        <div className="no-projects" style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.7 }}>
          <p>No archived projects yet. Uncheck "Show in main Selected Projects section" on a project to move it here!</p>
        </div>
      ) : (
        <div className="other-projects-accordion">
          {projects.map((project, idx) => {
          const isOpen = openId === (project.id || idx);
          
          return (
            <div key={project.id || idx} className={`accordion-item ${isOpen ? 'open' : ''}`}>
              <button 
                className="accordion-header" 
                onClick={() => toggleProject(project.id || idx)}
              >
                <div className="accordion-title-wrap">
                  <h4 className="accordion-title">{project.title}</h4>
                  {project.tags && project.tags.length > 0 && (
                    <div className="accordion-tags">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="accordion-icon">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div className="accordion-content-wrap" style={{ height: isOpen ? 'auto' : '0px', overflow: 'hidden' }}>
                <div className="accordion-content admin-rich-text">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="accordion-image" />
                  )}
                  <div 
                    dangerouslySetInnerHTML={{ __html: unescapeHTML(project.description) }} 
                  />
                  {project.link && (
                    <div className="accordion-footer">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', padding: '0.5rem 1rem' }}>
                        Visit Project <ArrowUpRight size={16} style={{ marginLeft: '8px' }} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
