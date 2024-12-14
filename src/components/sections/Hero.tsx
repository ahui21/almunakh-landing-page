import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {/* Add dynamic background visualization here */}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Turn Climate Uncertainty into Business Resilience
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Real-time risk assessment and adaptive strategies that protect your bottom line and unlock hidden opportunities
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Get Your Climate Risk Assessment
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondary-green text-secondary-green hover:bg-secondary-green/10"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch 2-Minute Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 