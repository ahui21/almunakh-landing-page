import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-32 bg-primary">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 whitespace-nowrap px-4">
            Ready to Climate-Proof Your Business?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90">
            Join leading organizations who are using Almunakh to
            <br className="hidden md:block" />
            turn their climate data into a competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <p className="mt-6 text-white/80">
            No credit card required • Unlimited basic platform access
          </p>
        </div>
      </div>
    </section>
  )
} 