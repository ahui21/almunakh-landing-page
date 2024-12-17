import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  sizes?: {
    mobile: number
    tablet: number
    desktop: number
  }
  className?: string
  fill?: boolean
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  sizes,
  className,
  fill = false,
  priority = false,
}: OptimizedImageProps) {
  const sizeString = sizes 
    ? `(max-width: 640px) ${sizes.mobile}px, (max-width: 768px) ${sizes.tablet}px, ${sizes.desktop}px`
    : '100vw'

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      className={cn("object-cover", className)}
      sizes={sizeString}
      quality={90}
      loading={priority ? "eager" : "lazy"}
    />
  )
} 