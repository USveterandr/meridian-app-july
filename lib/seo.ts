import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  structuredData?: object
  location?: {
    city: string
    region: string
    country: string
  }
}

const DOMINICAN_REPUBLIC_KEYWORDS = [
  // Spanish keywords
  'bienes raices republica dominicana',
  'propiedades punta cana',
  'inversión inmobiliaria santo domingo',
  'casas lujo cap cana',
  'apartamentos bavaro',
  'villas samana',
  'condos playa dorada',
  'inversiones rd',
  'propiedades turisticas',
  'real estate dominicana',
  
  // English keywords
  'dominican republic real estate',
  'punta cana properties',
  'cap cana luxury homes',
  'caribbean investment properties',
  'santo domingo condos',
  'beach properties dr',
  'vacation rental dominican republic',
  'luxury villas caribbean',
  
  // Investment keywords
  'ROI republica dominicana',
  'rentabilidad inmobiliaria rd',
  'inversion turistica punta cana',
  'propiedades alto rendimiento',
  'residencia fiscal rd',
  'ley confotur beneficios',
  'exenciones fiscales rd'
]

const BASE_LOCATIONS = [
  'Punta Cana', 'Cap Cana', 'Bavaro', 'Santo Domingo', 
  'Samana', 'Puerto Plata', 'La Romana', 'Casa de Campo',
  'Cabarete', 'Sosua', 'Juan Dolio', 'Boca Chica'
]

export function generatePropertySEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = '/images/meridian-og-default.jpg',
    canonical,
    location
  } = config

  // Enhanced title with location
  const enhancedTitle = location 
    ? `${title} - ${location.city}, República Dominicana | Meridian`
    : `${title} | Meridian República Dominicana - Inversiones de Lujo`

  // Enhanced description with Dominican context
  const enhancedDescription = location
    ? `${description} Ubicado en ${location.city}, República Dominicana. Solo 3% comisión, propiedades verificadas, incentivos fiscales CONFOTUR.`
    : `${description} Plataforma líder de inversiones inmobiliarias en República Dominicana. Propiedades de lujo verificadas con rentabilidad garantizada.`

  // Combine keywords with Dominican Republic specific terms
  const combinedKeywords = [
    ...keywords,
    ...DOMINICAN_REPUBLIC_KEYWORDS,
    ...(location ? [
      `propiedades ${location.city.toLowerCase()}`,
      `real estate ${location.city.toLowerCase()}`,
      `inversión ${location.city.toLowerCase()}`,
      `${location.city.toLowerCase()} luxury properties`,
    ] : [])
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'https://meridian-rd.com',
    name: 'Meridian República Dominicana',
    description: 'Plataforma líder para inversiones inmobiliarias de lujo en República Dominicana',
    url: 'https://meridian-rd.com',
    logo: 'https://meridian-rd.com/logo.png',
    image: ogImage,
    telephone: '+1-849-XXX-XXXX',
    email: 'info@meridian-rd.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DO',
      addressRegion: 'Distrito Nacional',
      addressLocality: 'Santo Domingo',
      streetAddress: 'Av. Winston Churchill'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.4861,
      longitude: -69.9312
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Punta Cana',
        containedInPlace: {
          '@type': 'State',
          name: 'La Altagracia'
        }
      },
      {
        '@type': 'City', 
        name: 'Santo Domingo',
        containedInPlace: {
          '@type': 'State',
          name: 'Distrito Nacional'
        }
      }
    ],
    serviceType: [
      'Venta de Propiedades de Lujo',
      'Inversiones Inmobiliarias',
      'Asesoría en Residencia Fiscal',
      'Gestión de Propiedades Turísticas'
    ],
    priceRange: '$$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  }

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: combinedKeywords.join(', '),
    
    // Open Graph
    openGraph: {
      title: enhancedTitle,
      description: enhancedDescription,
      url: canonical || 'https://meridian-rd.com',
      siteName: 'Meridian República Dominicana',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'es_DO',
      alternateLocale: ['en_US', 'fr_FR'],
      type: 'website'
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: enhancedTitle,
      description: enhancedDescription,
      site: '@MeridianRD',
      creator: '@MeridianRD',
      images: [ogImage]
    },

    // Additional metadata
    alternates: {
      canonical: canonical || 'https://meridian-rd.com',
      languages: {
        'es-DO': 'https://meridian-rd.com',
        'en-US': 'https://meridian-rd.com/en',
        'fr-FR': 'https://meridian-rd.com/fr'
      }
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // Verification
    verification: {
      google: 'google-site-verification-code',
      other: {
        'facebook-domain-verification': 'facebook-domain-verification-code',
        'p:domain_verify': 'pinterest-domain-verification-code'
      }
    },

    // App specific
    manifest: '/manifest.json',
    
    // Additional tags
    other: {
      'geo.region': 'DO',
      'geo.placename': location?.city || 'República Dominicana',
      'ICBM': location?.city === 'Punta Cana' ? '18.5601,-68.3725' : '18.4861,-69.9312',
      'DC.title': enhancedTitle,
      'DC.creator': 'Meridian República Dominicana',
      'DC.subject': 'Bienes Raíces, Inversiones Inmobiliarias, República Dominicana',
      'DC.description': enhancedDescription,
      'rating': 'general',
      'distribution': 'global',
      'revisit-after': '1 days',
      'language': 'Spanish',
      'target': 'all',
      'audience': 'all',
      'resource-type': 'document',
      'classification': 'Real Estate, Investment, Caribbean'
    }
  }
}

