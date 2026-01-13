import { useProjects } from '../context/ProjectsContext';
import { ExternalLink, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import './Projects.css';

const Projects = () => {
    const { projects } = useProjects();

    // Function to render description with HTML links
    const renderDescription = (text) => {
        if (!text) return text;

        // Parse HTML links and render them
        const parts = [];
        const linkRegex = /<a\s+href="([^"]*)">([^<]+)<\/a>/g;
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            // Add text before the link
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            // Add the link
            parts.push(
                <a
                    key={match.index}
                    href={match[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                >
                    {match[2]}
                </a>
            );
            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    // Convert common sharing links to direct-image links
    const normalizeImageUrl = (url) => {
        if (!url) return url;
        try {
            const u = new URL(url);
            // Google Drive: https://drive.google.com/file/d/<id>/view?usp=sharing -> uc?export=view&id=<id>
            if (u.hostname.includes('drive.google.com')) {
                const parts = u.pathname.split('/');
                const idIdx = parts.indexOf('d');
                const fileId = idIdx !== -1 && parts[idIdx + 1] ? parts[idIdx + 1] : u.searchParams.get('id');
                if (fileId) {
                    return `https://drive.google.com/uc?export=view&id=${fileId}`;
                }
            }
            // Dropbox: dl=0 -> raw=1 or dl=1 for direct
            if (u.hostname.includes('dropbox.com')) {
                u.searchParams.set('dl', '1');
                return u.toString();
            }
            // Google Photos links usually cannot be hotlinked; leave as-is
            // Imgur page to direct image if i.imgur not used
            if (u.hostname.includes('imgur.com') && !u.hostname.startsWith('i.')) {
                // If it looks like https://imgur.com/abc -> https://i.imgur.com/abc.jpg (fallback to .jpg)
                const path = u.pathname.replace('/', '');
                if (path) return `https://i.imgur.com/${path}.jpg`;
            }
            // OneDrive share to download? Try forcing download=1
            if (u.hostname.includes('onedrive.live.com')) {
                u.searchParams.set('download', '1');
                return u.toString();
            }
            return url;
        } catch {
            return url;
        }
    };

    const buildCandidateUrls = (url) => {
        const list = [];
        const norm = normalizeImageUrl(url);
        if (norm) list.push(norm);
        try {
            const u = new URL(norm || url);
            // Imgur page to direct with guessed extensions
            if (u.hostname.includes('imgur.com') && !u.hostname.startsWith('i.')) {
                const id = u.pathname.replace('/', '').split('.')[0];
                const exts = ['jpg', 'png', 'jpeg', 'webp', 'gif'];
                exts.forEach(ext => list.push(`https://i.imgur.com/${id}.${ext}`));
            }
            // Dropbox ensure dl=1
            if (u.hostname.includes('dropbox.com')) {
                u.searchParams.set('dl', '1');
                list.push(u.toString());
            }
            // Google Drive fallback: export=download
            if (u.hostname.includes('drive.google.com')) {
                const parts = u.pathname.split('/');
                const idIdx = parts.indexOf('d');
                const fileId = idIdx !== -1 && parts[idIdx + 1] ? parts[idIdx + 1] : u.searchParams.get('id');
                if (fileId) {
                    list.push(`https://drive.google.com/uc?export=download&id=${fileId}`);
                }
            }
        } catch { }
        // De-duplicate
        return Array.from(new Set(list));
    };

    const ImageWithFallback = ({ url, alt }) => {
        const candidates = buildCandidateUrls(url);
        const [idx, setIdx] = useState(0);
        if (candidates.length === 0) return null;
        const onError = () => {
            if (idx < candidates.length - 1) setIdx(idx + 1);
        };
        return (
            <img
                src={candidates[idx]}
                alt={alt}
                referrerPolicy="no-referrer"
                onError={onError}
            />
        );
    };

    const getEmbedUrl = (url) => {
        if (!url) return null;
        try {
            const u = new URL(url);
            // YouTube
            if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
                let videoId = '';
                if (u.hostname.includes('youtu.be')) {
                    videoId = u.pathname.slice(1);
                } else {
                    videoId = u.searchParams.get('v');
                }
                if (videoId) return `https://www.youtube.com/embed/${videoId}`;
            }
            // Vimeo
            if (u.hostname.includes('vimeo.com')) {
                const videoId = u.pathname.split('/')[1];
                if (videoId && !isNaN(videoId)) return `https://player.vimeo.com/video/${videoId}`;
            }
            return null;
        } catch {
            return null;
        }
    };

    const VideoPreview = ({ url }) => {
        if (!url) return null;
        const embedUrl = getEmbedUrl(url);
        const isVideoFile = url.match(/\.(mp4|webm|ogg)$/i);

        if (embedUrl) {
            return (
                <div className="project-video-container">
                    <iframe
                        src={embedUrl}
                        title="Project Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        }

        if (isVideoFile) {
            return (
                <div className="project-video-container">
                    <video controls>
                        <source src={url} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }

        return null;
    };

    const ImageCarousel = ({ images }) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        const normalized = (images || []).filter(Boolean);
        if (!normalized || normalized.length === 0) return null;
        if (normalized.length === 1) {
            return (
                <div className="project-image single">
                    <ImageWithFallback url={normalized[0]} alt="Project" />
                </div>
            );
        }

        const nextImage = () => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        };

        const prevImage = () => {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        };

        return (
            <div className="project-image-carousel">
                <div className="carousel-image">
                    <img src={normalized[currentIndex]} alt={`Project ${currentIndex + 1}`} referrerPolicy="no-referrer" />
                </div>
                {images.length > 1 && (
                    <>
                        <button className="carousel-btn prev" onClick={prevImage}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className="carousel-btn next" onClick={nextImage}>
                            <ChevronRight size={24} />
                        </button>
                        <div className="carousel-dots">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(idx)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <section id="projects" className="section" style={{ background: 'var(--gradient-surface)' }}>
            <div className="container">
                <h2 className="section-title">Projects</h2>

                {projects.length === 0 ? (
                    <div className="no-projects">
                        <p>No projects yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="projects-grid grid grid-2">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card card">
                                <VideoPreview url={project.videoLink} />
                                <ImageCarousel images={project.images || (project.image ? [project.image] : [])} />

                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{renderDescription(project.description)}</p>

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="project-tags">
                                            {project.tags.map((tag, idx) => (
                                                <span key={idx} className="project-tag">
                                                    <Tag size={14} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            View Project <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
