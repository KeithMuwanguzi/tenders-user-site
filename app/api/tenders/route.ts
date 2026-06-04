import { NextRequest, NextResponse } from 'next/server'

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

const PORTAL_API_URL =
  process.env.PORTAL_API_URL ||
  process.env.NEXT_PUBLIC_PORTAL_API_URL ||
  'https://tenderlab-admin-api.onrender.com'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Render's free tier can take 30s to wake up. 60s gives us headroom.
export const maxDuration = 60

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const sourceFilter = searchParams.get('source') || 'all'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = Math.min(
    500,
    Math.max(1, parseInt(searchParams.get('limit') || '500', 10)),
  )

  const upstream = new URL(`${PORTAL_API_URL}/api/tenders/published`)
  // The portal already restricts to healthcare-relevant tenders the admin
  // chose to publish, so we only forward category + source as a refining
  // search. An empty `q` returns everything in the published list.
  if (query) upstream.searchParams.set('q', query)
  if (sourceFilter && sourceFilter !== 'all')
    upstream.searchParams.set('source', sourceFilter)
  upstream.searchParams.set('active_only', 'true')
  upstream.searchParams.set('limit', String(limit))

  try {
    const res = await fetch(upstream.toString(), {
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

    if (!res.ok) {
      console.error(
        `[tenders] portal returned ${res.status}: ${await res.text().catch(() => '')}`,
      )
      return NextResponse.json(
        { error: 'Failed to fetch tenders', tenders: [] as Tender[] },
        { status: 502 },
      )
    }

    const tenders = (await res.json()) as Tender[]
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
