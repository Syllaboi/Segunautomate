"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Limit the kinetic scramble strictly to integers as requested
const CHARS = "0123456789"

interface NumberScrambleProps {
  text: string | number
  className?: string
  autoTrigger?: boolean
}

export function NumberScramble({ text, className = "", autoTrigger = false }: NumberScrambleProps) {
  const textStr = String(text)
  const [displayText, setDisplayText] = useState(textStr)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)
  const containerRef = useRef<HTMLSpanElement>(null)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    // Shorter text requires high multiplier to feel like a complete animation
    const duration = textStr.length * 6 

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current++

      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * textStr.length)

      const newText = textStr
        .split("")
        .map((char, i) => {
          if (char === " ") return " "
          if (i < revealedLength) return textStr[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplayText(newText)

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(textStr)
        setIsScrambling(false)
      }
    }, 40) // Smooth refresh rate
  }, [textStr])

  const handleMouseEnter = () => {
    setIsHovering(true)
    // Prevent re-triggering mid-scramble
    if (!isScrambling) {
       scramble()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (!autoTrigger || hasRevealed) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setHasRevealed(true)
        scramble()
        observer.disconnect()
      }
    }, { threshold: 0.1 })

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [autoTrigger, hasRevealed, scramble])

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center cursor-default select-none transition-opacity duration-500 ease-out ${
        autoTrigger && !hasRevealed ? "opacity-0" : "opacity-100"
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-150 ${
            isScrambling && char !== textStr[i] ? "text-[var(--color-accent)] scale-[1.05]" : ""
          }`}
          style={{
            transitionDelay: `${i * 10}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
