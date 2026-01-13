import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const ProjectsContext = createContext();

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within ProjectsProvider');
    }
    return context;
};

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Listen-only approach; source of truth is Firestore

    useEffect(() => {
        // Set up real-time listener for projects
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const projectsData = snapshot.docs.map(d => ({
                    id: d.id,
                    ...d.data()
                }));
                setProjects(projectsData);
                setLoading(false);
            },
            (err) => {
                console.error('Error listening to projects:', err);
                setError('Using offline mode');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const addProject = async (project) => {
        try {
            // URL-only mode: we only accept image URLs, not file uploads
            const { images = [], image, ...rest } = project;
            const urls = images.filter(u => typeof u === 'string' && !u.startsWith('data:'));

            const docRef = await addDoc(collection(db, 'projects'), {
                ...rest,
                images: urls,
                image: urls[0] || '',
                createdAt: serverTimestamp()
            });

            return { id: docRef.id, ...rest, images: urls, image: urls[0] };
        } catch (err) {
            console.error('Error adding project to Firestore:', err);
            alert('Failed to add project. Check console for details.');
        }
    };

    const updateProject = async (id, updates) => {
        try {
            const newData = { ...updates };

            if (Array.isArray(updates.images)) {
                const urls = updates.images.filter(u => typeof u === 'string' && !u.startsWith('data:'));
                newData.images = urls;
                newData.image = urls[0] || '';
                delete newData.createdAt;
            }

            await updateDoc(doc(db, 'projects', id), newData);
        } catch (err) {
            console.error('Error updating project:', err);
            alert('Failed to update project on server. Check console for details.');
        }
    };

    const deleteProject = async (id) => {
        try {
            await deleteDoc(doc(db, 'projects', id));
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project from server.');
        }
    };

    return (
        <ProjectsContext.Provider value={{
            projects,
            loading,
            error,
            addProject,
            updateProject,
            deleteProject
        }}>
            {children}
        </ProjectsContext.Provider>
    );
};
