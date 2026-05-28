// Shared SEO helpers. Single source of truth for canonical URLs, brand stats,
// JSON-LD schema generation. British English. No em dashes. Direct, evidence-led
// voice aligned with the TenderLab brand.

export const SITE_URL = 'https://www.tenderlab.co.uk'
export const SITE_NAME = 'TenderLab'
export const SITE_LEGAL_NAME = 'TenderLab Ltd'
export const COMPANY_NUMBER = '17184263'
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const LOGO_URL = `${SITE_URL}/images/Logo/tenderlab-logo-transparent.png`

export const BRAND = {
  winRate: '92%',
  submissions: '200+',
  yearsCareSector: '10+',
  clientSatisfaction: '98%',
  positioning: 'Evaluator-trained writers with care sector expertise.',
  description:
    'Specialist tender writing and bid consultancy operating exclusively within UK health and social care procurement. 92% win rate across 200+ local authority and NHS submissions.',
}

export function canonicalUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${p}`.replace(/\/+$/, '') || SITE_URL
}

export function defaultOpenGraph(args: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: string
}) {
  return {
    title: args.title,
    description: args.description,
    url: canonicalUrl(args.path),
    siteName: SITE_NAME,
    locale: 'en_GB',
    type: args.type ?? 'website',
    images: [
      {
        url: args.image ?? OG_IMAGE,
        width: 1200,
        height: 630,
        alt: args.title,
      },
    ],
  }
}

export function defaultTwitter(args: {
  title: string
  description: string
  image?: string
}) {
  return {
    card: 'summary_large_image' as const,
    title: args.title,
    description: args.description,
    images: [args.image ?? OG_IMAGE],
  }
}

// Sitewide Organization schema. Referenced by @id from other schema blocks.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  taxID: COMPANY_NUMBER,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'UK Companies House number',
    value: COMPANY_NUMBER,
  },
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: LOGO_URL,
    width: 600,
    height: 200,
    caption: SITE_NAME,
  },
  image: { '@id': `${SITE_URL}/#logo` },
  description: BRAND.description,
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  knowsAbout: [
    'Bid Writing',
    'Tender Writing',
    'UK Health and Social Care Procurement',
    'NHS Tender Writing',
    'Local Authority Tender Writing',
    'Supported Living Tenders',
    'Domiciliary Care Tenders',
    'Children Residential Tenders',
    'Continuing Healthcare Procurement',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44 1707 240393',
      contactType: 'customer service',
      email: 'info@tenderlab.co.uk',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: canonicalUrl(it.path),
    })),
  }
}

export function serviceSchema(args: {
  name: string
  description: string
  path: string
  serviceType?: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: args.serviceType ?? 'Tender Writing',
    name: args.name,
    description: args.description,
    url: canonicalUrl(args.path),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'UK health and social care providers',
    },
  }
}

export function articleSchema(args: {
  headline: string
  description: string
  path: string
  datePublished?: string
  dateModified?: string
  image?: string
  authorName?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    url: canonicalUrl(args.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(args.path) },
    image: args.image ? [{ '@type': 'ImageObject', url: args.image, width: 1200, height: 630 }] : undefined,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: {
      '@type': 'Organization',
      name: args.authorName ?? SITE_NAME,
      url: SITE_URL,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    articleSection: args.category,
    inLanguage: 'en-GB',
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }
}

// Default FAQ used on every care setting and service page so every page hits
// the FAQ schema requirement. Pages may override with topic-specific FAQs.
export const defaultFaq = [
  {
    question: 'What is your win rate on UK care sector tenders?',
    answer:
      'We hold a 92% win rate across 200+ submissions for local authority and NHS care contracts.',
  },
  {
    question: 'Do you write tenders for providers across the UK?',
    answer:
      'Yes. We support providers across England, Scotland, Wales and Northern Ireland. Delivery is remote with site visits arranged where mobilisation requires it.',
  },
  {
    question: 'How quickly can you turn around a bid?',
    answer:
      'Standard turnaround is 3 to 4 weeks for a full method-statement bid. We also support pre-submission review in 72 hours when the draft already exists.',
  },
  {
    question: 'Who writes the bids?',
    answer:
      'Evaluator-trained writers with care sector experience. Every submission passes a 27-criterion quality gate before it leaves our team*.',
  },
]
