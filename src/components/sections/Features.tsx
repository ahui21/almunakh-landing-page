import * as React from "react"
import { Brain, Monitor, Route } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = [
  {
    id: "predictive",
    title: "Advanced Predictive Modeling",
    icon: Brain,
    color: "text-primary",
    description: "Harness the power of machine learning for global climate data integration and micro-regional risk assessment.",
    details: [
      "Machine learning algorithms",
      "Global climate data integration",
      "Micro-regional risk assessment"
    ]
  },
  {
    id: "dashboard",
    title: "Real-Time Risk Dashboard",
    icon: Monitor,
    color: "text-secondary-green",
    description: "Interactive geospatial risk visualization with customizable alert systems and scenario planning tools.",
    details: [
      "Interactive geospatial risk visualization",
      "Customizable alert systems",
      "Scenario planning tools"
    ]
  },
  {
    id: "framework",
    title: "Adaptive Action Frameworks",
    icon: Route,
    color: "text-secondary-yellow",
    description: "Automated risk mitigation recommendations with business continuity planning and cost-benefit analysis.",
    details: [
      "Automated risk mitigation recommendations",
      "Business continuity planning",
      "Cost-benefit analysis of intervention strategies"
    ]
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">
          Powerful Features for Climate Risk Management
        </h2>

        <Tabs defaultValue="predictive" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id}
                value={feature.id}
                className="flex items-center gap-2"
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="hidden md:inline">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${feature.color.replace('text', 'bg')}`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <feature.icon className={`w-32 h-32 ${feature.color}`} />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
} 