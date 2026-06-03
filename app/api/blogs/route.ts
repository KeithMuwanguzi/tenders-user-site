import { NextResponse } from 'next/server'

const PORTAL_API_URL =
  process.env.PORTAL_API_URL ||
  process.env.NEXT_PUBLIC_PORTAL_API_URL ||
  'https://tenderlab-admin-api.onrender.com'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch(`${PORTAL_API_URL}/api/blogs/published?limit=100`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) {
      return NextResponse.json({ posts: [] }, { status: 502 })
    }
    const posts = await res.json()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('[blogs] proxy error:', error)
    return NextResponse.json({ posts: [] }, { status: 502 })
  }
}
