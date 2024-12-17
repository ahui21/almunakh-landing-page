'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    console.log(metric)
    // Send to analytics
    window.gtag?.('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value
    })
  })

  return null
} 