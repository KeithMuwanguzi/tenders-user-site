import type { Metadata } from 'next'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'
import { fetchReviews } from '@/lib/sheets'


export const metadata: Metadata = {
  title: 'Client Reviews | TenderLab - Real Results from Real Clients',
  description:
    'Real testimonials from UK health and social care providers who have won contracts with TenderLab. 92% win rate across 200+ submissions.',
  alternates: { canonical: '/reviews' },
  openGraph: defaultOpenGraph({
    title: 'Client Reviews | TenderLab - Real Results from Real Clients',
    description: 'Real testimonials from UK health and social care providers who have won contracts with TenderLab. 92% win rate across 200+ submissions.',
    path: '/reviews',
  }),
  twitter: defaultTwitter({
    title: 'Client Reviews | TenderLab - Real Results from Real Clients',
    description: 'Real testimonials from UK health and social care providers who have won contracts with TenderLab. 92% win rate across 200+ submissions.',
  }),
}

const STATS = [
  { num: '92%', label: 'Win Rate' },
  { num: '200+', label: 'Submissions Delivered' },
  { num: '10+', label: 'Years in Care Sector' },
  { num: '£50M+', label: 'Contract Value Won' },
]

export default async function ReviewsPage() {
  const reviews = await fetchReviews()
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
            {reviews.map((t) => (
              <div key={t.name} className="svcs-testimonial-card">
                <div className="svcs-testimonial-card__stars">{'★'.repeat(t.rating)}</div>
                <blockquote className="svcs-testimonial-card__quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <footer className="svcs-testimonial-card__footer">
                  <strong className="svcs-testimonial-card__name">{t.name}</strong>
                  {t.role && <span>{t.role}</span>}
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
