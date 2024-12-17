import * as React from "react"
import { Shield, TrendingUp, Network } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { JsonLd } from "@/components/JsonLd"

const benefits = [
  {
    title: "Proactive Risk Management",
    description: "Anticipate weather risks before they impact you. We monitor weather patterns for you and provide real-time alerts.",
    icon: Shield,
    color: "text-primary"
  },
  {
    title: "Growth Through Climate Opportunities",
    description: "Unlock new revenue streams specific to your business. Capture growth today and future-proof your business for tomorrow.",
    icon: TrendingUp,
    color: "text-secondary-green"
  },
  {
    title: "Simplified, Automated Intelligence",
    description: "Leverage clear, jargon-free insights tailored for executives. We translate complex climate data into actionable insights you can use immediately.",
    icon: Network,
    color: "text-secondary-yellow"
  }
]

export function Benefits() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": benefits.map((benefit, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": benefit.title,
      "description": benefit.description
    }))
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <section 
        id="benefits" 
        className="py-24 bg-secondary-green/5"
        aria-label="Platform Benefits"
      >
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">
            Stay Ahead of the Competition with Climate-Driven Insights
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card 
                  key={benefit.title} 
                  className="border-none shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:z-10 cursor-pointer bg-white hover:bg-gradient-to-b hover:from-white hover:to-primary/5 group"
                >
                  <CardHeader>
                    <Icon 
                      className={`w-12 h-12 ${benefit.color} mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3`} 
                    />
                    <CardTitle className="text-xl transition-colors duration-300 group-hover:text-primary">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
} 