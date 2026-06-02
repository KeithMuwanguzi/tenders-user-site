import Link from 'next/link'

/* ============================================================
   LiveTendersWidget - rail widget showing 3 live tenders.
   Updated 2 June 2026 to match the actual /api/tenders response
   shape (organisation/title/deadline/source/value), not the
   speculative shape from yesterday's first draft.
   Auto-refreshes via Next.js ISR: revalidate every 600 seconds
   (10 minutes). A new tender added to Notion appears here within
   10 minutes without a redeploy.
   ============================================================ */

export type LiveTender = {
  id: string
  title: string
  organisation: string | null
  deadline: string | null
  value: string | null
  source: 'Contracts Finder' | 'Find a Tender'
}

type Props = {
  /** Cohort filter for the API call (e.g. 'domiciliary', 'extra-care-housing').
      Currently the API ignores this filter and returns all published tenders;
      we pass it forward so the widget is forward-compatible when the API
      gains cohort filtering. */
  cohort?: string
  /** Maximum tenders to show. Default 3. */
  limit?: number
  /** Pass `dark` variant for high-visual-weight sections. */
  variant?: 'light' | 'dark'
  /** Optional widget title override. */
  title?: string
}

interface ApiTender {
  id?: string
  title?: string
  organisation?: string | null
  deadline?: string | null
  value?: string | null
  source?: string
}

async function fetchLiveTenders(cohort?: string, limit = 3): Promise<LiveTender[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tenderlab.co.uk'
  const url = new URL('/api/tenders', base)
  if (cohort) url.searchParams.set('cohort', cohort)
  url.searchParams.set('limit', String(limit))
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 600 } })
    if (!res.ok) return []
    const data = (await res.json()) as { tenders?: ApiTender[] }
    if (!Array.isArray(data?.tenders)) return []
    return data.tenders.slice(0, limit).map((t): LiveTender => ({
      id: t.id ?? '',
      title: t.title ?? 'Untitled tender',
      organisation: t.organisation ?? null,
      deadline: t.deadline ?? null,
      value: t.value ?? null,
      source: t.source === 'Find a Tender' ? 'Find a Tender' : 'Contracts Finder',
    })).filter(t => t.id)
  } catch {
    return []
  }
}

function formatDeadline(iso: string | null): string {
  if (!iso) return 'No deadline'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function shortenTitle(t: string, max = 80): string {
  if (t.length <= max) return t
  return t.slice(0, max).replace(/\s+\S*$/, '') + '...'
}

export default async function LiveTendersWidget({
  cohort,
  limit = 3,
  variant = 'dark',
  title,
}: Props) {
  const tenders = await fetchLiveTenders(cohort, limit)
  if (!tenders.length) return null

  const widgetTitle = title ?? 'Live tenders'

  return (
    <div className={`he-widget${variant === 'dark' ? ' he-widget--dark' : ''}`}>
      <div className="he-widget__head">
        <span className="he-widget__dot" />
        <h3>{widgetTitle}</h3>
      </div>
      <div className="he-widget__body">
        {tenders.map(t => {
          const src = t.source === 'Find a Tender' ? 'ft' : 'cf'
          const href = `/tenders/${encodeURIComponent(t.id)}?source=${src}`
          return (
            <Link key={t.id} href={href} className="he-tender-item">
              {t.organisation && (
                <div className="he-tender-item__meta">{t.organisation}</div>
              )}
              <div className="he-tender-item__name">{shortenTitle(t.title)}</div>
              <div className="he-tender-item__deadline">
                {t.value ? `${t.value} · ` : ''}Closes {formatDeadline(t.deadline)}
              </div>
            </Link>
          )
        })}
      </div>
      <Link href="/tenders" className="he-widget__cta">
        See all live tenders →
      </Link>
    </div>
  )
}
