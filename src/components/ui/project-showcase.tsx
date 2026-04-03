"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { useIsTouchDevice } from "../../hooks/useMediaQuery"

export interface ProjectData {
  title: string
  description: string
  link: string | null
  image: string | null
}

interface ProjectShowcaseProps {
  projects: ProjectData[]
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const isTouchDevice = useIsTouchDevice()

  useEffect(() => {
    // Skip animation loop on touch devices
    if (isTouchDevice) return

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition, isTouchDevice])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    if (isTouchDevice) return
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-4xl mx-auto px-0 py-8">
      {/* Floating Cursor/Image - Disabled on mobile/touch for performance */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none absolute z-50 overflow-hidden rounded-xl shadow-2xl"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: 'transform, opacity'
          }}
        >
          <div className="relative w-[320px] h-[200px] bg-[var(--color-bg-card)] rounded-xl overflow-hidden">
            {projects.map((project, index) => (
              <img
                key={project.title + index}
                src={project.image || "https://placehold.co/400?text=No+Image"}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                  filter: hoveredIndex === index ? "none" : "blur(10px)",
                }}
              />
            ))}
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/20 to-transparent" />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {projects.map((project, index) => {
           const Wrapper = project.link ? 'a' : 'div'
           return (
          <Wrapper
            key={project.title + index}
            href={project.link || undefined}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            className="group block relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: project.link ? 'pointer' : 'default' }}
          >
            <div className="relative p-6 px-8 border border-[var(--color-border)] rounded-[24px] bg-[var(--color-bg-card)] shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 bg-[var(--color-border)]
                  transition-all duration-500 ease-out
                  ${hoveredIndex === index ? "opacity-40 scale-100" : "opacity-0 scale-95"}
                `}
                style={{ willChange: 'opacity, transform' }}
              />

              <div className="relative flex items-start justify-between gap-4 z-10">
                <div className="flex-1 min-w-0">
                  {/* Title with animated underline */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-[var(--color-text-h)] font-semibold text-xl md:text-2xl tracking-tight break-words">
                      <span className="relative inline-block pb-1">
                        {project.title}
                        {/* Animated underline */}
                        <span
                          className={`
                            absolute left-0 bottom-0 h-[2px] bg-[var(--color-accent)]
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    {/* Arrow that slides in */}
                    {project.link && (
                    <ArrowUpRight
                      className={`
                        w-5 h-5 text-[var(--color-accent)] flex-shrink-0
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-4 translate-y-4"
                        }
                      `}
                    />
                    )}
                  </div>

                  {/* Description with fade effect */}
                  <p
                    className={`
                      text-sm md:text-base leading-relaxed max-w-3xl
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-[var(--color-text-body)]" : "text-[var(--color-text-muted)]"}
                    `}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </Wrapper>
        )})}
      </div>
    </div>
  )
}

