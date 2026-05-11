'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Tender {
  id: string
  title: string
  description: string
  publishedDate: string
  deadline: string | null
  value: string | null
  location: string | null
  organisation: string | null
  status: string
  url: string
}

const ITEMS_PER_PAGE = 10

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Domiciliary Care', value: 'domiciliary care' },
  { label: 'Supported Living', value: 'supported living' },
  { label: 'Residential Care', value: 'residential care' },
  { label: 'Children\'s Services', value: 'children services care' },
  { label: 'Mental Health', value: 'mental health care services' },
  { label: 'Nursing Care', value: 'nursing care services' },
  { label: 'Housing Support', value: 'housing support services' },
  { label: 'Community Health', value: 'community health services' },
]

export default function LiveTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setPage(1)

    const searchTerm = category || 'health social care'
    const apiUrl = `/api/tenders?q=${encodeURIComponent(searchTerm)}`

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tenders')
        return res.json()
      })
      .then((data) => {
        setTenders(data.tenders || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [category])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    } catch { return dateStr }
  }

  const daysUntilDeadline = (deadline: string | null) => {
    if (!deadline) return null
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return 'Closed'
    if (diff === 0) return 'Today'
    if (diff === 1) return '1 day left'
    return `${diff} days left`
  }

  return (
    <>
      {/* Page hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Procurement Opportunities</div>
          <h1>Live Tenders</h1>
          <p className="page-hero__desc">
            Active health and social care procurement opportunities from Contracts Finder. 
            Updated in real time from the UK Government&apos;s official tender publication service.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="tenders-filters">
        <div className="container">
          <div className="tenders-filters__bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`tenders-filters__btn${category === cat.value ? ' tenders-filters__btn--active' : ''}`}
                onClick={() => { setCategory(cat.value); setPage(1) }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tenders list */}
      <section className="tenders-list">
        <div className="container">
          {loading && (
            <div className="tenders-list__loading">
              <div className="tenders-list__spinner" />
              <p>Fetching live opportunities from Contracts Finder…</p>
            </div>
          )}

          {error && (
            <div className="tenders-list__error">
              <p>Unable to load tenders at the moment. Please try again later.</p>
              <button className="btn btn-primary" onClick={() => setPage(page)}>Retry</button>
            </div>
          )}

          {!loading && !error && tenders.length === 0 && (
            <div className="tenders-list__empty">
              <p>No active tenders found for this category. Try a different filter or check back soon.</p>
            </div>
          )}

          {!loading && !error && tenders.length > 0 && (
            <>
              <div className="tenders-list__count">
                Showing {((page - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(page * ITEMS_PER_PAGE, tenders.length)} of {tenders.length} opportunities
              </div>
              <div className="tenders-list__grid">
                {tenders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((tender, idx) => {
                  const urgency = daysUntilDeadline(tender.deadline)
                  return (
                    <article key={`${tender.id}-${(page - 1) * ITEMS_PER_PAGE + idx}`} className="tender-card">
                      <div className="tender-card__header">
                        <span className="tender-card__status">{tender.status}</span>
                        {urgency && (
                          <span className={`tender-card__urgency${urgency === 'Closed' ? ' tender-card__urgency--closed' : ''}`}>
                            {urgency}
                          </span>
                        )}
                      </div>
                      <h3 className="tender-card__title">{tender.title}</h3>
                      <p className="tender-card__desc">
                        {tender.description.length > 200
                          ? tender.description.slice(0, 200) + '…'
                          : tender.description}
                      </p>
                      <div className="tender-card__meta">
                        {tender.organisation && (
                          <div className="tender-card__meta-item">
                            <span className="tender-card__meta-label">Authority</span>
                            <span>{tender.organisation}</span>
                          </div>
                        )}
                        {tender.location && (
                          <div className="tender-card__meta-item">
                            <span className="tender-card__meta-label">Location</span>
                            <span>{tender.location}</span>
                          </div>
                        )}
                        {tender.value && (
                          <div className="tender-card__meta-item">
                            <span className="tender-card__meta-label">Value</span>
                            <span>{tender.value}</span>
                          </div>
                        )}
                        <div className="tender-card__meta-item">
                          <span className="tender-card__meta-label">Published</span>
                          <span>{formatDate(tender.publishedDate)}</span>
                        </div>
                        {tender.deadline && (
                          <div className="tender-card__meta-item">
                            <span className="tender-card__meta-label">Deadline</span>
                            <span>{formatDate(tender.deadline)}</span>
                          </div>
                        )}
                      </div>
                      <div className="tender-card__actions">
                        <a href={tender.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          View on Contracts Finder
                        </a>
                        <Link href="/contact" className="btn btn-ghost">
                          Get Help Bidding
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* Pagination */}
              <div className="tenders-list__pagination">
                <button
                  className="btn btn-ghost"
                  disabled={page <= 1}
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }) }}
                >
                  ← Previous
                </button>
                <span className="tenders-list__page">
                  Page {page} of {Math.ceil(tenders.length / ITEMS_PER_PAGE)}
                </span>
                <button
                  className="btn btn-ghost"
                  disabled={page >= Math.ceil(tenders.length / ITEMS_PER_PAGE)}
                  onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 300, behavior: 'smooth' }) }}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <h2>Need Help Winning a Tender?</h2>
            <p>Our evaluator-trained writers have a 92% win rate across 200+ health and social care submissions.</p>
            <div className="cta-banner__actions">
              <Link href="/score-my-response" className="btn btn-white">Score My Response</Link>
              <Link href="/contact" className="btn btn-outline-white">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
