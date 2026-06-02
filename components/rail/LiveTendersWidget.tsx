import Link from 'next/link'

export type LiveTender = {
  id: string
  commissioner: string
  framework: string
  name: string
  closesAt: string // ISO date
  cohortTag?: string
  href?: string // optional override; defaults to /tenders/[id]
}

type Props = {
  /** Cohort filter for the API call (e.g. 'domiciliary', 'supported-living'). */
  cohort?: string
  /** Maximum tenders to show. Default 3. */
  limit?: number
  /** Pass `dark` variant for high-visual-weight sections. */
  variant?: 'light' | 'dark'
  /** Optional widget title override. */
  title?: string
}

async function fetchLiveTenders(cohort?: string, limit = 3): Promise<LiveTender[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tenderlab.co.uk'
  const url = new URL('/api/tenders', base)
  if (cohort) url.searchParams.set('cohort', cohort)
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('status', 'live')
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 600 } })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data?.tenders)) return []
    return data.tenders.slice(0, limit) as LiveTender[]
  } catch {
    return []
  }
}

function formatDeadline(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default async function LiveTendersWidget({
  cohort,
  limit = 3,
  variant = 'dark',
  title,
}: Props) {
  const tenders = await fetchLiveTenders(cohort, limit)
  if (!tenders.length) return null

  const widgetTitle =
    title ?? (cohort ? `Live tenders · ${cohort.replace(/-/g, ' ')}` : 'Live tenders')

  return (
    <div className={`he-widget${variant === 'dark' ? ' he-widget--dark' : ''}`}>
      <div className="he-widget__head">
        <span className="he-widget__dot" />
        <h3>{widgetTitle}</h3>
      </div>
      <div className="he-widget__body">
        {tenders.map(t => {
          const href = t.href ?? `/tenders/${t.id}`
          return (
            <Link key={t.id} href={href} className="he-tender-item">
              <div className="he-tender-item__meta">
                {t.commissioner} · {t.framework}
              </div>
              <div className="he-tender-item__name">{t.name}</div>
              <div className="he-tender-item__deadline">
                Closes {formatDeadline(t.closesAt)}
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
