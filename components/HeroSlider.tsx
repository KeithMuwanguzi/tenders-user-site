'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'

const SLIDES = [
  {
    eyebrow: 'Strategic Partnership',
    headline: 'Tender Retainer',
    quote: 'Dedicated tender support with priority access. Your pipeline, our capacity.',
    href: '/contact',
  },
  {
    eyebrow: 'Complete Solution',
    headline: 'Full Tender Writing',
    quote: 'End-to-end tender writing. Specification analysis to submission-ready document.',
    href: '/contact',
  },
  {
    eyebrow: 'Quick Assessment',
    headline: 'Tender Review',
    quote: 'Independent scoring against evaluator mark schemes. Know where you stand before you submit.',
    href: '/contact',
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

export default function HeroSlider() {
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
      {/* ── Background ── */}
      <div className="hero__bg">
        <Image
          src="/images/business-people-video-call-meeting.jpg"
          alt="Professional bid writing consultation"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>
      <div className="hero__overlay" />

      {/* ── Slide content ── */}
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
            <h1 className="hero__headline">{slide.headline}</h1>
            <p className="hero__quote">&ldquo;{slide.quote}&rdquo;</p>
            <Link href={slide.href} className="hero__pill-cta">
              Get a Free Consultation
              <span className="hero__pill-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </Link>
          </div>

          {/* ── Progress indicators ── */}
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

      {/* ── Stats shelf ── */}
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
