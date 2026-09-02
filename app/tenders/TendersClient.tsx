'use client'

import { useEffect, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import type { RootState, AppDispatch } from '@/store'
import { fetchTenders, setCategory, setSource, setPage, clearCache, type Tender } from '@/store/tendersSlice'
import {
  ALL_CARE_CATEGORY,
  CARE_CATEGORY_GROUPS,
  filterTendersByCareCategory,
  getCareCategoryById,
  inferCareCategoryLabel,
} from '@/lib/tender-categories'
import {
  officialNoticeUrl,
} from '@/lib/tender-sources'

const SOURCES = [
  { label: 'All notices', value: 'all' },
  { label: 'Standard notices', value: 'cf' },
  { label: 'Above-threshold notices', value: 'ft' },
] as const

const DEFAULT_ITEMS_PER_PAGE = 15
const SAVED_TENDERS_KEY = 'tenderlab-saved-tenders'

function decodeTenderText(value: string | null | undefined) {
  return String(value || '')
    .replace(/&amp;/gi, '&')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
}

type MetaIconName = 'authority' | 'value' | 'published' | 'deadline'

function TenderMetaIcon({ name }: { name: MetaIconName }) {
  if (name === 'value') return <span aria-hidden>£</span>
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {name === 'authority' && <><path d="M3 21h18" /><path d="M5 21V9l7-4 7 4v12" /><path d="M9 21v-7h6v7" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>}
      {name === 'published' && <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="M8 14h2M14 14h2M8 17h2M14 17h2" /></>}
      {name === 'deadline' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
    </svg>
  )
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.5L6 21Z" />
    </svg>
  )
}

function paginationRange(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  const ordered = [...pages].filter((item) => item > 0 && item <= total).sort((a, b) => a - b)
  const result: Array<number | 'ellipsis'> = []
  ordered.forEach((item, index) => {
    if (index > 0 && item - ordered[index - 1] > 1) result.push('ellipsis')
    result.push(item)
  })
  return result
}

function buildTenderEnquiryHref(tender: {
  id: string
  title: string
  description: string
  organisation?: string | null
  deadline?: string | null
  category?: string | null
  location?: string | null
}) {
  const params = new URLSearchParams({
    utm_source: 'tender_detail',
    utm_medium: 'listing',
    utm_campaign: 'lead',
    tenderTitle: tender.title,
    tenderDescription: tender.description.slice(0, 600),
    tenderUrl: `/tenders/${encodeURIComponent(tender.id)}`,
  })
  if (tender.organisation) params.set('authority', tender.organisation)
  if (tender.deadline) params.set('deadline', tender.deadline.slice(0, 10))
  const serviceType = inferCareCategoryLabel(tender)
  if (serviceType) params.set('serviceType', serviceType)
  return `/contact?${params.toString()}#enquiry`
}

