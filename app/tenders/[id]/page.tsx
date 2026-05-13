'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

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

export default function TenderDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const source = searchParams.get('source') || 'cf'

  const [tender, setTender] = useState<TenderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/tenders/${encodeURIComponent(id)}?source=${source}`)
      .then((res) => {
        if (!res.ok) throw new Error('Tender not found')
        return res.json()
      })
      .then((data) => {
        setTender(data.tender)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id, source])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    } catch { return dateStr }
  }

  const daysUntilDeadline = (deadline: string | null) => {
    if (!deadline) return null
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return 'Closed'
    if (diff === 0) return 'Closes today'
    if (diff === 1) return '1 day remaining'
    return `${diff} days remaining`
  }

  if (loading) {
    return (
      <main>
        <section className="tender-detail">
          <div className="container">
            <div className="tenders-list__loading">
              <div className="tenders-list__spinner" />
              <p>Loading tender details…</p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error || !tender) {
    return (
      <main>
        <section className="tender-detail">
          <div className="container">
            <div className="tender-detail__error">
              <h2>Tender Not Found</h2>
              <p>This opportunity may have been removed or is no longer available.</p>
              <Link href="/tenders" className="btn btn-primary">Back to Live Tenders</Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const urgency = daysUntilDeadline(tender.deadline)

  return (
    <main>
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

              {tender.documents.length > 0 && (
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
                <p>Our evaluator-trained writers have a 92% win rate across 200+ health and social care submissions.</p>
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
