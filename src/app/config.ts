import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
export const runtime = 'edge'
export const preferredRegion = 'auto'

export function preload() {
  noStore()
} 