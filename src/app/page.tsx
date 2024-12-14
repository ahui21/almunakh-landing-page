import { Hero } from "@/components/sections/Hero"
import { SocialProof } from "@/components/sections/SocialProof"
import { Benefits } from "@/components/sections/Benefits"
import { Features } from "@/components/sections/Features"
import { Testimonials } from "@/components/sections/Testimonials"
import { Pricing } from "@/components/sections/Pricing"
import { CTA } from "@/components/sections/CTA"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Benefits />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
} 