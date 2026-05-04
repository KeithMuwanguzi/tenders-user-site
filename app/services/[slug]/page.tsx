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
    description: svc.description,
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
          <p className="svc-detail-hero__label">Service · UK Health and Social Care</p>
          <h1 className="svc-detail-hero__title">{svc.title}</h1>
          <p className="svc-detail-hero__desc">{svc.description}</p>
          <p className="svc-detail-hero__tagline">{svc.tagline}</p>
        </div>
      </section>

      {/* ── 01 What It Is + Sidebar ── */}
      <section className="svc-detail-body">
        <div className="container">
          <div className="svc-detail-body__layout">

            <div className="svc-detail-body__copy">
              <h2 className="svc-section-heading">
                <span className="svc-section-heading__num">01</span>
                What It Is
              </h2>
              {svc.paragraphs.map((para, i) => (
                <p key={i} className="svc-detail-body__para">{para}</p>
              ))}
            </div>

            <aside className="svc-detail-body__sidebar">
              <div className="svc-delivers">
                <h3 className="svc-delivers__heading">What You Receive</h3>
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

      {/* ── 02 When This Is Used ── */}
      <section className="svc-band svc-band--light">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">02</span>
            When This Is Used
          </h2>
          <ul className="svc-bullet-list">
            {svc.whenUsed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 03 How It Works ── */}
      <section className="svc-band svc-band--white">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">03</span>
            How It Works
          </h2>
          <div className="svc-steps">
            {svc.howItWorks.map((s, i) => (
              <div key={s.step} className="svc-step">
                <div className="svc-step__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="svc-step__body">
                  <h3 className="svc-step__title">{s.step}</h3>
                  <p className="svc-step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 What This Solves ── */}
      <section className="svc-band svc-band--light">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">04</span>
            What This Solves
          </h2>
          <ul className="svc-bullet-list">
            {svc.solves.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 05 Transform Strip ── */}
      <section className="svc-band svc-band--cream">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">05</span>
            Starting Point — Outcome
          </h2>
          <div className="svc-transforms">
            {svc.transforms.map((t) => (
              <div key={t.from} className="svc-transform-row">
                <span className="svc-transform-row__from">{t.from}</span>
                <span className="svc-transform-row__arrow" aria-hidden="true">→</span>
                <span className="svc-transform-row__to">{t.to}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Service Scope ── */}
      <section className="svc-band svc-band--white">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">06</span>
            Service Scope
          </h2>
          <div className="svc-tiers">
            {svc.tiers.map((tier) => (
              <div key={tier.name} className="svc-tier">
                <div className="svc-tier__name">{tier.name}</div>
                <p className="svc-tier__desc">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="services-cta">
        <div className="container">
          <p className="section-label">Apply This to Your Next Tender</p>
          <h2 className="services-cta__headline">Free Consultation</h2>
          <p className="services-cta__sub">
            We will read the specification and tell you whether this service applies.
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
