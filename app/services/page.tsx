import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | TenderLab — Eight Services Across the Tendering Lifecycle',
  description:
    'TenderLab services across the UK health and social care tendering lifecycle. Bid Writing, Pre-Submission Review, Lost Bid Debrief, Tender Readiness Audit, Bid Team Coaching, Pipeline Tracking, Mobilisation Support, Tender Retainer.',
}

const SERVICES = [
  {
    id: 'bid-writing',
    title: 'Bid Writing',
    desc: 'End-to-end tender writing for UK health and social care contracts.',
    whenUsed: 'When the tender drops and there is no internal capacity to write it.',
    href: '/services/bid-writing',
  },
  {
    id: 'pre-submission-review',
    title: 'Pre-Submission Review',
    desc: 'Forensic scoring of a completed draft against the published evaluation criteria.',
    whenUsed: 'Final draft complete, one to two weeks before submission.',
    href: '/services/pre-submission-review',
  },
  {
    id: 'lost-bid-debrief',
    title: 'Lost Bid Debrief',
    desc: 'Structured post-loss analysis that turns a loss into reusable content.',
    whenUsed: 'Within 30 days of the award notice, while feedback is still accessible.',
    href: '/services/lost-bid-debrief',
  },
  {
    id: 'tender-readiness-audit',
    title: 'Tender Readiness Audit',
    desc: 'Diagnostic for providers preparing to enter the tender market or to step up to larger frameworks.',
    whenUsed: '90 to 180 days before the first target tender drops.',
    href: '/services/tender-readiness-audit',
  },
  {
    id: 'bid-team-coaching',
    title: 'Bid Team Coaching',
    desc: 'In-house capability build for providers with an internal bid writer or bid team.',
    whenUsed: 'When the internal team is writing its own bids but scoring inconsistently.',
    href: '/services/bid-team-coaching',
  },
  {
    id: 'pipeline-tracking',
    title: 'Pipeline Tracking',
    desc: "Weekly feed of relevant opportunities scored against the provider's service scope, geography and capacity.",
    whenUsed: 'When the provider is ready to bid consistently but cannot monitor every portal every day.',
    href: '/services/pipeline-tracking',
  },
  {
    id: 'mobilisation-support',
    title: 'Mobilisation Support',
    desc: 'Post-award delivery from contract award through to the first 90 days of live service.',
    whenUsed: 'From the moment the award notice arrives, through the first 90 days of live delivery.',
    href: '/services/mobilisation-support',
  },
  {
    id: 'tender-retainer',
    title: 'Tender Retainer',
    desc: 'Monthly engagement bundling Pipeline Tracking, two Pre-Submission Reviews and priority access to Bid Writing.',
    whenUsed: "When tender income is central to the provider's growth plan.",
    href: '/services/tender-retainer',
  },
]

export default function ServicesPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="svc-hero">
        <div className="container">
          <div className="svc-hero__kicker">Services · UK Health and Social Care</div>
          <h1 className="svc-hero__title">Eight services across the tendering lifecycle.</h1>
          <p className="svc-hero__lede">From spec-to-submission writing through pre-submission review, lost-bid debrief and mobilisation.</p>
          <p className="svc-hero__sub">Each service is structured around when to use it, what you receive, and the outcome it delivers. No padding, no narrative.</p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="svc-grid-section">
        <div className="container">
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <Link key={s.id} href={s.href} className="svc-router-card">
                <div className="svc-router-card__accent" />
                <div className="svc-router-card__tag">Service</div>
                <h3 className="svc-router-card__title">{s.title}</h3>
                <p className="svc-router-card__desc">{s.desc}</p>
                <div className="svc-router-card__when"><strong>When used:</strong> {s.whenUsed}</div>
                <div className="svc-router-card__cta">View service →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
