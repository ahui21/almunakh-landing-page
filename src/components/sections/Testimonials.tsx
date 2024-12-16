import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "Almunakh has transformed how we approach climate risk. Their insights have been invaluable for our long-term planning.",
    author: "Sarah Chen",
    title: "Chief Sustainability Officer",
    company: "Global Innovations Inc.",
    avatar: "/avatars/sarah-chen.jpg"
  },
  {
    quote: "The real-time analytics and adaptive strategies have helped us stay ahead of climate-related disruptions.",
    author: "Michael Rodriguez",
    title: "Operations Director",
    company: "EcoTech Solutions",
    avatar: "/avatars/michael-rodriguez.jpg"
  },
  {
    quote: "Their platform's predictive capabilities have saved us millions in potential climate-related losses.",
    author: "Emma Thompson",
    title: "Risk Management Lead",
    company: "Sustainable Futures Ltd",
    avatar: "/avatars/emma-thompson.jpg"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary-yellow/5">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">
          Trusted by Industry Leaders
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-white border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 mb-4 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <blockquote className="text-lg text-gray-600 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <footer>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.title}
                    </div>
                    <div className="text-sm text-primary">
                      {testimonial.company}
                    </div>
                  </footer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 