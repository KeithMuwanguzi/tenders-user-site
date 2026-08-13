'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const scenes = [
  {
    label: 'Care delivery',
    image: '/design-v4/images/hero-care-delivery.jpg',
    alt: 'A care-provider manager observing respectful care delivery and recording operational evidence',
  },
  {
    label: 'Operational proof',
    image: '/design-v4/images/hero-operational-proof.jpg',
    alt: 'A care-provider manager and tender specialist reviewing an organised operational evidence pack',
  },
  {
    label: 'Evaluator clarity',
    image: '/design-v4/images/hero-evaluator-clarity.jpg',
    alt: 'Procurement professionals assessing a structured tender response against the scoring criteria',
  },
]

export default function CampaignHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % scenes.length), 4400)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="campaign-hero" aria-labelledby="campaign-hero-title">
      <div className="campaign-hero__copy">
        <p className="campaign-eyebrow">UK health and social care procurement</p>
        <h1 id="campaign-hero-title">Good care is not enough. <em>The evaluator has to see it.</em></h1>
        <p className="campaign-lead">TenderLab turns operational reality into council, NHS and ICB submissions that are clear, compliant and built for the scoring sheet.</p>
        <div className="campaign-actions">
          <Link className="campaign-button campaign-button--coral" href="/book-consultation">Book a consultation</Link>
          <Link className="campaign-text-link campaign-text-link--light" href="/services">Explore our services <span aria-hidden="true">→</span></Link>
        </div>
        <div className="campaign-hero__contact">
          <a href="tel:+441707240393">01707 240393</a>
          <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
        </div>
      </div>
      <div className="campaign-hero__visual" aria-label="From care delivery to evaluator clarity">
        {scenes.map((scene, index) => (
          <figure className={`campaign-hero__scene${active === index ? ' is-active' : ''}`} key={scene.label}>
            <Image src={scene.image} alt={scene.alt} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 62vw" />
          </figure>
        ))}
        <div className="campaign-hero__story" role="tablist" aria-label="TenderLab evidence story">
          {scenes.map((scene, index) => (
            <button key={scene.label} type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={active === index}>
              <span>0{index + 1}</span>{scene.label}<i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
