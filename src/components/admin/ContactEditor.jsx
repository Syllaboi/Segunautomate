import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save } from 'lucide-react';
import './Editors.css';

const ContactEditor = () => {
    const { content, updateContact } = useContent();
    const [contactData, setContactData] = useState(content.contact);
    const [saved, setSaved] = useState(false);

    const handleChange = (field, value) => {
        setContactData({ ...contactData, [field]: value });
    };

    const handleSave = () => {
        updateContact(contactData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Edit Contact Information</h2>
                <button onClick={handleSave} className="btn btn-primary" disabled={saved}>
                    <Save size={18} />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="editor-section card">
                <h3>Contact Details</h3>

                <div className="editor-field-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                    />
                </div>

                <div className="editor-field-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={contactData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+234 xxx xxx xxxx"
                    />
                </div>

                <div className="editor-field-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={contactData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="City, Country / Remote"
                    />
                </div>

                <div className="editor-field-group">
                    <label>LinkedIn URL</label>
                    <input
                        type="url"
                        value={contactData.linkedin}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>

                <div className="editor-field-group">
                    <label>Resume URL</label>
                    <input
                        type="url"
                        value={contactData.resume}
                        onChange={(e) => handleChange('resume', e.target.value)}
                        placeholder="https://drive.google.com/..."
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactEditor;
