import * as React from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Essential",
    price: "499",
    description: "Perfect for small businesses starting their climate journey",
    features: [
      "Basic risk assessment",
      "Monthly reports",
      "Email support",
      "Basic data integration",
      "Up to 3 locations"
    ]
  },
  {
    name: "Professional",
    price: "999",
    description: "Comprehensive protection for growing organizations",
    features: [
      "Advanced risk modeling",
      "Weekly reports",
      "24/7 phone support",
      "Full data integration",
      "Up to 10 locations",
      "Custom action plans"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale solution for large organizations",
    features: [
      "Custom risk modeling",
      "Real-time reporting",
      "Dedicated account manager",
      "API access",
      "Unlimited locations",
      "Custom integrations",
      "On-site training"
    ]
  }
]

export function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Transparent Pricing for Every Scale
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your organization's needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  {plan.price !== "Custom" && <span>/month</span>}
                </div>
                <p className="text-gray-600 mt-4">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="text-secondary-green w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full mt-8">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 