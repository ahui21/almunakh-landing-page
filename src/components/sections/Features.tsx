import * as React from "react"
import { 
  BarChart3, 
  Shield, 
  AlertCircle, 
  LineChart, 
  Settings, 
  Zap 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    title: "Advanced Risk Analytics",
    description: "Leverage AI-powered analytics to identify and quantify climate-related risks specific to your business operations.",
    icon: BarChart3,
    color: "text-primary"
  },
  {
    title: "Real-time Monitoring",
    description: "Stay informed with continuous monitoring of weather patterns, climate trends, and potential disruptions.",
    icon: Shield,
    color: "text-secondary-green"
  },
  {
    title: "Early Warning System",
    description: "Receive automated alerts and notifications about potential climate risks before they impact your operations.",
    icon: AlertCircle,
    color: "text-secondary-yellow"
  },
  {
    title: "Predictive Modeling",
    description: "Forecast potential climate impacts using advanced modeling techniques and historical data analysis.",
    icon: LineChart,
    color: "text-primary"
  },
  {
    title: "Customizable Solutions",
    description: "Tailor our platform to your specific industry needs with flexible configuration options.",
    icon: Settings,
    color: "text-secondary-green"
  },
  {
    title: "Instant Insights",
    description: "Get actionable insights and recommendations delivered through an intuitive dashboard interface.",
    icon: Zap,
    color: "text-secondary-yellow"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-primary/5">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">
          Comprehensive Climate Risk Management
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Our platform provides everything you need to identify, monitor, and mitigate climate-related risks to your business.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card 
                key={feature.title}
                className="hover:scale-110 transition-transform duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <Icon className={`w-12 h-12 ${feature.color} mb-6`} />
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 