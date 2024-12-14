import * as React from "react"
import Image from 'next/image'

export function SocialProof() {
  const clients = [
    { name: 'Company 1', logo: '/logos/company1.svg' },
    // Add more companies
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xl font-semibold text-primary mb-4">
            Trusted by Fortune 500 Companies
          </p>
          <p className="text-2xl text-secondary-green font-bold">
            Protecting $50B+ in business assets
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client) => (
            <div 
              key={client.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={160}
                height={60}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 