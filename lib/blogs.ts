export type BlogPost = {
  title: string
  slug: string
  category: string
  tags: string[]
  excerpt: string
  body: string
  imageUrl: string
  imageSource: string
  imageCredit: string
  publishedAt?: string | null
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

export function categoryColor(cat: string): string {
  switch (cat) {
    case 'Live Tender Analysis':
      return '#D4382C'
    case 'Bid Strategy':
      return '#2E5E8C'
    case 'Commissioning Trends':
      return '#0A6E5A'
    default:
      return '#3B5068'
  }
}

export function contextualBlogImage(
  post: Pick<BlogPost, 'title' | 'category' | 'tags'>,
): string {
  const topic = `${post.title} ${post.category} ${(post.tags ?? []).join(' ')}`.toLowerCase()

  if (topic.includes('domiciliary') || topic.includes('home care') || topic.includes('home support')) {
    return '/images/editorial/tenderlab-domiciliary-care-hero-v1.jpg'
  }
  if (topic.includes('supported living') || topic.includes('supported accommodation') || topic.includes('autism') || topic.includes('learning disabil')) {
    return '/images/editorial/tenderlab-supported-living-hero-v1.jpg'
  }
  if (topic.includes('mental health')) {
    return '/images/editorial/tenderlab-mental-health-hero-v1.jpg'
  }
  if (topic.includes('complex care') || topic.includes('continuing healthcare') || topic.includes('chc')) {
    return '/images/editorial/tenderlab-complex-care-chc-hero-v1.jpg'
  }
  if (topic.includes('residential') || topic.includes('nursing') || topic.includes('care home')) {
    return '/images/editorial/tenderlab-residential-care-hero-v1.jpg'
  }
  if (topic.includes('children') || topic.includes('young people') || topic.includes('ofsted')) {
    return '/images/editorial/tenderlab-childrens-services-hero-v1.png'
  }
  if (topic.includes('mobilis') || topic.includes('tupe') || topic.includes('staff')) {
    return '/images/editorial/tenderlab-mobilisation-support-hero-v1.png'
  }
  if (topic.includes('training') || topic.includes('course') || topic.includes('skill')) {
    return '/images/editorial/tenderlab-tender-training-hero-v1.png'
  }
  if (topic.includes('social value') || topic.includes('sustainab') || topic.includes('community')) {
    return '/images/editorial/tenderlab-community-health-hero-v1.png'
  }
  if (topic.includes('evidence') || topic.includes('cqc') || topic.includes('compliance')) {
    return '/images/editorial/tenderlab-care-evidence-hero-v1.png'
  }
  if (topic.includes('live tender') || topic.includes('framework') || topic.includes('dps')) {
    return '/images/editorial/tenderlab-live-tenders-hero-v1.png'
  }
  if (topic.includes('bid') || topic.includes('tender writing') || topic.includes('evaluator')) {
    return '/images/editorial/tenderlab-bid-writing-hero-v1.png'
  }
  return '/images/editorial/tenderlab-blog-intelligence-hero-v1.png'
}

export type BlogPostFromApi = {
  title: string
  slug: string
  category: string
  tags: string[]
  excerpt: string
  body: string
  imageUrl: string
  imageSource: string
  imageCredit: string
  publishedAt?: string | null
}

import { getPortalApiUrl, isPortalApiAvailable } from '@/lib/portal-api'

/** ISR interval for published blog lists (homepage, sitemap, blog index). */
const BLOG_LIST_REVALIDATE = 60
/** ISR interval for individual blog posts. */
const BLOG_POST_REVALIDATE = 300
/**
 * Keep public pages responsive when the VPS-hosted portal is unavailable.
 * Vercel otherwise waits for the origin until its own request timeout, which
 * can make an otherwise static homepage appear offline.
 */
const PORTAL_FETCH_TIMEOUT_MS = 4_000

function portalFetchSignal(): AbortSignal {
  return AbortSignal.timeout(PORTAL_FETCH_TIMEOUT_MS)
}

// These legacy analysis rows remain in the upstream list but no longer have
// a published article behind them. Keeping them out of every listing prevents
// visitors and crawlers being sent to a retired page.
const RETIRED_BLOG_SLUGS = new Set([
  'how-to-get-on-a-care-framework-frameworks-dps-and-approved-provider-lists-explained',
  'london-borough-of-bromley-domiciliary-care-framework-2026-to-2030-provider-qualification-analysis',
  'durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031-provider-qualification-analysis',
  'city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027-provider-qualification-analysis',
  'newcastle-city-council-home-care-services-framework-2026-to-2034-provider-qualification-analysis',
])

function isPublishableBlogRow(row: BlogPostFromApi): boolean {
  return Boolean(
    row.slug &&
    !RETIRED_BLOG_SLUGS.has(row.slug) &&
    (row.body?.trim() || row.excerpt?.trim()),
  )
}

function mapPost(row: BlogPostFromApi) {
  const topic = {
    title: row.title,
    category: row.category,
    tags: row.tags ?? [],
  }
  const legacyMedia = /^https?:\/\/(?:www\.)?tenderlab\.co\.uk\/wp-content\//i.test(row.imageUrl ?? '')

  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    tags: row.tags ?? [],
    excerpt: row.excerpt,
    body: row.body,
    imageUrl: row.imageUrl && !legacyMedia ? row.imageUrl : contextualBlogImage(topic),
    imageSource: row.imageSource ?? '',
    imageCredit: row.imageCredit ?? '',
    publishedAt: row.publishedAt ?? null,
  }
}

