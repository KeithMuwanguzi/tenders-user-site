import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import { SERVICES_DATA, getServiceBySlug, type ServiceData } from '@/lib/services-data'
import {
  defaultOpenGraph,
  defaultTwitter,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/lib/seo'

const SERVICE_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  'bid-viability': {
    src: '/images/editorial/tenderlab-readiness-audit-hero-v1.webp',
    alt: 'A care provider and tender specialist checking published requirements, evidence, delivery and commercial fit before deciding to bid',
  },
  'bid-writing': {
    src: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
    alt: 'A care provider and tender specialist connecting operational evidence to a health and social care tender response',
  },
  'pre-submission-review': {
    src: '/images/editorial/tenderlab-pre-submission-review-hero-v1.webp',
    alt: 'A tender reviewer checking a care provider response against the published question, evidence and scoring rubric',
  },
  'lost-bid-debrief': {
    src: '/images/editorial/tenderlab-lost-bid-debrief-hero-v1.webp',
    alt: 'A care provider leadership team turning evaluator feedback into an evidence-led improvement plan',
  },
  'tender-readiness-audit': {
    src: '/images/editorial/tenderlab-readiness-audit-hero-v1.webp',
    alt: 'A care provider checking mandatory tender requirements, available evidence and readiness actions before bidding',
  },
  'tender-training': {
    src: '/images/editorial/tenderlab-tender-training-hero-v1.webp',
    alt: 'A care provider team learning tender analysis, evidence selection and evaluator-aligned answer structure in a live workshop',
  },
  'mobilisation-support': {
    src: '/images/editorial/tenderlab-mobilisation-support-hero-v1.webp',
    alt: 'A care provider coordinating people, training, policies and systems from contract award to day-one service delivery',
  },
  'tender-retainer': {
    src: '/images/editorial/tenderlab-retainer-hero-v1.webp',
    alt: 'A care provider and tender adviser managing a year-round pipeline, evidence library, reviews and tender strategy',
  },
}

const SERVICE_TONES = ['peach', 'blue', 'yellow', 'cream'] as const

function makeFaq(service: ServiceData) {
  const isTraining = service.slug === 'tender-training'
  return [
    {
      q: `What is included in ${service.title.toLowerCase()}?`,
      a: service.delivers.slice(0, 3).join(' '),
    },
    {
      q: `When is ${service.title.toLowerCase()} the right option?`,
      a: service.whenUsed.slice(0, 3).join(' '),
    },
    {
      q: 'Will TenderLab check whether the opportunity fits before accepting the work?',
      a: 'Yes. For a live tender, we check the mandatory requirements, service scope, geography, registration, evidence, mobilisation position and commercial conditions before confirming a full writing engagement. We proceed only when the available information supports a responsible view that the provider meets the tender requirements.',
    },
    {
      q: 'Does TenderLab guarantee that the tender will be awarded?',
      a: 'No. The buyer controls the evaluation and award decision. TenderLab improves compliance, evidence, structure and evaluator clarity, while identifying eligibility, delivery and commercial risks that writing alone cannot solve.',
    },
    ...(isTraining
      ? [{
          q: 'Is the tender training based on generic examples?',
          a: 'No. The programme uses real procurement documents and examples relevant to the provider’s work. It teaches specification analysis, answer architecture, evidence selection and scoring so the team leaves with a method it can repeat.',
        }]
      : [{
          q: 'Can this service be combined with other TenderLab support?',
          a: 'Yes. The scope can combine qualification, readiness, complete writing, independent review, tender training, retained support or mobilisation support when those stages are genuinely required.',
        }]),
  ]
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  const title = `${service.title} | TenderLab`
  const pathname = `/services/${slug}`
  const hero = SERVICE_HERO_IMAGES[slug]

  return {
    title,
    description: service.description,
    alternates: { canonical: pathname },
    openGraph: defaultOpenGraph({
      title,
      description: service.description,
      path: pathname,
      type: 'website',
      image: hero?.src,
    }),
    twitter: defaultTwitter({
      title,
      description: service.description,
      image: hero?.src,
    }),
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const pathname = `/services/${slug}`
  const hero = SERVICE_HERO_IMAGES[slug] ?? SERVICE_HERO_IMAGES['bid-writing']
  const serviceIndex = SERVICES_DATA.findIndex((item) => item.slug === slug)
  const faq = makeFaq(service)
  const contactHref = `/contact?serviceType=${encodeURIComponent(service.title)}#enquiry`

  const structuredData = [
    serviceSchema({
      name: service.title,
      description: service.description,
      path: pathname,
      serviceType: service.title,
    }),
    faqSchema(faq.map(({ q, a }) => ({ question: q, answer: a }))),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: pathname },
    ]),
  ]

  return (
    <main className="ep-page">
      {structuredData.map((data, index) => (
        <script
          key={index}
          id={`ld-service-${slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <EditorialHero
        eyebrow="TenderLab service"
        title={service.title}
        intro={service.description}
        image={hero.src}
        imageAlt={hero.alt}
        primaryLabel="Discuss this service"
        primaryHref={contactHref}
        secondaryLabel="Compare all services"
        secondaryHref="/services"
        tone={SERVICE_TONES[serviceIndex % SERVICE_TONES.length]}
      />

      <section className="ep-section ep-service-detail">
        <div className="ep-shell ep-service-detail__grid">
          <article className="ep-service-detail__copy">
            <p className="ep-kicker">What the service does</p>
            <h2>{service.tagline}</h2>
            {service.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>

          <aside className="ep-service-detail__deliverables">
            <p className="ep-kicker">What you receive</p>
            <ul>
              {service.delivers.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
              ))}
            </ul>
            <Link href={contactHref} className="ep-button ep-button--primary">
              Contact TenderLab <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>
      </section>

      <section className="ep-section ep-service-decisions">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Choose this service when</p>
              <h2>Match the support to the work that is actually required.</h2>
            </div>
            <p>We agree the scope from the documents and the provider’s current position. A larger engagement is not automatically the responsible recommendation.</p>
          </div>
          <div className="ep-decision-list">
            {service.whenUsed.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-service-process">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">How the work is controlled</p>
              <h2>A visible process from first review to final output.</h2>
            </div>
            <p>Each stage has a defined purpose and output. The detail changes with the procurement; the control does not.</p>
          </div>
          <div className="ep-method-grid">
            {service.howItWorks.map((step, index) => (
              <article key={step.step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.step}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-service-change">
        <div className="ep-shell ep-service-change__grid">
          <div>
            <p className="ep-kicker">The practical change</p>
            <h2>What the engagement is intended to improve.</h2>
            <ul className="ep-service-change__problems">
              {service.solves.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="ep-transform-list">
            {service.transforms.map((item, index) => (
              <article key={item.from}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><small>From</small><p>{item.from}</p></div>
                <b aria-hidden="true">→</b>
                <div><small>To</small><p>{item.to}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-service-scope">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div><p className="ep-kicker">Scope options</p><h2>The scope follows the complexity, not a sales label.</h2></div>
            <p>We confirm the actual work after reviewing the available documents, deadline, lots, evidence and internal capacity.</p>
          </div>
          <div className="ep-scope-grid">
            {service.tiers.map((tier, index) => (
              <article key={tier.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{tier.name}</h3>
                <p>{tier.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditorialFaq title={`Questions about ${service.title.toLowerCase()}.`} items={faq} />
    </main>
  )
}
