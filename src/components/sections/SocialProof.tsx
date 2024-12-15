import * as React from "react"
import Image from 'next/image'

export function SocialProof() {
  const clients = [
    { 
      name: 'Deloitte', 
      logo: '/logos/optimized/deloitte.webp',
      logoPng: '/logos/optimized/deloitte.png',
      width: 130,
      height: 48
    },
    { 
      name: 'Stanford University', 
      logo: '/logos/optimized/stanford.webp',
      logoPng: '/logos/optimized/stanford.png',
      width: 173,
      height: 48
    },
    { 
      name: 'Google', 
      logo: '/logos/optimized/google.webp',
      logoPng: '/logos/optimized/google.png',
      width: 134,
      height: 48
    },
    { 
      name: 'Accenture', 
      logo: '/logos/optimized/accenture.webp',
      logoPng: '/logos/optimized/accenture.png',
      width: 149,
      height: 48
    },
    { 
      name: 'New York City', 
      logo: '/logos/optimized/nyc.webp',
      logoPng: '/logos/optimized/nyc.png',
      width: 82,
      height: 48
    },
    { 
      name: 'FEMA', 
      logo: '/logos/optimized/fema.webp',
      logoPng: '/logos/optimized/fema.png',
      width: 106,
      height: 48
    },
    { 
      name: 'New York Times', 
      logo: '/logos/optimized/nyt.webp',
      logoPng: '/logos/optimized/nyt.png',
      width: 154,
      height: 48
    },
    { 
      name: 'EPA', 
      logo: '/logos/optimized/epa.webp',
      logoPng: '/logos/optimized/epa.png',
      width: 101,
      height: 48
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xl font-semibold text-primary mb-4">
            Backed by research and data from:
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client) => (
            <div 
              key={client.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={client.logoPng}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="h-12 object-contain"
                loading="lazy"
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 