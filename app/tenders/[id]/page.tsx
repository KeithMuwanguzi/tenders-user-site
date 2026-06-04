import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import {
  SITE_URL,
  SITE_LEGAL_NAME,
  COMPANY_NUMBER,
  BRAND,
  defaultOpenGraph,
  defaultTwitter,
  breadcrumbSchema,
} from '@/lib/seo'
import { fetchPublishedTenderById } from '@/lib/published-tenders'
import {
  mergeGovAndPublished,
  type TenderDetail,
} from '@/lib/tender-detail-merge'
import { fetchGovTender } from '@/lib/gov-tender-fetch'
import { officialSourceLinkLabel, type TenderSourceParam } from '@/lib/tender-sources'

export const revalidate = 1800 // 30 minutes

async function getTender(id: string, source: string): Promise<TenderDetail | null> {
  const sourceParam: TenderSourceParam = source === 'ft' ? 'ft' : 'cf'
  const published = await fetchPublishedTenderById(id)
  const gov = await fetchGovTender(id, sourceParam, published?.url)
  return mergeGovAndPublished(gov, published, id, sourceParam)
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function daysUntilDeadline(deadline: string | null): string | null {
  if (!deadline) return null
  try {
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return 'Closed'
    if (diff === 0) return 'Closes today'
    if (diff === 1) return '1 day remaining'
    return `${diff} days remaining`
  } catch {
    return null
  }
}

function truncate(text: string, n: number): string {
  if (!text) return ''
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= n) return clean
  return clean.slice(0, n).replace(/\s+\S*$/, '') + '...'
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ source?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params
  const { source } = await searchParams
  const src = source || 'cf'
  const tender = await getTender(id, src)

  if (!tender) {
    return {
      title: 'Tender Not Found | TenderLab',
      description: 'This procurement opportunity may have been removed or is no longer available.',
      robots: { index: false, follow: true },
    }
  }

  const description = truncate(tender.fullDescription || tender.description, 155)
  const canonical = `${SITE_URL}/tenders/${encodeURIComponent(id)}?source=${src}`
  const isOpen =
    /open/i.test(tender.status) ||
    /active/i.test(tender.status) ||
    tender.status === 'Future'

  const title = `${tender.title} | Live UK Tender | TenderLab`

  return {
    title,
    description: description || `${tender.title}. ${tender.source} notice from ${tender.organisation || 'a UK public sector body'}. Bid writing support from TenderLab.`,
    alternates: { canonical },
    openGraph: defaultOpenGraph({ title, description, path: `/tenders/${encodeURIComponent(id)}?source=${src}` }),
    twitter: defaultTwitter({ title, description }),
    robots: isOpen
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export default async function TenderDetailPage({ params, searchParams }: Props) {
  const { id } = await params
  const { source } = await searchParams
  const src = source || 'cf'
  const tender = await getTender(id, src)

  if (!tender) {
    notFound()
  }

  const urgency = daysUntilDeadline(tender.deadline)
  const canonical = `${SITE_URL}/tenders/${encodeURIComponent(id)}?source=${src}`

  // JSON-LD: GovernmentService (primary intent) + BreadcrumbList
  const govSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: tender.title,
    description: tender.description || tender.title,
    serviceType: 'Public sector procurement opportunity',
    serviceOperator: tender.organisation
      ? { '@type': 'GovernmentOrganization', name: tender.organisation }
      : undefined,
    areaServed: tender.location || 'United Kingdom',
    url: canonical,
    audience: {
      '@type': 'Audience',
      audienceType: 'UK Health and Social Care Providers',
    },
    provider: { '@id': `${SITE_URL}/#organization` },
  }

  return (
    <main>
      <Script
        id={`ld-tender-${tender.id}-service`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(govSchema) }}
      />
      <Script
        id={`ld-tender-${tender.id}-breadcrumb`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Live Tenders', path: '/tenders' },
              {
                name: tender.title,
                path: `/tenders/${encodeURIComponent(id)}?source=${src}`,
              },
            ])
          ),
        }}
      />

      {/* Breadcrumb + back link */}
      <section className="tender-detail__nav">
        <div className="container">
          <Link href="/tenders" className="tender-detail__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Live Tenders
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="tender-detail__header">
        <div className="container">
          <div className="tender-detail__badges">
            <span className="tender-card__status">{tender.status}</span>
            {urgency && (
              <span className={`tender-card__urgency${urgency === 'Closed' ? ' tender-card__urgency--closed' : ''}`}>
                {urgency}
              </span>
            )}
          </div>
          <h1 className="tender-detail__title">{tender.title}</h1>
          {tender.organisation && (
            <p className="tender-detail__org">{tender.organisation}</p>
          )}
          <div className="tender-detail__header-actions">
            <a
              href={tender.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost tender-detail__source-btn"
            >
              {officialSourceLinkLabel(tender.source)}
              <span className="tender-detail__source-btn-icon" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="tender-detail__body">
        <div className="container">
          <div className="tender-detail__grid">
            {/* Main content */}
            <div className="tender-detail__main">
              {tender.sections.length > 0 ? (
                tender.sections.map((section) => (
                  <div key={section.title} className="tender-detail__section">
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((para, i) => (
                      <p key={`${section.title}-${i}`}>{para}</p>
                    ))}
                  </div>
                ))
              ) : (
                <div className="tender-detail__section">
                  <h2>Description</h2>
                  <p>{tender.fullDescription || tender.description || 'No description provided.'}</p>
                </div>
              )}

              {tender.cpvDescription && (
                <div className="tender-detail__section">
                  <h2>CPV Classification</h2>
                  <p>{tender.cpvDescription}</p>
                </div>
              )}

              {tender.submissionUrl && (
                <div className="tender-detail__section">
                  <h2>Submission portal</h2>
                  <p>
                    <a href={tender.submissionUrl} target="_blank" rel="noopener noreferrer">
                      {tender.submissionUrl}
                    </a>
                  </p>
                </div>
              )}

              {tender.documents && tender.documents.length > 0 && (
                <div className="tender-detail__section">
                  <h2>Documents</h2>
                  <ul className="tender-detail__docs">
                    {tender.documents.map((doc, i) => (
                      <li key={i}>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                          {doc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tender.awardedSupplier && (
                <div className="tender-detail__section">
                  <h2>Award Information</h2>
                  <div className="tender-detail__meta-grid">
                    <div className="tender-detail__meta-item">
                      <span className="tender-detail__meta-label">Awarded To</span>
                      <span>{tender.awardedSupplier}</span>
                    </div>
                    {tender.awardedValue && (
                      <div className="tender-detail__meta-item">
                        <span className="tender-detail__meta-label">Award Value</span>
                        <span>{tender.awardedValue}</span>
                      </div>
                    )}
                    {tender.awardedDate && (
                      <div className="tender-detail__meta-item">
                        <span className="tender-detail__meta-label">Award Date</span>
                        <span>{formatDate(tender.awardedDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="tender-detail__section">
                <h2>How TenderLab can help with this opportunity</h2>
                <p>
                  TenderLab is a specialist tender writing and bid consultancy operating exclusively within UK health and social care procurement. Our evaluator-trained writers deliver a {BRAND.winRate} win rate across {BRAND.submissions} submissions. {SITE_LEGAL_NAME} (Companies House {COMPANY_NUMBER}).
                </p>
                <p className="pb-6">
                  We can help you respond to <strong>{tender.title}</strong> with a specification-mirrored method statement, named operational evidence, and a 72-hour pre-submission review built in.
                </p>
                <div className="tender-detail__inline-cta">
                  <Link
                    href={`/contact?utm_source=tender_detail&utm_medium=inline&utm_campaign=lead&tender=${encodeURIComponent(tender.title.slice(0, 60))}`}
                    className="btn btn-primary"
                  >
                    Get a free 30-minute consultation
                  </Link>
                  <Link href="/score-my-response" className="btn btn-ghost">
                    Score My Response
                  </Link>
                </div>
              </div>

              <div className="tender-detail__source-note">
                <p>
                  Full statutory notice text and attachments are on the official record.{' '}
                  <a href={tender.externalUrl} target="_blank" rel="noopener noreferrer">
                    Open official notice ↗
                  </a>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="tender-detail__sidebar">
              <div className="tender-detail__info-card">
                <h3>Key Information</h3>
                <dl className="tender-detail__dl">
                  <dt>Published</dt>
                  <dd>{formatDate(tender.publishedDate)}</dd>

                  {tender.deadline && (
                    <>
                      <dt>Deadline</dt>
                      <dd>{formatDate(tender.deadline)}</dd>
                    </>
                  )}

                  {tender.value && (
                    <>
                      <dt>Estimated Value</dt>
                      <dd>{tender.value}</dd>
                    </>
                  )}

                  {tender.location && (
                    <>
                      <dt>Location</dt>
                      <dd>{tender.location}</dd>
                    </>
                  )}

                  {tender.noticeIdentifier && (
                    <>
                      <dt>Notice ID</dt>
                      <dd>{tender.noticeIdentifier}</dd>
                    </>
                  )}

                  {tender.procurementIdentifier && (
                    <>
                      <dt>Procurement ID</dt>
                      <dd className="tender-detail__mono">{tender.procurementIdentifier}</dd>
                    </>
                  )}

                  {tender.noticeType && (
                    <>
                      <dt>Notice type</dt>
                      <dd>{tender.noticeType}</dd>
                    </>
                  )}

                  {tender.procedure && (
                    <>
                      <dt>Procedure</dt>
                      <dd>{tender.procedure}</dd>
                    </>
                  )}

                  {tender.legalBasis && (
                    <>
                      <dt>Legal basis</dt>
                      <dd>{tender.legalBasis}</dd>
                    </>
                  )}

                  {tender.buyerAddress && (
                    <>
                      <dt>Authority address</dt>
                      <dd>{tender.buyerAddress}</dd>
                    </>
                  )}

                  {tender.buyerWebsite && (
                    <>
                      <dt>Authority website</dt>
                      <dd>
                        <a href={tender.buyerWebsite} target="_blank" rel="noopener noreferrer">
                          {tender.buyerWebsite}
                        </a>
                      </dd>
                    </>
                  )}

                  {tender.regionCode && (
                    <>
                      <dt>Region code</dt>
                      <dd>{tender.regionCode}</dd>
                    </>
                  )}

                  {tender.sector && (
                    <>
                      <dt>Sector</dt>
                      <dd>{tender.sector}</dd>
                    </>
                  )}

                  {tender.category && (
                    <>
                      <dt>Care setting</dt>
                      <dd>{tender.category}</dd>
                    </>
                  )}

                  <dt>Official record</dt>
                  <dd>
                    <a href={tender.externalUrl} target="_blank" rel="noopener noreferrer">
                      Open full notice ↗
                    </a>
                  </dd>

                  {tender.curatedOnTenderLab && (
                    <>
                      <dt>On TenderLab</dt>
                      <dd>{formatDate(tender.curatedOnTenderLab)}</dd>
                    </>
                  )}
                </dl>
              </div>

              {(tender.contactName || tender.contactEmail) && (
                <div className="tender-detail__info-card">
                  <h3>Contact</h3>
                  <dl className="tender-detail__dl">
                    {tender.contactName && (
                      <>
                        <dt>Name</dt>
                        <dd>{tender.contactName}</dd>
                      </>
                    )}
                    {tender.contactEmail && (
                      <>
                        <dt>Email</dt>
                        <dd><a href={`mailto:${tender.contactEmail}`}>{tender.contactEmail}</a></dd>
                      </>
                    )}
                  </dl>
                </div>
              )}

              <div className="tender-detail__cta-card">
                <h3>Need Help Bidding?</h3>
                <p>Our evaluator-trained writers have a {BRAND.winRate} win rate across {BRAND.submissions} health and social care submissions.</p>
                <Link href="/contact" className="btn btn-primary">Get Help With This Tender</Link>
                <Link href="/score-my-response" className="btn btn-ghost">Score My Response</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
