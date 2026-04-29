import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES_DATA, getServiceBySlug } from '@/lib/services-data'

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) return {}
  return {
    title: `${svc.title} | TenderLab`,
    description: svc.tagline,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) notFound()

  return (
    <main>

      {/* ── Hero ── */}
      <section className="svc-detail-hero">
        <div className="svc-detail-hero__bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svc.heroImg} alt={svc.title} />
        </div>
        <div className="svc-detail-hero__overlay" />
        <div className="container svc-detail-hero__content">
          <p className="svc-detail-hero__label">Our Services</p>
          <h1 className="svc-detail-hero__title">{svc.title}</h1>
          <p className="svc-detail-hero__tagline">{svc.tagline}</p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="svc-detail-body">
        <div className="container">
          <div className="svc-detail-body__layout">

            {/* ── Copy ── */}
            <div className="svc-detail-body__copy">
              {svc.paragraphs.map((para, i) => (
                <p key={i} className="svc-detail-body__para">{para}</p>
              ))}
            </div>

            {/* ── Sidebar ── */}
            <aside className="svc-detail-body__sidebar">
              <div className="svc-delivers">
                <h3 className="svc-delivers__heading">What We Deliver</h3>
                <ul className="svc-delivers__list">
                  {svc.delivers.map((item) => (
                    <li key={item} className="svc-delivers__item">
                      <span className="svc-delivers__tick" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.12" />
                          <path d="M4.5 8l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Link>
                  <Link href="/services" className="svc-delivers__back">
                    ← All Services
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Ready to Win?</p>
          <h2 className="services-cta__headline">Start With a Free Consultation</h2>
          <p className="services-cta__sub">
            Talk to our team today. We&apos;ll assess your position honestly and tell you exactly what&apos;s possible.
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
