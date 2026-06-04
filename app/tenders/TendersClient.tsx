'use client'

import { useEffect, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import type { RootState, AppDispatch } from '@/store'
import { fetchTenders, setCategory, setSource, setPage, clearCache } from '@/store/tendersSlice'
import {
  ALL_CARE_CATEGORY,
  CARE_CATEGORY_GROUPS,
  filterTendersByCareCategory,
  getCareCategoryById,
} from '@/lib/tender-categories'
import {
  officialNoticeUrl,
  officialSourceLinkLabel,
  sourceParamFromLabel,
} from '@/lib/tender-sources'

const SOURCES = [
  { label: 'All notices', value: 'all' },
  { label: 'Standard notices', value: 'cf' },
  { label: 'Above-threshold notices', value: 'ft' },
] as const

const ITEMS_PER_PAGE = 10

export default function TendersClient() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: allTenders, loading, error, category, source, page, lastFetchKey, newCount } =
    useSelector((state: RootState) => state.tenders)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    if (lastFetchKey !== source) {
      dispatch(fetchTenders({ source }))
    }
  }, [dispatch, source, lastFetchKey])

  const filteredTenders = useMemo(
    () => filterTendersByCareCategory(allTenders, category),
    [allTenders, category],
  )

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

  const totalPages = Math.max(1, Math.ceil(filteredTenders.length / ITEMS_PER_PAGE))
  const pageTenders = filteredTenders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const sidebarFilters = (
    <nav className="tenders-sidebar__nav" aria-label="Filter by care setting">
      <button
        type="button"
        className={`tenders-sidebar__item${category === '' ? ' tenders-sidebar__item--active' : ''}`}
        onClick={() => handleCategorySelect('')}
      >
        {ALL_CARE_CATEGORY.label}
        {!loading && category === '' && (
          <span className="tenders-sidebar__count">{allTenders.length}</span>
        )}
      </button>

      {CARE_CATEGORY_GROUPS.map((group) => (
        <div key={group.title} className="tenders-sidebar__group">
          <p className="tenders-sidebar__group-title">{group.title}</p>
          <ul className="tenders-sidebar__list">
            {group.categories.map((cat) => {
              const count = filterTendersByCareCategory(allTenders, cat.id).length
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
          </div>

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
                {category
                  ? `No published tenders match “${activeCategoryLabel}” right now. Try another care setting or check back soon.`
                  : 'No active tenders published yet. Check back soon.'}
              </p>
              {category && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => handleCategorySelect('')}
                >
                  Show all care settings
                </button>
              )}
            </div>
          )}

          {!loading && !error && filteredTenders.length > 0 && (
            <>
              <div className="tenders-list__count">
                {category ? (
                  <>
                    <span className="tenders-list__count-filter">{activeCategoryLabel}</span>
                    {' · '}
                  </>
                ) : null}
                Newest first
                {newCount > 0 ? ` · ${newCount} new since your last refresh` : ''}
                {' · '}
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filteredTenders.length)} of{' '}
                {filteredTenders.length}{' '}
                {filteredTenders.length === 1 ? 'opportunity' : 'opportunities'}
              </div>

              <div className="tenders-list__grid">
                {pageTenders.map((tender, idx) => {
                  const urgency = daysUntilDeadline(tender.deadline)
                  return (
                    <article
                      key={`${tender.id}-${(page - 1) * ITEMS_PER_PAGE + idx}`}
                      className={`tender-card${tender.isNew ? ' tender-card--new' : ''}`}
                    >
                      <div className="tender-card__header">
                        {tender.isNew && (
                          <span className="tender-card__new">New</span>
                        )}
                        <span className="tender-card__status">{tender.status}</span>
                        {urgency && (
                          <span
                            className={`tender-card__urgency${urgency === 'Closed' ? ' tender-card__urgency--closed' : ''}`}
                          >
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
                        <Link
                          href={`/tenders/${encodeURIComponent(tender.id)}?source=${sourceParamFromLabel(tender.source)}`}
                          className="btn btn-primary"
                        >
                          View details
                        </Link>
                        <a
                          href={officialNoticeUrl(
                            tender.id,
                            tender.source,
                            tender.url,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost tender-card__source-link"
                        >
                          {officialSourceLinkLabel(tender.source)}
                          <span aria-hidden> ↗</span>
                        </a>
                        <Link
                          href="/contact?utm_source=tenders&utm_medium=card&utm_campaign=lead"
                          className="btn btn-ghost"
                        >
                          Need help with this bid?
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <div className="tenders-list__pagination">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={page <= 1}
                    onClick={() => {
                      dispatch(setPage(Math.max(1, page - 1)))
                      window.scrollTo({ top: 280, behavior: 'smooth' })
                    }}
                  >
                    Previous
                  </button>
                  <span className="tenders-list__page">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={page >= totalPages}
                    onClick={() => {
                      dispatch(setPage(page + 1))
                      window.scrollTo({ top: 280, behavior: 'smooth' })
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
