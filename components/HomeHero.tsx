'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const slides = [
  {
    src: '/images/editorial/tenderlab-care-evidence-hero-v1.webp',
    alt: 'A care professional, operational evidence and a procurement evaluator connected through the tender process',
  },
  {
    src: '/images/editorial/tenderlab-bid-writing-hero-v1.webp',
    alt: 'Tender specialists examining buyer documents alongside evidence from a care service',
  },
  {
    src: '/images/editorial/tenderlab-proof-hero-v1.webp',
    alt: 'A tender evaluator reviewing evidence and scoring information from a care provider',
  },
]

export default function HomeHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="tl-hero tl-hero--rotating" aria-labelledby="tl-hero-title">
      <div className="tl-shell">
        <p className="tl-eyebrow">UK health and social care procurement</p>
        <h1 id="tl-hero-title" className="tl-hero__title">
          <span>Good care is not enough.</span>
          <span>The evaluator has to see it.</span>
        </h1>

        <div className="tl-hero__composition">
          <div className="tl-hero__intro">
            <p>
              TenderLab turns operational reality into council, NHS and ICB submissions that are clear,
              compliant and built for the scoring sheet.
            </p>
            <div className="tl-actions">
              <Link href="/book-consultation" className="tl-button tl-button--primary">
                Book a consultation <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/services" className="tl-text-link">
                Explore tender writing services <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="tl-hero__contacts" aria-label="TenderLab contact details">
              <a href="tel:+441707240393">01707 240393</a>
              <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
            </div>
          </div>

          <div className="tl-hero__visual">
            {slides.map((slide, index) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={index === active ? slide.alt : ''}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                sizes="(max-width: 900px) 100vw, 72vw"
                className={`tl-hero__image${index === active ? ' is-active' : ''}`}
                aria-hidden={index !== active}
              />
            ))}
            <div className="tl-hero__slide-status" aria-hidden="true">
              {slides.map((slide, index) => <span key={slide.src} className={index === active ? 'is-active' : ''} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
