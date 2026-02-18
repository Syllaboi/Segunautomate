import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, Trash2, X } from 'lucide-react';
import './Editors.css';

const ExperienceEditor = () => {
    const { content, updateExperience } = useContent();
    const [experienceData, setExperienceData] = useState(content.experience);
    const [saved, setSaved] = useState(false);

    const handleExperienceChange = (index, field, value) => {
        const newExperience = [...experienceData];
        newExperience[index] = { ...newExperience[index], [field]: value };
        setExperienceData(newExperience);
    };

    const handleResponsibilitiesChange = (expIndex, respString) => {
        const newExperience = [...experienceData];
        newExperience[expIndex].responsibilities = respString.split('\n').filter(r => r.trim());
        setExperienceData(newExperience);
    };

    const addExperience = () => {
        setExperienceData([...experienceData, {
            title: '',
            company: '',
            period: '',
            responsibilities: []
        }]);
    };

    const removeExperience = (index) => {
        setExperienceData(experienceData.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        updateExperience(experienceData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Edit Experience Section</h2>
                <button onClick={handleSave} className="btn btn-primary" disabled={saved}>
                    <Save size={18} />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {experienceData.map((exp, index) => (
                <div key={index} className="editor-section card">
                    <div className="section-header-with-delete">
                        <h3>Experience {index + 1}</h3>
                        <button
                            onClick={() => removeExperience(index)}
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--color-error)' }}
                        >
                            <X size={18} />
                            Remove
                        </button>
                    </div>

                    <div className="editor-field-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                            placeholder="e.g., AI Systems Architect"
                        />
                    </div>

                    <div className="editor-field-group">
                        <label>Company</label>
                        <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            placeholder="e.g., Freelance"
                        />
                    </div>

                    <div className="editor-field-group">
                        <label>Period</label>
                        <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                            placeholder="e.g., 2022 - Present"
                        />
                    </div>

                    <div className="editor-field-group">
                        <label>Responsibilities (one per line)</label>
                        <textarea
                            value={exp.responsibilities.join('\n')}
                            onChange={(e) => handleResponsibilitiesChange(index, e.target.value)}
                            rows="6"
                            placeholder="Enter each responsibility on a new line..."
                        />
                        <small>Each line will become a bullet point</small>
                    </div>
                </div>
            ))}

            <button onClick={addExperience} className="btn btn-secondary">
                <Plus size={18} />
                Add Experience
            </button>
        </div>
    );
};

export default ExperienceEditor;
