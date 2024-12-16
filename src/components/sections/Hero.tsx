import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/noise.png')] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <h1 className="text-3xl md:text-[40px] font-bold text-white mb-6 leading-tight">
              Turn Climate Uncertainty into 
              <br className="hidden md:block" />
              Business Resilience — Instantly.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Real-time risk assessment and adaptive strategies that 
              <br className="hidden md:block" />
              protect your bottom line and unlock hidden opportunities
            </p>
            
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 sm:flex-initial">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white w-full text-base py-4"
                  >
                    Get Your Almunakh Assessment
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-secondary-green text-secondary-green hover:bg-secondary-green/10 w-full sm:w-auto text-base py-4"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="sm:w-[280px]">
                <p className="text-base text-gray-400">Start your free trial today.</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] hidden md:block md:col-span-2">
            <Image
              src="/images/rotating-earth-optimized.gif"
              alt="Climate Risk Dashboard Animation"
              fill
              className="object-contain"
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 