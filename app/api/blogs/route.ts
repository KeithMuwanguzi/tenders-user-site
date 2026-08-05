import { NextResponse } from 'next/server'
import { getPortalApiUrl } from '@/lib/portal-api'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!getPortalApiUrl()) {
    return NextResponse.json({ error: 'Portal API is not configured', posts: [] }, { status: 503 })
  }
  try {
    const baseUrl = getPortalApiUrl()
    let res = await fetch(`${baseUrl}/api/blogs/published?limit=100`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    })

    // The VPS API uses /api/blogs/published. Preview builds can safely read
    // the public site's read-only proxy at /api/blogs without changing the
    // production integration contract.
    if (res.status === 404 && /^https?:\/\//.test(baseUrl)) {
      res = await fetch(`${baseUrl}/api/blogs`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
    }

    if (!res.ok) {
      return NextResponse.json({ posts: [] }, { status: 502 })
    }
    const payload = (await res.json()) as unknown
    const posts =
      Array.isArray(payload) ? payload :
      payload && typeof payload === 'object' && 'posts' in payload
        ? (payload as { posts?: unknown[] }).posts ?? []
        : []
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('[blogs] proxy error:', error)
    return NextResponse.json({ posts: [] }, { status: 502 })
  }
}
