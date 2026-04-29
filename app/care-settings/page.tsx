import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Care Settings | TenderLab — Tender Support Across Every Care Environment',
  description:
    'TenderLab provides specialist tender writing and bid support across every health and social care setting — from domiciliary care to children\'s services.',
}

const WP = 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs'

type HexItem = { title: string; desc: string; red: boolean; href?: string }
type HexRow = { offset: boolean; items: HexItem[] }

const HEX_ROWS: HexRow[] = [
  {
    offset: false,
    items: [
      {
        title: 'Health and Social Care',
        desc: 'Integrated health and social care services with complex compliance requirements and multi-agency coordination.',
        red: false,
        href: '/care-settings/health-social-care',
      },
      {
        title: "Children's Services",
        desc: 'Safeguarding-focused services including early intervention, family support, and child protection.',
        red: true,
        href: '/care-settings/childrens-services',
      },
      {
        title: 'Domiciliary Care',
        desc: 'In-home personal care with focus on independence, dignity, and individual outcome achievement.',
        red: false,
      },
    ],
  },
  {
    offset: true,
    items: [
      {
        title: 'Day Services',
        desc: 'Day-based activities, learning, and social engagement for adults with complex needs.',
        red: true,
      },
      {
        title: 'Extra Care Services',
        desc: 'Integrated housing and care for older adults with emphasis on independence and community integration.',
        red: false,
      },
      {
        title: 'Live-In Care Services',
        desc: '24/7 residential care in client homes with focus on person-centred planning and specialist support.',
        red: true,
      },
    ],
  },
  {
    offset: false,
    items: [
      {
        title: 'Housing Support',
        desc: 'Tenancy support and housing-related support helping people maintain independent housing.',
        red: false,
      },
      {
        title: 'Reablement Services',
        desc: 'Time-limited, goal-focused services restoring independence and reducing ongoing support needs.',
        red: true,
      },
      {
        title: 'Nursing Care',
        desc: 'Registered nurse-led services with clinical governance and complex health needs management.',
        red: false,
      },
    ],
  },
  {
    offset: true,
    items: [
      {
        title: 'Residential Care',
        desc: 'Care home accommodation with focus on quality of life, dignity, and person-centred care.',
        red: true,
      },
      {
        title: 'Shared Lives',
        desc: 'Family-based care with strong emphasis on relationships, integration, and ordinary living.',
        red: false,
      },
      {
        title: 'Short Breaks (Respite Care)',
        desc: 'Planned breaks for carers with focus on quality experience for service users.',
        red: true,
      },
    ],
  },
  {
    offset: false,
    items: [
      {
        title: 'Care Home Accommodation',
        desc: 'Residential care homes including specialist provision for dementia and complex needs.',
        red: false,
      },
      {
        title: 'Supported Living',
        desc: 'Person-centred support in independent or community-based accommodation.',
        red: true,
      },
      {
        title: 'Supported Accommodation',
        desc: 'Accommodation with integrated support for people with complex or multiple needs.',
        red: false,
      },
    ],
  },
  {
    offset: true,
    items: [
      {
        title: 'Emergency Accommodation',
        desc: 'Immediate emergency housing with rapid access and crisis support integration.',
        red: true,
      },
      {
        title: 'Temporary Accommodation',
        desc: 'Time-limited housing with focus on moving toward permanent solutions.',
        red: false,
      },
    ],
  },
]

