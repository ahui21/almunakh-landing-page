import { Hero } from "@/components/sections/Hero"
import { Benefits } from "@/components/sections/Benefits"
import { SocialProof } from "@/components/sections/SocialProof"
import { Features } from "@/components/sections/Features"
import { CaseStudies } from "@/components/sections/CaseStudies"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
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