import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import "./globals.css"
import { Toaster } from 'sonner'
import Script from 'next/script'
import { ClientLayout } from "@/components/ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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

const GA_ID = 'G-T7YGE17L4W'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navigation />
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
      </body>
    </html>
  )
} 