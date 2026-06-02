import Link from 'next/link'

/* ============================================================
   LiveTendersWidget - rail widget showing 3 live tenders.
   2 June 2026 round-3 update:
   - Default variant back to 'dark' (navy panel on cream paper -
     editorial FT/Economist register; fixes the invisible white
     text on white background bug from round 2).
   - Real cohort filtering: maps the care-setting slug to a set
     of category keywords and filters tenders by matching the
     API `category` field. Falls back to top tenders when no
     matches so the widget always renders something.
   - Auto-refreshes via Next.js ISR: revalidate every 600 seconds
     (10 minutes). New tenders in Notion appear within 10 minutes.
   ============================================================ */

export type LiveTender = {
  id: string
  title: string
  organisation: string | null
  deadline: string | null
  value: string | null
  category: string | null
  source: 'Contracts Finder' | 'Find a Tender'
}

type Props = {
  /** Cohort filter - typically the care setting slug like
      'extra-care-housing' or 'domiciliary-care'. The widget maps
      this to category keywords and filters tenders whose API
      `category` field matches any keyword. */
  cohort?: string
  /** Maximum tenders to show. Default 3. */
  limit?: number
  /** 'dark' (default) is the navy editorial panel.
      'light' uses the white-on-cream card style. */
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
  category?: string | null
  source?: string
}

/* Slug to category-keyword map. When a care setting page passes
   its slug as the cohort prop, we match the tender's API
   `category` field against any of the keywords (case-insensitive,
   substring). Add new mappings as new care setting slugs ship.
   Each value must be a non-empty array; otherwise the slug falls
   through to the "no match" path and shows top tenders. */
const COHORT_KEYWORDS: Record<string, string[]> = {
  'domiciliary-care': ['domiciliary', 'home care'],
  'live-in-care': ['live-in', 'live in', 'domiciliary'],
  'residential-care': ['residential', 'care home'],
  'nursing-care': ['nursing'],
  'supported-living': ['supported living'],
  'extra-care-housing': ['extra care', 'supported living', 'housing'],
  'day-services': ['day service', 'day care'],
  'reablement-services': ['reablement', 'intermediate care'],
  'short-breaks-and-respite': ['short break', 'respite'],
  'shared-lives': ['shared lives'],
  'outreach-community-support': ['outreach', 'community support'],
  'crisis-rapid-response': ['crisis', 'rapid response'],
  'childrens-residential-care': ['children', 'children services', 'residential'],
  'supported-accommodation': ['supported accommodation', 'children', 'leaving care'],
  'fostering-services': ['fostering'],
  'leaving-care-services': ['leaving care', 'care leaver'],
  'childrens-short-breaks': ['children', 'short break'],
  'family-support-and-outreach': ['family support', 'outreach', 'children'],
  'housing-related-support': ['housing', 'housing related'],
  'temporary-accommodation': ['temporary accommodation', 'homeless'],
  'emergency-accommodation': ['emergency accommodation', 'homeless'],
  'supported-housing': ['supported housing', 'housing'],
  'community-health-services': ['community health'],
  'continuing-healthcare': ['continuing healthcare', 'chc'],
  'complex-care': ['complex care', 'complex needs'],
  'rehabilitation-services': ['rehabilitation', 'rehab'],
  'end-of-life-and-palliative-care': ['palliative', 'end of life', 'hospice'],
  'hospital-discharge-services': ['hospital discharge', 'discharge to assess'],
  'autism-services': ['autism', 'autistic'],
  'learning-disability-services': ['learning disability', 'learning disabilities'],
  'mental-health-services': ['mental health', 'mental wellbeing'],
  'substance-misuse-services': ['substance misuse', 'drug', 'alcohol'],
}

async function fetchLiveTenders(
  cohort: string | undefined,
  limit: number
): Promise<LiveTender[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tenderlab.co.uk'
  const url = new URL('/api/tenders', base)
  // Fetch a larger pool so we have material to filter from.
  url.searchParams.set('limit', '100')
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 600 } })
    if (!res.ok) return []
    const data = (await res.json()) as { tenders?: ApiTender[] }
    if (!Array.isArray(data?.tenders)) return []
    const all = data.tenders.map((t): LiveTender => ({
      id: t.id ?? '',
      title: t.title ?? 'Untitled tender',
      organisation: t.organisation ?? null,
      deadline: t.deadline ?? null,
      value: t.value ?? null,
      category: t.category ?? null,
      source: t.source === 'Find a Tender' ? 'Find a Tender' : 'Contracts Finder',
    })).filter(t => t.id)

    // No cohort - return top N.
    if (!cohort) return all.slice(0, limit)

    const keywords = COHORT_KEYWORDS[cohort] ?? []
    if (!keywords.length) return all.slice(0, limit)

    const matchCategory = (cat: string | null): boolean => {
      if (!cat) return false
      const lc = cat.toLowerCase()
      return keywords.some(k => lc.includes(k))
    }

    const matched = all.filter(t => matchCategory(t.category))
    if (matched.length >= limit) return matched.slice(0, limit)

    // Top up with non-matching tenders to fill the slot rather
    // than show an empty rail.
    const used = new Set(matched.map(t => t.id))
    const rest = all.filter(t => !used.has(t.id))
    return [...matched, ...rest].slice(0, limit)
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
  // Default variant back to dark for the editorial register and
  // to ensure tender text is always readable (the light variant
  // had a colour contrast bug from a previous round).
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
