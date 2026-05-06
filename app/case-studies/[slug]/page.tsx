import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { CASE_STUDY_DETAILS } from '@/lib/case-studies-detail'
import GalleryGrid from './GalleryGrid'

export function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDIES.find(c => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.title} | TenderLab Case Studies`,
    description: `TenderLab case study: ${cs.transformation} — ${cs.council}. Verified award letter.`,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = CASE_STUDIES.find(c => c.slug === slug)
  const detail = CASE_STUDY_DETAILS[slug]
  if (!cs || !detail) notFound()

  const related = detail.relatedSlugs
    .map(s => CASE_STUDIES.find(c => c.slug === s))
    .filter(Boolean) as typeof CASE_STUDIES

  return (
    <main>

      {/* ── Hero ── */}
      <section className="csd-hero" style={{ '--case-accent': cs.accentColor } as React.CSSProperties}>
        <div className="container">
          <div className="csd-hero__inner">

            {/* Breadcrumb */}
            <nav className="csd-crumbs" aria-label="Breadcrumb">
              <Link href="/case-studies" className="csd-crumbs__link">Case Studies</Link>
              <span className="csd-crumbs__sep">›</span>
              <span className="csd-crumbs__current">{cs.categoryLabel}</span>
            </nav>

            {/* Category tag */}
            <div className="csd-cat-tag" style={{ background: cs.accentColor }}>
              <span className="csd-cat-tag__dot" />
              {cs.categoryLabel}
            </div>

            {/* Kicker */}
            <p className="csd-kicker">Case Study · {cs.council} · {cs.contractType}</p>

            {/* Title */}
            <h1 className="csd-title">{cs.title}</h1>

            {/* Verdict */}
            <p className="csd-verdict">{detail.verdict}</p>
          </div>
        </div>

        {/* Entry anchor strip */}
        <div className="csd-anchor" style={{ '--case-accent': cs.accentColor } as React.CSSProperties}>
          <div className="container">
            <div className="csd-anchor__row">
              <div className="csd-anchor__cell">
                <span className="csd-anchor__label">Started with</span>
                <span className="csd-anchor__value">{detail.entryAnchor.startedWith}</span>
              </div>
              <div className="csd-anchor__cell">
                <span className="csd-anchor__label">Result</span>
                <span className="csd-anchor__value">{detail.entryAnchor.result}</span>
              </div>
              <div className="csd-anchor__cell">
                <span className="csd-anchor__label">Context</span>
                <span className="csd-anchor__value">{detail.entryAnchor.context}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Starting position strip ── */}
      <div className="csd-start-strip">
        <div className="container">
          <div className="csd-start-strip__inner">
            <span className="csd-start-strip__label">Starting Position</span>
            <span className="csd-start-strip__body">{detail.startingStrip}</span>
          </div>
        </div>
      </div>

      {/* ── Meta bar ── */}
      <div className="csd-meta-bar" style={{ borderLeftColor: cs.accentColor }}>
        <div className="container">
          <div className="csd-meta-bar__inner">
            <span className="csd-meta-item">
              <strong>Award:</strong> {detail.metaBar.award}
            </span>
            <span className="csd-meta-sep">·</span>
            <span className="csd-meta-item">
              <strong>Outcome:</strong> {detail.metaBar.outcome}
            </span>
            {detail.metaBar.standstill && (
              <>
                <span className="csd-meta-sep">·</span>
                <span className="csd-meta-item">
                  <strong>Standstill:</strong> {detail.metaBar.standstill}
                </span>
              </>
            )}
            <span className="csd-meta-sep">·</span>
            <span className="csd-meta-item">
              <strong>Reference:</strong> {detail.metaBar.reference}
            </span>
            {detail.ftsUrl && (
              <a href={detail.ftsUrl} target="_blank" rel="noopener noreferrer" className="csd-fts-link" style={{ background: cs.accentColor }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                View on Find a Tender
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="csd-body">
        <div className="container">
          <div className="csd-article">

            {/* WON stamp + summary */}
            <div className="csd-stamp-row">
              <div className="csd-won-stamp" aria-label="Awarded">
                <div className="csd-won-stamp__ring" />
                <span className="csd-won-stamp__award">★ Awarded ★</span>
                <span className="csd-won-stamp__word">WON</span>
                <span className="csd-won-stamp__sub">{detail.stampSub}</span>
              </div>
              <div className="csd-stamp-summary" style={{ borderLeftColor: cs.accentColor }}>
                <span className="csd-stamp-summary__label" style={{ color: cs.accentColor }}>
                  {cs.contractType} · {cs.complexity}
                </span>
                <p className="csd-stamp-summary__text">{detail.stampSummary}</p>
              </div>
            </div>

            {/* Snapshot grid */}
            <div className="csd-snapshot">
              {detail.snapshotCells.map((cell, i) => (
                <div key={i} className={`csd-snapshot__cell${cell.isLead ? ' csd-snapshot__cell--lead' : ''}`}
                  style={cell.isLead ? { borderBottomColor: cs.accentColor } as React.CSSProperties : {}}>
                  <span className="csd-snapshot__label">{cell.label}</span>
                  <span className="csd-snapshot__value">{cell.value}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="csd-trust">
              {detail.trustBadges.map((badge, i) => (
                <div key={i} className="csd-trust__badge">
                  <span className="csd-trust__check" style={{ background: cs.accentColor }}>✓</span>
                  {badge}
                </div>
              ))}
            </div>

            {/* Award letter gallery */}
            <section className="csd-gallery-section" id="award-letter">
              <div className="csd-gallery-head">
                <h2 className="csd-gallery-title">The Award Letter</h2>
                <span className="csd-gallery-badge" style={{ background: cs.accentColor }}>Verified Source</span>
              </div>
              <GalleryGrid images={detail.galleryImages} accentColor={cs.accentColor} />
              <p className="csd-gallery-source">{detail.gallerySource}</p>
            </section>

            {/* Article sections */}
            {detail.sections.map((section, i) => (
              <div key={i} className="csd-section">
                <h2 className="csd-section__h2" style={{ borderLeftColor: cs.accentColor }}>
                  <span className="csd-section__num" style={{ color: cs.accentColor }}>Section {section.num}</span>
                  {section.heading}
                </h2>
                <p className="csd-section__body">{section.body}</p>
                {section.callout && (
                  <div className="csd-callout" style={{ borderLeftColor: cs.accentColor }}>
                    <p className="csd-callout__label">{section.callout.label}</p>
                    <p className="csd-callout__text">{section.callout.text}</p>
                  </div>
                )}
                {/* Mid-CTA after section 08 */}
                {section.num === '08' && (
                  <div className="csd-mid-cta" style={{ borderTopColor: cs.accentColor, borderBottomColor: cs.accentColor }}>
                    <div className="csd-mid-cta__text">
                      <h3 className="csd-mid-cta__h">Working from a similar starting point?</h3>
                      <p className="csd-mid-cta__p">Free consultation. We will read the specification, identify the deterministic and discretionary points, and tell you whether the win is realistic.</p>
                    </div>
                    <Link href="/contact" className="btn btn-primary">Book free consultation</Link>
                  </div>
                )}
              </div>
            ))}

            {/* Score table */}
            {detail.scoreTable && (
              <div className="csd-table-wrap">
                <h3 className="csd-table-title">Measurable Uplift</h3>
                <table className="csd-table">
                  <thead>
                    <tr style={{ background: cs.accentColor }}>
                      {detail.scoreTable.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.scoreTable.rows.map((row, i) => (
                      <tr key={i}>
                        <td><strong style={{ color: cs.accentColor }}>{row.lot}</strong></td>
                        {row.cells.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Before / After */}
            <div className="csd-before-after">
              <div className="csd-ba-block">
                <div className="csd-ba-block__head">Before the Engagement</div>
                <p className="csd-ba-block__body">{detail.beforeText}</p>
              </div>
              <div className="csd-ba-block csd-ba-block--after" style={{ borderTopColor: cs.accentColor }}>
                <div className="csd-ba-block__head" style={{ color: cs.accentColor }}>After the Engagement</div>
                <p className="csd-ba-block__body">{detail.afterText}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Related case studies ── */}
      {related.length > 0 && (
        <section className="csd-related">
          <div className="container">
            <h2 className="csd-related__h">Similar case studies</h2>
            <div className="csd-related__grid">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/case-studies/${r.slug}`}
                  className="csd-rcard"
                  style={{ '--rcard-accent': r.accentColor } as React.CSSProperties}
                >
                  <div className="csd-rcard__accent" />
                  <div className="csd-rcard__body">
                    <span className="csd-rcard__tag" style={{ color: r.accentColor }}>
                      {r.categoryLabel} · {r.contractType}
                    </span>
                    <h3 className="csd-rcard__title">{r.title}</h3>
                    <p className="csd-rcard__transform">{r.transformation}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Closer CTA ── */}
      <section className="csd-closer" style={{ background: cs.accentColor }}>
        <div className="container">
          <div className="csd-closer__inner">
            <span className="csd-closer__lead">{detail.closerLead}</span>
            <span className="csd-closer__sub">{detail.closerSub}</span>
            <Link href="/contact" className="csd-closer__btn">Book a free consultation</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
