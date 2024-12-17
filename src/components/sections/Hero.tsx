import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"
import { JsonLd } from "@/components/JsonLd"
import useTracking from "@/hooks/useTracking"
import { GA_ID } from '@/lib/constants'
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { IMAGES } from "@/lib/images"

export function Hero() {
  const { trackEvent } = useTracking();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Almunakh",
    "applicationCategory": "BusinessApplication",
    "description": "Real-time climate risk assessment and adaptive strategies platform",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }

  React.useEffect(() => {
    trackEvent('view', 'section', 'Hero Section');
  }, [trackEvent]);

  return (
    <>
      <JsonLd data={structuredData} />
      <section 
        id="hero" 
        className="relative min-h-[65vh] flex items-center bg-black overflow-hidden"
        aria-label="Introduction to Almunakh"
      >
        <div className="absolute inset-0 opacity-5 bg-[url('/images/noise.png')] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h1 className="text-3xl md:text-[40px] font-bold text-white mb-6 leading-tight">
                Turn Climate Uncertainty into{' '}
                <br className="hidden md:block" />
                Business Resilience — Instantly.
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Real-time risk assessment and adaptive strategies that{' '}
                <br className="hidden md:block" />
                protect your bottom line and unlock hidden opportunities
              </p>
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 sm:flex-initial">
                    <Button 
                      size="lg"
                      className="bg-secondary-green hover:bg-secondary-green/90 text-white w-full text-base py-4"
                      asChild
                    >
                      <Link href="https://app.almunakh.com">
                        Get Your Almunakh Assessment
                      </Link>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto text-base py-4"
                    asChild
                  >
                    <Link href="https://demo.almunakh.com">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
                
                <div className="sm:w-[320px]">
                  <p className="text-base text-gray-400 whitespace-nowrap">
                    Try us for free immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] hidden md:block md:col-span-2">
              <OptimizedImage
                {...IMAGES.hero.earth}
                fill
                priority
                className="object-contain scale-90"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 