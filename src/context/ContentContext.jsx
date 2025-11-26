import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const ContentContext = createContext();

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within ContentProvider');
    }
    return context;
};

const defaultContent = {
    about: {
        intro: [
            "I'm a passionate Data Analyst and Automation Specialist with a proven track record of transforming complex data into actionable insights and streamlining business processes through intelligent automation.",
            "With expertise in SQL, Power BI, Python, and various automation tools like Zapier, N8N, and Airtable, I help organizations make data-driven decisions and optimize their workflows for maximum efficiency.",
            "My approach combines technical proficiency with business acumen, ensuring that every solution I deliver not only works flawlessly but also drives real business value."
        ],
        highlights: [
            {
                title: "Data-Driven",
                description: "Transforming raw data into meaningful insights that drive strategic decisions"
            },
            {
                title: "Process Optimizer",
                description: "Automating workflows to increase efficiency and reduce manual overhead"
            },
            {
                title: "Results Focused",
                description: "Delivering solutions that create measurable impact and business value"
            }
        ]
    },
    skills: [
        {
            title: 'Analytics & BI',
            skills: ['Power BI', 'SQL', 'Excel', 'Data Visualization', 'Statistical Analysis']
        },
        {
            title: 'Automation & No-code Tools',
            skills: ['Zapier', 'Make.com', 'Airtable', 'Notion', 'N8N', 'Webhook Integration', 'Workflow Optimization']
        },
        {
            title: 'Cloud & Database',
            skills: ['Google Cloud Console', 'Cloud SQL', 'API Integration', 'PostgreSQL', 'Database Management']
        },
        {
            title: 'IT Infrastructure & Networks',
            skills: ['Network Administration', 'System Maintenance', 'Hardware Troubleshooting', 'Server Admin', 'RSAT']
        },
        {
            title: 'Programming & Development',
            skills: ['Python', 'Data Analysis', 'Process Automation', 'API Development']
        },
        {
            title: 'Productivity & Operations',
            skills: ['Microsoft Office Suite', 'Technical Support', 'Project Management', 'Remote Collaboration']
        }
    ],
    experience: [
        {
            title: 'Remote Workflow Automation Specialist',
            company: 'Freelance',
            period: '2024 - Present',
            responsibilities: [
                'Design and implement automated workflows using Zapier, N8N, and custom scripts',
                'Integrate multiple platforms and APIs to streamline business processes',
                'Reduce manual tasks by up to 70% through intelligent automation',
                'Provide consultation on automation strategy and best practices'
            ]
        },
        {
            title: 'Nigerian Airforce',
            company: 'Nigerian Airforce',
            period: '2016 - Present',
            responsibilities: [
                'Managed network infrastructure and system maintenance',
                'Provided technical support and troubleshooting',
                'Implemented security protocols and backup procedures',
                'Coordinated IT operations and hardware management'
            ]
        },
        {
            title: 'Data Entry Officer',
            company: 'Lagos State Auditors Service',
            period: '2015 - 2016',
            responsibilities: [
                'Maintained auditable registration records with 98% accuracy',
                'Digitized and structured legacy records to improve retrieval and reporting',
                'Enhanced quality control procedures through insights shared with supervisors'
            ]
        }
    ],
    contact: {
        email: 'sgnzoe.life@gmail.com',
        phone: '+2347034572909',
        location: 'Lagos, Nigeria / Remote Available',
        linkedin: 'https://linkedin.com/in/segunexploresdata/',
        resume: 'https://drive.google.com/file/d/1QYCwepdx5CT2wb8IvZXM7OZkbKpeGaGA/view?usp=sharing'
    }
};

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reference to the content document
        const contentRef = doc(db, 'portfolio_content', 'main');

        // Set up real-time listener
        const unsubscribe = onSnapshot(
            contentRef,
            async (docSnap) => {
                if (docSnap.exists()) {
                    const serverData = docSnap.data();

                    // TIMESTAMP CHECK:
                    // Only update local state if server data is NEWER than what we have.
                    // This prevents "empty" or "old" server data from overwriting recent local changes
                    // that haven't synced yet.

                    // Get current local timestamp
                    const localData = localStorage.getItem('portfolio_content');
                    const parsedLocal = localData ? JSON.parse(localData) : defaultContent;
                    const localTimestamp = parsedLocal.lastUpdated || 0;
                    const serverTimestamp = serverData.lastUpdated || 0;

                    // If server is older or equal, ignore it (keep local changes)
                    if (serverTimestamp < localTimestamp) {
                        console.log('Ignoring server update (local is newer)');
                        return;
                    }

                    // Document exists, use Firestore data merged with defaults
                    // This ensures new fields in defaultContent are present even if missing in Firestore
                    const mergedContent = { ...defaultContent, ...serverData };

                    // Deep merge for nested objects like 'contact' and 'about' to prevent partial overrides
                    if (serverData.contact) {
                        mergedContent.contact = { ...defaultContent.contact, ...serverData.contact };
                    }
                    if (serverData.about) {
                        mergedContent.about = { ...defaultContent.about, ...serverData.about };
                    }

                    setContent(mergedContent);
                    // Also save to localStorage as backup
                    localStorage.setItem('portfolio_content', JSON.stringify(mergedContent));
                } else {
                    // Document doesn't exist in Firestore
                    console.log('Firestore document does not exist');

                    // Check if we have local data first
                    const saved = localStorage.getItem('portfolio_content');
                    if (saved) {
                        const localContent = JSON.parse(saved);
                        console.log('Using localStorage data instead of defaults');
                        setContent(localContent);

                        // Try to sync local data to Firestore
                        try {
                            await setDoc(contentRef, localContent);
                            console.log('Synced localStorage to Firestore');
                        } catch (err) {
                            console.error('Error syncing to Firestore:', err);
                        }
                    } else {
                        // No local data, use defaults
                        console.log('No local data, initializing with defaults');
                        try {
                            const initialContent = { ...defaultContent, lastUpdated: Date.now() };
                            await setDoc(contentRef, initialContent);
                            setContent(initialContent);
                            localStorage.setItem('portfolio_content', JSON.stringify(initialContent));
                        } catch (err) {
                            console.error('Error initializing Firestore:', err);
                            setContent(defaultContent);
                            setError('Using offline mode');
                        }
                    }
                }
                setLoading(false);
            },
            (err) => {
                console.error('Error listening to Firestore:', err);
                // Fall back to localStorage
                const saved = localStorage.getItem('portfolio_content');
                if (saved) {
                    const parsedSaved = JSON.parse(saved);
                    // Merge saved data with defaults to be safe
                    const mergedSaved = { ...defaultContent, ...parsedSaved };
                    if (parsedSaved.contact) {
                        mergedSaved.contact = { ...defaultContent.contact, ...parsedSaved.contact };
                    }
                    if (parsedSaved.about) {
                        mergedSaved.about = { ...defaultContent.about, ...parsedSaved.about };
                    }
                    setContent(mergedSaved);
                } else {
                    setContent(defaultContent);
                }
                setError('Using offline mode');
                setLoading(false);
            }
        );

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    const updateAbout = async (aboutData) => {
        console.log('updateAbout called with:', aboutData);
        const newContent = {
            ...content,
            about: aboutData,
            lastUpdated: Date.now() // Update timestamp
        };
        setContent(newContent);
        localStorage.setItem('portfolio_content', JSON.stringify(newContent));
        console.log('Saved to localStorage:', newContent);

        try {
            await setDoc(doc(db, 'portfolio_content', 'main'), newContent);
            console.log('Saved to Firestore successfully');
        } catch (err) {
            console.error('Error updating about:', err);
        }
    };

    const updateSkills = async (skillsData) => {
        console.log('updateSkills called with:', skillsData);
        const newContent = {
            ...content,
            skills: skillsData,
            lastUpdated: Date.now() // Update timestamp
        };
        setContent(newContent);
        localStorage.setItem('portfolio_content', JSON.stringify(newContent));
        console.log('Saved to localStorage:', newContent);

        try {
            await setDoc(doc(db, 'portfolio_content', 'main'), newContent);
            console.log('Saved to Firestore successfully');
        } catch (err) {
            console.error('Error updating skills:', err);
        }
    };

    const updateExperience = async (experienceData) => {
        const newContent = {
            ...content,
            experience: experienceData,
            lastUpdated: Date.now() // Update timestamp
        };
        setContent(newContent);
        localStorage.setItem('portfolio_content', JSON.stringify(newContent));

        try {
            await setDoc(doc(db, 'portfolio_content', 'main'), newContent);
        } catch (err) {
            console.error('Error updating experience:', err);
        }
    };

    const updateContact = async (contactData) => {
        const newContent = {
            ...content,
            contact: contactData,
            lastUpdated: Date.now() // Update timestamp
        };
        setContent(newContent);
        localStorage.setItem('portfolio_content', JSON.stringify(newContent));

        try {
            await setDoc(doc(db, 'portfolio_content', 'main'), newContent);
        } catch (err) {
            console.error('Error updating contact:', err);
        }
    };

    return (
        <ContentContext.Provider value={{
            content,
            loading,
            error,
            updateAbout,
            updateSkills,
            updateExperience,
            updateContact
        }}>
            {children}
        </ContentContext.Provider>
    );
};
