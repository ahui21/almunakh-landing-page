import * as React from "react"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { IMAGES } from "@/lib/images"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const caseStudies = [
  {
    title: "Operational Resilience",
    company: "Fortune 500 Airline",
    description: "Real-time climate action plans identify how weather will cause changes to flight operations, and instantly adjust for such impacts.",
    bullets: [
      "New risks: increase in aircraft swaps and cancellations, with passenger rebooking impacts mitigated through dynamic load management",
      "New risks: more frequent unsafe conditions for employees, managed through effective workforce scheduling and investment in new technologies",
      "New opportunities: shift in customer demand for routes to more temperate climates, leading to new revenue streams when proactively planned for",
    ],
    image: {
      src: '/images/case-studies/airplane.jpg',
      alt: 'Airline operations optimization through climate risk management'
    },
    industry: "Airlines"
  },
  {
    title: "Supply Chain Optimization",
    company: "Fortune 100 Retailer",
    description: "Predictive climate analytics calculate the impact of short-term and long-term climate shifts, and proactively identify better alternatives.",
    bullets: [
      "New risks: greater climate exposure for specific key commodities, with impacts mitigated through early identification and proper management",
      "New risks: higher likelihood of blackouts and power outages during extreme weather events, managed through more resilient energy storage solutions",
      "New opportunities: relocation of customers to more climate-resilient regions, resulting in new revenue streams for suitably-planned future store locations",
    ],
    image: {
      src: '/images/case-studies/grocery.jpg',
      alt: 'Retail supply chain optimization with climate analytics'
    },
    industry: "Retail"
  },
  {
    title: "Financial Scenario Modeling",
    company: "Major Mountain Resort Company",
    description: "Automated climate risk assessments translate complex climate data into actionable financial insights, enabling executives to forecast more accurately and confidently.",
    bullets: [
      "New risks: shorter ski seasons result in reduced revenue, mitigated through shifts in marketing strategies when impacts are identified early",
      "New opportunities: longer summers introduce new uses such as mountain biking and hiking, which can be monetized through new activities and services",
      "New opportunities: industry-wide challenges enable businesses with climate knowledge to act before their competitors, ensuring growth in market share"
    ],
    image: {
      src: '/images/case-studies/skiresort.jpg',
      alt: 'Mountain resort adapting to climate change impacts'
    },
    industry: "Tourism"
  }
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-secondary-yellow/5">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">
          Success Stories
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          See how leading organizations are using climate data to transform weather impacts into competitive advantages
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card 
              key={study.title}
              className="overflow-hidden hover:scale-110 transition-transform duration-300 hover:shadow-xl"
            >
              <div className="relative h-48 w-full">
                <OptimizedImage
                  {...study.image}
                  fill
                  className="object-cover"
                  sizes={{
                    mobile: 320,
                    tablet: 480,
                    desktop: 640
                  }}
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                  {study.industry}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="text-sm text-primary font-medium mb-2">
                  {study.company}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {study.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {study.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {study.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="ml-3 text-gray-600 text-sm">
                        {bullet.startsWith("New risks:") ? (
                          <span>
                            <span className="font-bold text-red-500">New risks:</span>
                            {bullet.slice("New risks:".length)}
                          </span>
                        ) : bullet.startsWith("New opportunities:") ? (
                          <span>
                            <span className="font-bold text-green-500">New opportunities:</span>
                            {bullet.slice("New opportunities:".length)}
                          </span>
                        ) : (
                          bullet
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-primary/5"
                  asChild
                >
                  <Link href="https://casestudies.almunakh.com">
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="hover:bg-primary/5"
            asChild
          >
            <Link href="https://casestudies.almunakh.com">
              View All Case Studies
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 