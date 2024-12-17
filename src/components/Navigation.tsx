"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import useTracking from "@/hooks/useTracking"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { trackClick } = useTracking()
  const [isInHero, setIsInHero] = React.useState(true)

  // Add scroll handler
  React.useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsInHero(heroBottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    trackClick('Navigation', href)

    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      router.push('/')
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      // If we're already on homepage, just scroll
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname !== '/') {
      router.push('/')
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const navLinks = [
    { href: "#benefits", label: "Benefits" },
    { href: "#features", label: "Features" },
    { href: "#case-studies", label: "Success Stories" }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10 transition-colors duration-300 ${
        isInHero ? 'bg-primary/90' : 'bg-black/90'
      }`}
    >
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
                      onClick={(e) => handleNavigation(e, href)}
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
                variant="outline" 
                className="text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-500 text-white"
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
                  onClick={(e) => {
                    setIsMenuOpen(false)
                    handleNavigation(e, href)
                  }}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
                  asChild
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white"
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