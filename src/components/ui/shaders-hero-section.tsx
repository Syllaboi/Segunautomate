"use client"

import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"

import { useTheme } from "../../context/ThemeContext"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const gradientColors = isLight 
    ? ["#FDFBF7", "#E6D5C3", "#ffffff", "#D4C4B7", "#F5EBE1"]
    : ["#000000", "#8B4513", "#ffffff", "#3E2723", "#5D4037"]

  const gradientOverlayColors = isLight
    ? ["#ffffff", "#F5EBE1", "#E6D5C3", "#ffffff"]
    : ["#000000", "#ffffff", "#8B4513", "#000000"]

  return (
    <div ref={containerRef} className="min-h-screen w-full relative transition-colors duration-500 bg-[var(--color-bg)]">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders */}
      <MeshGradient
        className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        colors={gradientColors}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60 transition-opacity duration-1000"
        colors={gradientOverlayColors}
        speed={0.2}
      />

      {children}
    </div>
  )
}

import { Sparkles } from "lucide-react"

export function PulsingCircle() {
  return (
    <div className="absolute bottom-8 right-8 z-30">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center justify-center"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#8B4513]/40 rounded-full blur-2xl group-hover:bg-[#8B4513]/60 transition-all duration-500" />
        
        {/* Realistic 3D Orb */}
        <div className="relative w-16 h-16 rounded-full border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center
          bg-gradient-to-br from-[#8B4513] via-[#5D4037] to-[#3E2723]
          backdrop-blur-md transition-all duration-500"
        >
          {/* Internal Reflection / Glass effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-xl animate-pulse" />
          
          {/* AI Icon */}
          <Sparkles className="text-white/90 drop-shadow-lg" size={24} />
          
          {/* Subtle noise/texture for realism */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        {/* Floating Label (optional, keep it clean) */}
        <div className="absolute right-20 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <span className="text-[10px] text-white/80 uppercase tracking-tighter">AI Assistant</span>
        </div>
      </motion.button>
    </div>
  )
}
