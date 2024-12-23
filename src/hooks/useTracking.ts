"use client"

import * as React from "react"
import { useEffect, useCallback, useState } from 'react'
import { GA_ID } from '@/lib/constants'

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      eventName: string | Date,
      eventParams?: {
        event_category?: string
        event_label?: string
        value?: number | string
        send_to?: string
        [key: string]: any
      }
    ) => void
    dataLayer: Array<any>
  }
}

interface TrackingEvent {
  event: string
  category: string
  label: string
  value?: string | number
  timestamp: number
  userId?: string | null
  userType?: 'anonymous' | 'authenticated'
  sessionId: string
  page: string
  isOwnDevice?: boolean
}

interface SectionViewEvent extends TrackingEvent {
  sectionId?: string
  timeSpent?: number
}

const MY_DEVICE_KEY = 'is_my_device'

// Mark this device as "own" when the app loads
if (typeof window !== 'undefined') {
  localStorage.setItem(MY_DEVICE_KEY, 'true')
}

const useTracking = () => {
  // Add section tracking state
  const [currentSection, setCurrentSection] = React.useState<string | null>(null)
  const [sectionStartTime, setSectionStartTime] = React.useState<number>(Date.now())
  const [isTracking, setIsTracking] = React.useState(false)

  // Generate a session ID if one doesn't exist
  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
    }
    // Ensure device is marked as own
    localStorage.setItem(MY_DEVICE_KEY, 'true')
  }, [])

  const trackEvent = useCallback((event: string, category: string, label: string, value?: string | number) => {
    if (typeof window === 'undefined' || !window.gtag) return

    // Map our events to standard GA4 events
    const eventMapping = {
      'section_view': 'page_view',
      'click': 'click',
      'pageview': 'page_view',
      'scroll': 'scroll',
      'timing': 'user_engagement'
    };

    const ga4Event = eventMapping[event as keyof typeof eventMapping] || event;

    // Send to Google Analytics
    window.gtag('event', ga4Event, {
      // Standard GA4 parameters
      event_category: category,
      event_label: label,
      value: value,
      send_to: GA_ID,
      // Location parameters
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      // Custom parameters
      section_name: event === 'section_view' ? label.replace('Time in ', '') : undefined,
      engagement_time: typeof value === 'number' ? value : undefined
    });

    // Store events locally
    try {
      const events = JSON.parse(localStorage.getItem('tracking_events') || '[]')
      events.push({
        event,
        category,
        label,
        value,
        timestamp: Date.now(),
        userId: localStorage.getItem('userId') || undefined,
        userType: localStorage.getItem('userId') ? 'authenticated' : 'anonymous',
        sessionId: localStorage.getItem('sessionId'),
        page: window.location.pathname,
        isOwnDevice: localStorage.getItem(MY_DEVICE_KEY) === 'true'
      })
      localStorage.setItem('tracking_events', JSON.stringify(events))
    } catch (error) {
      console.error('Error storing tracking event:', error)
    }
  }, [])

  const trackClick = useCallback((linkName: string, linkUrl: string) => {
    trackEvent('click', 'link', linkName, linkUrl)
  }, [trackEvent])

  const trackDeadLink = useCallback((linkName: string, linkUrl: string) => {
    trackEvent('error', 'dead_link', linkName, linkUrl)
  }, [trackEvent])

  const trackPageView = useCallback((path: string) => {
    trackEvent('pageview', 'navigation', path)
  }, [trackEvent])

  // Track page views and scroll depth
  useEffect(() => {
    if (typeof window === 'undefined') return

    const startTime = Date.now()
    trackPageView(window.location.pathname)

    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100)
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        trackEvent('scroll', 'page_interaction', `Scroll Depth ${scrollPercent}%`)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackEvent('timing', 'page_interaction', 'Time on Page', timeSpent)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [trackEvent, trackPageView])

  // Track section views using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id

          if (entry.isIntersecting && !isTracking) {
            // Start tracking new section
            setCurrentSection(sectionId)
            setSectionStartTime(Date.now())
            setIsTracking(true)
          } else if (!entry.isIntersecting && isTracking && currentSection === sectionId) {
            // Only track time when leaving the section
            const timeSpent = Date.now() - sectionStartTime
            trackEvent(
              'section_view',
              'engagement',
              `Time in ${currentSection}`,
              Math.round(timeSpent / 1000) // Convert to seconds and round
            )
            setIsTracking(false)
          }
        })
      },
      {
        threshold: 0.5
      }
    )

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => {
      // Track final section time when unmounting
      if (currentSection && isTracking) {
        const timeSpent = Date.now() - sectionStartTime
        trackEvent(
          'section_view',
          'engagement',
          `Time in ${currentSection}`,
          Math.round(timeSpent / 1000)
        )
      }
      observer.disconnect()
    }
  }, [currentSection, sectionStartTime, trackEvent, isTracking])

  return { trackClick, trackDeadLink, trackEvent, trackPageView }
}

export default useTracking 