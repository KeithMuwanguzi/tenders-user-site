import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  SITE_URL,
  SITE_LEGAL_NAME,
  COMPANY_NUMBER,
  BRAND,
  defaultOpenGraph,
  defaultTwitter,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/seo'
import TendersClient from './TendersClient'

export const metadata: Metadata = {
  title: 'Live UK Health and Social Care Tenders | Contracts Finder + Find a Tender',
  description:
    'Active UK health and social care tender opportunities from Contracts Finder and Find a Tender. Domiciliary care, supported living, residential care, children services, mental health, nursing care, housing support. 92% win rate across 200+ submissions.',
  keywords: [
    'live tenders',
    'UK care tenders',
    'health and social care tenders',
    'Contracts Finder',
    'Find a Tender',
    'domiciliary care tenders UK',
    'supported living tenders',
    'residential care tenders',
    'children services tenders',
    'mental health tenders',
    'nursing care tenders',
    'housing support tenders',
    'tender writing services',
    'bid writing services',
  ],
  alternates: { canonical: '/tenders' },
  openGraph: defaultOpenGraph({
    title: 'Live UK Health and Social Care Tenders | TenderLab',
    description:
      'Active UK care procurement opportunities from Contracts Finder and Find a Tender. 92% win rate across 200+ submissions.',
    path: '/tenders',
  }),
  twitter: defaultTwitter({
    title: 'Live UK Health and Social Care Tenders | TenderLab',
    description:
      'Active UK care procurement opportunities from Contracts Finder and Find a Tender.',
  }),
  robots: { index: true, follow: true },
}

const FAQ = [
  {
    question: 'Where do these tenders come from?',
    answer:
      'Every tender on this page originates from Contracts Finder or Find a Tender, the two official UK Government tender publication services. We pull notices regularly, filter by care-sector criteria, and surface active health and social care opportunities for UK providers.',
  },
  {
    question: 'How often is the list updated?',
    answer:
      'Source feeds refresh continuously from gov.uk. New notices appear here as they are published and our team triages relevance to UK health and social care providers.',
  },
  {
    question: 'What counts as a UK health and social care tender?',
    answer:
      'Domiciliary care, supported living, residential care, nursing care, extra care housing, children services, fostering, leaving care, supported accommodation, mental health, learning disability, autism, substance misuse, continuing healthcare, end of life and palliative, hospital discharge, reablement, day services, community health, and housing-related support.',
  },
  {
    question: 'Are these the only live tenders in the market?',
    answer:
      'No. Some procurements are advertised on private commissioner portals (Atamis, Pro-Contract, In-Tend, Delta) rather than Contracts Finder or Find a Tender. If you are tracking a specific commissioner, ask us about adding their portal to our pipeline monitoring.',
  },
  {
    question: 'Can TenderLab write the response for a tender on this page?',
    answer:
      'Yes. We write specification-mirrored method statements with named operational evidence and a 72-hour pre-submission review built in. 92% win rate across 200+ UK care submissions. Companies House ' + COMPANY_NUMBER + '. Book a free 30-minute consultation to discuss any tender on this list.',
  },
  {
    question: 'What is the difference between Contracts Finder and Find a Tender?',
    answer:
      'Contracts Finder publishes UK procurement opportunities above approximately 12,000 GBP for central government and 30,000 GBP for sub-central authorities. Find a Tender publishes higher-value opportunities above the UK procurement regulations threshold. Both are official UK Government services and we monitor them in parallel.',
  },
]

export default function TendersPage() {
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Live UK Health and Social Care Tenders',
    description:
      'Active UK health and social care tender opportunities from Contracts Finder and Find a Tender.',
    url: SITE_URL + '/tenders',
    isPartOf: { '@id': SITE_URL + '/#website' },
    publisher: { '@id': SITE_URL + '/#organization' },
    inLanguage: 'en-GB',
  }

  return (
    <>
      <Script id="ld-tenders-collection" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <Script id="ld-tenders-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Live Tenders', path: '/tenders' },
      ])) }} />
      <Script id="ld-tenders-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ)) }} />

      <section className="page-hero">
        <div className="container">
          <div className="section-label">Procurement Opportunities</div>
          <h1>Live UK Health and Social Care Tenders</h1>
          <p className="page-hero__desc">
            Active opportunities from Contracts Finder and Find a Tender, the two official UK Government tender publication services. Triaged for UK health and social care providers. {BRAND.winRate} win rate across {BRAND.submissions} submissions.
          </p>
        </div>
      </section>

      <section className="tenders-intro" style={{ background: '#fff', padding: '2rem 0', borderBottom: '1px solid #E0E4E8' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 1.5rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#1F2D3D', margin: '0 0 1rem' }}>
            This page lists active UK health and social care procurement opportunities. Every notice originates from Contracts Finder or Find a Tender. We filter for care-sector relevance across domiciliary care, supported living, residential care, nursing care, extra care housing, children services, fostering, supported accommodation, mental health, learning disability, autism, substance misuse, continuing healthcare, hospital discharge, reablement, day services, community health, and housing-related support.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#1F2D3D', margin: 0 }}>
            Bidding for any tender on this list? <Link href="/contact?utm_source=tenders&utm_medium=intro&utm_campaign=lead" style={{ color: '#C8102E', fontWeight: 600 }}>Book a free 30-minute consultation</Link>. {BRAND.winRate} win rate across {BRAND.submissions} UK care submissions. {SITE_LEGAL_NAME}, Companies House {COMPANY_NUMBER}.
          </p>
        </div>
      </section>

      <TendersClient />

      <section className="hub-faq" style={{ background: '#F7F8FA', padding: '3rem 0' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#0B1F3A', margin: '0 0 1.5rem' }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map((item, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #E0E4E8', borderRadius: 8, padding: '1rem 1.25rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#0B1F3A' }}>{item.question}</summary>
                <p style={{ margin: '0.75rem 0 0', color: '#3A4A5C', lineHeight: 1.7 }}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <h2>Need help winning a tender?</h2>
            <p>Our evaluator-trained writers deliver a 92% win rate across 200+ health and social care submissions. {SITE_LEGAL_NAME}. Companies House {COMPANY_NUMBER}.</p>
            <div className="cta-banner__actions">
              <Link href="/score-my-response" className="btn btn-white">Score My Response</Link>
              <Link href="/contact?utm_source=tenders&utm_medium=cta&utm_campaign=lead" className="btn btn-outline-white">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
