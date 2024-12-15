import * as React from "react"
import { Shield, TrendingUp, Network } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const benefits = [
  {
    title: "Financial Protection",
    description: "Minimize unexpected climate-related financial losses with predictive modeling to anticipate potential disruptions.",
    icon: Shield,
    color: "text-primary"
  },
  {
    title: "Strategic Opportunity Identification",
    description: "Discover revenue opportunities emerging from climate shifts with adaptive business strategy development.",
    icon: TrendingUp,
    color: "text-secondary-green"
  },
  {
    title: "Operational Resilience",
    description: "Real-time risk monitoring and alerts with customized mitigation action plans.",
    icon: Network,
    color: "text-secondary-yellow"
  }
]

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">
          Transform Climate Challenges into Competitive Advantages
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Card key={benefit.title} className="border-none shadow-lg">
                <CardHeader>
                  <Icon className={`w-12 h-12 ${benefit.color} mb-4`} />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 