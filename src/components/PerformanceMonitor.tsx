'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Performance marks for key sections
      const sections = ['hero', 'features', 'case-studies', 'testimonials']
      
      // Create an Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const loadTime = performance.now()
            console.log(`Section ${sectionId} loaded at: ${Math.round(loadTime)}ms`)
            
            // Log all resources loaded for this section
            try {
              const resources = performance.getEntriesByType('resource')
              const sectionResources = resources.filter(r => {
                const imgs = entry.target.querySelectorAll('img')
                return r.name.includes(sectionId) || 
                  Array.from(imgs).some(img => r.name.includes(img.src))
              })
              
              sectionResources.forEach(resource => {
                console.log(`  - ${resource.name}: ${Math.round(resource.duration)}ms`)
              })
            } catch (error) {
              console.warn('Performance API not fully supported:', error)
            }
          }
        })
      })

      // Observe all sections
      sections.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      })

      // Log initial page load metrics
      window.addEventListener('load', () => {
        try {
          const timing = performance.timing
          
          console.log('Performance Metrics:')
          console.log(`DNS lookup: ${timing.domainLookupEnd - timing.domainLookupStart}ms`)
          console.log(`TCP connection: ${timing.connectEnd - timing.connectStart}ms`)
          console.log(`DOM loading: ${timing.domComplete - timing.domLoading}ms`)
          
          const paintEntries = performance.getEntriesByType('paint')
          const firstPaint = paintEntries[0]?.startTime
          if (firstPaint) {
            console.log(`First paint: ${Math.round(firstPaint)}ms`)
          }
          
          // Log slowest resources
          const resources = performance.getEntriesByType('resource')
          console.log('\nSlowest Resources:')
          resources
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5)
            .forEach(r => {
              console.log(`${r.name}: ${Math.round(r.duration)}ms`)
            })
        } catch (error) {
          console.warn('Performance API not fully supported:', error)
        }
      })

      return () => observer.disconnect()
    }
  }, [])

  return null
} 