export default function TendersClient({
  initialTenders = [],
  initialCategory,
}: {
  initialTenders?: Tender[]
  initialCategory?: string
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { items: allTenders, loading, error, category, source, page, lastFetchKey, newCount } =
    useSelector((state: RootState) => state.tenders)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchDraft, setSearchDraft] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'deadline'>('newest')
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [savedTenderIds, setSavedTenderIds] = useState<Set<string>>(new Set())
  const [savedOnly, setSavedOnly] = useState(false)
  const [bookmarkNotice, setBookmarkNotice] = useState('')
  const availableTenders = allTenders.length > 0 ? allTenders : initialTenders

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(SAVED_TENDERS_KEY) || '[]') as unknown
      if (Array.isArray(stored)) setSavedTenderIds(new Set(stored.filter((item): item is string => typeof item === 'string')))
    } catch {
      window.localStorage.removeItem(SAVED_TENDERS_KEY)
    }
  }, [])

  useEffect(() => {
    if (initialCategory) dispatch(setCategory(initialCategory))
  }, [dispatch, initialCategory])

  useEffect(() => {
    if (lastFetchKey !== source) {
      dispatch(fetchTenders({ source }))
    }
  }, [dispatch, source, lastFetchKey])

  const filteredTenders = useMemo(() => {
    const categoryMatches = filterTendersByCareCategory(availableTenders, category)
    const savedMatches = savedOnly
      ? categoryMatches.filter((tender) => savedTenderIds.has(tender.id))
      : categoryMatches
    const query = searchQuery.trim().toLowerCase()
    const searched = query
      ? savedMatches.filter((tender) =>
          [
            tender.title,
            tender.description,
            tender.organisation,
            tender.location,
            tender.category,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(query),
        )
      : savedMatches

    return [...searched].sort((a, b) => {
      if (sortBy === 'deadline') {
        const aTime = a.deadline ? new Date(a.deadline).getTime() : Number.MAX_SAFE_INTEGER
        const bTime = b.deadline ? new Date(b.deadline).getTime() : Number.MAX_SAFE_INTEGER
        return aTime - bTime
      }
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    })
  }, [availableTenders, category, savedOnly, savedTenderIds, searchQuery, sortBy])

  const activeCategoryLabel =
    getCareCategoryById(category)?.label ?? ALL_CARE_CATEGORY.label

  const handleRefetch = useCallback(() => {
    dispatch(clearCache())
    dispatch(fetchTenders({ source }))
  }, [dispatch, source])

  const handleCategorySelect = (id: string) => {
    dispatch(setCategory(id))
    setMobileFiltersOpen(false)
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const daysUntilDeadline = (deadline: string | null) => {
    if (!deadline) return null
    const diff = Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    )
    if (diff < 0) return 'Closed'
    if (diff === 0) return 'Today'
    if (diff === 1) return '1 day left'
    return `${diff} days left`
  }

  const totalPages = Math.max(1, Math.ceil(filteredTenders.length / itemsPerPage))
  const pageTenders = filteredTenders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  const toggleSavedTender = (id: string) => {
    setSavedTenderIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
        setBookmarkNotice('Tender removed from your saved list.')
      } else {
        next.add(id)
        setBookmarkNotice('Tender saved on this device. Use “Saved tenders” to view it again.')
      }
      window.localStorage.setItem(SAVED_TENDERS_KEY, JSON.stringify([...next]))
      return next
    })
  }

  const changePage = (nextPage: number) => {
    dispatch(setPage(Math.min(totalPages, Math.max(1, nextPage))))
    window.scrollTo({ top: 280, behavior: 'smooth' })
  }

  const sidebarFilters = (
    <nav className="tenders-sidebar__nav" aria-label="Filter by care setting">
      <button
        type="button"
        className={`tenders-sidebar__item${category === '' ? ' tenders-sidebar__item--active' : ''}`}
        onClick={() => handleCategorySelect('')}
      >
        {ALL_CARE_CATEGORY.label}
        {!loading && category === '' && (
          <span className="tenders-sidebar__count">{availableTenders.length}</span>
        )}
      </button>

      {CARE_CATEGORY_GROUPS.map((group) => (
        <div key={group.title} className="tenders-sidebar__group">
          <p className="tenders-sidebar__group-title">{group.title}</p>
          <ul className="tenders-sidebar__list">
            {group.categories.map((cat) => {
              const count = filterTendersByCareCategory(availableTenders, cat.id).length
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    className={`tenders-sidebar__item${category === cat.id ? ' tenders-sidebar__item--active' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <span className="tenders-sidebar__item-label">{cat.label}</span>
                    {!loading && count > 0 && (
                      <span className="tenders-sidebar__count">{count}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <section className="tenders-layout">
      <div className="container tenders-layout__container">
        {/* Mobile: compact filter trigger */}
        <div className="tenders-layout__mobile-bar">
          <button
            type="button"
            className="tenders-layout__mobile-filter-btn"
            onClick={() => setMobileFiltersOpen((o) => !o)}
            aria-expanded={mobileFiltersOpen}
            aria-controls="tenders-care-filters"
          >
            <span className="tenders-layout__mobile-filter-label">Care setting</span>
            <span className="tenders-layout__mobile-filter-value">{activeCategoryLabel}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {mobileFiltersOpen && (
            <div id="tenders-care-filters" className="tenders-layout__mobile-panel">
              {sidebarFilters}
            </div>
          )}
        </div>

        <aside className="tenders-sidebar" aria-label="Care setting filters">
          <div className="tenders-sidebar__inner">
            <h2 className="tenders-sidebar__heading">Care setting</h2>
            <p className="tenders-sidebar__hint">
              Filter published opportunities by type of service.
            </p>
            {sidebarFilters}
          </div>
        </aside>

        <div className="tenders-main">
          <form
            className="tenders-discovery"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              setSearchQuery(searchDraft)
              dispatch(setPage(1))
            }}
          >
            <div className="tenders-discovery__search">
              <label htmlFor="tender-search">Search live tenders</label>
              <div className="tenders-discovery__search-row">
                <input
                  id="tender-search"
                  type="search"
                  value={searchDraft}
                  onChange={(event) => setSearchDraft(event.target.value)}
                  placeholder="Try domiciliary care, supported living, council or region"
                />
                <button type="submit">Search</button>
              </div>
            </div>
            <div className="tenders-discovery__control">
              <label htmlFor="tender-sort">Order</label>
              <select
                id="tender-sort"
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value as 'newest' | 'deadline')
                  dispatch(setPage(1))
                }}
              >
                <option value="newest">Most recently published</option>
                <option value="deadline">Closing soon</option>
              </select>
            </div>
            <div className="tenders-discovery__control">
              <label htmlFor="tender-page-size">Show</label>
              <select
                id="tender-page-size"
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value))
                  dispatch(setPage(1))
                }}
              >
                {[15, 30, 60, 150].map((size) => (
                  <option key={size} value={size}>{size} per page</option>
                ))}
              </select>
            </div>
          </form>

          <div className="tenders-main__toolbar">
            <div className="tenders-main__sources" role="group" aria-label="Data source">
              {SOURCES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`tenders-main__source-btn${source === s.value ? ' tenders-main__source-btn--active' : ''}`}
                  onClick={() => dispatch(setSource(s.value))}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {newCount > 0 && !loading && (
              <span className="tenders-main__new-pill" aria-live="polite">
                {newCount} new since last refresh
              </span>
            )}
            <button
              type="button"
              className="tenders-main__refetch"
              onClick={handleRefetch}
              disabled={loading}
              title="Refresh list"
            >
              <svg
                className={loading ? 'tenders-filters__refetch-spin' : ''}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
              Refresh
            </button>
            <button
              type="button"
              className={`tenders-main__saved${savedOnly ? ' is-active' : ''}`}
              aria-pressed={savedOnly}
              onClick={() => {
                setSavedOnly((current) => !current)
                dispatch(setPage(1))
              }}
            >
              <BookmarkIcon filled={savedOnly} />
              Saved tenders <span>{savedTenderIds.size}</span>
            </button>
          </div>

          <p className="tenders-save-notice" role="status" aria-live="polite">{bookmarkNotice}</p>

          {loading && (
            <div className="tenders-list__loading">
              <div className="tenders-list__spinner" />
              <p>Loading live opportunities…</p>
            </div>
          )}

          {error && (
            <div className="tenders-list__error">
              <p>Unable to load tenders at the moment. Please try again later.</p>
              <button type="button" className="btn btn-primary" onClick={handleRefetch}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && filteredTenders.length === 0 && (
            <div className="tenders-list__empty">
              <p>
                {savedOnly
                  ? 'You have no saved tenders in this view. Select the bookmark on any tender to keep it on this device.'
                  : category
                  ? `No published tenders match “${activeCategoryLabel}” right now. Try another care setting or check back soon.`
                  : 'No active tenders published yet. Check back soon.'}
              </p>
              {(category || savedOnly) && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    handleCategorySelect('')
                    setSavedOnly(false)
                  }}
                >
                  Show all live tenders
                </button>
              )}
            </div>
          )}

          {!loading && !error && filteredTenders.length > 0 && (
            <>
              <div className="tenders-list__summary">
                <div className="tenders-list__count">
                  {category ? <><span className="tenders-list__count-filter">{activeCategoryLabel}</span>{' · '}</> : null}
                  Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, filteredTenders.length)} of {filteredTenders.length} {filteredTenders.length === 1 ? 'tender' : 'tenders'}
                </div>
                <div className="tenders-view-toggle" role="group" aria-label="Tender card layout">
                  <button type="button" className={viewMode === 'list' ? 'is-active' : ''} aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')} title="List view">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                    <span className="sr-only">List view</span>
                  </button>
                  <button type="button" className={viewMode === 'grid' ? 'is-active' : ''} aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')} title="Grid view">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                    <span className="sr-only">Grid view</span>
                  </button>
                </div>
              </div>

              <div className={`tenders-list__grid tenders-list__grid--${viewMode}`}>
                {pageTenders.map((tender, idx) => {
                  const urgency = daysUntilDeadline(tender.deadline)
                  const saved = savedTenderIds.has(tender.id)
                  return (
                    <article
                      key={`${tender.id}-${(page - 1) * itemsPerPage + idx}`}
                      className={`tender-card${tender.isNew ? ' tender-card--new' : ''}`}
                    >
                      <button type="button" className={`tender-card__bookmark${saved ? ' is-saved' : ''}`} aria-pressed={saved} onClick={() => toggleSavedTender(tender.id)} title={saved ? 'Remove from saved tenders' : 'Save this tender'}>
                        <BookmarkIcon filled={saved} />
                        <span className="sr-only">{saved ? 'Remove from saved tenders' : 'Save this tender'}</span>
                      </button>
                      <div className="tender-card__main">
                        <div className="tender-card__header">
                          {tender.isNew && <span className="tender-card__new">New</span>}
                          <span className="tender-card__status">{tender.status}</span>
                          {urgency && <span className={`tender-card__urgency${urgency === 'Closed' ? ' tender-card__urgency--closed' : ''}`}>{urgency}</span>}
                        </div>
                        <h3 className="tender-card__title">{decodeTenderText(tender.title)}</h3>
                        <p className="tender-card__desc">{decodeTenderText(tender.description.length > 220 ? tender.description.slice(0, 220) + '…' : tender.description)}</p>
                        <div className="tender-card__actions">
                          <Link href={`/tenders/${encodeURIComponent(tender.id)}`} className="btn btn-primary">View full tender <span aria-hidden>↗</span></Link>
                          <a href={officialNoticeUrl(tender.id, tender.source, tender.url)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost tender-card__source-link">View official notice <span aria-hidden>↗</span></a>
                          <Link href={buildTenderEnquiryHref(tender)} className="btn btn-ghost">Ask about this tender <span aria-hidden="true">↗</span></Link>
                        </div>
                      </div>
                      <div className="tender-card__meta">
                        <div className="tender-card__meta-item">
                          <span className="tender-card__meta-icon"><TenderMetaIcon name="authority" /></span>
                          <span><span className="tender-card__meta-label">Authority</span><strong>{decodeTenderText(tender.organisation) || 'Not stated'}</strong>{tender.location && <small>{decodeTenderText(tender.location)}</small>}</span>
                        </div>
                        <div className="tender-card__meta-item">
                          <span className="tender-card__meta-icon"><TenderMetaIcon name="value" /></span>
                          <span><span className="tender-card__meta-label">Value</span><strong>{tender.value || 'Not stated'}</strong></span>
                        </div>
                        <div className="tender-card__meta-item">
                          <span className="tender-card__meta-icon"><TenderMetaIcon name="published" /></span>
                          <span><span className="tender-card__meta-label">Published</span><strong>{formatDate(tender.publishedDate)}</strong></span>
                        </div>
                        {tender.deadline && (
                          <div className="tender-card__meta-item">
                            <span className="tender-card__meta-icon"><TenderMetaIcon name="deadline" /></span>
                            <span><span className="tender-card__meta-label">Deadline</span><strong>{formatDate(tender.deadline)}</strong></span>
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <nav className="tenders-list__pagination" aria-label="Tender result pages">
                  <button type="button" disabled={page <= 1} onClick={() => changePage(page - 1)} aria-label="Previous page">‹</button>
                  {paginationRange(page, totalPages).map((item, index) => item === 'ellipsis'
                    ? <span key={`ellipsis-${index}`} className="tenders-list__ellipsis">…</span>
                    : <button key={item} type="button" className={page === item ? 'is-current' : ''} aria-current={page === item ? 'page' : undefined} onClick={() => changePage(item)}>{item}</button>)}
                  <button type="button" disabled={page >= totalPages} onClick={() => changePage(page + 1)} aria-label="Next page">›</button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
