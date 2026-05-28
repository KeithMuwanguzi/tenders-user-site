import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { SERVICES_DATA, getServiceBySlug } from '@/lib/services-data'
import {
  canonicalUrl,
  defaultOpenGraph,
  defaultTwitter,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  defaultFaq,
  BRAND,
} from '@/lib/seo'

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
  const fullTitle = `${svc.title} | TenderLab`
  const pathname = `/services/${slug}`
  return {
    title: fullTitle,
    description: svc.description,
    alternates: { canonical: pathname },
    openGraph: defaultOpenGraph({
      title: fullTitle,
      description: svc.description,
      path: pathname,
      type: 'website',
      image: svc.heroImg,
    }),
    twitter: defaultTwitter({
      title: fullTitle,
      description: svc.description,
      image: svc.heroImg,
    }),
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

  const pathname = `/services/${slug}`

  const ldService = serviceSchema({
    name: svc.title,
    description: svc.description,
    path: pathname,
    serviceType: svc.title,
  })

  const ldFaq = faqSchema(defaultFaq)

  const ldBreadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: svc.title, path: pathname },
  ])

  return (
    <main>
      <Script
        id={`ld-svc-${slug}-service`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }}
      />
      <Script
        id={`ld-svc-${slug}-faq`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }}
      />
      <Script
        id={`ld-svc-${slug}-breadcrumb`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />

      {/* Hero */}
      <section className="svc-detail-hero">
        <div className="svc-detail-hero__bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svc.heroImg} alt={svc.title} />
        </div>
        <div className="svc-detail-hero__overlay" />
        <div className="container svc-detail-hero__content">
          <p className="svc-detail-hero__label">Service - UK Health and Social Care</p>
          <h1 className="svc-detail-hero__title">{svc.title}</h1>
          <p className="svc-detail-hero__desc">{svc.description}</p>
          <p className="svc-detail-hero__tagline">{svc.tagline}</p>
          <p className="svc-detail-hero__trust">
            <strong>{BRAND.winRate} win rate</strong> across <strong>{BRAND.submissions} submissions</strong>. {BRAND.positioning}
          </p>
        </div>
      </section>

      {/* 01 What It Is + Sidebar */}
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
                    Back to all services
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* 02 When This Is Used */}
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

      {/* 03 How It Works */}
      <section className="svc-band svc-band--white">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">03</span>
            How It Works
          </h2>
          <div className="svc-steps">
            {svc.howItWorks.map((s, i) => (
              <div key={s.step} className="svc-step">
                <span className="svc-step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc-step__title">{s.step}</h3>
                <p className="svc-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 What It Solves */}
      <section className="svc-band svc-band--light">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">04</span>
            What It Solves
          </h2>
          <ul className="svc-bullet-list">
            {svc.solves.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Transforms */}
      <section className="svc-band svc-band--white">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">05</span>
            What This Transforms
          </h2>
          <div className="svc-transforms">
            {svc.transforms.map((t) => (
              <div key={t.from} className="svc-transform">
                <span className="svc-transform__from">{t.from}</span>
                <span className="svc-transform__arrow" aria-hidden="true">to</span>
                <span className="svc-transform__to">{t.to}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 Tiers */}
      <section className="svc-band svc-band--light">
        <div className="container">
          <h2 className="svc-section-heading">
            <span className="svc-section-heading__num">06</span>
            Tiers
          </h2>
          <div className="svc-tiers">
            {svc.tiers.map((t) => (
              <div key={t.name} className="svc-tier">
                <h3 className="svc-tier__name">{t.name}</h3>
                <p className="svc-tier__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta">
        <div className="container svc-cta__inner">
          <h2 className="svc-cta__title">Ready to win your next contract?</h2>
          <p className="svc-cta__desc">{BRAND.winRate} win rate across {BRAND.submissions} submissions. Evaluator-trained writers. UK health and social care specialists.</p>
          <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </main>
  )
}
