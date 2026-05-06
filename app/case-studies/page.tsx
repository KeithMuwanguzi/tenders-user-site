import type { Metadata } from 'next'
import Link from 'next/link'
import CaseStudiesGrid from './CaseStudiesGrid'

export const metadata: Metadata = {
  title: 'Case Studies | TenderLab',
  description:
    'From no prior experience to awarded contracts across UK health and social care. Real case studies with verified award letters. Filter by care setting, council, and contract type.',
}

const STATS = [
  { n: '92%',  label: 'Win rate across submissions' },
  { n: '200+', label: 'Tender submissions completed' },
  { n: '25+',  label: 'Lots awarded across these cases' },
  { n: '10',   label: 'Case studies with award letters' },
]

export default function CaseStudiesPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="cs-hero">
        <div className="container">
          <div className="cs-hero__inner">

            <div className="cs-hero__left">
              <p className="cs-hero__kicker">
                <span className="cs-hero__kicker-dot" />
                Verified outcomes
              </p>
              <h1 className="cs-hero__headline">
                From no prior experience to awarded contracts.
              </h1>
              <p className="cs-hero__sub">
                Each case study follows a provider from entry barrier to award letter.
                Find the scenario closest to yours — then contact us.
              </p>
              <div className="cs-hero__actions">
                <Link href="/contact" className="btn btn-white">
                  Talk to us about your tender
                </Link>
                <Link href="#case-studies" className="cs-hero__scroll">
                  Browse case studies
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Intent paths */}
              <div className="cs-paths">
                <Link href="#case-studies" className="cs-path">
                  <span className="cs-path__num">Path 01</span>
                  <h3 className="cs-path__h">I&apos;m new to tenders</h3>
                  <p className="cs-path__p">Operationally strong, procurement-thin. See how first-time bidders entered.</p>
                </Link>
                <Link href="#case-studies" className="cs-path">
                  <span className="cs-path__num">Path 02</span>
                  <h3 className="cs-path__h">I&apos;ve failed previous bids</h3>
                  <p className="cs-path__p">Procedural recoveries that turned a Tier 1 miss into multi-lot wins.</p>
                </Link>
                <Link href="#case-studies" className="cs-path">
                  <span className="cs-path__num">Path 03</span>
                  <h3 className="cs-path__h">I want to scale into new councils</h3>
                  <p className="cs-path__p">Single backbone evidence packs that secured multi-lot expansion.</p>
                </Link>
              </div>
            </div>

            <div className="cs-hero__right">
              {STATS.map(s => (
                <div key={s.n} className="cs-stat">
                  <span className="cs-stat__n">{s.n}</span>
                  <span className="cs-stat__label">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Decorative grid lines */}
        <div className="cs-hero__grid" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="cs-hero__grid-line" />
          ))}
        </div>
      </section>

      {/* ── Filterable grid + intent strip ── */}
      <div id="case-studies">
        <CaseStudiesGrid />
      </div>

      {/* ── Bottom CTA ── */}
      <section className="cs-bottom-cta">
        <div className="container">
          <div className="cs-bottom-cta__panel">
            <div className="cs-bottom-cta__left">
              <p className="cs-bottom-cta__kicker">Ready to be the next case study?</p>
              <h2 className="cs-bottom-cta__headline">
                Tell us where you&apos;re starting from.
              </h2>
              <p className="cs-bottom-cta__body">
                We work from your current position — whether that&apos;s a first-time entry,
                a failed submission, or a new council you&apos;ve never bid into.
                No generic approach. Every engagement is built around your specific procurement.
              </p>
              <div className="cs-bottom-cta__actions">
                <Link href="/contact" className="btn btn-white">
                  Book a free consultation
                </Link>
                <Link href="/services" className="cs-bottom-cta__link">
                  See all services →
                </Link>
              </div>
            </div>
            <div className="cs-bottom-cta__right" aria-hidden="true">
              <div className="cs-bottom-cta__badge">
                <span className="cs-bottom-cta__badge-n">92%</span>
                <span className="cs-bottom-cta__badge-label">Win rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
