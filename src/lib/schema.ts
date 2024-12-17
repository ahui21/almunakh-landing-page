export function generateSchema(type: 'Organization' | 'WebSite' | 'Article', data: any) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        name: 'Almunakh',
        url: 'https://almunakh.com',
        logo: 'https://almunakh.com/logo.png',
        sameAs: [
          'https://twitter.com/almunakh',
          'https://linkedin.com/company/almunakh'
        ],
        ...data
      }

    case 'WebSite':
      return {
        ...baseSchema,
        name: 'Almunakh',
        url: 'https://almunakh.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://almunakh.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        ...data
      }

    case 'Article':
      return {
        ...baseSchema,
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishDate,
        dateModified: data.modifyDate,
        author: {
          '@type': 'Organization',
          name: 'Almunakh'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Almunakh',
          logo: {
            '@type': 'ImageObject',
            url: 'https://almunakh.com/logo.png'
          }
        },
        ...data
      }

    default:
      return baseSchema
  }
} 