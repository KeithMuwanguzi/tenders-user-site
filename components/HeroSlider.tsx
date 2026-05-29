'use client'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'

const SLIDES = [
  {
    eyebrow: 'Strategic Partnership',
    headline: 'Tender Retainer',
    quote: 'Dedicated tender support with priority access. Your pipeline, our capacity.',
    href: '/services/tender-retainer',
  },
  {
    eyebrow: 'Complete Solution',
    headline: 'Full Tender Writing',
    quote: 'End-to-end tender writing. Specification analysis to submission-ready document.',
    href: '/services/bid-writing',
  },
  {
    eyebrow: 'Quick Assessment',
    headline: 'Tender Review',
    quote: 'Independent scoring against evaluator mark schemes. Know where you stand before you submit.',
    href: '/services/pre-submission-review',
  },
]

const STATS = [
  { value: '92', suffix: '%', label: 'Win Rate' },
  { value: '200', suffix: '+', label: 'Submissions' },
  { value: '10', suffix: '+', label: 'yr Care Sector' },
  { value: '98', suffix: '%', label: 'Client Satisfaction' },
]

const SLIDE_MS = 5800
const EXIT_MS = 480

// Visually-hidden style for the page H1. Renders normally for screen readers
// and search engine crawlers but is invisible on screen so the existing hero
// visual design is unchanged.
const SR_ONLY: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
}

export default function HeroSlider({ children }: { children?: React.ReactNode }) {
  const [idx, setIdx] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const nextRef = useRef(0)

  const transition = useCallback(
    (to: number) => {
      if (isExiting || to === idx) return
      nextRef.current = to
      setIsExiting(true)
    },
    [isExiting, idx]
  )

  useEffect(() => {
    if (!isExiting) return
    const t = setTimeout(() => {
      setIdx(nextRef.current)
      setIsExiting(false)
    }, EXIT_MS)
    return () => clearTimeout(t)
  }, [isExiting])

  useEffect(() => {
    if (isExiting) return
    const t = setTimeout(() => {
      transition((idx + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [idx, isExiting, transition])

  const slide = SLIDES[idx]

  return (
    <section className="hero">
      {/* Page H1 for SEO. Visually hidden so the existing hero visual design
          stays untouched while Google and screen readers see the proper page heading. */}
      <h1 style={SR_ONLY}>
        Tender Writing Services for UK Health and Social Care
      </h1>

      {/* Background (server-rendered for LCP) */}
      {children}
      <div className="hero__overlay" />

      {/* Slide content */}
      <div className="hero__body">
        <div className="container">

          <p className="hero__intro-label">
            Specialist Health &amp; Social Care Bid Writing
          </p>

          <div
            key={idx}
            className={`hero__content${isExiting ? ' is-exiting' : ''}`}
          >
            <p className="hero__eyebrow">{slide.eyebrow}</p>
            <h2 className="hero__headline">{slide.headline}</h2>
            <p className="hero__quote">{slide.quote}</p>
            <Link href={slide.href} className="hero__pill-cta">
              Explore {slide.headline}
              <span className="hero__pill-icon" aria-hidden="true">
                <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 6h22M18 1l5 5-5 5" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Progress indicators */}
          <div className="hero__indicators" role="tablist" aria-label="Slide navigation">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Show ${s.headline}`}
                className={`hero__indicator${i === idx ? ' active' : ''}`}
                onClick={() => transition(i)}
              >
                {i === idx && (
                  <span
                    key={`prog-${idx}`}
                    className="hero__indicator-progress"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Stats shelf */}
      <div className="hero__stats-shelf">
        <div className="container">
          <div className="hero__stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-value">
                  {s.value}<span className="hero__stat-suffix">{s.suffix}</span>
                </div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
