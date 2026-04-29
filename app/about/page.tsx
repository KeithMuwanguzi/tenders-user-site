import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | TenderLab — Health & Social Care Tender Specialists',
  description:
    'TenderLab is a specialist tender writing consultancy built exclusively for UK health and social care providers. Evidence-led, rubric-aligned, results-focused.',
}

const WP = 'https://tenderlab.co.uk/wp-content/uploads/elementor/thumbs'

const APPROACH = [
  {
    title: 'Rubric-First Methodology',
    desc: 'Every response is built against the scoring rubric before a word is written. We extract every criterion, weight it, and map your evidence to it precisely.',
    img: `${WP}/mature-person-college-campus-study-area-writing-notes-ideas_482257-122475-1-rlxsw0xj5uov2nobza9nq3rjnjyvq9lmnhk2isxyuk.jpg`,
  },
  {
    title: 'Evaluator Psychology',
    desc: 'We understand how evaluators read and mark responses — what triggers high scores, what flags as generic, and how to write for the person holding the pen.',
    img: `${WP}/business-team-situation-present-share-idea-scaled-rlxsy44mcljsvgn3s6rt9ksf6do8u1w5ltqwwxuh0s.jpg`,
  },
  {
    title: 'Evidence Engineering',
    desc: 'We do not just suggest you include evidence — we identify the exact evidence, calibrate it to the criterion, and position it where it scores maximum marks.',
    img: `${WP}/two-men-discussing-contract-desk_31965-128846-rlxnbi11686q9ey6wluvspfhgcbxmtj32zb0tq9i98.jpg`,
  },
  {
    title: 'Sector Deep Knowledge',
    desc: 'We speak care sector language. We understand commissioning priorities, evaluation culture, and what different councils genuinely value in a provider.',
    img: `${WP}/two-colleagues-working-together-office-color-background-corporate-business-colleagues-working_265223-44392-rlxnlsdfyy9pbs08u1xw33z3i5mjvkdbtwcbwr0e5o.jpg`,
  },
  {
    title: 'Data-Driven Optimisation',
    desc: 'Our scoring intelligence is built from 200+ submissions and real evaluator feedback. Every decision is informed by data on what wins, not guesswork.',
    img: `${WP}/two-businessman-discussing-their-chart-coffee-shop-scaled-rlecdsy90wugu6jsokixzu2529dg8b0bgvnlvg92uk.jpg`,
  },
  {
    title: 'Collaboration, Not Outsourcing',
    desc: 'We work as an extension of your team — not a detached supplier. Your knowledge, our structure. The result is a response that is authentically yours and strategically precise.',
    img: `${WP}/team-architects-working-town-project-conference-room-architect-business-suit_482257-26513-rlech3dwy1clh1rrgzpxq067wt5p662hx5uscbdh2k.jpg`,
  },
]

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Evidence-Led',
    desc: 'Every claim we make is backed by data. No assertions. No marketing fluff. Just evidence that evaluators reward.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Rubric-Aligned',
    desc: 'We work to the rubric, not around it. We decode evaluation criteria and engineer responses that score against them directly.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Sector-Specialist',
    desc: 'We speak care sector language. We understand priorities, evaluation culture, and what different councils value.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Results-Focused',
    desc: 'Success means winning contracts and building your pipeline. We measure ourselves by your wins, not our effort.',
  },
]

export default function AboutPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="TenderLab team"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="page-hero__title">About</h1>
          <p className="page-hero__sub">Specialist tender writing built exclusively for UK health and social care.</p>
        </div>
      </section>

      {/* ── Intro split ── */}
      <section className="about-intro">
        <div className="container">
          <div className="about-intro__grid">

            <div className="about-intro__left">
              <p className="section-label">About Us</p>
              <h2 className="about-intro__headline">
                Winning Contracts with<br />Evidence-Led Precision.
              </h2>
              <p className="about-intro__body">
                TenderLab was built by people who have sat on both sides of the evaluation table. We have written submissions that scored 10 out of 10 and we have marked responses that scored 2. That dual perspective is the foundation of everything we do — and the reason our clients win at a rate that no generalist consultancy can match.
              </p>

              <div className="about-score">
                <div className="about-score__ring">
                  <svg viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeWidth="6"/>
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--heritage-red)" strokeWidth="6"
                      strokeDasharray="213.6" strokeDashoffset="17" strokeLinecap="round"
                      transform="rotate(-90 40 40)"/>
                  </svg>
                  <span className="about-score__num">92<small>%</small></span>
                </div>
                <div>
                  <strong className="about-score__label">Success Score</strong>
                  <p className="about-score__sub">Win rate across all submitted tenders in the last 24 months.</p>
                </div>
              </div>

              <h3 className="about-intro__sub-heading">Reliable support you can count on.</h3>
              <p className="about-intro__body">
                We are available throughout every stage of your tender — from the moment you receive the ITT to the moment you press submit. Our clients do not chase us for updates. We come to them.
              </p>
            </div>

            <div className="about-intro__right">
              <div className="about-feature-card">
                <div className="about-feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h4>Skilled team for your growth.</h4>
                <p>Our writers hold backgrounds in care management, commissioning, and procurement — not just copywriting. We know the sector from the inside.</p>
              </div>
              <div className="about-feature-card">
                <div className="about-feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h4>Evaluator-trained writers with care sector expertise.</h4>
                <p>Every member of our team has undergone evaluator training. We do not guess what scores — we know, because we have done it.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="about-approach">
        <div className="container">
          <p className="section-label">Our Approach</p>
          <h2 className="about-approach__heading">Our Approach</h2>
          <div className="about-approach__grid">
            {APPROACH.map((a) => (
              <article key={a.title} className="approach-card">
                <div className="approach-card__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.img} alt={a.title} loading="lazy" />
                </div>
                <div className="approach-card__body">
                  <h3 className="approach-card__title">{a.title}</h3>
                  <p className="approach-card__desc">{a.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Values ── */}
      <section className="about-values">
        <div className="container">
          <p className="section-label">Values</p>
          <h2 className="about-values__heading">Company Values</h2>
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <div className="value-card__body">
                  <h3 className="value-card__title">{v.title}</h3>
                  <p className="value-card__desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Work With Us</p>
          <h2 className="services-cta__headline">Ready to Win Your Next Tender?</h2>
          <p className="services-cta__sub">
            Talk to our team today for a free, no-obligation consultation. We&apos;ll tell you honestly what&apos;s possible.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Get a Free Consultation</Link>
            <Link href="/process" className="btn btn-outline-white">See Our Process</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
