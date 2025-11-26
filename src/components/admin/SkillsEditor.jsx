import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, Trash2, X } from 'lucide-react';
import './Editors.css';

const SkillsEditor = () => {
    const { content, updateSkills } = useContent();
    const [skillsData, setSkillsData] = useState(content.skills);
    const [saved, setSaved] = useState(false);

    const handleCategoryChange = (index, field, value) => {
        const newSkills = [...skillsData];
        newSkills[index] = { ...newSkills[index], [field]: value };
        setSkillsData(newSkills);
    };

    const handleSkillsChange = (categoryIndex, skillsString) => {
        const newSkills = [...skillsData];
        // Don't filter while typing to allow creating new items with comma
        newSkills[categoryIndex].skills = skillsString.split(',');
        setSkillsData(newSkills);
    };

    const addCategory = () => {
        setSkillsData([...skillsData, { title: '', skills: [] }]);
    };

    const removeCategory = (index) => {
        setSkillsData(skillsData.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        // Clean up empty skills before saving
        const cleanedData = skillsData.map(cat => ({
            ...cat,
            skills: cat.skills.map(s => s.trim()).filter(s => s)
        }));

        updateSkills(cleanedData);
        setSkillsData(cleanedData); // Update local state with cleaned data
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Edit Skills Section</h2>
                <button onClick={handleSave} className="btn btn-primary" disabled={saved}>
                    <Save size={18} />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {skillsData.map((category, index) => (
                <div key={index} className="editor-section card">
                    <div className="section-header-with-delete">
                        <h3>Category {index + 1}</h3>
                        <button
                            onClick={() => removeCategory(index)}
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--color-error)' }}
                        >
                            <X size={18} />
                            Remove Category
                        </button>
                    </div>

                    <div className="editor-field-group">
                        <label>Category Title</label>
                        <input
                            type="text"
                            value={category.title}
                            onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
                            placeholder="e.g., Analytics, Automation"
                        />
                    </div>

                    <div className="editor-field-group">
                        <label>Skills (comma separated)</label>
                        <textarea
                            value={category.skills.join(', ')}
                            onChange={(e) => handleSkillsChange(index, e.target.value)}
                            rows="2"
                            placeholder="SQL, Power BI, Excel, ..."
                        />
                        <small>Separate each skill with a comma</small>
                    </div>
                </div>
            ))}

            <button onClick={addCategory} className="btn btn-secondary">
                <Plus size={18} />
                Add Skill Category
            </button>
        </div>
    );
};

export default SkillsEditor;
