import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Health & Social Care Tenders | TenderLab',
  description:
    'Specialist tender writing for integrated health and social care contracts. TenderLab understands the commissioning landscape, compliance requirements, and what evaluators reward.',
}

const DELIVERS = [
  'Specification analysis aligned to health and social care evaluation criteria',
  'Compliance mapping against CQC, NHS, and local authority requirements',
  'Integrated care pathway evidence and multi-agency coordination narrative',
  'Outcomes framework alignment — from NHS Long Term Plan to local JSNA priorities',
  'Named clinical and operational leads embedded in every response',
  'Quality gate review before submission',
]

const WHY_MATTERS = [
  {
    title: 'Complex Commissioning Landscape',
    desc: 'Health and social care procurement spans NHS England, ICBs, local authorities, and joint commissioning arrangements. We navigate each route and tailor your response accordingly.',
  },
  {
    title: 'Integration is Expected',
    desc: 'Commissioners increasingly require evidence of joined-up working — with GPs, hospitals, social workers, and voluntary sector partners. Generic responses that ignore integration score poorly.',
  },
  {
    title: 'Outcomes Evidence is Non-Negotiable',
    desc: 'Health and social care evaluators expect measurable outcomes tied to NHS frameworks. Vague claims about person-centred care are not enough. Named outcomes, named individuals, named pathways.',
  },
  {
    title: 'Safeguarding and Compliance',
    desc: 'Every response must demonstrate current safeguarding practice, CQC compliance infrastructure, and robust clinical governance. We ensure nothing is omitted and everything is evidenced.',
  },
]

export default function HealthSocialCarePage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="Health and Social Care tender writing"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-hero__breadcrumb">
            <Link href="/care-settings">Care Settings</Link> / Health &amp; Social Care
          </p>
          <h1 className="page-hero__title">Health &amp; Social Care</h1>
          <p className="page-hero__sub">Winning integrated health and social care contracts requires more than good writing. It requires knowing exactly what commissioners measure.</p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="cs-detail-body">
        <div className="container">
          <div className="cs-detail-body__layout">

            <div className="cs-detail-body__copy">
              <p className="cs-detail-body__lead">
                Commissioning bodies procure integrated health and social care services through some of the most complex procurement exercises in UK public sector tendering. Multi-agency requirements, clinical governance expectations, NHS outcomes frameworks, and CQC compliance standards all intersect in a single submission — and evaluators know immediately when a response does not reflect genuine operational understanding of the environment.
              </p>
              <p>
                TenderLab&apos;s health and social care tender writing is built on direct knowledge of how integrated care is commissioned, what NHS England and ICB evaluators prioritise, and how local authority joint commissioning bodies score responses. We do not apply a generic bid writing template to a health and social care opportunity. We decode the specific commissioning framework, identify what this commissioner values most, and build your response around evidence that speaks directly to those priorities.
              </p>
              <p>
                Our responses demonstrate operational integration — the named pathways, the referral mechanisms, the multi-disciplinary working arrangements, and the outcome data that commissioners need to see before they award a contract. We write for evaluators who have spent years commissioning health and social care, and who can identify vague claims from genuine operational capability in seconds.
              </p>
              <p>
                Whether you are tendering for an NHS-funded community health service, a jointly commissioned older people&apos;s care framework, a complex needs lot, or a reablement contract, TenderLab applies the same rigorous, evidence-led methodology — calibrated to the specific requirements of your target commissioner.
              </p>

              <h2 className="cs-detail-body__subheading">Why Health &amp; Social Care Tenders Require Specialist Support</h2>
              <div className="cs-why-grid">
                {WHY_MATTERS.map((w) => (
                  <div key={w.title} className="cs-why-card">
                    <h3 className="cs-why-card__title">{w.title}</h3>
                    <p className="cs-why-card__desc">{w.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Sidebar */}
            <aside className="cs-detail-body__sidebar">
              <div className="svc-delivers">
                <h3 className="svc-delivers__heading">What We Deliver</h3>
                <ul className="svc-delivers__list">
                  {DELIVERS.map((item) => (
                    <li key={item} className="svc-delivers__item">
                      <span className="svc-delivers__tick" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.12"/>
                          <path d="M4.5 8l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="svc-delivers__cta">
                  <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Get a Free Consultation
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </Link>
                  <Link href="/care-settings" className="svc-delivers__back">← All Care Settings</Link>
                </div>
              </div>
            </aside>

          </div>

          {/* Care Areas — full-width below the sidebar grid */}
          <div className="cs-care-areas">
            <h2 className="cs-detail-body__subheading">Care Areas Within Health &amp; Social Care</h2>
            <p style={{ fontSize: 15, color: 'var(--slate)', lineHeight: 1.7, marginBottom: 24, maxWidth: 'none' }}>
              Each care area within the health and social care sector has its own commissioning culture and evaluation priorities. Select a setting below to explore how TenderLab approaches it.
            </p>
            <div className="cs-sub-grid">
              {[
                { slug: 'domiciliary-care',      title: 'Domiciliary Care',         desc: 'In-home personal care frameworks require evidence of person-centred planning, independence-focused outcomes, and robust staffing models.' },
                { slug: 'shared-lives',           title: 'Shared Lives',             desc: 'Shared Lives commissioning values relationship quality, matching processes, and carer support infrastructure.' },
                { slug: 'residential-care',       title: 'Residential Care',         desc: 'Residential care tenders demand CQC compliance evidence, quality-of-life outcome data, and named clinical governance leads.' },
                { slug: 'nursing-care',           title: 'Nursing Care',             desc: 'Nursing care submissions must demonstrate clinical governance infrastructure, registered nurse deployment models, and complex health needs management.' },
                { slug: 'extra-care-services',    title: 'Extra Care Services',      desc: 'Extra care commissioning requires evidence of integrated housing and care delivery, independence outcomes, and community integration.' },
                { slug: 'reablement-services',    title: 'Reablement Services',      desc: 'Reablement tenders are outcomes-intensive. Commissioners expect measurable independence goals, timeframes, and reduction-in-care-need data.' },
                { slug: 'day-services',           title: 'Day Services',             desc: 'Day services commissioning prioritises meaningful activity, social engagement outcomes, and complex needs management.' },
                { slug: 'live-in-care-services',  title: 'Live-In Care Services',    desc: '24/7 live-in care submissions require evidence of carer-matching processes, person-centred planning, and risk management.' },
                { slug: 'short-breaks',           title: 'Short Breaks',             desc: 'Short breaks tenders focus on carer experience, service user wellbeing, and flexibility of provision.' },
                { slug: 'housing-support',        title: 'Housing Support',          desc: 'Housing support commissioning demands tenancy sustainment outcome data, multi-agency working evidence, and prevention-focused approaches.' },
              ].map((s) => (
                <Link key={s.slug} href={`/care-settings/health-social-care/${s.slug}`} className="cs-sub-card">
                  <h3 className="cs-sub-card__title">{s.title}</h3>
                  <p className="cs-sub-card__desc">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Health &amp; Social Care</p>
          <h2 className="services-cta__headline">Ready to Win Your Next Health &amp; Social Care Contract?</h2>
          <p className="services-cta__sub">
            Book a free consultation and we&apos;ll assess your next opportunity, the commissioning landscape, and what it takes to win.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Call</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
