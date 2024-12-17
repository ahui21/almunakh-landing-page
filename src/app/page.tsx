"use client"

import { useEffect } from 'react'
import { Hero } from "@/components/sections/Hero"
import { Benefits } from "@/components/sections/Benefits"
import { SocialProof } from "@/components/sections/SocialProof"
import { Features } from "@/components/sections/Features"
import { CaseStudies } from "@/components/sections/CaseStudies"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  useEffect(() => {
    // Test GA tracking
    if (window.gtag) {
      window.gtag('event', 'test_event', {
        event_category: 'testing',
        event_label: 'GA Test',
        value: 1
      });
      console.log('Test event sent to GA');
    } else {
      console.warn('GA not initialized');
    }
  }, []);

  return (
    <main>
      <Hero />
      <SocialProof />
      <Benefits />
      <Features />
      <CaseStudies />
      <CTA />
      <Footer />
    </main>
  )
} 