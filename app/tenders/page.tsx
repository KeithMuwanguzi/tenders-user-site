import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import {
  SITE_URL,
  defaultOpenGraph,
  defaultTwitter,
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from '@/lib/seo'
import { fetchPublishedTenders } from '@/lib/published-tenders'
import TendersClient from './TendersClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Live Care Tenders UK | Health and Social Care Contracts',
  description:
    'Browse live UK health and social care tenders, including domiciliary care, supported living, children\'s services, mental health, residential and nursing opportunities.',
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
    title: 'Live Care Tenders UK | TenderLab',
    description:
      'Browse current health and social care procurement opportunities from official UK notice sources.',
    path: '/tenders',
  }),
  twitter: defaultTwitter({
    title: 'Live Care Tenders UK | TenderLab',
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
      'The page refreshes from TenderLab\'s published tender feed. Always check the official notice for the current deadline, documents, clarifications and submission instructions before making a bid decision.',
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
      'Yes. TenderLab can assess the opportunity, identify evidence gaps, write or review the response and help prepare a compliant submission. Share the tender pack and deadline so we can recommend the right level of support.',
  },
  {
    question: 'What is the difference between Contracts Finder and Find a Tender?',
    answer:
      'They are official public procurement notice services with different coverage and notice types. The correct source link is shown on every TenderLab listing. The official record remains authoritative for the procurement details and submission instructions.',
  },
]

export default async function TendersPage() {
  const initialTenders = await fetchPublishedTenders(150)

  return (
    <>
      <JsonLd id="ld-tenders-collection" data={webPageSchema({
        name: 'Live UK health and social care tenders',
        description: 'Current care-sector procurement opportunities from official UK notice sources.',
        path: '/tenders',
        type: 'CollectionPage',
        about: 'UK health and social care tenders',
      })} />
      <JsonLd id="ld-tenders-breadcrumb" data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Live Tenders', path: '/tenders' },
      ])} />
      <JsonLd id="ld-tenders-faq" data={faqSchema(FAQ)} />

      <main className="tenders-page">
      <section className="tenders-search-hero" aria-labelledby="live-tenders-title">
        <div className="container tenders-search-hero__grid">
          <div className="tenders-search-hero__copy">
            <p className="section-label">Current procurement opportunities</p>
            <h1 id="live-tenders-title">Live care tenders across the UK.</h1>
            <p>
              Search current opportunities published through official UK notice sources. Filter by
              care setting, open the complete tender record and examine the deadline, value, buyer and
              submission documents before deciding whether to bid.
            </p>
          </div>
          <figure className="tenders-search-hero__visual">
            <Image
              src="/images/editorial/tenderlab-live-tenders-hero-v1.webp"
              alt="Care-provider leaders comparing public procurement opportunities with care delivery requirements"
              fill
              priority
              quality={88}
              sizes="(max-width: 900px) 100vw, 53vw"
            />
            <figcaption>
              Use the official notice to confirm the requirement, then test whether the opportunity
              fits before committing.
            </figcaption>
          </figure>
          <div className="tenders-search-hero__actions">
            <a href="#live-tender-results" className="btn btn-primary">Search live tenders</a>
            <Link href="/contact?ref=tender-fit#enquiry" className="btn btn-ghost">Check whether a tender fits</Link>
          </div>
        </div>
      </section>

      <div id="live-tender-search">
        <TendersClient initialTenders={initialTenders} />
      </div>

      <section className="tenders-intro" style={{ background: '#fff', padding: '2rem 0', borderBottom: '1px solid #E0E4E8' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#0B1F3A', margin: '0 0 1rem' }}>
            Find the opportunity, then test whether it fits your organisation.
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#1F2D3D', margin: '0 0 1rem' }}>
            TenderLab brings together relevant notices across domiciliary care, supported living,
            residential and nursing care, children&apos;s services, supported accommodation, mental
            health, complex care, continuing healthcare and housing support. Each sector hub combines
            live opportunities with guidance on the evidence and delivery questions that commonly
            affect the bid decision.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#1F2D3D', margin: 0 }}>
            Finding a notice is only the beginning. Review eligibility, evidence, mobilisation,
            staffing and commercial exposure before committing the team. If you have a live tender,
              <Link href="/contact?utm_source=tenders&utm_medium=intro&utm_campaign=lead#enquiry" style={{ color: '#C8102E', fontWeight: 600 }}> share the opportunity with TenderLab</Link> or
            compare our <Link href="/services" style={{ color: '#C8102E', fontWeight: 600 }}>tender support services</Link>.
          </p>
        </div>
      </section>

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
            <h2>Have you found a tender that could change your business?</h2>
            <p>Share the tender pack and deadline. We will explain the fit, the evidence required and the most useful next step before writing begins.</p>
            <div className="cta-banner__actions">
              <Link href="/contact?utm_source=tenders&utm_medium=cta&utm_campaign=lead#enquiry" className="btn btn-white">Discuss this opportunity</Link>
              <Link href="/services/bid-writing" className="btn btn-outline-white">Explore bid writing</Link>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