export async function fetchBlogs(): Promise<ReturnType<typeof mapPost>[]> {
  if (!isPortalApiAvailable()) return []

  const baseUrl = getPortalApiUrl()

  try {
    let res = await fetch(`${baseUrl}/api/blogs/published?limit=100`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: BLOG_LIST_REVALIDATE },
      signal: portalFetchSignal(),
    })

    // The internal VPS service exposes /api/blogs/published. A local design
    // preview may instead point at the public website proxy, which deliberately
    // exposes the same published data at /api/blogs. Support both without
    // changing the production API contract.
    if (res.status === 404 && /^https?:\/\//.test(baseUrl)) {
      res = await fetch(`${baseUrl}/api/blogs`, {
        headers: { Accept: 'application/json' },
        next: { revalidate: BLOG_LIST_REVALIDATE },
        signal: portalFetchSignal(),
      })
    }

    if (!res.ok) {
      console.error(`[blogs] portal returned ${res.status}`)
      return []
    }
    const payload = (await res.json()) as BlogPostFromApi[] | { posts?: BlogPostFromApi[] }
    const rows = Array.isArray(payload) ? payload : (payload.posts ?? [])
    return rows
      .filter(isPublishableBlogRow)
      .map(mapPost)
  } catch (err) {
    console.error('[blogs] fetch failed:', err)
    return []
  }
}

export async function fetchBlogBySlug(slug: string): Promise<ReturnType<typeof mapPost> | null> {
  if (!isPortalApiAvailable()) return null

  const baseUrl = getPortalApiUrl()

  try {
    let res = await fetch(
      `${baseUrl}/api/blogs/published/${encodeURIComponent(slug)}`,
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: BLOG_POST_REVALIDATE },
        signal: portalFetchSignal(),
      },
    )

    if (res.status === 404 && /^https?:\/\//.test(baseUrl)) {
      res = await fetch(
        `${baseUrl}/api/blogs/${encodeURIComponent(slug)}`,
        {
          headers: { Accept: 'application/json' },
          next: { revalidate: BLOG_POST_REVALIDATE },
          signal: portalFetchSignal(),
        },
      )
    }

    if (res.status === 404) {
      const listedPost = (await fetchBlogs()).find((post) => post.slug === slug)
      return listedPost ?? null
    }
    if (!res.ok) {
      console.error(`[blogs] portal returned ${res.status} for ${slug}`)
      return null
    }
    const row = (await res.json()) as BlogPostFromApi
    return mapPost(row)
  } catch (err) {
    console.error('[blogs] fetch post failed:', err)
    return null
  }
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

/** UTC-based formatting so SSR and client hydration always match. */
export function formatBlogDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** A calm, honest reading-time estimate based on 220 words per minute. */
export function estimateReadMinutes(text: string | null | undefined): number {
  const words = (text || '')
    .replace(/[#>*_`[\]()|-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}
