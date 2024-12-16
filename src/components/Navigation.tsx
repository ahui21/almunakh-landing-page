"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const navLinks = [
    { href: "#benefits", label: "Benefits" },
    { href: "#features", label: "Features" },
    { href: "#case-studies", label: "Success Stories" }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-8 items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-white hover:opacity-90 transition-opacity"
              onClick={scrollToTop}
            >
              Almunakh
            </Link>
            
            <nav className="hidden md:block">
              <ul className="flex gap-6">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link 
                      href={href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white"
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4 border-t border-white/10"
            style={{
              animation: "slideDown 200ms ease-out"
            }}
          >
            <nav className="space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href}
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-300 hover:text-white"
                  asChild
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 