import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import "./globals.css"
import { Toaster } from 'sonner'
import Script from 'next/script'
import { ClientLayout } from "@/components/ClientLayout"
import { GA_ID } from '@/lib/constants'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'
import { generateSchema } from '@/lib/schema'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://almunakh.com'),
  title: "Almunakh - Climate Risk Management Platform",
  description: "Transform climate uncertainty into business resilience with Almunakh's real-time risk assessment and adaptive strategies. Get actionable climate insights for your business.",
  keywords: ["climate risk management", "business resilience", "climate analytics", "weather risk", "climate data", "sustainability", "risk assessment"],
  openGraph: {
    title: "Almunakh - Climate Risk Management Platform",
    description: "Transform climate uncertainty into business resilience with real-time climate risk analytics",
    url: "https://almunakh.com",
    siteName: "Almunakh",
    images: [
      {
        url: "https://almunakh.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Almunakh Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Almunakh - Climate Risk Management Platform",
    description: "Transform climate uncertainty into business resilience with real-time climate risk analytics",
    images: ["https://almunakh.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  }
} satisfies Metadata

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = generateSchema('WebSite', {
    description: "Climate Risk Management Platform"
  })

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* PWA Tags */}
        <meta name="application-name" content="Almunakh" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Almunakh" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
          async
          defer
        />
        <Script 
          id="google-analytics" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                send_page_view: true
              });
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
        <PerformanceMonitor />
      </body>
    </html>
  )
} 