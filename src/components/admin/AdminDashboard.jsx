import { useState } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, LogOut, Home, User, Briefcase, Code, Mail, FolderOpen } from 'lucide-react';
import ProjectForm from './ProjectForm';
import AboutEditor from './AboutEditor';
import SkillsEditor from './SkillsEditor';
import ExperienceEditor from './ExperienceEditor';
import ContactEditor from './ContactEditor';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { projects, deleteProject } = useProjects();
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('projects');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const tabs = [
        { id: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
        { id: 'about', label: 'About', icon: <User size={18} /> },
        { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
        { id: 'contact', label: 'Contact', icon: <Mail size={18} /> }
    ];

    const handleEdit = (project) => {
        setEditingProject(project);
        setShowProjectForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    const handleFormClose = () => {
        setShowProjectForm(false);
        setEditingProject(null);
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="container">
                    <div className="admin-header-content">
                        <h1>Admin Dashboard</h1>
                        <div className="admin-header-actions">
                            <a href="/" className="btn btn-ghost">
                                <Home size={18} />
                                View Site
                            </a>
                            <button onClick={logout} className="btn btn-secondary">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-content container">
                {/* Tabs */}
                <div className="admin-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="admin-tab-content">
                    {activeTab === 'projects' && (
                        showProjectForm ? (
                            <ProjectForm
                                project={editingProject}
                                onClose={handleFormClose}
                            />
                        ) : (
                            <>
                                <div className="admin-actions">
                                    <h2>Projects ({projects.length})</h2>
                                    <button
                                        onClick={() => setShowProjectForm(true)}
                                        className="btn btn-primary"
                                    >
                                        <Plus size={18} />
                                        Add New Project
                                    </button>
                                </div>

                                {projects.length === 0 ? (
                                    <div className="no-projects-admin card">
                                        <p>No projects yet. Click "Add New Project" to create your first one!</p>
                                    </div>
                                ) : (
                                    <div className="admin-projects-grid">
                                        {projects.map((project) => (
                                            <div key={project.id} className="admin-project-card card">
                                                {project.image && (
                                                    <div className="admin-project-image">
                                                        <img src={project.image} alt={project.title} />
                                                    </div>
                                                )}
                                                <div className="admin-project-content">
                                                    <h3>{project.title}</h3>
                                                    <p>{project.description}</p>
                                                    {project.tags && project.tags.length > 0 && (
                                                        <div className="admin-project-tags">
                                                            {project.tags.map((tag, idx) => (
                                                                <span key={idx} className="tag">{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="admin-project-actions">
                                                        <button
                                                            onClick={() => handleEdit(project)}
                                                            className="btn btn-secondary"
                                                        >
                                                            <Edit size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(project.id)}
                                                            className="btn btn-ghost"
                                                            style={{ color: 'var(--color-error)' }}
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )
                    )}

                    {activeTab === 'about' && <AboutEditor />}
                    {activeTab === 'skills' && <SkillsEditor />}
                    {activeTab === 'experience' && <ExperienceEditor />}
                    {activeTab === 'contact' && <ContactEditor />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
