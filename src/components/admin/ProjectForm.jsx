import { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { X, Upload, Eye, Trash2 } from 'lucide-react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './ProjectForm.css';

const ProjectForm = ({ project, onClose }) => {
    const { addProject, updateProject } = useProjects();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        link: '',
        videoLink: '',
        tags: '',
        featured: true
    });
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                images: project.images || (project.image ? [project.image] : []),
                link: project.link || '',
                videoLink: project.videoLink || '',
                tags: project.tags ? project.tags.join(', ') : '',
                featured: project.featured !== false
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleDescriptionChange = (value) => {
        setFormData(prev => ({ ...prev, description: value }));
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

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        if (formData.images.length >= 3) {
            alert('Maximum 3 images allowed per project');
            return;
        }
        const spaceLeft = 3 - formData.images.length;
        const toUpload = files.slice(0, spaceLeft);
        setIsUploading(true);
        setUploadError('');
        try {
            const uploaded = [];
            for (const f of toUpload) {
                const url = await uploadToCloudinary(f);
                uploaded.push(url);
            }
            setFormData(prev => ({ ...prev, images: [...prev.images, ...uploaded] }));
        } catch (err) {
            console.error('Cloudinary upload failed:', err);
            setUploadError(err?.message || 'Upload failed. Check your Cloudinary settings or try a different image.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const addImageUrl = () => {
        if (imageUrl && formData.images.length < 3) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, imageUrl]
            }));
            setImageUrl('');
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
            videoLink: formData.videoLink,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            featured: formData.featured
        };

        if (project) {
            updateProject(project.id, projectData);
        } else {
            addProject(projectData);
        }

        onClose();
    };

    // (renderDescription removed, using dangerouslySetInnerHTML)

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
                    <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleCheckboxChange}
                            style={{ width: 'auto' }}
                        />
                        <label htmlFor="featured" style={{ margin: 0, display: 'inline' }}>Show in main "Selected Projects" section (uncheck for "And many more")</label>
                    </div>

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
                        </label>
                        <div style={{ background: '#fff', color: '#000', borderRadius: '4px', overflow: 'hidden' }}>
                            <ReactQuill 
                                theme="snow" 
                                value={formData.description} 
                                onChange={handleDescriptionChange} 
                                placeholder="Describe your project with rich text formatting..."
                            />
                        </div>
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
                                {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ? (
                                    <>
                                        <input
                                            type="file"
                                            id="image-upload"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="file-input"
                                            disabled={isUploading}
                                        />
                                        <label htmlFor="image-upload" className="file-label btn btn-secondary" aria-disabled={isUploading}>
                                            <Upload size={18} />
                                            {isUploading ? 'Uploading...' : `Upload Image (${formData.images.length}/3)`}
                                        </label>
                                        {uploadError && (
                                            <small style={{ color: 'var(--color-error)', display: 'block', marginTop: '0.25rem' }}>
                                                {uploadError}
                                            </small>
                                        )}
                                        <small style={{ display: 'block', marginTop: '0.5rem' }}>
                                            Or paste an image URL below
                                        </small>
                                    </>
                                ) : (
                                    <small style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-muted)' }}>
                                        To enable direct uploads, set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env
                                    </small>
                                )}
                                <div className="editor-field-group" style={{ margin: '0.5rem 0' }}>
                                    <input
                                        type="url"
                                        placeholder="Paste image URL..."
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={addImageUrl}
                                    className="btn btn-secondary"
                                >
                                    Add Image URL ({formData.images.length}/3)
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="videoLink">Video Link (YouTube/Vimeo)</label>
                        <input
                            type="url"
                            id="videoLink"
                            name="videoLink"
                            value={formData.videoLink}
                            onChange={handleChange}
                            placeholder="https://youtube.com/watch?v=..."
                        />
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
                        <div className="admin-rich-text" dangerouslySetInnerHTML={{ __html: formData.description || '<p>Project description will appear here...</p>' }} />
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
