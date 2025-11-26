import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import './Editors.css';

const AboutEditor = () => {
    const { content, updateAbout } = useContent();
    const [aboutData, setAboutData] = useState(content.about);
    const [saved, setSaved] = useState(false);

    const handleIntroChange = (index, value) => {
        const newIntro = [...aboutData.intro];
        newIntro[index] = value;
        setAboutData({ ...aboutData, intro: newIntro });
    };

    const addIntroParagraph = () => {
        setAboutData({
            ...aboutData,
            intro: [...aboutData.intro, '']
        });
    };

    const removeIntroParagraph = (index) => {
        const newIntro = aboutData.intro.filter((_, i) => i !== index);
        setAboutData({ ...aboutData, intro: newIntro });
    };

    const handleHighlightChange = (index, field, value) => {
        const newHighlights = [...aboutData.highlights];
        newHighlights[index] = { ...newHighlights[index], [field]: value };
        setAboutData({ ...aboutData, highlights: newHighlights });
    };

    const handleSave = () => {
        updateAbout(aboutData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Edit About Section</h2>
                <button onClick={handleSave} className="btn btn-primary" disabled={saved}>
                    <Save size={18} />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="editor-section card">
                <h3>Introduction Paragraphs</h3>
                {aboutData.intro.map((paragraph, index) => (
                    <div key={index} className="editor-field-group">
                        <label>Paragraph {index + 1}</label>
                        <div className="field-with-action">
                            <textarea
                                value={paragraph}
                                onChange={(e) => handleIntroChange(index, e.target.value)}
                                rows="3"
                                placeholder="Enter paragraph text..."
                            />
                            {aboutData.intro.length > 1 && (
                                <button
                                    onClick={() => removeIntroParagraph(index)}
                                    className="btn btn-ghost btn-sm"
                                    style={{ color: 'var(--color-error)' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button onClick={addIntroParagraph} className="btn btn-secondary">
                    <Plus size={18} />
                    Add Paragraph
                </button>
            </div>

            <div className="editor-section card">
                <h3>Highlight Cards</h3>
                {aboutData.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-editor">
                        <h4>Highlight {index + 1}</h4>
                        <div className="editor-field-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={highlight.title}
                                onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
                                placeholder="e.g., Data-Driven"
                            />
                        </div>
                        <div className="editor-field-group">
                            <label>Description</label>
                            <textarea
                                value={highlight.description}
                                onChange={(e) => handleHighlightChange(index, 'description', e.target.value)}
                                rows="2"
                                placeholder="Brief description..."
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutEditor;
