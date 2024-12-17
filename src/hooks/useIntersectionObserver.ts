"use client"

import { useEffect } from 'react'

export function useIntersectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            entry.target.classList.remove('opacity-0')
          }
        })
      },
      {
        threshold: 0.25, // Start animation when 25% of the section is visible (increased from 0.1)
        rootMargin: '-50px 0px' // Only start when section is 50px into the viewport
      }
    )

    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
      section.classList.add('opacity-0', 'translate-y-4') // Add initial transform
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])
} 