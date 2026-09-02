import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditorialHero from '@/components/EditorialHero'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { CASE_STUDY_DETAILS } from '@/lib/case-studies-detail'
import { breadcrumbSchema, defaultOpenGraph, defaultTwitter } from '@/lib/seo'
import GalleryGrid from './GalleryGrid'
import ContractWonMedallion from '@/components/ContractWonMedallion'

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  if (!study) return {}

  const title = `${study.provider}: ${study.council} ${study.categoryLabel} Case Study | TenderLab`
  const description = `TenderLab supported ${study.provider} with ${study.council} ${study.contractType.toLowerCase()} work. ${study.transformation} Inspect the documented starting point, work and outcome.`
  const path = `/case-studies/${slug}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: defaultOpenGraph({ title, description, path, type: 'article' }),
    twitter: defaultTwitter({ title, description }),
  }
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  const detail = CASE_STUDY_DETAILS[slug]
  if (!study || !detail) notFound()

  const related = detail.relatedSlugs
    .map((relatedSlug) => CASE_STUDIES.find((item) => item.slug === relatedSlug))
    .filter(Boolean) as typeof CASE_STUDIES

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: `TenderLab case study: ${study.transformation}. ${study.council}.`,
    url: `https://www.tenderlab.co.uk/case-studies/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.tenderlab.co.uk/case-studies/${slug}`,
    },
    author: { '@type': 'Organization', name: 'TenderLab', url: 'https://www.tenderlab.co.uk' },
    publisher: { '@id': 'https://www.tenderlab.co.uk/#organization' },
    dateModified: '2026-08-10',
    articleSection: study.categoryLabel,
    inLanguage: 'en-GB',
  }

  return (
    <main className="ep-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case studies', path: '/case-studies' },
          { name: study.title, path: `/case-studies/${slug}` },
        ])) }}
      />

      <EditorialHero
        eyebrow={`${study.categoryLabel} · ${study.contractType}`}
        title={`${study.council} ${study.categoryLabel.toLowerCase()} tender case study`}
        intro={detail.verdict}
        image={detail.galleryImages[0]?.src || study.image}
        imageAlt={`Redacted award evidence for ${study.council} case study`}
        imageFit="contain"
        primaryLabel="Discuss a similar tender"
        primaryHref="/contact#enquiry"
        secondaryLabel="Back to all case studies"
        secondaryHref="/case-studies"
        tone="cream"
      />

      <section className="ep-case-detail-record">
        <div className="ep-shell ep-case-detail-record__grid">
          <div>
            <span>Starting position</span>
            <strong>{detail.entryAnchor.startedWith}</strong>
          </div>
          <div>
            <span>Recorded result</span>
            <strong>{detail.entryAnchor.result}</strong>
          </div>
          <div>
            <span>Procurement context</span>
            <strong>{detail.entryAnchor.context}</strong>
          </div>
        </div>
      </section>

      <section className="ep-section ep-case-detail-overview">
        <div className="ep-shell ep-case-detail-overview__grid">
          <aside>
            <ContractWonMedallion className="contract-won-medallion--detail" />
            <p className="ep-kicker">Case record</p>
            <dl>
              <div><dt>Provider</dt><dd>{study.provider}</dd></div>
              <div><dt>Authority</dt><dd>{study.council}</dd></div>
              <div><dt>Award</dt><dd>{detail.metaBar.award}</dd></div>
              <div><dt>Reference</dt><dd>{detail.metaBar.reference}</dd></div>
              <div><dt>Outcome</dt><dd>{detail.metaBar.outcome}</dd></div>
            </dl>
            {detail.ftsUrl ? (
              <a href={detail.ftsUrl} target="_blank" rel="noopener noreferrer" className="ep-link">
                View procurement record <Arrow />
              </a>
            ) : null}
          </aside>
          <div>
            <p className="ep-kicker">The starting point</p>
            <h2>{study.title}</h2>
            <p>{detail.startingStrip}</p>
            <p>{detail.stampSummary}</p>
          </div>
        </div>
      </section>

      <section className="ep-section ep-case-evidence" id="award-evidence">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Redacted source material</p>
              <h2>Inspect the evidence supporting the result.</h2>
            </div>
            <p>
              The gallery retains the source documents already published for this case. Names, identifiers and
              commercially sensitive details may be redacted.
            </p>
          </div>
          <div className="ep-case-evidence__gallery">
            <GalleryGrid images={detail.galleryImages} accentColor={study.accentColor} />
          </div>
          <p className="ep-case-evidence__source">{detail.gallerySource}</p>
        </div>
      </section>

      <section className="ep-section ep-case-narrative">
        <div className="ep-shell ep-case-narrative__grid">
          <aside>
            <p className="ep-kicker">What the record covers</p>
            <h2>Starting position, TenderLab&apos;s role and the recorded outcome.</h2>
          </aside>
          <div className="ep-case-narrative__sections">
            {detail.sections.map((section) => (
              <article key={section.num}>
                <span>{section.num}</span>
                <div>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                  {section.callout ? (
                    <blockquote>
                      <strong>{section.callout.label}</strong>
                      <p>{section.callout.text}</p>
                    </blockquote>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {detail.scoreTable ? (
        <section className="ep-section ep-case-scores">
          <div className="ep-shell">
            <div className="ep-section-head ep-section-head--split">
              <div>
                <p className="ep-kicker">Recorded evaluation data</p>
                <h2>Scores or lot outcomes available for this case.</h2>
              </div>
              <p>The table reproduces the structured result held in the case-study record.</p>
            </div>
            <div className="ep-case-scores__table">
              <table>
                <thead>
                  <tr>{detail.scoreTable.headers.map((header) => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>
                  {detail.scoreTable.rows.map((row) => (
                    <tr key={row.lot}>
                      <th>{row.lot}</th>
                      {row.cells.map((cell, index) => <td key={`${row.lot}-${index}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className="ep-section ep-case-before-after">
        <div className="ep-shell ep-case-before-after__grid">
          <article>
            <p className="ep-kicker">Before the engagement</p>
            <p>{detail.beforeText}</p>
          </article>
          <article>
            <p className="ep-kicker">After the recorded outcome</p>
            <p>{detail.afterText}</p>
          </article>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="ep-section ep-case-related">
          <div className="ep-shell">
            <div className="ep-section-head ep-section-head--split">
              <div>
                <p className="ep-kicker">Related evidence</p>
                <h2>Compare another procurement context.</h2>
              </div>
              <Link href="/case-studies" className="ep-link">View all case studies <Arrow /></Link>
            </div>
            <div className="ep-case-related__grid">
              {related.map((item) => (
                <Link key={item.slug} href={`/case-studies/${item.slug}`}>
                  <ContractWonMedallion className="contract-won-medallion--related" />
                  <span>{item.categoryLabel} · {item.contractType}</span>
                  <h3>{item.title}</h3>
                  <p>{item.result} · {item.lots}</p>
                  <strong>Read case study <Arrow /></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="ep-section ep-review-choice">
        <div className="ep-shell ep-review-choice__panel">
          <div>
            <p className="ep-kicker">A comparable result is not a guarantee</p>
            <h2>Let us check whether your tender is a responsible fit first.</h2>
          </div>
          <div>
            <p>
              We will read the published conditions and assess the evidence, delivery and commercial position before
              agreeing to full writing support.
            </p>
            <Link href="/contact#enquiry" className="ep-button ep-button--primary">
              Share the opportunity <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
