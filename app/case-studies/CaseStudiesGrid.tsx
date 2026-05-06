'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CASE_STUDIES, CATEGORY_FILTERS, CONTRACT_FILTERS, COUNCIL_FILTERS,
} from '@/lib/case-studies-data'

function WonStamp() {
  return (
    <div className="cs-card__stamp" aria-label="Awarded">
      <span className="cs-card__stamp-word">WON</span>
    </div>
  )
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CaseStudiesGrid() {
  const [category, setCategory] = useState('')
  const [contract, setContract] = useState('')
  const [council,  setCouncil]  = useState('')

  const filtered = useMemo(() => CASE_STUDIES.filter(cs => {
    if (category && cs.category !== category) return false
    if (contract && cs.contractType !== contract) return false
    if (council  && cs.council !== council)      return false
    return true
  }), [category, contract, council])

  const hasFilter = !!(category || contract || council)
  function clearAll() { setCategory(''); setContract(''); setCouncil('') }

  return (
    <>
      {/* ── Sticky filter bar ── */}
      <div className="cs-filters">
        <div className="container">
          <div className="cs-filters__row">

            {/* Category pills */}
            <div className="cs-filters__pills" role="group" aria-label="Filter by care setting">
              {CATEGORY_FILTERS.map(f => (
                <button
                  key={f.value}
                  className={`cs-pill${category === f.value ? ' cs-pill--active' : ''}`}
                  onClick={() => setCategory(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="cs-filters__selects">
              <div className="cs-select-wrap">
                <select className="cs-select" value={council}
                  onChange={e => setCouncil(e.target.value)} aria-label="Filter by council">
                  {COUNCIL_FILTERS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                <span className="cs-select__chevron"><ChevronDown /></span>
              </div>

              <div className="cs-select-wrap">
                <select className="cs-select" value={contract}
                  onChange={e => setContract(e.target.value)} aria-label="Filter by contract type">
                  {CONTRACT_FILTERS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                <span className="cs-select__chevron"><ChevronDown /></span>
              </div>

              {hasFilter && (
                <button className="cs-filters__clear" onClick={clearAll}>
                  Clear filters
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="cs-grid-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="cs-empty">
              <p>No case studies match those filters.</p>
              <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={clearAll}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="cs-grid-header">
                <p className="cs-count">
                  <strong>{filtered.length}</strong> case {filtered.length === 1 ? 'study' : 'studies'}
                  {hasFilter ? ' matching filters' : ''}
                </p>
              </div>

              <div className="cs-grid">
                {filtered.map((cs, idx) => (
                  <Link
                    key={cs.slug}
                    href={`/case-studies/${cs.slug}`}
                    className="cs-card"
                    style={{ '--card-accent': cs.accentColor } as React.CSSProperties}
                  >
                    {/* ── Image zone ── */}
                    <div className="cs-card__img-wrap">
                      <Image
                        src={cs.image}
                        alt={`Award letter — ${cs.title}`}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1100px) 50vw, 33vw"
                        className="cs-card__img"
                        unoptimized
                      />
                      <div className="cs-card__overlay" />

                      {/* Category tag */}
                      <span className="cs-card__cat-tag" style={{ background: cs.accentColor }}>
                        {cs.categoryLabel}
                      </span>

                      {/* WON stamp */}
                      <WonStamp />

                      {/* Image footer */}
                      <div className="cs-card__img-footer">
                        <span className="cs-card__img-council">{cs.council}</span>
                        <span className="cs-card__img-contract">{cs.contractType}</span>
                      </div>
                    </div>

                    {/* ── Content zone ── */}
                    <div className="cs-card__body">

                      {/* Result callout */}
                      <div className="cs-card__result" style={{ borderLeftColor: cs.accentColor }}>
                        <span className="cs-card__result-label">Result</span>
                        <span className="cs-card__result-value">{cs.transformation}</span>
                      </div>

                      {/* Title + complexity */}
                      <div className="cs-card__main">
                        <span className="cs-card__complexity">{cs.complexity}</span>
                        <h3 className="cs-card__title">{cs.title}</h3>
                      </div>

                      {/* Footer */}
                      <div className="cs-card__foot">
                        <span className="cs-card__num">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="cs-card__read" style={{ color: cs.accentColor }}>
                          Read case study
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M3 7h8M7.5 3l4 4-4 4" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