// Predefined SEO configs for main pages
export const SEO_CONFIGS = {
  home: {
    title: 'Meridian República Dominicana - Inversiones Inmobiliarias de Lujo',
    description: 'Plataforma #1 para inversiones inmobiliarias en República Dominicana. Solo 3% comisión, ROI hasta 25%, incentivos fiscales CONFOTUR. Propiedades verificadas en Punta Cana, Cap Cana, Santo Domingo.',
    keywords: ['bienes raices republica dominicana', 'inversion inmobiliaria rd', 'propiedades lujo punta cana']
  },
  
  explore: {
    title: 'Explorar Propiedades - TikTok Inmobiliario RD',
    description: 'Descubre propiedades increíbles con nuestra interfaz tipo TikTok. Desliza, explora y encuentra tu próxima inversión inmobiliaria en República Dominicana.',
    keywords: ['explorar propiedades rd', 'tiktok inmobiliario', 'propiedades swipe']
  },
  
  calculator: {
    title: 'Calculadora de Inversión Gamificada - ROI República Dominicana',
    description: 'Calcula el ROI de tus inversiones inmobiliarias en RD con nuestra calculadora gamificada. Incluye incentivos CONFOTUR, exenciones fiscales y proyecciones precisas.',
    keywords: ['calculadora roi rd', 'rentabilidad inmobiliaria dominicana', 'confotur beneficios']
  },
  
  properties: {
    title: 'Propiedades de Lujo - República Dominicana',
    description: 'Catálogo completo de propiedades de lujo en República Dominicana. Villas, penthouses, condos en las mejores ubicaciones: Punta Cana, Cap Cana, Santo Domingo.',
    keywords: ['propiedades lujo rd', 'villas punta cana', 'condos santo domingo']
  },
  
  invest: {
    title: 'Guía de Inversión Inmobiliaria - República Dominicana',
    description: 'Todo lo que necesitas saber para invertir en bienes raíces en RD. Incentivos fiscales, residencia fiscal, ley CONFOTUR, mejores ubicaciones turísticas.',
    keywords: ['inversion inmobiliaria rd', 'residencia fiscal dominicana', 'ley confotur']
  }
}

// Location-specific SEO generators
export function generateLocationSEO(city: string) {
  const cityData = {
    'punta-cana': {
      title: `Propiedades de Lujo en Punta Cana - Inversiones Caribeñas`,
      description: `Descubre las mejores propiedades de inversión en Punta Cana. Villas frente al mar, condos de lujo, ROI garantizado hasta 25%. Zona turística #1 de República Dominicana.`,
      coordinates: '18.5601,-68.3725'
    },
    'cap-cana': {
      title: `Villas Exclusivas Cap Cana - Ultra Lujo República Dominicana`,
      description: `Propiedades ultra lujo en Cap Cana, la zona más exclusiva de RD. Villas con campo de golf, marina privada, playa exclusiva. Inversión premium garantizada.`,
      coordinates: '18.5276,-68.3276'
    },
    'santo-domingo': {
      title: `Apartamentos y Condos Santo Domingo - Capital Inmobiliaria`,
      description: `Oportunidades de inversión en Santo Domingo, capital de RD. Apartamentos de lujo, condos modernos, zona financiera y comercial en crecimiento.`,
      coordinates: '18.4861,-69.9312'
    }
  }
  
  return cityData[city as keyof typeof cityData] || cityData['punta-cana']
}

// Structured data generators
export function generatePropertyStructuredData(property: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://meridian-rd.com/property/${property.id}`,
    name: property.title,
    description: property.description,
    image: property.images,
    brand: {
      '@type': 'Brand',
      name: 'Meridian República Dominicana'
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Meridian República Dominicana'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Habitaciones',
        value: property.bedrooms
      },
      {
        '@type': 'PropertyValue',
        name: 'Baños',
        value: property.bathrooms
      },
      {
        '@type': 'PropertyValue',
        name: 'Área',
        value: `${property.area} m²`
      },
      {
        '@type': 'PropertyValue',
        name: 'ROI Proyectado',
        value: `${property.roi}%`
      }
    ]
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}