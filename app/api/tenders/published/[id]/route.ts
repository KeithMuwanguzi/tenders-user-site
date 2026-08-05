import { NextResponse } from 'next/server'
import { getPortalApiUrl } from '@/lib/portal-api'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

/** Proxy curated tender snapshot from the portal (same fields as publish time). */
export async function GET(_request: Request, { params }: Params) {
  if (!getPortalApiUrl()) {
    return NextResponse.json({ error: 'Portal API is not configured' }, { status: 503 })
  }
  const { id } = await params
  try {
    const res = await fetch(
      `${getPortalApiUrl()}/api/tenders/published/${encodeURIComponent(id)}`,
      { headers: { Accept: 'application/json' }, cache: 'no-store' },
    )
    if (res.status === 404) {
      return NextResponse.json({ error: 'Not in published list' }, { status: 404 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
    }
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
