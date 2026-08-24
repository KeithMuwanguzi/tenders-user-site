'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const slides = [
  {
    src: '/images/editorial/tenderlab-care-evidence-hero-v1.webp',
    alt: 'A care professional, operational evidence and a procurement evaluator connected through the tender process',
    label: 'Care delivery',
  },
  {
    src: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
    alt: 'Tender specialists examining buyer documents alongside evidence from a care service',
    label: 'Operational proof',
  },
  {
    src: '/images/editorial/tenderlab-proof-hero-v1.webp',
    alt: 'A tender evaluator reviewing evidence and scoring information from a care provider',
    label: 'Evaluator clarity',
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function HomeHero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [paused])

  const select = (index: number) => {
    setActive(index)
    setPaused(true)
  }

  return (
    <section className="tl-hero" aria-labelledby="tl-hero-title">
      <div className="tl-shell">
        <div
          className="tl-hero__visual"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="tl-hero__slides" aria-live="off">
            {slides.map((slide, index) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={index === active ? slide.alt : ''}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                sizes="(max-width: 900px) 100vw, 96vw"
                className={`tl-hero__image${index === active ? ' is-active' : ''}`}
                aria-hidden={index !== active}
              />
            ))}
          </div>

          <div className="tl-hero__content">
            <p className="tl-eyebrow">UK health and social care procurement</p>
            <h1 id="tl-hero-title" className="tl-hero__title">
              <span>Good care is not enough.</span>
              <span>The evaluator has to see it.</span>
            </h1>
            <p className="tl-hero__intro">
              TenderLab turns operational reality into council, NHS and ICB submissions that are clear,
              compliant and built for the scoring sheet.
            </p>
            <div className="tl-actions">
              <Link href="/contact" className="tl-button tl-button--primary">
                Discuss your tender <Arrow />
              </Link>
            </div>
          </div>

          <div className="tl-hero__controls" aria-label="Choose a hero image">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                className={index === active ? 'is-active' : ''}
                onClick={() => select(index)}
                aria-pressed={index === active}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {slide.label}
              </button>
            ))}
          </div>

          <div className="tl-hero__contacts" aria-label="TenderLab contact details">
            <a href="tel:+441707240393">01707 240393</a>
            <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
          </div>
        </div>
      </div>
    </section>
  )
}
