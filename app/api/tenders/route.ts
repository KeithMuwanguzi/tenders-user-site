import { NextRequest, NextResponse } from 'next/server'
import { getPortalApiUrl } from '@/lib/portal-api'

/* ================================================================
   Live Tenders — proxy to the portal's curated list
   ================================================================
   Tenders are now editorially curated in the admin portal. The portal
   FastAPI exposes `GET /api/tenders/published`, which reads the
   "PublishedTenders" tab of the linked Google Sheet and returns the
   subset an admin has chosen to surface here.
   This route just forwards `q` / `source` filters and shapes the JSON
   the way `tendersSlice` expects (`{ tenders, page, total }`).
   ================================================================ */

interface Tender {
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
  source: 'Contracts Finder' | 'Find a Tender'
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  if (!getPortalApiUrl()) {
    return NextResponse.json({ error: 'Portal API is not configured', tenders: [] }, { status: 503 })
  }
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const sourceFilter = searchParams.get('source') || 'all'
  if (!['all', 'cf', 'ft'].includes(sourceFilter)) {
    return NextResponse.json(
      { error: 'Invalid tender source. Use all, cf or ft.', tenders: [] },
      { status: 400 },
    )
  }

  const parsedPage = parseInt(searchParams.get('page') || '1', 10)
  const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1
  const parsedLimit = parseInt(searchParams.get('limit') || '500', 10)
  const limit = Math.min(
    500,
    Math.max(1, Number.isFinite(parsedLimit) ? parsedLimit : 500),
  )

  const portalBase = getPortalApiUrl()
  const upstream = new URL(`${portalBase}/api/tenders/published`)
  // The portal already restricts to healthcare-relevant tenders the admin
  // chose to publish, so we only forward category + source as a refining
  // search. An empty `q` returns everything in the published list.
  if (query) upstream.searchParams.set('q', query)
  if (sourceFilter && sourceFilter !== 'all')
    upstream.searchParams.set('source', sourceFilter)
  upstream.searchParams.set('active_only', 'true')
  // Fetch the bounded published result set once, then paginate locally so the
  // response can report a truthful total. The portal endpoint returns an
  // array rather than a separate count field.
  upstream.searchParams.set('limit', '500')

  try {
    let res = await fetch(upstream.toString(), {
      headers: { Accept: 'application/json' },
      // No upstream cache — Vercel keys its fetch cache by URL, which
      // means the "All sources" URL and the "?source=cf" URL end up in
      // separate cache slots. If the All-sources URL was ever fetched
      // when the published list was empty, that empty response would
      // get pinned for the cache lifetime and "All sources" would keep
      // showing an empty list while the per-source filters happily
      // return the new tender. Better to always go to source — the
      // upstream is reading a small sheet, it's quick.
      cache: 'no-store',
    })

    // The VPS API uses /api/tenders/published. A local design preview can
    // safely point at the public website proxy instead, where the equivalent
    // published list is exposed as /api/tenders. Keep the production path
    // first and use this only when the public origin returns 404.
    if (res.status === 404 && /^https?:\/\//.test(portalBase)) {
      const publicProxy = new URL(`${portalBase}/api/tenders`)
      if (query) publicProxy.searchParams.set('q', query)
      if (sourceFilter && sourceFilter !== 'all')
        publicProxy.searchParams.set('source', sourceFilter)
      publicProxy.searchParams.set('page', String(page))
      publicProxy.searchParams.set('limit', String(limit))
      res = await fetch(publicProxy.toString(), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
    }

    if (!res.ok) {
      console.error(
        `[tenders] portal returned ${res.status}: ${await res.text().catch(() => '')}`,
      )
      return NextResponse.json(
        { error: 'Failed to fetch tenders', tenders: [] as Tender[] },
        { status: 502 },
      )
    }

    const payload = (await res.json()) as Tender[] | { tenders?: Tender[] }
    const tenders = Array.isArray(payload) ? payload : (payload.tenders ?? [])
    return NextResponse.json({
      tenders,
      page,
      total: tenders.length,
    })
  } catch (error) {
    console.error('[tenders] proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tenders', tenders: [] as Tender[] },
      { status: 502 },
    )
  }
}
