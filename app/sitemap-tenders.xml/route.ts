import { NextResponse } from 'next/server'

/* ================================================================
   Dynamic sitemap for live tender detail pages
   GET /sitemap-tenders.xml
   ================================================================
   Fetches the published tenders list from the portal API (same
   source as /api/tenders) and emits one <url> entry per live tender.
   Cached for 1 hour. Submit this URL to Google Search Console as a
   second sitemap alongside the existing /sitemap.xml.
   ================================================================ */

interface PortalTender {
  id: string
  title: string
  publishedDate: string
  source: 'Contracts Finder' | 'Find a Tender'
  status?: string
}

const PORTAL_API_URL =
  process.env.PORTAL_API_URL ||
  process.env.NEXT_PUBLIC_PORTAL_API_URL ||
  'https://tenderlab-admin-api-quva.onrender.com'

const BASE = 'https://www.tenderlab.co.uk'

export const runtime = 'nodejs'
export const revalidate = 3600 // 1 hour

export async function GET() {
  let tenders: PortalTender[] = []

  try {
    const upstream = new URL(`${PORTAL_API_URL}/api/tenders/published`)
    upstream.searchParams.set('active_only', 'true')
    upstream.searchParams.set('limit', '1000')

    const res = await fetch(upstream.toString(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    })

    if (res.ok) {
      const data = await res.json()
      // Portal returns either an array or { tenders: [...] }
      if (Array.isArray(data)) {
        tenders = data as PortalTender[]
      } else if (Array.isArray(data?.tenders)) {
        tenders = data.tenders as PortalTender[]
      }
    } else {
      console.error('[sitemap-tenders] portal returned', res.status)
    }
  } catch (e) {
    console.error('[sitemap-tenders] fetch error:', e)
  }

  const nowIso = new Date().toISOString()
  const urls = tenders
    .filter((t) => t.id && t.title)
    .map((t) => {
      const src = t.source === 'Find a Tender' ? 'ft' : 'cf'
      let lastmod = nowIso
      try {
        if (t.publishedDate) lastmod = new Date(t.publishedDate).toISOString()
      } catch {
        lastmod = nowIso
      }
      const loc = `${BASE}/tenders/${encodeURIComponent(t.id)}?source=${src}`
      // XML-escape ampersand for the query string
      const safeLoc = loc.replace(/&/g, '&amp;')
      return `  <url>
    <loc>${safeLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
