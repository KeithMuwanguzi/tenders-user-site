'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const frames = [
  { src: '/images/editorial/tenderlab-live-tenders-hero-v1.webp', alt: 'A specialist reviewing current public-sector tender opportunities' },
  { src: '/images/editorial/tenderlab-care-evidence-hero-v1.webp', alt: 'Care delivery evidence being prepared for a tender response' },
  { src: '/images/editorial/tenderlab-pre-submission-review-hero-v1.webp', alt: 'A healthcare tender response undergoing independent review' },
  { src: '/images/editorial/tenderlab-proof-hero-v1.webp', alt: 'A public-sector evaluator reviewing tender evidence' },
]

export default function TenderPhotoChapter() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight))
      section.style.setProperty('--chapter-shift', `${progress * 70}px`)
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame) }
  }, [])

  return (
    <section ref={sectionRef} className="tl-photo-chapter" aria-labelledby="tender-photo-title" data-reveal>
      <div className="tl-photo-chapter__words" aria-hidden="true">
        <span>READ THE NOTICE</span><span>CHECK THE FIT</span><span>PROVE THE SERVICE</span>
      </div>
      <div className="tl-shell tl-photo-chapter__layout">
        <div className="tl-photo-chapter__copy">
          <p className="tl-kicker">Tender intelligence in practice</p>
          <h2 id="tender-photo-title">See the work before you commit to it.</h2>
          <p>Live opportunities are only useful when the service, geography, eligibility and deadline fit your organisation. Start with the tender, then decide whether it deserves your team’s time.</p>
          <Link href="/tenders" className="tl-button tl-button--primary">Go to tenders <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="tl-photo-chapter__gallery">
          {frames.map((frame, index) => (
            <figure key={frame.src} className={`tl-photo-chapter__frame tl-photo-chapter__frame--${index + 1}`}>
              <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 760px) 70vw, 30vw" />
              <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
