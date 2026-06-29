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
    'We help UK care providers win council and NHS contracts. Framework applications, tender bids and pre-submission reviews. 92% win rate across 200+ submissions.',
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
// Six care-sector-specific questions that name regulators, statutory frameworks
// and concrete commercial terms so the schema reads as written by a UK care
// sector specialist rather than a generalist agency.
export const defaultFaq = [
  {
    question: 'What is your win rate on UK care sector tenders?',
    answer:
      '92% across 200+ submissions for local authority and NHS care contracts. The biggest single lift is our 72-hour pre-submission review by an evaluator-perspective writer who has not drafted the bid.',
  },
  {
    question: 'Which care sectors do you write tenders for?',
    answer:
      'UK health and social care exclusively. CQC-regulated adult social care (domiciliary, supported living, residential, nursing, extra care, complex care, CHC). Ofsted-regulated children\'s residential and 16-17 looked-after children supported accommodation under the Supported Accommodation (England) Regulations 2023. Non-regulated housing-related support and 18+ care leavers under Care Act 2014.',
  },
  {
    question: 'How do you handle regulator-correct framing in bids?',
    answer:
      'We never mix CQC, Ofsted and non-regulated language in a single response. Adult safeguarding wording is precise: the local authority leads any Care Act 2014 Section 42 enquiry, the provider supports. Mental Capacity Act 2005 references use the 5 statutory principles and 2-stage capacity test, never the incorrect 4-part formulations that AI tools commonly produce.',
  },
  {
    question: 'Do you write tenders for providers across the UK?',
    answer:
      'Yes. England, Scotland, Wales and Northern Ireland. Delivery is remote with site visits arranged where mobilisation requires it. We adapt regulator framing to the devolved nation (Care Inspectorate Scotland, Care Inspectorate Wales, RQIA Northern Ireland) where the cohort sits outside the CQC remit.',
  },
  {
    question: 'How quickly can you turn around a bid?',
    answer:
      'Full method-statement bid: 3 to 4 weeks standard. 72-hour pre-submission review when the draft already exists. Bid Team Coaching: 1-to-1 or small-group sessions structured around CQC, Ofsted, Care Act 2014 Section 42 and Mental Capacity Act 5 principles.',
  },
  {
    question: 'How much do your services cost?',
    answer:
      'Bid writing from £3,000 per submission depending on scope. Pre-Submission Review from £950. Tender Retainer from £4,500 per month. Free 30-minute consultation to scope before any engagement. TenderLab Ltd, Companies House 17184263.',
  },
]
