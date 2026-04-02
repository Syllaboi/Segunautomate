"use client"

import { useState, useEffect } from 'react'
import { Header as ShaderNav, ShaderBackground } from "@/components/ui/shaders-hero-section"
import { useContent } from '../context/ContentContext'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, Mail, Linkedin, FileText, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { NumberScramble } from './ui/number-scramble'

export default function MainHero() {
  const { theme, toggleTheme } = useTheme()
  const { content } = useContent()
  const { contact } = content
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80; // height of fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const stats = [
    { value: '50', suffix: '+', label: 'Projects Delivered' },
    { value: '3',  suffix: 'yrs', label: 'Experience' },
    { value: '100', suffix: '%', label: 'Remote Ready' },
  ]

  return (
    <ShaderBackground>
      {/* ── Custom Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 transition-all duration-300 ${scrolled ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]' : ''}`}>
        <div className="text-2xl font-bold text-[var(--color-text-h)] cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SegunAutomate<span className="text-[var(--color-accent)]">.</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {['about', 'skills', 'experience', 'projects', 'contact'].map(id => (
            <button 
              key={id} 
              onClick={() => scrollToSection(id)} 
              className="text-sm font-light text-[var(--color-text-body)] hover:text-[var(--color-text-h)] transition-colors"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--color-border)] text-[var(--color-text-body)] hover:text-[var(--color-text-h)] transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-h)] text-xs font-semibold hover:bg-[var(--color-text-h)] hover:text-[var(--color-bg)] transition-all mt-0"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── Hero Content ── */}
      <main className="absolute left-6 md:left-24 top-24 bottom-12 z-20 flex flex-col justify-center w-full max-w-[90%] md:max-w-[80%] pb-24">
        <div className="max-w-3xl text-left flex flex-col">
          {/* Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-border)] backdrop-blur-sm mb-6 border border-[var(--color-border)] w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse mr-2" />
            <span className="text-[var(--color-text-body)] text-[10px] uppercase tracking-widest font-medium">Available for freelance & remote work</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-8xl font-light text-[var(--color-text-h)] leading-[1.1] tracking-tighter mb-6">
            <span className="block opacity-60">Hi, I'm</span>
            <span className="block font-serif italic text-[var(--color-accent)]">Segun Salako</span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base font-normal text-[var(--color-text-body)] mb-8 max-w-[500px] leading-relaxed">
            No-Code Automation Engineer, AI Systems Architect & Vibe Coder — 
            building intelligent workflows and scalable cloud systems.
          </p>

          {/* Socials & Actions */}
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-accent)] text-white text-xs font-medium hover:scale-105 transition-all"
              >
                View My Work <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-[var(--color-text-body)]">
              <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-text-accent)] transition-colors"><Mail size={18} /></a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] transition-colors"><Linkedin size={18} /></a>
              <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] transition-colors"><FileText size={18} /></a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 flex flex-wrap items-start gap-12 md:gap-24 pt-8 border-t border-[var(--color-border)] w-full max-w-3xl">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-4xl md:text-5xl font-light text-[var(--color-text-h)]">
                <NumberScramble text={value} autoTrigger={true} /><span className="text-[var(--color-accent)] text-2xl md:text-3xl ml-1">{suffix}</span>
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--color-text-muted)] mt-2">{label}</span>
            </div>
          ))}
        </div>
      </main>


    </ShaderBackground>
  )
}
