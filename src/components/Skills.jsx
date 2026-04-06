import { useState } from 'react';
import useScrollReveal from '../utils/useScrollReveal';
import './Skills.css';

// Skill data with icon URLs from CDN (devicons/simple-icons)
const skillCategories = [
    {
        id: 'ai',
        label: 'AI & LLMs',
        color: '#a855f7',
        skills: [
            { name: 'OpenAI', icon: 'https://cdn.simpleicons.org/openai/ffffff' },
            { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/ffffff' },
            { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface/ffffff' },
            { name: 'Anthropic', icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
            { name: 'Ollama', icon: 'https://cdn.simpleicons.org/ollama/ffffff' },
            { name: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini/ffffff' },
        ]
    },
    {
        id: 'automation',
        label: 'Automation',
        color: '#22c55e',
        skills: [
            { name: 'n8n', icon: 'https://cdn.simpleicons.org/n8n/ffffff' },
            { name: 'Zapier', icon: 'https://cdn.simpleicons.org/zapier/ffffff' },
            { name: 'Make', icon: 'https://cdn.simpleicons.org/make/ffffff' },
            { name: 'Python', icon: 'https://cdn.simpleicons.org/python/ffffff' },
            { name: 'Selenium', icon: 'https://cdn.simpleicons.org/selenium/ffffff' },
            { name: 'Puppeteer', icon: 'https://cdn.simpleicons.org/puppeteer/ffffff' },
        ]
    },
    {
        id: 'backend',
        label: 'Backend',
        color: '#3b82f6',
        skills: [
            { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
            { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/ffffff' },
            { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/ffffff' },
            { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/ffffff' },
            { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/postman/ffffff' },
            { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/ffffff' },
        ]
    },
    {
        id: 'database',
        label: 'Database',
        color: '#f59e0b',
        skills: [
            { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/ffffff' },
            { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/ffffff' },
            { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/ffffff' },
            { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/ffffff' },
            { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/ffffff' },
            { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/ffffff' },
        ]
    },
    {
        id: 'cloud',
        label: 'Cloud & DevOps',
        color: '#06b6d4',
        skills: [
            { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/ffffff' },
            { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/ffffff' },
            { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/ffffff' },
            { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/ffffff' },
            { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
            { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/ffffff' },
        ]
    },
    {
        id: 'frontend',
        label: 'Frontend',
        color: '#ec4899',
        skills: [
            { name: 'React', icon: 'https://cdn.simpleicons.org/react/ffffff' },
            { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/ffffff' },
            { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/ffffff' },
            { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
            { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/ffffff' },
            { name: 'Git', icon: 'https://cdn.simpleicons.org/git/ffffff' },
        ]
    },
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('ai');
    useScrollReveal();

    const activeCategory = skillCategories.find(c => c.id === activeTab);

    return (
        <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
            <div className="global-shader-blob shader-mint" style={{ width: '500px', height: '500px', top: '20%', right: '-10%' }} aria-hidden="true" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div className="skills-header reveal">
                    <div className="header-eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>
                        <span className="header-eyebrow-dot" />
                        Expertise
                    </div>
                    <h2 id="skills-heading" className="header-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--sp-4)' }}>
                        <span className="line">Skills &amp;</span>
                        <span className="line line-gradient">Toolstack</span>
                    </h2>
                    <p className="header-subtitle" style={{ margin: '0 auto' }}>
                        A curated collection of technologies and tools I use to build
                        intelligent, scalable automation systems.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="skills-tabs reveal reveal-delay-1" role="tablist" aria-label="Skill categories">
                    {skillCategories.map(cat => (
                        <button
                            key={cat.id}
                            role="tab"
                            aria-selected={activeTab === cat.id}
                            aria-controls={`panel-${cat.id}`}
                            className={`skills-tab ${activeTab === cat.id ? 'active' : ''}`}
                            style={activeTab === cat.id ? { '--tab-color': cat.color } : {}}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Active Category Label */}
                <p
                    className="skills-category-label reveal reveal-delay-2"
                    style={{ color: activeCategory.color }}
                >
                    {activeCategory.label}
                </p>

                {/* Skills Grid */}
                <div
                    id={`panel-${activeCategory.id}`}
                    role="tabpanel"
                    aria-label={activeCategory.label}
                    className="skills-tool-grid reveal reveal-delay-2"
                    key={activeCategory.id}
                >
                    {activeCategory.skills.map((skill, idx) => (
                        <div
                            key={idx}
                            className="skills-tool-card"
                            style={{ '--card-accent': activeCategory.color }}
                        >
                            <div className="skills-tool-icon">
                                <img
                                    src={skill.icon}
                                    alt={`${skill.name} icon`}
                                    width="28"
                                    height="28"
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                            </div>
                            <span className="skills-tool-name">{skill.name}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
