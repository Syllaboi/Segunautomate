import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import './project-modal.css';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-content" onClick={e => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="project-modal-header">
          {project.image && (
            <img src={project.image} alt={project.title} className="project-modal-image" />
          )}
          <h2>{project.title}</h2>
          
          {project.tags && project.tags.length > 0 && (
            <div className="project-modal-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="project-modal-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        
        <div 
          className="project-modal-body admin-rich-text"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        
        {project.link && (
          <div className="project-modal-footer">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit Project <ArrowUpRight size={18} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
