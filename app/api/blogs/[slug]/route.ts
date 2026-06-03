import { NextResponse } from 'next/server'

const PORTAL_API_URL =
  process.env.PORTAL_API_URL ||
  process.env.NEXT_PUBLIC_PORTAL_API_URL ||
  'https://tenderlab-admin-api.onrender.com'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params
  try {
    const res = await fetch(
      `${PORTAL_API_URL}/api/blogs/published/${encodeURIComponent(slug)}`,
      { headers: { Accept: 'application/json' }, cache: 'no-store' },
    )
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
