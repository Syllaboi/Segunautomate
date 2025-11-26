import { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { X, Upload, Eye, Trash2 } from 'lucide-react';
import './ProjectForm.css';

const ProjectForm = ({ project, onClose }) => {
    const { addProject, updateProject } = useProjects();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        link: '',
        tags: ''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                images: project.images || (project.image ? [project.image] : []),
                link: project.link || '',
                tags: project.tags ? project.tags.join(', ') : ''
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = (e) => {
        // Allow Shift+Enter for new line in textareas
        if (e.key === 'Enter' && !e.shiftKey && e.target.tagName === 'TEXTAREA') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            const newValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
            setFormData(prev => ({ ...prev, [e.target.name]: newValue }));
            // Set cursor position after the new line
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
            }, 0);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && formData.images.length < 3) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, base64String]
                }));
            };
            reader.readAsDataURL(file);
        } else if (formData.images.length >= 3) {
            alert('Maximum 3 images allowed per project');
        }
    };

    const addImageUrl = () => {
        const url = prompt('Enter image URL:');
        if (url && formData.images.length < 3) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, url]
            }));
        } else if (formData.images.length >= 3) {
            alert('Maximum 3 images allowed per project');
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const projectData = {
            title: formData.title,
            description: formData.description,
            images: formData.images,
            image: formData.images[0] || '', // Keep backward compatibility
            link: formData.link,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        if (project) {
            updateProject(project.id, projectData);
        } else {
            addProject(projectData);
        }

        onClose();
    };

    // Function to render description with HTML links
    const renderDescription = (text) => {
        if (!text) return '';
        // Replace <a href="url">text</a> with just the link text for preview
        return text.replace(/<a\s+href="[^"]*">([^<]+)<\/a>/g, '$1');
    };

    return (
        <div className="project-form-container">
            <div className="project-form-header">
                <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={onClose} className="btn btn-ghost close-btn">
                    <X size={24} />
                </button>
            </div>

            <div className="project-form-layout">
                <form onSubmit={handleSubmit} className="project-form card">
                    <div className="form-group">
                        <label htmlFor="title">Project Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter project title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            Description *
                            <small style={{ marginLeft: '0.5rem', fontWeight: 'normal' }}>
                                (Use &lt;a href="url"&gt;text&lt;/a&gt; for links)
                            </small>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            required
                            placeholder="Describe your project... Press Enter for new line. Use <a href='url'>link text</a> for clickable links."
                            rows="6"
                        />
                        <small>Press Enter for new line. HTML links supported: &lt;a href="url"&gt;text&lt;/a&gt;</small>
                    </div>

                    <div className="form-group">
                        <label>Project Images (Max 3)</label>
                        <div className="images-container">
                            {formData.images.map((img, index) => (
                                <div key={index} className="image-preview-item">
                                    <img src={img} alt={`Preview ${index + 1}`} />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="remove-image-btn"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {formData.images.length < 3 && (
                            <div className="image-upload-actions">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
                                <label htmlFor="image-upload" className="file-label btn btn-secondary">
                                    <Upload size={18} />
                                    Upload Image ({formData.images.length}/3)
                                </label>
                                <button
                                    type="button"
                                    onClick={addImageUrl}
                                    className="btn btn-secondary"
                                >
                                    Add Image URL
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="link">Project Link</label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags (comma separated)</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="React, Python, Data Analysis"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {project ? 'Update Project' : 'Add Project'}
                        </button>
                    </div>
                </form>

                <div className="project-preview card">
                    <div className="preview-header">
                        <Eye size={20} />
                        <h3>Preview</h3>
                    </div>
                    <div className="preview-content">
                        {formData.images.length > 0 && (
                            <div className="preview-images">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="preview-image">
                                        <img src={img} alt={`Preview ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                        <h4>{formData.title || 'Project Title'}</h4>
                        <p>{renderDescription(formData.description) || 'Project description will appear here...'}</p>
                        {formData.tags && (
                            <div className="preview-tags">
                                {formData.tags.split(',').map((tag, idx) => {
                                    const trimmedTag = tag.trim();
                                    return trimmedTag ? (
                                        <span key={idx} className="preview-tag">{trimmedTag}</span>
                                    ) : null;
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;
