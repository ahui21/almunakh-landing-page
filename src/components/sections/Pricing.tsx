import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Starter",
    price: "499",
    description: "Perfect for small businesses starting their climate journey",
    features: [
      "Basic climate risk assessment",
      "Monthly risk reports",
      "Email support",
      "Basic analytics dashboard",
      "Up to 3 team members"
    ]
  },
  {
    name: "Professional",
    price: "999",
    description: "Ideal for growing companies with complex needs",
    features: [
      "Advanced risk modeling",
      "Weekly detailed reports",
      "24/7 priority support",
      "Advanced analytics & forecasting",
      "Up to 10 team members",
      "Custom action plans",
      "API access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations requiring comprehensive solutions",
    features: [
      "Custom risk modeling",
      "Real-time monitoring & alerts",
      "Dedicated account manager",
      "Full API access",
      "Unlimited team members",
      "Custom integrations",
      "On-site training",
      "Compliance reporting"
    ]
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-primary/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative ${plan.popular ? 'border-primary shadow-xl' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
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
                  {plan.price !== "Custom" && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
                <p className="text-gray-600 mt-4">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="text-primary w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-8 ${plan.popular ? 'bg-primary' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
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