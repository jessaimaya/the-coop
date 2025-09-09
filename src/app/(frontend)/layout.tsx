import React from 'react'
import './styles.css'

export const metadata = {
  title: 'coop - Donde las ideas encuentran forma, alas y sentido',
  description: 'Estructura flexible que conecta talentos para hacer crecer ideas. Estrategia, creatividad y ejecución sin desperdicios. Un modelo propio que combina inteligencia, colaboración e ingenio.',
  keywords: [
    'coop',
    'cooperación',
    'ideas',
    'estrategia',
    'creatividad',
    'colaboración',
    'equipos',
    'proyectos',
    'talento',
    'innovación',
    'desarrollo',
    'ejecución',
    'inteligencia',
    'ingenio',
    'profesionalismo',
    'estructura flexible',
    'agencia creativa',
    'consultora estratégica'
  ].join(', '),
  authors: [{ name: 'coop' }],
  creator: 'coop',
  publisher: 'coop',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://coop.com',
    title: 'coop - Donde las ideas encuentran forma, alas y sentido',
    description: 'Estructura flexible que conecta talentos para hacer crecer ideas. Estrategia, creatividad y ejecución sin desperdicios.',
    siteName: 'coop',
    images: [
      {
        url: '/images/coop.svg',
        width: 1200,
        height: 630,
        alt: 'coop - Donde las ideas encuentran forma, alas y sentido',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'coop - Donde las ideas encuentran forma, alas y sentido',
    description: 'Estructura flexible que conecta talentos para hacer crecer ideas. Estrategia, creatividad y ejecución sin desperdicios.',
    images: ['/images/coop.svg'],
    creator: '@coop',
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://coop.com',
    languages: {
      'es-ES': 'https://coop.com',
    },
  },
  category: 'business',
  classification: 'Estrategia, Creatividad, Colaboración',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "coop",
    "description": "Estructura flexible que conecta talentos para hacer crecer ideas. Estrategia, creatividad y ejecución sin desperdicios.",
    "url": "https://coop.com",
    "logo": "https://coop.com/images/coop.svg",
    "slogan": "Donde las ideas encuentran forma, alas y sentido",
    "foundingLocation": {
      "@type": "Place",
      "addressCountry": "ES"
    },
    "serviceArea": {
      "@type": "Place",
      "addressCountry": ["ES", "MX", "CO", "AR", "US"]
    },
    "services": [
      {
        "@type": "Service",
        "name": "Estrategia de Proyectos",
        "description": "Desarrollo estratégico y planificación de proyectos innovadores"
      },
      {
        "@type": "Service", 
        "name": "Desarrollo Creativo",
        "description": "Soluciones creativas y desarrollo de ideas con equipos especializados"
      },
      {
        "@type": "Service",
        "name": "Consultoría Colaborativa", 
        "description": "Estructura flexible que se adapta a cada proyecto y conecta talentos"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://twitter.com/coop",
      "https://linkedin.com/company/coop",
      "https://instagram.com/coop"
    ]
  }

  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#ee6123" />
        <meta name="msapplication-TileColor" content="#ee6123" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@100..800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
