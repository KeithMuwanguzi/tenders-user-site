'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Result = { slug: string; category: string; council: string; result: string; image: string }

export default function ResultsCarousel({ results }: { results: Result[] }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || results.length < 2) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % results.length), 5800)
    return () => window.clearInterval(timer)
  }, [results.length])
  return (
    <div className="campaign-results">
      <div className="campaign-results__list" role="tablist" aria-label="Documented results">
        {results.map((result, index) => (
          <button type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} key={result.slug} role="tab" aria-selected={active === index}>
            <span>0{index + 1} · {result.category}</span><strong>{result.council}</strong><small>{result.result}</small><i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="campaign-results__stage">
        {results.map((result, index) => (
          <Link href={`/case-studies/${result.slug}`} className={`campaign-results__slide${active === index ? ' is-active' : ''}`} key={result.slug}>
            <Image src={result.image} alt={`Documented evidence from ${result.council}`} fill sizes="(max-width: 900px) 100vw, 46vw" />
            <div><span>Documented result</span><h3>{result.council}</h3><p>{result.result}</p><b>Inspect the case study →</b></div>
          </Link>
        ))}
      </div>
    </div>
  )
}
