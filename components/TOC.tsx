'use client'

import React, { useEffect, useState } from 'react'

export type TOCItem = {
  /** display label (section title) */
  label: string
  /** zero-padded section number, e.g. '01', '11' */
  num: string
  /** DOM id to scroll to, e.g. 'sec-11' */
  anchor: string
}

export default function TOC({ items }: { items: TOCItem[] }) {
  const [activeAnchor, setActiveAnchor] = useState<string>(items[0]?.anchor ?? '')

  useEffect(() => {
    if (!items.length || typeof window === 'undefined') return
    const targets = items
      .map(i => document.getElementById(i.anchor))
      .filter((el): el is HTMLElement => !!el)

    if (!targets.length) return

    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveAnchor(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.5, 1] }
    )

    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav className="he-toc" aria-label="On this page">
      <div className="he-toc__label">On this page</div>
      <ul className="he-toc__list">
        {items.map(item => {
          const isActive = item.anchor === activeAnchor
          return (
            <li
              key={item.anchor}
              className={`he-toc__item${isActive ? ' is-active' : ''}`}
            >
              <a href={`#${item.anchor}`} className="he-toc__link">
                <span className="he-toc__n">{item.num}</span>
                <span className="he-toc__text">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
