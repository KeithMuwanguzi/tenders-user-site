import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import { defaultOpenGraph, defaultTwitter, breadcrumbSchema } from '@/lib/seo'
import CaseStudiesGrid from './CaseStudiesGrid'

export const metadata: Metadata = {
  title: 'Health and Social Care Tender Writing Case Studies | TenderLab',
  description:
    'Inspect documented TenderLab case studies across domiciliary care, supported living, children’s services, mental health and local authority care frameworks.',
  alternates: { canonical: '/case-studies' },
  openGraph: defaultOpenGraph({
    title: 'Health and Social Care Tender Writing Case Studies | TenderLab',
    description:
      'Documented TenderLab case studies across UK care tenders, frameworks, provider lists and DPS opportunities.',
    path: '/case-studies',
  }),
  twitter: defaultTwitter({
    title: 'Health and Social Care Tender Writing Case Studies | TenderLab',
    description:
      'Documented TenderLab case studies across UK care tenders, frameworks, provider lists and DPS opportunities.',
  }),
}

const faqs = [
  {
    q: 'What evidence supports these case studies?',
    a: 'The case-study pages show redacted award correspondence, score information or procurement references where those records are available. Personal and commercially sensitive information is removed before publication.',
  },
  {
    q: 'Does a previous result guarantee the same outcome for another provider?',
    a: 'No. Every procurement has different participation conditions, competitors, pricing and evaluation criteria. The case studies show documented work and outcomes; they are not a forecast or guarantee for a future tender.',
  },
  {
    q: 'Can we use another provider’s case study in our own tender response?',
    a: 'No. Your submission must rely on evidence your organisation can substantiate. TenderLab uses your operational records, people, controls and outcomes to build your own evidence trail.',
  },
  {
    q: 'Can TenderLab show the closest comparable example for our service?',
    a: 'Yes. Send the tender notice or procurement pack and tell us which service and lot you are considering. We can identify the most relevant published example while keeping other clients’ confidential information protected.',
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function CaseStudiesPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.tenderlab.co.uk/case-studies#collection',
    name: 'Health and Social Care Tender Writing Case Studies',
    url: 'https://www.tenderlab.co.uk/case-studies',
    isPartOf: { '@id': 'https://www.tenderlab.co.uk/#website' },
    about: { '@id': 'https://www.tenderlab.co.uk/#organization' },
    description:
      'Documented TenderLab case studies across UK health and social care tenders, frameworks and provider lists.',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <main className="ep-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case studies', path: '/case-studies' },
        ])) }}
      />

      <EditorialHero
        eyebrow="Documented tender results"
        title="See the starting point, the work and the recorded outcome."
        intro="Each case study separates the provider’s position, the procurement challenge, TenderLab’s role and the evidence supporting the result."
        image="/images/case-studies/havilah-1.png"
        imageAlt="Redacted local authority tender award correspondence used as supporting evidence"
        imageFit="contain"
        primaryLabel="Discuss a similar tender"
        primaryHref="/contact"
        secondaryLabel="Browse the cases"
        secondaryHref="#case-study-library"
        tone="blue"
      />

      <section className="ep-section ep-case-intro">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Choose the closest procurement context</p>
              <h2>Filter by care setting, authority or contract route.</h2>
            </div>
            <p>
              The filters help you compare like with like. A framework, provider list and direct contract can demand
              different evidence even when the underlying care service is similar.
            </p>
          </div>
        </div>
      </section>

      <div id="case-study-library">
        <CaseStudiesGrid />
      </div>

      <section className="ep-section ep-faq">
        <div className="ep-shell ep-faq__grid">
          <div className="ep-section-head">
            <p className="ep-kicker">Case-study questions</p>
            <h2>What these results do, and do not, prove.</h2>
            <p>
              Evidence should reduce uncertainty, not create a promise that the next procurement will behave the same way.
            </p>
          </div>
          <div className="ep-faq__list">
            {faqs.map((faq, index) => (
              <details key={faq.q}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-review-choice">
        <div className="ep-shell ep-review-choice__panel">
          <div>
            <p className="ep-kicker">Your tender still needs its own evidence</p>
            <h2>Start with the published requirements and your real delivery position.</h2>
          </div>
          <div>
            <p>
              Send us the notice or procurement pack. We will check the mandatory conditions and show you what must
              be evidenced before full writing begins.
            </p>
            <Link href="/contact" className="ep-button ep-button--primary">
              Ask for a tender assessment <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
