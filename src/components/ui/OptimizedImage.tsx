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
  quality?: number
  unoptimized?: boolean
}

export function OptimizedImage({
  src,
  alt,
  sizes,
  className,
  fill = false,
  priority = false,
  quality = 90,
  unoptimized = false,
}: OptimizedImageProps) {
  const isGif = src.endsWith('.gif')
  const shouldOptimize = !unoptimized && !isGif
  
  const basePath = shouldOptimize ? src.replace(/\.[^.]+$/, '') : src
  const webpSrc = shouldOptimize ? `${basePath}.webp` : src
  const avifSrc = shouldOptimize ? `${basePath}.avif` : src

  const sizeString = sizes 
    ? `(max-width: 640px) ${sizes.mobile}px, (max-width: 768px) ${sizes.tablet}px, ${sizes.desktop}px`
    : '100vw'

  return (
    <picture>
      {shouldOptimize && (
        <>
          <source srcSet={avifSrc} type="image/avif" />
          <source srcSet={webpSrc} type="image/webp" />
        </>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={cn(
          "object-cover",
          isGif && "mix-blend-normal bg-transparent",
          className
        )}
        sizes={sizeString}
        quality={quality}
        loading={priority ? "eager" : "lazy"}
        unoptimized={unoptimized}
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
          `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="transparent"/>
          </svg>`
        ).toString('base64')}`}
        placeholder="blur"
      />
    </picture>
  )
} 