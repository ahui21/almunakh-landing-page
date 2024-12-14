"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Benefits", href: "#benefits" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" }
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-primary">
            Almunakh™
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 