import type { Metadata } from 'next'
import Script from 'next/script'
import {
  SITE_URL,
  SITE_LEGAL_NAME,
  COMPANY_NUMBER,
  defaultOpenGraph,
  defaultTwitter,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/seo'
import ScoreClient from './ScoreClient'

export const metadata: Metadata = {
  title: 'Score My Tender Response - Free Evaluator-Grade Review | TenderLab',
  description:
    'Free evaluator-grade scoring of your UK health and social care tender response. Submit your draft, get a 4-point review against the published criteria within 48 hours. No obligation. 92% win rate across 200+ submissions.',
  keywords: [
    'score my tender response',
    'free tender review',
    'tender response evaluation',
    'bid scoring',
    'pre-submission review',
    'UK care tender review',
    'free bid assessment',
    'tender writing services',
    'bid writing services',
  ],
  alternates: { canonical: '/score-my-response' },
  openGraph: defaultOpenGraph({
    title: 'Score My Tender Response - Free Evaluator Review | TenderLab',
    description:
      'Free evaluator-grade scoring of your UK care tender response within 48 hours. 92% win rate.',
    path: '/score-my-response',
  }),
  twitter: defaultTwitter({
    title: 'Score My Tender Response - Free Evaluator Review',
    description: 'Free evaluator-grade scoring within 48 hours. UK care tenders.',
  }),
  robots: { index: true, follow: true },
}

const FAQ = [
  {
    question: 'How does the free scoring work?',
    answer:
      'Send your tender response, the published scoring criteria, and the original question. Within 48 hours we return a written review covering: where the response would score on each criterion, what is missing against the printed evaluation framework, the specific paragraphs that need rewriting, and the marks at stake on each gap.',
  },
  {
    question: 'Is this genuinely free?',
    answer:
      'Yes. The scoring review is free. No obligation to proceed. If you decide you want help fixing the gaps we identify, we quote a Pre-Submission Review or Bid Writing engagement separately.',
  },
  {
    question: 'What do you do with my draft?',
    answer:
      'We review it, score it, and return our notes. We do not share it, store it beyond the engagement, or reuse content. Treated as confidential under our standard NDA terms. ' +
      SITE_LEGAL_NAME +
      ', Companies House ' +
      COMPANY_NUMBER +
      '.',
  },
  {
    question: 'How long does the review take?',
    answer:
      'Standard turnaround is 48 hours. If you need faster (24 hours or same-day) tell us when you submit and we will confirm capacity.',
  },
  {
    question: 'What sectors do you cover?',
    answer:
      'UK health and social care: domiciliary care, supported living, residential care, nursing care, children services, mental health, learning disability, autism, substance misuse, continuing healthcare, hospital discharge, reablement, day services, community health, housing-related support.',
  },
]

export default function ScoreMyResponsePage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Free Tender Response Scoring',
    name: 'Score My Tender Response',
    description:
      'Free evaluator-grade scoring of UK health and social care tender responses. 48-hour turnaround. 92% win rate across 200+ submissions.',
    provider: { '@id': SITE_URL + '/#organization' },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    url: SITE_URL + '/score-my-response',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  }

  return (
    <>
      <Script id="ld-score-service" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <Script id="ld-score-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Score My Response', path: '/score-my-response' },
      ])) }} />
      <Script id="ld-score-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ)) }} />

      <ScoreClient />

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
    </>
  )
}
