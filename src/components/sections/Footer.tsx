"use client"

import * as React from "react"
import { Mail, MapPin } from "lucide-react"
import useTracking from "@/hooks/useTracking"

export function Footer() {
  const { trackDeadLink } = useTracking()
  
  const handleDeadLink = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    e.preventDefault()
    trackDeadLink(name, e.currentTarget.href)
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Company Info */}
          <div className="max-w-md mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white font-bold">Almunakh</h3>
              <span className="text-gray-400">•</span>
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Transforming climate uncertainty into business resilience through real-time analytics and adaptive strategies.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              <span>contact@almunakh.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>New York City, NY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 