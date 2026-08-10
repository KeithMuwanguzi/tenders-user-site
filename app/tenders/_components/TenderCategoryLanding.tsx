import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { fetchPublishedTenders } from '@/lib/published-tenders'
import type { TenderLandingPage } from '@/lib/tender-landing-pages'
import TendersClient from '../TendersClient'

export default async function TenderCategoryLanding({
  page,
}: {
  page: TenderLandingPage
}) {
  const initialTenders = await fetchPublishedTenders(150)
  const path = `/tenders/${page.slug}`

  return (
    <main className="tender-landing">
      <JsonLd
        id={`ld-tender-landing-${page.slug}`}
        data={webPageSchema({
          name: page.title,
          description: page.description,
          path,
          type: 'CollectionPage',
          about: page.label,
        })}
      />
      <JsonLd
        id={`ld-tender-landing-breadcrumb-${page.slug}`}
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Live tenders', path: '/tenders' },
          { name: page.label, path },
        ])}
      />
      <JsonLd id={`ld-tender-landing-faq-${page.slug}`} data={faqSchema(page.faqs)} />

      <section className="tender-landing__hero">
        <div className="container tender-landing__hero-grid">
          <div className="tender-landing__hero-copy">
            <p className="section-label">Live care procurement</p>
            <h1>{page.h1}</h1>
            <p className="page-hero__desc">{page.introduction}</p>
          </div>
          <figure className="tender-landing__hero-visual">
            <div className="tender-landing__hero-image">
              <Image
                src={page.heroImage}
                alt={page.heroAlt}
                fill
                priority
                quality={84}
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </div>
            <figcaption className="tender-landing__hero-note">
              <strong>Check the opportunity before you bid.</strong>
              <p>
                TenderLab can test the published conditions, evidence, delivery model and commercial
                fit before writing begins.
              </p>
              <Link href={`/contact?ref=${page.slug}-opportunity-review#enquiry`}>
                Ask TenderLab to review this tender
              </Link>
            </figcaption>
          </figure>
          <div className="tender-landing__hero-actions">
            <Link href="#current-opportunities" className="btn btn-primary">
              Browse current opportunities
            </Link>
            <Link href={`/contact?ref=${page.slug}-tenders#enquiry`} className="btn btn-ghost">
              Get tender support
            </Link>
          </div>
        </div>
      </section>

      <div id="current-opportunities" className="tender-landing__results-anchor">
        <TendersClient initialTenders={initialTenders} initialCategory={page.filterId} />
      </div>

      <section className="tender-landing__decision" aria-labelledby={`${page.slug}-decision`}>
        <div className="container tender-landing__decision-grid">
          <div className="tender-landing__decision-copy">
            <p className="section-label">Bid decision</p>
            <h2 id={`${page.slug}-decision`}>{page.decisionHeading}</h2>
            <p>{page.decisionCopy}</p>
            <Link href={page.sectorPath} className="text-link">
              Explore TenderLab&apos;s expertise in this care setting
            </Link>
          </div>
          <div className="tender-landing__checklist">
            <h3>Questions to resolve</h3>
            <ol>
              {page.checks.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="tender-landing__evidence" aria-labelledby={`${page.slug}-evidence`}>
        <div className="container">
          <div className="tender-landing__evidence-head">
            <p className="section-label">Evidence for the scoring sheet</p>
            <h2 id={`${page.slug}-evidence`}>Prepare evidence that describes how the service will work.</h2>
            <p>
              Generic assurances are difficult to score. Strong responses name the people, controls,
              records, frequencies and outcomes that make the proposed service credible.
            </p>
          </div>
          <div className="tender-landing__evidence-grid">
            {page.evidence.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="tender-landing__evidence-links">
            <Link href="/services/bid-writing" className="btn btn-primary">Explore bid writing services</Link>
            <Link href="/services/pre-submission-review" className="btn btn-ghost">Review an existing draft</Link>
          </div>
        </div>
      </section>

      <section className="tender-landing__faq" aria-labelledby={`${page.slug}-faq`}>
        <div className="container tender-landing__faq-grid">
          <div>
            <p className="section-label">Useful answers</p>
            <h2 id={`${page.slug}-faq`}>Questions providers ask before bidding.</h2>
          </div>
          <div>
            {page.faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <p className="section-label">Have a live tender?</p>
          <h2 className="services-cta__headline">Get a clear view before the deadline starts controlling the decision.</h2>
          <p className="services-cta__sub">
            Send the notice, tender pack and deadline. TenderLab will identify the fit, evidence gaps
            and the support most likely to improve the submission.
          </p>
          <div className="services-cta__actions">
            <Link href={`/contact?utm_source=${page.slug}&utm_medium=cta&utm_campaign=tender_support#enquiry`} className="btn btn-white">
              Share the opportunity
            </Link>
            <Link href="/services" className="btn btn-outline-white">Compare support options</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
