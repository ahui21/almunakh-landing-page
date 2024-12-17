'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Report Web Vitals
      const reportWebVitals = (metric: {
        name: string
        value: number
        rating?: 'good' | 'needs-improvement' | 'poor'
        id?: string
      }) => {
        console.log(metric)
        window.gtag?.('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.value),
          metric_id: metric.id || '',
          metric_value: metric.value,
          metric_rating: metric.rating || 'good',
        })
      }

      // Monitor Performance
      if (window.performance) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            reportWebVitals({
              name: entry.name,
              value: entry.startTime,
              rating: 'good',
              id: entry.entryType
            })
          })
        })

        observer.observe({ 
          entryTypes: [
            'largest-contentful-paint',
            'first-input',
            'layout-shift'
          ] 
        })
      }
    }
  }, [])

  return null
} 