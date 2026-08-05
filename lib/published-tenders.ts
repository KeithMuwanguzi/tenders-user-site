import type { TenderSourceLabel } from '@/lib/tender-sources'
import { getPortalApiUrl } from '@/lib/portal-api'

const PORTAL_FETCH_TIMEOUT_MS = 4_000

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

export async function fetchPublishedTenders(
  limit = 150,
): Promise<PublishedTenderSnapshot[]> {
  const baseUrl = getPortalApiUrl()
  if (!baseUrl) return []

  try {
    let res = await fetch(
      `${baseUrl}/api/tenders/published?active_only=true&limit=${Math.min(500, Math.max(1, limit))}`,
      {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(PORTAL_FETCH_TIMEOUT_MS),
      },
    )
    if (res.status === 404 && /^https?:\/\//.test(baseUrl)) {
      res = await fetch(`${baseUrl}/api/tenders?active_only=true&limit=${limit}`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(PORTAL_FETCH_TIMEOUT_MS),
      })
    }
    if (!res.ok) return []
    const payload = (await res.json()) as
      | PublishedTenderSnapshot[]
      | { tenders?: PublishedTenderSnapshot[] }
    return Array.isArray(payload) ? payload : (payload.tenders ?? [])
  } catch (error) {
    console.error('[published-tenders] list fetch failed:', error)
    return []
  }
}

export async function fetchPublishedTenderById(
  id: string,
): Promise<PublishedTenderSnapshot | null> {
  try {
    const baseUrl = getPortalApiUrl()
    let res = await fetch(
      `${baseUrl}/api/tenders/published/${encodeURIComponent(id)}`,
      {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(PORTAL_FETCH_TIMEOUT_MS),
      },
    )
    if (res.status === 404 && /^https?:\/\//.test(baseUrl)) {
      const listUrl = new URL(`${baseUrl}/api/tenders`)
      listUrl.searchParams.set('active_only', 'true')
      listUrl.searchParams.set('limit', '500')
      res = await fetch(listUrl.toString(), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) return null
      const payload = (await res.json()) as
        | PublishedTenderSnapshot[]
        | { tenders?: PublishedTenderSnapshot[] }
      const rows = Array.isArray(payload) ? payload : (payload.tenders ?? [])
      return rows.find((row) => row.id === id) ?? null
    }
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
