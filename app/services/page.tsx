import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import { SERVICES_DATA } from '@/lib/services-data'

export const metadata: Metadata = {
  title: 'Tender Writing and Bid Writing Services for UK Care | TenderLab',
  description: 'Compare specialist tender writing, bid review, readiness, coaching, pipeline and mobilisation support for UK health and social care providers.',
  alternates: { canonical: '/services' },
}

const displayNames: Record<string, string> = {
  'bid-viability': 'Bid viability and qualification',
  'bid-writing': 'Complete bid writing',
  'pre-submission-review': 'Pre-submission review',
  'lost-bid-debrief': 'Lost bid debrief',
  'tender-readiness-audit': 'Tender readiness audit',
  'tender-training': 'Tender training and bid team coaching',
  'mobilisation-support': 'Mobilisation support',
  'tender-retainer': 'Retained tender support',
}

const decisionLabels: Record<string, string> = {
  'bid-viability': 'You have a live opportunity and need an evidence-led fit decision before committing.',
  'bid-writing': 'A live tender needs writing from the procurement pack through to final review.',
  'pre-submission-review': 'Your team has drafted the submission and needs an independent evaluator challenge.',
  'lost-bid-debrief': 'You have buyer feedback and need to understand why marks were lost.',
  'tender-readiness-audit': 'You want to strengthen evidence before the next suitable opportunity appears.',
  'tender-training': 'Your team needs practical tender training built around real buyer documents and a repeatable writing method.',
  'mobilisation-support': 'You have won and need to convert the promises into controlled delivery actions.',
  'tender-retainer': 'Tendering is an ongoing growth function rather than a single project.',
}

const faqs = [
  { q: 'Which service should we choose for a live tender?', a: 'Complete bid writing is the right starting point when the procurement is live and your response still needs to be built. If your team has already drafted it, pre-submission review provides the independent scoring challenge.' },
  { q: 'Will TenderLab accept any tender writing project?', a: 'No. Before confirming a full writing engagement, we check the mandatory conditions, service scope, geography, registration, evidence, mobilisation position and commercial requirements. We only proceed when the available information supports a responsible case that the provider meets the tender requirements. That qualification protects the provider’s time and money, but it is not a guarantee of award.' },
  { q: 'Does TenderLab provide tender training?', a: 'Yes. Tender training and bid team coaching use real procurement documents and live examples to teach specification analysis, answer architecture, evidence selection and scoring. The aim is a repeatable internal method, not generic classroom theory.' },
  { q: 'Do you only work with health and social care providers?', a: 'Yes. TenderLab specialises in UK health and social care procurement, including domiciliary care, supported living, children’s services, residential care, community health and housing support.' },
  { q: 'Can several services be combined?', a: 'Yes. A provider may combine opportunity qualification, complete bid writing, independent review, training or mobilisation support. The scope is agreed around the work actually required rather than a fixed package.' },
  { q: 'Do you guarantee an award?', a: 'No responsible bid consultancy can guarantee a buyer’s decision. TenderLab improves compliance, evidence, structure and evaluator clarity while being honest about eligibility, price and delivery risks that writing cannot solve.' },
]

export default function ServicesPage() {
  return (
    <main className="ep-page">
      <EditorialHero
        eyebrow="Tender writing services for UK care providers"
        title="Choose the support that matches the work in front of you."
        intro="TenderLab supports the complete procurement cycle, from deciding whether an opportunity fits through writing, independent review, mobilisation and retained bid support."
        image="/images/editorial/tenderlab-bid-writing-hero-v1.webp"
        imageAlt="A care provider and tender specialist connecting operational evidence to a health and social care tender response"
        primaryLabel="Contact us about a tender"
        secondaryLabel="Compare the services"
        secondaryHref="#compare-services"
        tone="peach"
      />

      <section className="ep-section ep-services" id="compare-services">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Service comparison</p>
              <h2>Start with your situation, then choose the service.</h2>
            </div>
            <p>The comparison keeps the decision practical: when each service fits, what TenderLab does and what your team receives.</p>
          </div>

          <div className="ep-service-table" role="list">
            {SERVICES_DATA.map((service, index) => (
              <Link href={`/services/${service.slug}`} className="ep-service-row" key={service.slug} role="listitem">
                <span className="ep-service-row__number">{String(index + 1).padStart(2, '0')}</span>
                <div className="ep-service-row__name">
                  <small>Service</small>
                  <h3>{displayNames[service.slug] || service.title}</h3>
                </div>
                <div>
                  <small>Choose this when</small>
                  <p>{decisionLabels[service.slug]}</p>
                </div>
                <div>
                  <small>You receive</small>
                  <p>{service.delivers[0]}</p>
                </div>
                <span className="ep-service-row__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-service-proof">
        <div className="ep-shell ep-service-proof__grid">
          <div>
            <p className="ep-kicker">Our principal service</p>
            <h2>Complete bid writing remains at the centre of the practice.</h2>
          </div>
          <div>
            <p>We read the full procurement pack, map every scored requirement, gather operational evidence with your team, draft the response and challenge it before submission.</p>
            <Link href="/services/bid-writing" className="ep-link">Explore complete bid writing <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <EditorialFaq title="Questions about choosing tender support." items={faqs} />
    </main>
  )
}
