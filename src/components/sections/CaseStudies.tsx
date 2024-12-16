import * as React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const caseStudies = [
  {
    title: "Manufacturing Resilience",
    company: "Global Motors Corp.",
    description: "How a leading automotive manufacturer reduced weather-related disruptions by 75% and saved $12M annually",
    metrics: [
      { label: "Cost Savings", value: "$12M" },
      { label: "Disruption Reduction", value: "75%" },
      { label: "ROI", value: "486%" }
    ],
    image: "/images/case-studies/manufacturing.jpg",
    industry: "Manufacturing"
  },
  {
    title: "Supply Chain Optimization",
    company: "LogiTech Solutions",
    description: "Transforming supply chain vulnerability into operational strength through predictive climate analytics",
    metrics: [
      { label: "Route Optimization", value: "43%" },
      { label: "Carbon Reduction", value: "31%" },
      { label: "Cost Efficiency", value: "28%" }
    ],
    image: "/images/case-studies/logistics.jpg",
    industry: "Logistics"
  },
  {
    title: "Agricultural Innovation",
    company: "FarmFresh Enterprises",
    description: "Leveraging climate data to enhance crop yields and reduce resource waste in sustainable farming",
    metrics: [
      { label: "Yield Increase", value: "35%" },
      { label: "Water Savings", value: "42%" },
      { label: "Waste Reduction", value: "28%" }
    ],
    image: "/images/case-studies/agriculture.jpg",
    industry: "Agriculture"
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
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
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
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-primary/5"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4" />
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
          >
            View All Case Studies
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
} 