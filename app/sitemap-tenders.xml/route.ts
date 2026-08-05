import { NextResponse } from 'next/server'
import { getPortalApiUrl, isPortalApiAvailable } from '@/lib/portal-api'

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

const BASE = 'https://www.tenderlab.co.uk'

export const runtime = 'nodejs'
// Tender data is supplied by the VPS at request time. Rendering this route at
// build time can produce an empty sitemap when the private service hostname is
// unavailable to the build runner, so keep the route dynamic and cache the
// completed XML at the HTTP edge instead.
export const dynamic = 'force-dynamic'

function unavailable(message: string): NextResponse {
  console.error(`[sitemap-tenders] ${message}`)
  return new NextResponse('Tender sitemap is temporarily unavailable.', {
    status: 503,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'Retry-After': '300',
      'X-Robots-Tag': 'noindex',
    },
  })
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function validLastmod(value: string): string | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

export async function GET() {
  let tenders: PortalTender[] = []

  if (!isPortalApiAvailable()) {
    return new NextResponse(emptySitemap(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  }

  try {
    const baseUrl = getPortalApiUrl()
    const upstream = new URL(`${baseUrl}/api/tenders/published`)
    upstream.searchParams.set('active_only', 'true')
    upstream.searchParams.set('limit', '1000')

    let res = await fetch(upstream.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })

    if (!res.ok) {
      return unavailable(`portal returned ${res.status}`)
    }

    const data = await res.json()
    // Portal returns either an array or { tenders: [...] }.
    if (Array.isArray(data)) {
      tenders = data as PortalTender[]
    } else if (Array.isArray(data?.tenders)) {
      tenders = data.tenders as PortalTender[]
    } else {
      return unavailable('portal returned an unexpected response shape')
    }
  } catch (e) {
    return unavailable(
      `fetch failed: ${e instanceof Error ? e.message : String(e)}`,
    )
  }

  const seen = new Set<string>()
  const urls = tenders
    .filter((t) => {
      if (!t.id || !t.title) return false
      const key = `${t.source}:${t.id}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map((t) => {
      const loc = `${BASE}/tenders/${encodeURIComponent(t.id)}`
      const lastmod = validLastmod(t.publishedDate)
      return `  <url>
    <loc>${xmlEscape(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join('\n')

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`)
}

function emptySitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
}

function xmlResponse(body: string) {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
