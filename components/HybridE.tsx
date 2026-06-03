import React from 'react'
import TOC, { type TOCItem } from './TOC'

export type HybridEProps = {
  tocItems: TOCItem[]
  children: React.ReactNode
  rail?: React.ReactNode
  /** when false, renders Hybrid A (clean two-column, no right rail) */
  showRail?: boolean
  /** optional className applied to the outer wrap */
  className?: string
}

/**
 * Hybrid E sitewide layout wrapper.
 *
 *  +-----+-----------------+-----+
 *  | TOC |     Content     | Rail|
 *  +-----+-----------------+-----+
 *
 * - Left rail: sticky table of contents (client component).
 * - Centre column: server-rendered children (editorial serif content).
 * - Right rail: data-driven widgets. Pass `rail` JSX. Omit or set `showRail={false}`
 *   to render Hybrid A (clean two-column).
 *
 * Below 1100px the right rail collapses. Below 760px the TOC collapses too.
 * See references/layout-system.md in the tenderlab-seo-engine skill for the
 * per-template rail recipes and the working-links constraint.
 */
export default function HybridE({
  tocItems,
  children,
  rail,
  showRail = true,
  className = '',
}: HybridEProps) {
  const hasRail = showRail && !!rail
  const gridClass = hasRail ? 'he-grid he-grid--3col' : 'he-grid he-grid--2col'

  return (
    <div className={`he-wrap ${className}`}>
      <div className="container">
        <div className={gridClass}>
          <aside className="he-toc-col">
            <TOC items={tocItems} />
          </aside>

          <main className="he-content-col">{children}</main>

          {hasRail && <aside className="he-rail-col">{rail}</aside>}
        </div>
      </div>
    </div>
  )
}
