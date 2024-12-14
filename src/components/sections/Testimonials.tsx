import * as React from "react"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Chief Risk Officer",
    company: "Global Logistics Co.",
    image: "/testimonials/sarah.jpg",
    quote: "Almunakh has transformed how we approach climate risk. Their predictive modeling saved us millions in potential losses.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Sustainability Director",
    company: "EcoTech Industries",
    image: "/testimonials/michael.jpg",
    quote: "The real-time monitoring and alerts have been game-changing for our operations across multiple locations.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Operations Manager",
    company: "Sustainable Solutions Ltd",
    image: "/testimonials/emma.jpg",
    quote: "Their platform's ease of use and comprehensive insights have made climate risk management accessible and actionable.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how organizations are using Almunakh to transform their approach to climate risk management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-5 h-5 fill-secondary-yellow text-secondary-yellow"
                  />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 