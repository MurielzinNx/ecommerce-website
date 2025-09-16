"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void
  reducedMotion: boolean
  highContrast: boolean
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    // Check for high contrast preference
    const contrastQuery = window.matchMedia("(prefers-contrast: high)")
    setHighContrast(contrastQuery.matches)

    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches)
    contrastQuery.addEventListener("change", handleContrastChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      contrastQuery.removeEventListener("change", handleContrastChange)
    }
  }, [])

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return (
    <AccessibilityContext.Provider value={{ announceToScreenReader, reducedMotion, highContrast }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
