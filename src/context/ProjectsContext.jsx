import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

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
            // Create the project without images first
            const { images = [], image, ...rest } = project;
            const docRef = await addDoc(collection(db, 'projects'), {
                ...rest,
                createdAt: serverTimestamp()
            });

            // Upload images to Storage and collect URLs
            const urls = [];
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                if (typeof img === 'string' && img.startsWith('data:')) {
                    const storageRef = ref(storage, `projects/${docRef.id}/${i}.jpg`);
                    await uploadString(storageRef, img, 'data_url');
                    const url = await getDownloadURL(storageRef);
                    urls.push(url);
                } else if (typeof img === 'string') {
                    // Assume it's a URL
                    urls.push(img);
                }
            }

            if (urls.length > 0) {
                await updateDoc(doc(db, 'projects', docRef.id), {
                    images: urls,
                    image: urls[0]
                });
            }

            return { id: docRef.id, ...rest, images: urls, image: urls[0] };
        } catch (err) {
            console.error('Error adding project to Firestore:', err);
            alert('Failed to add project. Check console for details.');
        }
    };

    const updateProject = async (id, updates) => {
        try {
            const newData = { ...updates };

            // Handle images if provided
            if (Array.isArray(updates.images)) {
                const urls = [];
                for (let i = 0; i < updates.images.length; i++) {
                    const img = updates.images[i];
                    if (typeof img === 'string' && img.startsWith('data:')) {
                        const storageRef = ref(storage, `projects/${id}/${i}.jpg`);
                        await uploadString(storageRef, img, 'data_url');
                        const url = await getDownloadURL(storageRef);
                        urls.push(url);
                    } else if (typeof img === 'string') {
                        urls.push(img);
                    }
                }
                newData.images = urls;
                newData.image = urls[0] || '';
                delete newData.createdAt; // don't accidentally override
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
