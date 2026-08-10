import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  SITE_URL,
  defaultOpenGraph,
  defaultTwitter,
  breadcrumbSchema,
} from '@/lib/seo'
import { fetchPublishedTenderById } from '@/lib/published-tenders'
import { inferCareCategoryLabel } from '@/lib/tender-categories'
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

function tenderEnquiryHref(tender: TenderDetail, id: string, placement: string): string {
  const params = new URLSearchParams({
    utm_source: 'tender_detail',
    utm_medium: placement,
    utm_campaign: 'lead',
    tenderTitle: tender.title,
    tenderDescription: truncate(tender.fullDescription || tender.description, 700),
    tenderUrl: `/tenders/${encodeURIComponent(id)}`,
  })
  if (tender.organisation) params.set('authority', tender.organisation)
  if (tender.deadline) params.set('deadline', tender.deadline.slice(0, 10))
  const serviceType = tender.category || tender.sector || inferCareCategoryLabel(tender)
  if (serviceType) params.set('serviceType', serviceType)
  return `/contact?${params.toString()}#enquiry`
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
  // Parameter-free canonical. Each notice was reachable at both /tenders/<id>
  // and /tenders/<id>?source=cf, and the canonical pointed at the parameterised
  // form, so Google indexed the duplicate and crawled every notice twice.
  const canonical = `${SITE_URL}/tenders/${encodeURIComponent(id)}`
  const isOpen =
    /open/i.test(tender.status) ||
    /active/i.test(tender.status) ||
    tender.status === 'Future'

  const title = isOpen
    ? `${tender.title} | Live UK Tender | TenderLab`
    : `${tender.title} | UK Tender Notice | TenderLab`

  return {
    title,
    description: description || `${tender.title}. ${tender.source} notice from ${tender.organisation || 'a UK public sector body'}. Bid writing support from TenderLab.`,
    alternates: { canonical },
    openGraph: defaultOpenGraph({ title, description, path: `/tenders/${encodeURIComponent(id)}` }),
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
  // Parameter-free canonical. Each notice was reachable at both /tenders/<id>
  // and /tenders/<id>?source=cf, and the canonical pointed at the parameterised
  // form, so Google indexed the duplicate and crawled every notice twice.
  const canonical = `${SITE_URL}/tenders/${encodeURIComponent(id)}`

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
  }

  return (
    <main className="ep-page tender-detail">
      <script
        id={`ld-tender-${tender.id}-service`}
        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(govSchema) }}
      />
      <script
        id={`ld-tender-${tender.id}-breadcrumb`}
        type="application/ld+json"

        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Live Tenders', path: '/tenders' },
              {
                name: tender.title,
                path: `/tenders/${encodeURIComponent(id)}`,
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

      {/* Header: title and a documentary procurement image sit together, so a
          long notice title does not create an empty first viewport. */}
      <section className="tender-detail__header">
        <div className="container tender-detail__hero-grid">
          <div className="tender-detail__hero-copy">
            <p className="ep-kicker">Official UK procurement notice</p>
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
                className="ep-button ep-button--primary tender-detail__source-btn"
              >
                {officialSourceLinkLabel(tender.source)}
                <span className="tender-detail__source-btn-icon" aria-hidden>↗</span>
              </a>
            </div>
          </div>
          <div className="tender-detail__hero-media">
            <Image
              src="/images/editorial/tenderlab-live-tenders-hero-v1.webp"
              alt="A public procurement notice being reviewed against care-provider evidence"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
            />
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
                <p className="ep-kicker">TenderLab qualification first</p>
                <h2>Before we write, we establish whether the opportunity fits.</h2>
                <p>
                  We examine the published participation conditions, service scope, geography,
                  regulatory position, available evidence, mobilisation demands and commercial
                  exposure with your team. We only confirm a full tender-writing engagement when
                  the available information supports a responsible view that the provider meets
                  the tender requirements.
                </p>
                <p className="pb-6">
                  If <strong>{tender.title}</strong> is a credible fit, we can map the scored
                  requirements, gather operational evidence and build the response around the
                  buyer documents. The qualification check and any writing support do not
                  guarantee an award; the contracting authority makes the final decision.
                </p>
                <div className="tender-detail__inline-cta">
                  <Link
                    href={tenderEnquiryHref(tender, id, 'inline')}
                    className="ep-button ep-button--primary"
                  >
                    Ask us to qualify this tender
                  </Link>
                  <Link href="/services/bid-viability" className="ep-link">
                    See how qualification works
                  </Link>
                </div>
              </div>

              <div className="tender-detail__source-note">
                <p>
                  TenderLab presents this information to support discovery. Dates, conditions,
                  amendments, documents and submission instructions on the official record remain
                  authoritative.{' '}
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
                <p className="ep-kicker">Considering this opportunity?</p>
                <h3>Check the requirements before committing your team.</h3>
                <p>Send the notice or procurement pack. We will start by examining fit, evidence, delivery and commercial exposure.</p>
                <Link
                  href={tenderEnquiryHref(tender, id, 'sidebar')}
                  className="ep-button ep-button--primary"
                >
                  Ask about this tender
                </Link>
                <Link href="/services/bid-viability" className="ep-link">How qualification works</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
