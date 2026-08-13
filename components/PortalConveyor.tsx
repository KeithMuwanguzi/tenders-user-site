'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const portals = [
  ['Find a Tender', '/design-v4/images/portals/govuk-crown.png', 'govuk'],
  ['ProContract by Proactis', '/design-v4/images/portals/proactis-symbol.png', 'proactis'],
  ['In-tend', '/design-v4/images/portals/intend.svg', 'wide'],
  ['Delta eSourcing', '/design-v4/images/portals/delta.png', ''],
  ['JAGGAER', '/design-v4/images/portals/jaggaer.png', ''],
  ['Public Contracts Scotland', '/design-v4/images/portals/pcs-official.png', 'wide'],
  ['Sell2Wales', '/design-v4/images/portals/sell2wales-official.png', 'wide'],
  ['eTendersNI', '/design-v4/images/portals/etendersni-official.png', 'wide'],
  ['myTenders', '/design-v4/images/portals/mytenders.jpg', 'wide'],
  ['BidStats', '/design-v4/images/portals/bidstats.png', ''],
  ['Tussell', '/design-v4/images/portals/tussell.svg', ''],
  ['Tracker Intelligence', '/design-v4/images/portals/tracker.png', ''],
  ['Crown Commercial Service', '/design-v4/images/portals/ccs.png', 'ccs'],
] as const

export default function PortalConveyor() {
  const section = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      if (!section.current || !bar.current || !track.current) return
      const rect = section.current.getBoundingClientRect()
      const viewport = window.innerHeight
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height * 0.45)))
      const minimum = window.innerWidth < 768 ? 140 : window.innerWidth < 992 ? 270 : 324
      const maximum = Math.min(window.innerWidth * (window.innerWidth < 768 ? 0.72 : 0.62), window.innerWidth < 768 ? 310 : 940)
      const width = minimum + (maximum - minimum) * progress
      bar.current.style.width = `${width}px`
      const diameter = window.innerWidth < 768 ? 68 : window.innerWidth < 992 ? 90 : 112
      const rotation = ((width - minimum) / (Math.PI * diameter)) * 360
      track.current.style.setProperty('--portal-rotation', `${rotation}deg`)
    }
    const queue = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="campaign-route" ref={section} aria-labelledby="campaign-route-title">
      <div className="campaign-route__conveyor" role="group" aria-label="UK tender publication and eSourcing platforms">
        <div className="campaign-route__bar" ref={bar} aria-hidden="true">
          <span className="campaign-route__arrow"><svg viewBox="0 0 64 64"><path d="M13 32h36"/><path d="m38 20 12 12-12 12"/></svg></span>
        </div>
        <div className="campaign-route__track" ref={track}>
          {portals.map(([name, image, treatment]) => (
            <div className={`campaign-portal campaign-portal--${treatment || 'standard'}`} role="img" aria-label={name} key={name}>
              <Image src={image} alt="" width={112} height={112} />
              {name === 'Find a Tender' ? <span>{name}</span> : null}
            </div>
          ))}
        </div>
      </div>
      <header className="campaign-route__copy">
        <p className="campaign-eyebrow">From public notice to scored response</p>
        <h2 id="campaign-route-title">One opportunity. Every requirement accounted for.</h2>
        <p>We follow the buyer documents from the official notice through qualification, evidence development and submission, while keeping every scored requirement in view.</p>
      </header>
    </section>
  )
}
