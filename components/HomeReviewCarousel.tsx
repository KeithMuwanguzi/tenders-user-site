'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { VERIFIED_CLIENT_REVIEWS } from '@/lib/client-proof'

export default function HomeReviewCarousel() {
  const track = useRef<HTMLDivElement>(null)
  const move = (direction: -1 | 1) => {
    const element = track.current
    const card = element?.querySelector<HTMLElement>('.tl-review')
    element?.scrollBy({ left: direction * ((card?.offsetWidth || 480) + 18), behavior: 'smooth' })
  }

  return (
    <>
      <div className="tl-review-controls" role="group" aria-label="Client review controls">
        <button type="button" onClick={() => move(-1)} aria-label="Show previous review">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Show next review">→</button>
      </div>
      <div ref={track} className="tl-testimonials__grid tl-review-track">
        {VERIFIED_CLIENT_REVIEWS.map((review) => (
          <article key={review.organisation} className="tl-review">
            <div className={`tl-review__brand${review.darkLogo ? ' tl-review__brand--dark' : ''}`}>
              {review.logo ? <Image src={review.logo} alt={review.organisation} width={176} height={64} /> : <strong>{review.organisation}</strong>}
            </div>
            <div className="tl-review__stars" role="img" aria-label="Five star review">★★★★★</div>
            <blockquote>“{(review.quote || review.summary || '').split('\n\n')[0]}”</blockquote>
            <footer>
              <span><strong>{review.person}</strong>{review.role}</span>
              {review.organisation === 'Beyond Healthcare Medical' ? (
                <span className="tl-review__source">Trustpilot review</span>
              ) : (
                <a href={review.href} target="_blank" rel="noopener noreferrer">Read review <span aria-hidden="true">↗</span></a>
              )}
            </footer>
          </article>
        ))}
      </div>
    </>
  )
}
