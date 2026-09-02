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

type ServicePageDetail = {
  processOutputs: string[]
  improvements: string[]
}

const SERVICE_PAGE_DETAILS: Record<string, ServicePageDetail> = {
  'bid-viability': {
    processOutputs: [
      'You receive a requirements register showing the pass or fail conditions, scored areas, dates, dependencies and points that need clarification.',
      'We record where your current registration, experience, evidence, staffing, mobilisation and commercial position meet the requirement and where they do not.',
      'You receive a written bid, resolve-first or no-bid recommendation, with the reasons, remaining risks and named actions needed before any writing engagement begins.',
    ],
    improvements: [
      'Instead of deciding from the headline contract value, leadership can see whether the organisation meets the buyer’s actual conditions and can deliver the service safely.',
      'Assumptions become a recorded list of evidence gaps, commercial questions and mobilisation dependencies, each with an owner or a clear reason to stop.',
      'The final decision is explained in plain language, so management time and writing fees are committed only when the available evidence supports proceeding.',
    ],
  },
  'bid-writing': {
    processOutputs: [
      'You receive a controlled response plan that links every question and subpoint to the specification, scoring descriptors, word limit, evidence owner and internal deadline.',
      'We interview the people responsible for delivery and build an evidence record covering roles, controls, records, case examples, outcomes and realistic commitments.',
      'Each draft follows the buyer’s order and makes the method, ownership, frequency, evidence and intended outcome visible without asking the evaluator to infer them.',
      'An independent reviewer checks compliance and scoring coverage before a final supervisor resolves findings and prepares the client-approved submission version.',
    ],
    improvements: [
      'A complicated procurement pack becomes one working plan, so contributors know exactly what information is needed and when it must be supplied.',
      'Operational knowledge becomes usable tender evidence by naming who does the work, how it is controlled, what record proves it and how performance is reviewed.',
      'Separate contributions become one consistent submission, with conflicting promises, repeated content and unsupported claims corrected before handover.',
    ],
  },
  'pre-submission-review': {
    processOutputs: [
      'We produce a requirement checklist for every reviewed answer, including the question wording, specification references, scoring descriptors and mandatory submission rules.',
      'The draft is annotated with specific gaps, contradictions, unsupported claims and places where useful evidence is present but difficult for an evaluator to find.',
      'You receive a prioritised correction plan separating material compliance or scoring risks from optional refinements, so the remaining review time is used where it matters most.',
    ],
    improvements: [
      'Internal confidence is tested against the published documents by a reviewer who was not responsible for producing the original draft.',
      'The team stops editing everything equally and instead works through a ranked list of missing requirements, weak evidence and cross-answer inconsistencies.',
      'Important proof is repositioned and signposted so the evaluator can connect each claim to the responsible role, control, record and outcome.',
    ],
  },
  'lost-bid-debrief': {
    processOutputs: [
      'You receive one evaluation trail bringing together the question, scoring descriptors, submitted answer, awarded score and every relevant buyer comment.',
      'We distinguish procurement-specific issues from recurring weaknesses in evidence, answer structure, commitments and evaluator signposting.',
      'The findings become a practical improvement plan with example rewrites, evidence actions, owners and material suitable for the future answer bank.',
    ],
    improvements: [
      'A short score and buyer comment becomes a traceable explanation of what the answer covered, what remained unclear and what should change next time.',
      'General disappointment becomes a prioritised set of writing, evidence and operational actions that leadership can assign and review.',
      'Feedback no longer sits in a file. Useful learning is converted into reusable case examples, evidence prompts and stronger answer material.',
    ],
  },
  'tender-readiness-audit': {
    processOutputs: [
      'We define the commissioners, services, contract types and likely participation conditions the organisation is preparing to pursue.',
      'You receive an evidence inventory showing what already exists, what needs organising, what can be strengthened and what can only be built through genuine delivery.',
      'The final readiness plan ranks actions by tender risk and lead time, with named owners, dependencies and a clear explanation of any material constraint.',
    ],
    improvements: [
      'A general policy folder becomes an evidence library organised around the questions and conditions used in the provider’s target procurements.',
      'Scattered responsibility becomes a visible action plan across operations, quality, HR and finance, with ownership agreed before a deadline begins.',
      'Gaps are discovered early enough to resolve responsibly, rather than being hidden by rushed writing after the tender has gone live.',
    ],
  },
  'tender-training': {
    processOutputs: [
      'We identify the exact points where qualification, evidence gathering, drafting or review currently breaks down and tailor the learning to each participant’s role.',
      'Participants work with relevant buyer documents and provider evidence to practise requirement mapping, answer planning, proof selection and scoring review.',
      'The team leaves with an agreed method, reusable prompts, review questions and clear responsibilities that can be applied to the next real procurement.',
    ],
    improvements: [
      'Individual writing habits become one shared process that operational contributors, bid leads and reviewers can follow consistently.',
      'Generic theory becomes practical judgement developed through the same documents, constraints and evidence choices the team faces in live tenders.',
      'Review meetings use consistent questions about compliance, delivery, ownership and proof, instead of relying on one person’s undocumented instinct.',
    ],
  },
  'mobilisation-support': {
    processOutputs: [
      'You receive a commitment register covering the promises, milestones, dependencies and reporting duties contained in the winning response and buyer documents.',
      'Every material action is assigned an owner, due date, evidence requirement, dependency and escalation route agreed with the people responsible for delivery.',
      'A review rhythm tracks progress against the buyer’s actual timetable and produces the evidence needed for mobilisation meetings and service commencement.',
    ],
    improvements: [
      'Promises made in the tender become visible operational actions, so recruitment, training, systems and governance commitments are not lost after award.',
      'Work owned across several teams is brought into one controlled record that makes dependencies, delays and escalation decisions visible.',
      'Buyer updates are supported by planned records and review points, rather than assembled at the last minute from inconsistent information.',
    ],
  },
  'tender-retainer': {
    processOutputs: [
      'We agree the target buyers, services, geography, qualification rules, internal responsibilities and realistic specialist capacity for the period.',
      'Your evidence base is maintained between deadlines by capturing outcomes, case examples, buyer feedback, operational changes and reusable approved material.',
      'When a relevant opportunity appears, the agreed qualification, writing, review or coaching support is activated with a clear scope and ownership record.',
    ],
    improvements: [
      'Separate deadlines become a managed tender programme connected to the organisation’s services, capacity and realistic growth priorities.',
      'Teams stop searching repeatedly for the same proof because approved evidence, feedback and examples are maintained between procurements.',
      'Opportunities are qualified consistently before capacity is reserved, reducing reactive bidding and protecting leadership time for contracts that fit.',
    ],
  },
}

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
  const pageDetail = SERVICE_PAGE_DETAILS[slug]

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
                <div className="ep-method-grid__output">
                  <small>What you receive at this stage</small>
                  <p>{pageDetail?.processOutputs[index] || service.delivers[index] || service.delivers[0]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-service-change">
        <div className="ep-shell ep-service-change__grid">
          <div>
            <p className="ep-kicker">The practical change</p>
            <h2>What changes for your team and your next submission.</h2>
            <p className="ep-service-change__intro">These are practical working changes, not abstract labels. Each one explains what becomes clearer, more controlled or easier to evidence after the engagement.</p>
            <ul className="ep-service-change__problems">
              {service.solves.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="ep-transform-list">
            {service.transforms.map((item, index) => (
              <article key={item.from}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>Practical improvement</small>
                  <h3>{item.to}</h3>
                  <p>{pageDetail?.improvements[index] || `${item.from} is replaced by ${item.to.toLowerCase()}, supported by a clear record the client can use.`}</p>
                  <aside><b>Starting issue</b> {item.from}</aside>
                </div>
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
