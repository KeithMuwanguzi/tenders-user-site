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

/* ================================================================
   Tender Detail Page — Server Component, SSR
   ================================================================
   Fetches tender data on the server so Googlebot sees the real
   title, description, body and canonical on first crawl.
   Inlines the gov.uk fetchers so the page does not depend on an
   internal API round-trip. Mirrors the data shape in
   app/api/tenders/[id]/route.ts.
   ================================================================ */

export const revalidate = 1800 // 30 minutes

interface TenderDetail {
  id: string
  title: string
  description: string
  publishedDate: string
  deadline: string | null
  value: string | null
  location: string | null
  organisation: string | null
  status: string
  source: 'Contracts Finder' | 'Find a Tender'
  externalUrl: string
  noticeType: string | null
  cpvDescription: string | null
  sector: string | null
  awardedDate: string | null
  awardedValue: string | null
  awardedSupplier: string | null
  contactName: string | null
  contactEmail: string | null
  documents: { title: string; url: string }[]
}

function fmtValue(low: number | null | undefined, high: number | null | undefined): string | null {
  const v = high ?? low
  if (!v) return null
  if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`
  if (v >= 1_000) return `£${(v / 1_000).toFixed(0)}k`
  return `£${v.toLocaleString()}`
}

function fmtSingle(v: number): string | null {
  if (!v) return null
  if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`
  if (v >= 1_000) return `£${(v / 1_000).toFixed(0)}k`
  return `£${v.toLocaleString()}`
}

function fmtOCDS(value: { amount?: number; currency?: string } | null | undefined): string | null {
  if (!value?.amount) return null
  const a = value.amount
  if (a >= 1_000_000) return `£${(a / 1_000_000).toFixed(1)}m`
  if (a >= 1_000) return `£${(a / 1_000).toFixed(0)}k`
  return `£${a.toLocaleString()}`
}

async function fetchCFNotice(id: string): Promise<TenderDetail | null> {
  const url = `https://www.contractsfinder.service.gov.uk/api/rest/2/get_published_notice/json/${id}`
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 1800 },
    })
    if (!res.ok) return null
    const data = await res.json()
    const n = data?.notice
    if (!n) return null
    return {
      id: n.id || id,
      title: n.title || 'Untitled opportunity',
      description: n.description || n.summary || '',
      publishedDate: n.publishedDate || '',
      deadline: n.deadlineDate || null,
      value: fmtValue(n.valueLow, n.valueHigh),
      location: n.regionText || n.region || null,
      organisation: n.organisationName || null,
      status: n.noticeStatus === 'Awarded' ? 'Awarded' : n.noticeStatus || 'Open',
      source: 'Contracts Finder',
      externalUrl: `https://www.contractsfinder.service.gov.uk/Notice/${id}`,
      noticeType: n.noticeType || null,
      cpvDescription: n.cpvDescription || n.cpvDescriptionExpanded || null,
      sector: n.sector || null,
      awardedDate: n.awardedDate || null,
      awardedValue: n.awardedValue ? fmtSingle(n.awardedValue) : null,
      awardedSupplier: n.awardedSupplier || null,
      contactName: n.contactName || null,
      contactEmail: n.contactEmail || null,
      documents: (n.documents || []).map((d: { title?: string; url?: string }) => ({
        title: d.title || 'Document',
        url: d.url || '',
      })),
    }
  } catch {
    return null
  }
}

async function fetchFTNotice(id: string): Promise<TenderDetail | null> {
  const url = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages/${id}`
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 1800 },
    })
    if (!res.ok) return null
    const data = await res.json()
    const releases = data?.releases
    if (!releases?.length) return null
    const r = releases[0]
    const t = r.tender || {}
    return {
      id: r.ocid || r.id || id,
      title: t.title || 'Untitled opportunity',
      description: t.description || '',
      publishedDate: r.date || '',
      deadline: t.tenderPeriod?.endDate || null,
      value: fmtOCDS(t.value),
      location: t.items?.[0]?.deliveryAddresses?.[0]?.region || null,
      organisation: r.buyer?.name || null,
      status: t.status === 'active' ? 'Open' : t.status || 'Unknown',
      source: 'Find a Tender',
      externalUrl: `https://www.find-tender.service.gov.uk/Notice/${id}`,
      noticeType: r.tag?.[0] || null,
      cpvDescription: t.items?.[0]?.classification?.description || null,
      sector: null,
      awardedDate: null,
      awardedValue: null,
      awardedSupplier: null,
      contactName: r.buyer?.contactPoint?.name || null,
      contactEmail: r.buyer?.contactPoint?.email || null,
      documents: (t.documents || []).map((d: { title?: string; url?: string }) => ({
        title: d.title || 'Document',
        url: d.url || '',
      })),
    }
  } catch {
    return null
  }
}

async function getTender(id: string, source: string): Promise<TenderDetail | null> {
  if (source === 'ft') return fetchFTNotice(id)
  return fetchCFNotice(id)
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

  const description = truncate(tender.description, 155)
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
            <span className={`tender-card__source${tender.source === 'Find a Tender' ? ' tender-card__source--ft' : ''}`}>
              {tender.source}
            </span>
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
        </div>
      </section>

      {/* Content */}
      <section className="tender-detail__body">
        <div className="container">
          <div className="tender-detail__grid">
            {/* Main content */}
            <div className="tender-detail__main">
              <div className="tender-detail__section">
                <h2>Description</h2>
                <p>{tender.description || 'No description provided.'}</p>
              </div>

              {tender.cpvDescription && (
                <div className="tender-detail__section">
                  <h2>CPV Classification</h2>
                  <p>{tender.cpvDescription}</p>
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
                <p>
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
                  This notice was published on {tender.source}. The official record is available at{' '}
                  <a href={tender.externalUrl} target="_blank" rel="noopener noreferrer">{tender.externalUrl}</a>.
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

                  {tender.noticeType && (
                    <>
                      <dt>Notice Type</dt>
                      <dd>{tender.noticeType}</dd>
                    </>
                  )}

                  {tender.sector && (
                    <>
                      <dt>Sector</dt>
                      <dd>{tender.sector}</dd>
                    </>
                  )}

                  <dt>Source</dt>
                  <dd>{tender.source}</dd>
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