export default function CareSettingsPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="Care settings tender support"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="page-hero__title">Care Settings</h1>
          <p className="page-hero__sub">Tailored tender support across every health and social care environment.</p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="cs-intro">
        <div className="container">
          <div className="cs-intro__grid">
            <div className="cs-intro__left">
              <p className="section-label">Care Settings</p>
              <h2 className="cs-intro__headline">Tailored Tender Support Across Every Care Environment</h2>
              <p className="cs-intro__body">
                Different care settings require different approaches and evaluators expect you to understand the difference. A domiciliary care tender is not a supported living tender. A children&apos;s services bid is not a nursing care submission. Generic responses fail because commissioners can tell when a provider does not truly understand the environment they are bidding for.
              </p>
              <p className="cs-intro__body">
                TenderLab writes sector-specific responses. We understand the commissioning priorities, the safeguarding requirements, the outcome frameworks, and the language evaluators respond to in each care setting we cover.
              </p>
            </div>
            <div className="cs-intro__right">
              <h3 className="cs-intro__right-heading">Our Expertise Across Care Settings</h3>
              <p className="cs-intro__body">
                Our team holds direct experience across the full range of health and social care procurement routes. We have written winning submissions for local authority frameworks, NHS contracts, Dynamic Purchasing Systems, and spot purchase arrangements — across every care setting listed below.
              </p>
              <p className="cs-intro__body">
                Whether you are tendering for a single service or building a multi-lot portfolio, we apply the same rigorous, rubric-first methodology to every submission — adapted to the specific evaluation culture of the setting you are targeting.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: 8 }}>
                Discuss Your Setting
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hexagon grid ── */}
      <section className="cs-hex-section">
        <div className="cs-hex-outer">
          {HEX_ROWS.map((row, ri) => (
            <div key={ri} className={`cs-hex-row${row.offset ? ' cs-hex-row--offset' : ''}`}>
              {row.items.map((item) =>
                item.href ? (
                  <Link key={item.title} href={item.href} className={`cs-hex${item.red ? ' cs-hex--red' : ''}`}>
                    <strong className="cs-hex__title">{item.title}</strong>
                    <p className="cs-hex__desc">{item.desc}</p>
                  </Link>
                ) : (
                  <div key={item.title} className={`cs-hex${item.red ? ' cs-hex--red' : ''}`}>
                    <strong className="cs-hex__title">{item.title}</strong>
                    <p className="cs-hex__desc">{item.desc}</p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Empowering section ── */}
      <section className="cs-empower">
        <div className="container">
          <div className="cs-empower__grid">

            {/* Left: photo stack + stat */}
            <div className="cs-empower__photos">
              <div className="cs-empower__photo-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${WP}/two-men-discussing-contract-desk_31965-128846-rlxnbi11686q9ey6wluvspfhgcbxmtj32zb0tq9i98.jpg`} alt="Consulting" />
              </div>
              <div className="cs-empower__photo-bottom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${WP}/mature-person-college-campus-study-area-writing-notes-ideas_482257-122475-1-rlxsw0xj5uov2nobza9nq3rjnjyvq9lmnhk2isxyuk.jpg`} alt="Bid writing" />
              </div>
              <div className="cs-empower__stat-card">
                <span className="cs-empower__stat-label">Success Score</span>
                <div className="cs-empower__stat-ring">
                  <svg viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeWidth="6"/>
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--heritage-red)" strokeWidth="6"
                      strokeDasharray="213.6" strokeDashoffset="17" strokeLinecap="round"
                      transform="rotate(-90 40 40)"/>
                  </svg>
                  <span className="cs-empower__stat-num">92<small>%</small></span>
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div className="cs-empower__copy">
              <p className="section-label">Expert Care Consulting</p>
              <h2 className="cs-empower__headline">
                Empowering Care Providers to Win Big.
              </h2>
              <p className="cs-empower__sub">
                We bridge the gap between operational excellence and winning tender submissions with data-driven strategies.
              </p>

              <div className="cs-empower__points">
                <div className="cs-empower__point">
                  <div className="cs-empower__point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Strategic Intelligence</strong>
                    <p>Turning complex requirements into high-scoring bids.</p>
                  </div>
                </div>
                <div className="cs-empower__point">
                  <div className="cs-empower__point-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Proven Methodology</strong>
                    <p>Aligning your services with the latest evaluator standards.</p>
                  </div>
                </div>
              </div>

              <Link href="/process" className="cs-empower__btn">
                Learn Our Strategy
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </Link>
            </div>

            {/* Floating badge */}
            <div className="cs-empower__badge">
              <div className="cs-empower__badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <strong>Industry-Leading Success</strong>
              <p>Unlocking sustainable growth through precision and expertise.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Get Started</p>
          <h2 className="services-cta__headline">Ready to Win in Your Care Setting?</h2>
          <p className="services-cta__sub">
            Tell us which setting you&apos;re targeting and we&apos;ll show you exactly how we approach it.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Book a Free Consultation</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
