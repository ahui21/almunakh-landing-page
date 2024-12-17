"use client"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useIntersectionObserver()
  return <>{children}</>
} 