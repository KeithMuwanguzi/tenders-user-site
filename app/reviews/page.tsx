import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Client Reviews | TenderLab — Real Results from Real Clients',
  description:
    'See what health and social care providers say about working with TenderLab. Real testimonials, real results.',
}

const TESTIMONIALS = [
  {
    quote: 'TenderLab transformed our bid writing process. Within 6 months of working with them, we had won three major council contracts worth £4.2M annually. Their rubric-first approach made the difference.',
    author: 'James Mitchell',
    role: 'Operations Director',
    org: 'Compass Housing and Support',
    sector: 'Supported Living, London',
  },
  {
    quote: 'We were struggling to compete against national chains. TenderLab helped us position our local expertise and community relationships as genuine competitive advantages. We now win 8 out of 10 tenders we submit.',
    author: 'Sarah Mitchell',
    role: 'Managing Director',
    org: 'CarePlus Community',
    sector: 'Domiciliary Care, South East',
  },
  {
    quote: "What impressed us most was the strategic thinking. TenderLab didn't just write — they helped us understand what councils genuinely want to see and how to demonstrate our unique value in every section.",
    author: 'Lisa Harrison',
    role: 'Commissioning Manager',
    org: 'Horizon Housing',
    sector: 'Supported Living, Midlands',
  },
  {
    quote: "Our previous tenders weren't scoring well. TenderLab completely restructured how we present our evidence and outcomes. Our scores jumped from 6.8 to 9.2 on the very next submission.",
    author: 'Peter Morrison',
    role: 'CEO',
    org: 'Premier Care Solutions',
    sector: 'Domiciliary Care, North West',
  },
  {
    quote: "We had been losing the same framework lot for three years. After a Lost Bid Debrief with TenderLab, we understood exactly why. We fixed it, retendered, and won. The analysis was forensic.",
    author: 'Rachel Okafor',
    role: 'Business Development Director',
    org: 'Sunrise Care Group',
    sector: "Children's Services, Yorkshire",
  },
  {
    quote: "TenderLab's retainer service is genuinely transformative. Having a team that knows our organisation inside out and is ready to move when an opportunity appears has changed how we approach growth entirely.",
    author: 'Mark Hennessey',
    role: 'Managing Director',
    org: 'Clearview Support Services',
    sector: 'Supported Living & Residential, Wales',
  },
]

const STATS = [
  { num: '92%', label: 'Win Rate' },
  { num: '200+', label: 'Submissions Delivered' },
  { num: '10+', label: 'Years in Care Sector' },
  { num: '£50M+', label: 'Contract Value Won' },
]

export default function ReviewsPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="page-hero page-hero--img">
        <div className="page-hero__bg">
          <Image
            src="/images/business-people-video-call-meeting.jpg"
            alt="TenderLab client reviews"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="page-hero__title">Reviews</h1>
          <p className="page-hero__sub">Real results from real clients across UK health and social care.</p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="reviews-stats">
        <div className="container">
          <div className="reviews-stats__grid">
            {STATS.map((s) => (
              <div key={s.label} className="reviews-stat">
                <span className="reviews-stat__num">{s.num}</span>
                <span className="reviews-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="svcs-testimonials">
        <div className="svcs-testimonials__bg" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header centered" style={{ marginBottom: 52 }}>
            <p className="section-label" style={{ color: 'rgba(212,56,44,0.85)', justifyContent: 'center' }}>
              Client Testimonials
            </p>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Real Results from Real Clients
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto' }}>
              We help care providers turn average bids into winning submissions. Here&apos;s what our clients say about working with us.
            </p>
          </div>

          <div className="reviews-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="svcs-testimonial-card">
                <div className="svcs-testimonial-card__stars">★★★★★</div>
                <blockquote className="svcs-testimonial-card__quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <footer className="svcs-testimonial-card__footer">
                  <strong className="svcs-testimonial-card__name">{t.author}</strong>
                  <span>{t.role}, {t.org}</span>
                  <span className="svcs-testimonial-card__sector">{t.sector}</span>
                </footer>
                <span className="svcs-testimonial-card__mark" aria-hidden="true">&rdquo;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Join Our Clients</p>
          <h2 className="services-cta__headline">Ready to Add Your Win?</h2>
          <p className="services-cta__sub">
            Book a free consultation today. We&apos;ll assess your next opportunity and tell you honestly what it takes to win.
          </p>
          <div className="services-cta__actions">
            <Link href="/contact" className="btn btn-white">Get a Free Consultation</Link>
            <Link href="/services" className="btn btn-outline-white">View All Services</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
