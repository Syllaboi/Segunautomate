"use client"

import { ArrowUpRight, Database, Cpu, Megaphone, Terminal, BrainCircuit, Heart, ShoppingBag } from "lucide-react"

export interface ProjectData {
  title: string
  description: string
  link: string | null
  image: string | null
  tags: string[]
}

const getIcon = (title: string) => {
  const t = title.toLowerCase()
  if (t.includes('sale') || t.includes('shop') || t.includes('ecommerce')) return <ShoppingBag size={24} />
  if (t.includes('health') || t.includes('heart') || t.includes('care')) return <Heart size={24} />
  if (t.includes('ai ') || t.includes('agent') || t.includes('education')) return <BrainCircuit size={24} />
  if (t.includes('data') || t.includes('postgre') || t.includes('server')) return <Database size={24} />
  if (t.includes('auto') || t.includes('workflow') || t.includes('alert')) return <Cpu size={24} />
  if (t.includes('content') || t.includes('social') || t.includes('lead')) return <Megaphone size={24} />
  return <Terminal size={24} />
}

const getStyles = (index: number) => {
  const colors = [
    { bg: '#f97316', color: '#fff' }, // orange
    { bg: '#3b82f6', color: '#fff' }, // blue
    { bg: '#8b5cf6', color: '#fff' }, // purple
    { bg: '#10b981', color: '#fff' }, // green
    { bg: '#ec4899', color: '#fff' }, // pink
    { bg: '#ef4444', color: '#fff' }, // red
  ]
  return colors[index % colors.length]
}

const BG_GRADIENTS = [
  'linear-gradient(140deg, #0d0820 0%, #1a0945 50%, #2d0e6e 100%)',
  'linear-gradient(140deg, #001a14 0%, #003d2e 50%, #006644 100%)',
  'linear-gradient(140deg, #1a0600 0%, #3d1200 50%, #7a2800 100%)',
  'linear-gradient(140deg, #06001a 0%, #12003d 50%, #2a0e6e 100%)',
  'linear-gradient(140deg, #001a1a 0%, #003535 50%, #005c5c 100%)',
  'linear-gradient(140deg, #1a1200 0%, #3d2c00 50%, #6b4a00 100%)',
]

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const styles = getStyles(index)
  // Use index to pick gradient
  const bg = BG_GRADIENTS[index % BG_GRADIENTS.length]

  return (
    <article className="proj-card-hoz" aria-label={project.title}>
      {/* ── Image Left ── */}
      <div className="proj-card-hoz__image-container">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="proj-card-hoz__img"
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : (
          <div className="proj-card-hoz__gradient" style={{ background: bg }} />
        )}
      </div>

      {/* ── Content Right ── */}
      <div className="proj-card-hoz__content">
        <header className="proj-card-hoz__header">
          <div className="proj-card-hoz__icon-wrapper" style={{ backgroundColor: styles.bg, color: styles.color }}>
            {getIcon(project.title)}
          </div>
          <div className="proj-card-hoz__title-wrapper">
             <h3 className="proj-card-hoz__title">{project.title}</h3>
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="proj-card-hoz__external-icon">
              <ArrowUpRight size={20} />
            </a>
          )}
        </header>

        <p className="proj-card-hoz__desc">{project.description || 'An intelligent automation solution engineered for scale and impact.'}</p>
        
        {project.tags && project.tags.length > 0 && (
          <div className="proj-card-hoz__tags" style={{ color: styles.bg }}>
            {project.tags.map((tag, i) => (
              <span key={i} className="proj-card-hoz__tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="proj-card-hoz__footer">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card-hoz__cta"
              style={{ backgroundColor: styles.bg, color: styles.color }}
            >
              View Project <ExternalLinkIcon />
            </a>
          ) : (
             <span className="proj-card-hoz__cta proj-card-hoz__cta--disabled" style={{ backgroundColor: 'var(--color-bg-card-hover)', color: 'var(--color-text-muted)' }}>
               Private / NDA
             </span>
          )}
        </div>
      </div>
    </article>
  )
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  )
}

export function ProjectShowcase({ projects }: { projects: ProjectData[] }) {
  if (!projects.length) return null

  return (
    <div className="proj-showcase-hoz">
      {projects.map((p, i) => (
        <div key={`${p.title}-${i}`} className={`reveal reveal-delay-${(i % 5) + 1}`}>
          <ProjectCard project={p} index={i} />
        </div>
      ))}
    </div>
  )
}
