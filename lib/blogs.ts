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

const PORTAL_API_URL =
  process.env.PORTAL_API_URL ||
  process.env.NEXT_PUBLIC_PORTAL_API_URL ||
  'https://tenderlab-admin-api-quva.onrender.com'

function mapPost(row: BlogPostFromApi) {
  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    tags: row.tags ?? [],
    excerpt: row.excerpt,
    body: row.body,
    imageUrl: row.imageUrl ?? '',
    imageSource: row.imageSource ?? '',
    imageCredit: row.imageCredit ?? '',
    publishedAt: row.publishedAt ?? null,
  }
}

export async function fetchBlogs(): Promise<ReturnType<typeof mapPost>[]> {
  try {
    const res = await fetch(`${PORTAL_API_URL}/api/blogs/published?limit=100`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`[blogs] portal returned ${res.status}`)
      return []
    }
    const rows = (await res.json()) as BlogPostFromApi[]
    return rows.map(mapPost)
  } catch (err) {
    console.error('[blogs] fetch failed:', err)
    return []
  }
}

export async function fetchBlogBySlug(slug: string): Promise<ReturnType<typeof mapPost> | null> {
  try {
    const res = await fetch(
      `${PORTAL_API_URL}/api/blogs/published/${encodeURIComponent(slug)}`,
      { headers: { Accept: 'application/json' }, cache: 'no-store' },
    )
    if (res.status === 404) return null
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
