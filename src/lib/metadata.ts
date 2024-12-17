import { Metadata } from 'next'

interface GenerateMetadataProps {
  title: string
  description: string
  path: string
  image?: string
}

export function generateMetadata({
  title,
  description,
  path,
  image = '/images/og-image.jpg',
}: GenerateMetadataProps): Metadata {
  const url = `https://almunakh.com${path}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Almunakh',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
} 