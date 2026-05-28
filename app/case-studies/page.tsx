import type { Metadata } from 'next'
import Link from 'next/link'
import CaseStudiesGrid from './CaseStudiesGrid'

export const metadata: Metadata = {
  title: 'Tender Writing Case Studies for UK Care Providers | TenderLab',
  description:
    'Real UK care tender wins with verified award letters. 92% win rate across 200+ submissions. Filter by care setting, council, and contract type.',
  alternates: { canonical: 'https://www.tenderlab.co.uk/case-studies' },
  openGraph: {
    title: 'Tender Writing Case Studies for UK Care Providers | TenderLab',
    description:
      'Real UK care tender wins with verified award letters. 92% win rate across 200+ submissions. Filter by care setting, council, and contract type.',
    url: 'https://www.tenderlab.co.uk/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tender Writing Case Studies for UK Care Providers | TenderLab',
    description: 'Real UK care tender wins. 92% win rate, 200+ submissions, verified award letters.',
  },
}

const STATS = [
  { n: '92%', label: 'Win rate across submissions' },
  { n: '200+', label: 'Tender submissions completed' },
  { n: '25+', label: 'Lots awarded across these cases' },
  { n: '10', label: 'Case studies with award letters' },
]

const FAQS = [
  {
    q: 'Are these case studies verified?',
    a: 'Yes. Each case study is backed by an award letter, framework call-off notice, or contract reference visible to commissioners on request. Service user identifiers and commercially sensitive data are redacted; the procurement evidence is not.',
  },
  {
    q: 'Can you write a case study for a sector you have not worked in before?',
    a: 'No. We only write tender responses and case studies for UK health and social care: adult social care, children\'s services, NHS-commissioned community health, housing-related support and continuing healthcare. Outside that scope we will refer you to a generalist bid writer.',
  },
  {
    q: 'What is the typical win rate after engaging TenderLab?',
    a: 'Providers moving from internal drafting to TenderLab drafting plus 72-hour pre-submission review typically lift from a 30 to 50 per cent win rate to 70 to 92 per cent across the next 3 to 5 bids. The lift is fastest on framework re-tenders where the previous loss feedback informs the rewrite.',
  },
  {
    q: 'Do you have case studies in my specific local authority area?',
    a: 'Likely yes. We have written across Essex, Bedford, Southend, Dorset, Birmingham, Manchester, London boroughs, and devolved nation commissioners. Book a free consultation and we will pull the closest comparable case studies for your council.',
  },
  {
    q: 'Can I reference your case studies in my own bid?',
    a: 'Our case studies are TenderLab\'s evidence of past work. Your bid should reference your own verified contract history, not ours. We help you build that evidence pack as part of bid writing or Pre-Submission Review engagements.',
  },
]

export default function CaseStudiesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': 'https://www.tenderlab.co.uk/case-studies#collection',
          name: 'Tender Writing Case Studies for UK Care Providers',
          url: 'https://www.tenderlab.co.uk/case-studies',
          isPartOf: { '@id': 'https://www.tenderlab.co.uk/#website' },
          about: { '@id': 'https://www.tenderlab.co.uk/#organization' },
          description: 'Real UK care tender wins with verified award letters. 92% win rate across 200+ submissions.',
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': 'https://www.tenderlab.co.uk/case-studies#faq',
          mainEntity: FAQS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }) }}
      />

      {/* ââ Hero ââ */}
      <section className="cs-hero">
        <div className="container">
          <div className="cs-hero__inner">

            <div className="cs-hero__left">
              <p className="cs-hero__kicker">
                <span className="cs-hero__kicker-dot" />
                Verified outcomes
              </p>
              <h1 className="cs-hero__headline">
                From no prior experience to awarded UK care contracts.
              </h1>
              <p className="cs-hero__sub">
                Each case study follows a provider from entry barrier to award letter.
                Find the scenario closest to yours, then contact us.
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

      {/* ââ Filterable grid + intent strip ââ */}
      <div id="case-studies">
        <CaseStudiesGrid />
      </div>

      {/* ââ FAQ ââ */}
      <section className="cs-faq" aria-labelledby="cs-faq-title" style={{ padding: '4rem 0', background: '#FAFAF5' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <h2 id="cs-faq-title" style={{ marginBottom: '1.5rem' }}>Case studies: frequently asked questions</h2>
          {FAQS.map(f => (
            <details key={f.q} style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.05rem' }}>{f.q}</summary>
              <p style={{ marginTop: '0.75rem', lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ââ Bottom CTA ââ */}
      <section className="cs-bottom-cta">
        <div className="container">
          <div className="cs-bottom-cta__panel">
            <div className="cs-bottom-cta__left">
              <p className="cs-bottom-cta__kicker">Ready to be the next case study?</p>
              <h2 className="cs-bottom-cta__headline">
                Tell us where you&apos;re starting from.
              </h2>
              <p className="cs-bottom-cta__body">
                We work from your current position, whether that is a first-time entry,
                a failed submission, or a new council you have never bid into.
                No generic approach. Every engagement is built around your specific procurement.
              </p>
              <div className="cs-bottom-cta__actions">
                <Link href="/contact" className="btn btn-white">
                  Book a free consultation
                </Link>
                <Link href="/services" className="cs-bottom-cta__link">
                  See all services â
                </Link>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
                TenderLab Ltd Â· Companies House 17184263 Â· Read our latest <Link href="/blog" style={{ color: 'inherit', textDecoration: 'underline' }}>tender writing insights</Link>. Reference: <a href="https://www.gov.uk/government/collections/procurement-policy-procurement-policy-notes" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>gov.uk procurement policy notes</a>.
              </p>
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
