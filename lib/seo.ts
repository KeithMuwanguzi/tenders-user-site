// Shared SEO helpers. Single source of truth for canonical URLs, brand stats,
// JSON-LD schema generation. British English. No em dashes. Direct, evidence-led
// voice aligned with the TenderLab brand.

export const SITE_URL = 'https://www.tenderlab.co.uk'
export const SITE_NAME = 'TenderLab'
export const SITE_LEGAL_NAME = 'TenderLab Ltd'
export const COMPANY_NUMBER = '17184263'
export const OG_IMAGE = `${SITE_URL}/images/business-people-video-call-meeting.jpg`
export const LOGO_URL = `${SITE_URL}/images/Logo/tenderlab-logo-transparent.png`

export const BRAND = {
  winRate: '92%',
  submissions: '200+',
  contractValue: '£50M+',
  topScore: '5/5',
  yearsCareSector: '10+',
  clientSatisfaction: '98%',
  positioning: 'Evaluator-trained writers with care sector expertise.',
  description:
    'Specialist tender writing and bid consultancy for UK health and social care procurement. TenderLab records a 92% historic win rate and has separately supported more than 200 submissions.',
}

// Verified off-domain profiles. Single source of truth for the Organization
// sameAs array (machine-readable entity graph signal) and any visible
// off-domain link list in the UI. Add new profiles here as the trust stack
// rollout claims them. Mirror this list in references/external-profiles-and-citations.md
// in the tenderlab-company-profile skill.
export const EXTERNAL_PROFILES = {
  companiesHouse: 'https://find-and-update.company-information.service.gov.uk/company/17184263',
  googleBusinessProfile: 'https://g.page/r/CarBdrVY3WO4EBM/review',
  trustpilot: 'https://uk.trustpilot.com/review/tenderlab.co.uk',
  linkedin: 'https://www.linkedin.com/company/tenderlabuk/',
  facebook: 'https://www.facebook.com/tenderlabuk',
  instagram: 'https://www.instagram.com/tenderlabuk/',
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
// sameAs ties this Organization entity to its verified off-domain profiles,
// telling Google's knowledge graph that the same business owns these six URLs.
// This is what produces the consolidated brand panel for "TenderLab" searches.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
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
    width: 1024,
    height: 1024,
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
  sameAs: [
    EXTERNAL_PROFILES.companiesHouse,
    EXTERNAL_PROFILES.googleBusinessProfile,
    EXTERNAL_PROFILES.trustpilot,
    EXTERNAL_PROFILES.linkedin,
    EXTERNAL_PROFILES.facebook,
    EXTERNAL_PROFILES.instagram,
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
  audienceType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl(args.path)}#service`,
    serviceType: args.serviceType ?? 'Tender Writing',
    name: args.name,
    description: args.description,
    url: canonicalUrl(args.path),
    provider: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: args.audienceType ?? 'UK health and social care providers',
    },
  }
}

export function webPageSchema(args: {
  name: string
  description: string
  path: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  about?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': args.type ?? 'WebPage',
    '@id': `${canonicalUrl(args.path)}#webpage`,
    url: canonicalUrl(args.path),
    name: args.name,
    description: args.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: args.about ? { '@type': 'Thing', name: args.about } : undefined,
    inLanguage: 'en-GB',
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
  type?: 'Article' | 'BlogPosting'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': args.type ?? 'Article',
    '@id': `${canonicalUrl(args.path)}#article`,
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

export function careSettingFaq({ label }: { label: string }) {
  return [
    {
      question: `Can TenderLab help with ${label} tenders across the UK?`,
      answer: `Yes. TenderLab supports UK providers responding to ${label} procurements from councils, NHS organisations and other public bodies. The tender documents, eligibility and service model determine the exact support required.`,
    },
    {
      question: `What evidence is important in a ${label} tender?`,
      answer: `The evidence depends on the specification and scoring method. Common requirements include safeguarding, workforce competence, mobilisation, quality assurance, outcomes, partnership working and clear records that prove how the proposed service operates.`,
    },
    {
      question: 'Will TenderLab check whether the opportunity is suitable before writing?',
      answer: 'Yes. We examine the published conditions, available evidence, delivery model, mobilisation and commercial position before recommending full bid-writing support. We do not guarantee an award.',
    },
  ]
}

// Reusable buying questions. Only emit FAQ schema when these answers are also
// visible on the page. Topic-specific questions are preferred where available.
export const defaultFaq = [
  {
    question: 'What is your win rate on UK care sector tenders?',
    answer:
      'TenderLab records a 92% historic win rate and has separately supported more than 200 submissions. The two figures should not be read as the same measurement. An award can never be guaranteed because the provider, opportunity, evidence, price and evaluation all affect the result.',
  },
  {
    question: 'Which care sectors do you write tenders for?',
    answer:
      'TenderLab supports adult social care, children\'s services, housing support and community health providers. This includes domiciliary care, supported living, supported accommodation, residential and nursing care, complex care, mental health, fostering, leaving care and related services.',
  },
  {
    question: 'What does TenderLab need before starting a bid?',
    answer:
      'We normally need the complete tender pack, the submission deadline, the provider\'s policies and operational evidence, and access to people who understand delivery. We review these before confirming scope and timescales.',
  },
  {
    question: 'Do you write tenders for providers across the UK?',
    answer:
      'Yes. TenderLab supports health and social care providers across the United Kingdom and adapts each response to the relevant commissioner, service, procurement documents and regulatory context.',
  },
  {
    question: 'Can TenderLab help decide whether a tender is suitable?',
    answer:
      'Yes. We can examine the published conditions, available evidence, delivery model, mobilisation requirements and commercial position before writing begins. The purpose is to identify fit, gaps and material risks before the provider commits significant time.',
  },
  {
    question: 'What results has TenderLab achieved?',
    answer:
      'TenderLab has supported more than 200 submissions, records a 92% win rate, has contributed to client awards with a combined value above £50 million and has achieved evaluator scores of 5 out of 5. Results vary by opportunity and provider.',
  },
]
