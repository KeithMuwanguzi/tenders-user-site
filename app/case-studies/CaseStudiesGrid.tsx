'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContractWonMedallion from '@/components/ContractWonMedallion'
import {
  CASE_STUDIES,
  CATEGORY_FILTERS,
  CONTRACT_FILTERS,
  COUNCIL_FILTERS,
} from '@/lib/case-studies-data'

export default function CaseStudiesGrid() {
  const [category, setCategory] = useState('')
  const [contract, setContract] = useState('')
  const [council, setCouncil] = useState('')

  const filtered = useMemo(() => CASE_STUDIES.filter((study) => {
    if (category && study.category !== category) return false
    if (contract && study.contractType !== contract) return false
    if (council && study.council !== council) return false
    return true
  }), [category, contract, council])

  const hasFilter = Boolean(category || contract || council)
  const clearAll = () => {
    setCategory('')
    setContract('')
    setCouncil('')
  }

  return (
    <section className="ep-case-library">
      <div className="ep-shell">
        <div className="ep-case-filters" role="group" aria-label="Filter case studies">
          <label>
            <span>Care setting</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {CATEGORY_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>{filter.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Contract route</span>
            <select value={contract} onChange={(event) => setContract(event.target.value)}>
              {CONTRACT_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>{filter.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Authority</span>
            <select value={council} onChange={(event) => setCouncil(event.target.value)}>
              {COUNCIL_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>{filter.label}</option>
              ))}
            </select>
          </label>
          <div className="ep-case-filters__status" aria-live="polite">
            <span><strong>{filtered.length}</strong> documented {filtered.length === 1 ? 'case' : 'cases'}</span>
            {hasFilter ? <button type="button" onClick={clearAll}>Clear filters</button> : null}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="ep-case-empty">
            <h2>No case studies match all three filters.</h2>
            <p>Remove one filter or reset the library to see every documented case.</p>
            <button type="button" className="ep-button" onClick={clearAll}>Show all case studies</button>
          </div>
        ) : (
          <div className="ep-case-grid">
            {filtered.map((study, index) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className={`ep-case-card${index === 0 && !hasFilter ? ' ep-case-card--featured' : ''}`}
              >
                <div className="ep-case-card__image">
                  <Image
                    src={study.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  <span>{study.categoryLabel}</span>
                </div>
                <div className="ep-case-card__body">
                  <ContractWonMedallion className="contract-won-medallion--library" />
                  <p>{study.council} · {study.contractType}</p>
                  <h2>{study.title}</h2>
                  <dl>
                    <div>
                      <dt>Starting position</dt>
                      <dd>{study.startingPosition}</dd>
                    </div>
                    <div>
                      <dt>Recorded result</dt>
                      <dd>{study.result} · {study.lots}</dd>
                    </div>
                  </dl>
                  <span className="ep-case-card__link">Inspect the evidence <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
