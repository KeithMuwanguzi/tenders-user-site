import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import EditorialHero from '@/components/EditorialHero'
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
      <EditorialHero
        eyebrow="Current UK procurement opportunities"
        title="Live care tenders, organised for a responsible first decision."
        intro="Search official notices by care setting, buyer or location. Open the complete TenderLab record, then use the original notice to confirm the requirement and submission route."
        image="/images/editorial/tenderlab-live-tenders-hero-v1.webp"
        imageAlt="Care-provider leaders comparing public procurement opportunities with care delivery requirements"
        primaryLabel="Search live tenders"
        primaryHref="#live-tender-search"
        secondaryLabel="Book a tender consultation"
        secondaryHref="/book-consultation"
      />

      <div id="live-tender-search">
        <TendersClient initialTenders={initialTenders} />
      </div>

      <section className="tenders-intro">
        <div className="tenders-intro__inner">
          <h2>
            Find the opportunity, then test whether it fits your organisation.
          </h2>
          <p>
            TenderLab brings together relevant notices across domiciliary care, supported living,
            residential and nursing care, children&apos;s services, supported accommodation, mental
            health, complex care, continuing healthcare and housing support. Each sector hub combines
            live opportunities with guidance on the evidence and delivery questions that commonly
            affect the bid decision.
          </p>
          <p>
            Finding a notice is only the beginning. Review eligibility, evidence, mobilisation,
            staffing and commercial exposure before committing the team. If you have a live tender,
              <Link href="/contact?utm_source=tenders&utm_medium=intro&utm_campaign=lead#enquiry"> share the opportunity with TenderLab</Link> or
            compare our <Link href="/services">tender support services</Link>.
          </p>
        </div>
      </section>

      <section className="hub-faq tenders-faq">
        <div className="tenders-faq__inner">
          <h2>Frequently asked questions</h2>
          <div className="tenders-faq__list">
            {FAQ.map((item, i) => (
              <details key={i}>
                <summary><span>{String(i + 1).padStart(2, '0')}</span>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tenders-closing">
        <div className="tenders-closing__inner">
          <p className="ep-kicker">Before your team commits</p>
          <h2>Use the tender pack, deadline and your real delivery position to make the decision.</h2>
          <p>Book a paid consultation when you need TenderLab to examine the opportunity with you.</p>
          <Link href="/book-consultation" className="ep-button ep-button--primary">Book a consultation <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      </main>
    </>
  )
}
