import { NextResponse } from 'next/server'
import { getPortalApiUrl } from '@/lib/portal-api'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: Params) {
  if (!getPortalApiUrl()) {
    return NextResponse.json({ error: 'Portal API is not configured' }, { status: 503 })
  }
  const { slug } = await params
  try {
    let res = await fetch(
      `${getPortalApiUrl()}/api/blogs/published/${encodeURIComponent(slug)}`,
      { headers: { Accept: 'application/json' }, cache: 'no-store' },
    )
    if (res.status === 404 && /^https?:\/\//.test(getPortalApiUrl())) {
      res = await fetch(
        `${getPortalApiUrl()}/api/blogs/${encodeURIComponent(slug)}`,
        { headers: { Accept: 'application/json' }, cache: 'no-store' },
      )
    }
    if (res.status === 404) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
    }
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
