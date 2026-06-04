import type { TenderSourceLabel } from '@/lib/tender-sources'

export type PublishedTenderSnapshot = {
  id: string
  title: string
  description: string
  publishedDate: string
  deadline: string | null
  value: string | null
  location: string | null
  organisation: string | null
  status: string
  url: string
  source: TenderSourceLabel
  category?: string | null
  published_at?: string | null
}

const PORTAL_API_URL =
  process.env.PORTAL_API_URL ||
  process.env.NEXT_PUBLIC_PORTAL_API_URL ||
  'https://tenderlab-admin-api.onrender.com'

export async function fetchPublishedTenderById(
  id: string,
): Promise<PublishedTenderSnapshot | null> {
  try {
    const res = await fetch(
      `${PORTAL_API_URL}/api/tenders/published/${encodeURIComponent(id)}`,
      { headers: { Accept: 'application/json' }, cache: 'no-store' },
    )
    if (res.status === 404) return null
    if (!res.ok) {
      console.error(`[published-tenders] portal returned ${res.status} for ${id}`)
      return null
    }
    return (await res.json()) as PublishedTenderSnapshot
  } catch (err) {
    console.error('[published-tenders] fetch failed:', err)
    return null
  }
}
