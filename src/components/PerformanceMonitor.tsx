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
            if (window.performance && window.performance.getEntriesByType) {
              const resources = performance.getEntriesByType('resource')
              const sectionResources = resources.filter(r => 
                r.name.includes(sectionId) || 
                entry.target.querySelectorAll('img').forEach(img => 
                  r.name.includes(img.src)
                )
              )
              
              sectionResources.forEach(resource => {
                console.log(`  - ${resource.name}: ${Math.round(resource.duration)}ms`)
              })
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
        if (window.performance) {
          const timing = performance.timing
          const navigationStart = timing.navigationStart
          
          console.log('Performance Metrics:')
          console.log(`DNS lookup: ${timing.domainLookupEnd - timing.domainLookupStart}ms`)
          console.log(`TCP connection: ${timing.connectEnd - timing.connectStart}ms`)
          console.log(`DOM loading: ${timing.domComplete - timing.domLoading}ms`)
          console.log(`First paint: ${performance.getEntriesByType('paint')[0]?.startTime}ms`)
          
          // Log slowest resources
          const resources = performance.getEntriesByType('resource')
          console.log('\nSlowest Resources:')
          resources
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5)
            .forEach(r => {
              console.log(`${r.name}: ${Math.round(r.duration)}ms`)
            })
        }
      })

      return () => observer.disconnect()
    }
  }, [])

  return null
} 