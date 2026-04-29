import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Children's Services Tenders | TenderLab",
  description:
    "Specialist tender writing for children's services contracts — residential, fostering, early intervention, family support, and child protection frameworks.",
}

const DELIVERS = [
  "Specification analysis aligned to children's services evaluation criteria",
  'Safeguarding evidence framework mapped to Working Together 2023 requirements',
  'Ofsted-aligned quality assurance narrative and inspection readiness evidence',
  'Named designated safeguarding leads and clinical/therapeutic staff profiles',
  'Outcomes evidence from current children\'s service delivery',
  'Compliance with Children Act 1989, Children Act 2004, and relevant statutory guidance',
]

const SUB_SETTINGS = [
  {
    id: 'care-home-accommodation',
    title: 'Care Home Accommodation',
    desc: 'Residential care home submissions for children require Ofsted-aligned quality evidence, named registered managers, and therapeutic environment descriptions. We build responses that demonstrate your home\'s capacity to deliver against the inspection framework.',
  },
  {
    id: 'supported-accommodation',
    title: 'Supported Accommodation',
    desc: 'Supported accommodation for young people demands evidence of key worker relationships, pathway planning, and move-on outcomes. We structure your response around the transition to independence evidence commissioners need to see.',
  },
  {
    id: 'temporary-accommodation',
    title: 'Temporary Accommodation',
    desc: 'Temporary accommodation submissions require rapid access evidence, crisis management protocols, and clear pathway planning. We evidence your response infrastructure and move-on outcomes in the language commissioners score.',
  },
  {
    id: 'emergency-accommodation',
    title: 'Emergency Accommodation',
    desc: 'Emergency accommodation tenders are evaluated on response times, safeguarding integration, and crisis support capacity. We ensure your safeguarding protocols and emergency response model are presented with operational specificity.',
  },
  {
    id: 'supported-living',
    title: 'Supported Living',
    desc: 'Supported living for young people and care leavers requires evidence of tenancy sustainment, independence skill development, and multi-agency working. We build submissions around your key worker model and measurable independence outcomes.',
  },
]

const WHY_MATTERS = [
  {
    title: 'Safeguarding is the Threshold',
    desc: "In children's services, safeguarding is not a section of the tender — it is the foundation of every section. Evaluators look for evidence of embedded safeguarding culture, not bolted-on policy statements.",
  },
  {
    title: 'Ofsted Alignment is Assumed',
    desc: "Commissioners assume you understand Ofsted inspection frameworks. Your response must demonstrate how your practice reflects the standards inspectors measure — even when Ofsted is not mentioned in the specification.",
  },
  {
    title: 'Relationship and Stability Evidence',
    desc: "Children's services commissioners are acutely sensitive to placement stability, therapeutic relationships, and child-centred planning. These must be evidenced with real examples, not described in principle.",
  },
  {
    title: 'Statutory Compliance is Non-Negotiable',
    desc: "Children Act requirements, Working Together guidance, local threshold documents, and Multi-Agency Safeguarding Hub protocols must all be referenced and evidenced in your response.",
  },
]

export default function ChildrensServicesPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="Children's Services tender writing"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-hero__breadcrumb">
            <Link href="/care-settings">Care Settings</Link> / Children&apos;s Services
          </p>
          <h1 className="page-hero__title">Children&apos;s Services</h1>
          <p className="page-hero__sub">Safeguarding-led, outcomes-evidenced tender responses built for commissioners who know exactly what good looks like.</p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="cs-detail-body">
        <div className="container">
          <div className="cs-detail-body__layout">

            <div className="cs-detail-body__copy">
              <p className="cs-detail-body__lead">
                Children&apos;s services commissioning sits within the highest-scrutiny environment in health and social care procurement. Local authorities procure residential placements, fostering support, early intervention programmes, family support services, and child protection frameworks — each with distinct evaluation priorities and statutory compliance expectations that generic bid writing consistently fails to address.
              </p>
              <p>
                TenderLab&apos;s children&apos;s services tender writing is built on an understanding of how children&apos;s social care commissioners think, what Ofsted-aligned evaluators prioritise, and how to translate your organisation&apos;s genuine practice into evidence that scores at the highest level. We do not produce responses that describe safeguarding in general terms. We produce responses that demonstrate your safeguarding culture through named systems, named leads, named case examples, and measurable outcomes that commissioners can verify.
              </p>
              <p>
                Our team understands the difference between a children&apos;s residential framework and a fostering support contract, between an early help service and a child protection intervention. Each has its own commissioning culture, its own evaluation emphasis, and its own evidence requirements. We write for each one specifically — not from a template, but from genuine sector knowledge applied to your organisation&apos;s evidence base.
              </p>
              <p>
                Whether you are tendering for a DPS placement framework, a spot purchase arrangement, a block contract, or a new service development opportunity, TenderLab brings the same rigorous, rubric-first methodology — adapted to the specific statutory and operational requirements of children&apos;s services commissioning in your target authority.
              </p>

              <h2 className="cs-detail-body__subheading">Why Children&apos;s Services Tenders Require Specialist Support</h2>
              <div className="cs-why-grid">
                {WHY_MATTERS.map((w) => (
                  <div key={w.title} className="cs-why-card">
                    <h3 className="cs-why-card__title">{w.title}</h3>
                    <p className="cs-why-card__desc">{w.desc}</p>
                  </div>
                ))}
              </div>

              <h2 className="cs-detail-body__subheading" style={{ marginTop: 16 }}>Care Areas Within Children&apos;s Services</h2>
              <p style={{ fontSize: 15, color: 'var(--slate)', lineHeight: 1.7, marginBottom: 8, maxWidth: 'none' }}>
                Children&apos;s services encompasses a range of distinct provision types, each with its own evaluation emphasis. Select a setting below to see how TenderLab approaches it.
              </p>
              <div className="cs-sub-grid">
                {SUB_SETTINGS.map((s) => (
                  <div key={s.id} id={s.id} className="cs-sub-card">
                    <h3 className="cs-sub-card__title">{s.title}</h3>
                    <p className="cs-sub-card__desc">{s.desc}</p>
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Children&apos;s Services</p>
          <h2 className="services-cta__headline">Ready to Win Your Next Children&apos;s Services Contract?</h2>
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
