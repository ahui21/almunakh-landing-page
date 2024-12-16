import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import "./globals.css"
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Almunakh - Turn Climate Uncertainty into Business Resilience",
  description: "Real-time risk assessment and adaptive strategies that protect your bottom line and unlock hidden opportunities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
} 