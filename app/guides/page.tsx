import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import { DECISION_GUIDES } from '@/lib/decision-guides'

export const metadata: Metadata = {
  title: 'Care Contract and Tender Guides for UK Providers | TenderLab',
  description: 'Practical guides for care-provider owners and registered managers researching council contracts, eligibility, frameworks, CQC requirements and tender scores.',
  alternates: { canonical: '/guides' },
}

const guideImages = [
  '/images/editorial/tenderlab-domiciliary-care-hero-v1.jpg',
  '/images/editorial/tenderlab-supported-living-hero-v1.jpg',
  '/images/editorial/tenderlab-care-evidence-hero-v1.webp',
  '/images/editorial/tenderlab-proof-hero-v1.webp',
]

export default function GuidesPage() {
  return (
    <main className="ep-page">
      <EditorialHero
        eyebrow="Tender guides for decision-makers"
        title="Start with the question that is holding up the decision."
        intro="Clear, tender-specific guidance for care-provider owners, directors and registered managers—from finding a council route to checking eligibility and understanding scores."
        image="/images/editorial/tenderlab-blog-intelligence-hero-v1.webp"
        imageAlt="Editorial collage connecting public procurement questions, care-provider evidence and tender decisions"
        primaryLabel="Browse the questions"
        primaryHref="#guide-index"
        secondaryLabel="Explore live tenders"
        secondaryHref="/tenders"
        tone="blue"
      />

      <section className="ep-section ep-guides" id="guide-index">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div><p className="ep-kicker">Decision-maker questions</p><h2>Find the route, test the fit, then decide what help is needed.</h2></div>
            <p>These guides answer the searches that happen before someone knows to ask for a bid writer. Every page leads back to the buyer documents and the actual conditions.</p>
          </div>
          <div className="ep-guide-index">
            {DECISION_GUIDES.map((guide, index) => (
              <Link href={`/guides/${guide.slug}`} key={guide.slug} className="tl-guide-card">
                <span className="tl-guide-card__image"><Image src={guideImages[index % guideImages.length]} alt="" fill sizes="(max-width: 760px) 100vw, 25vw" /></span>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{guide.eyebrow}</small>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
