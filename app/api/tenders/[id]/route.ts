import { NextRequest, NextResponse } from 'next/server'
import { fetchGovTender } from '@/lib/gov-tender-fetch'
import { fetchPublishedTenderById } from '@/lib/published-tenders'
import { mergeGovAndPublished } from '@/lib/tender-detail-merge'
import { inferTenderSourceParam, isTenderSourceParam } from '@/lib/tender-sources'

/* A single canonical detail pipeline serves both the HTML page and public API.
   Source is derived from the curated snapshot or durable identifier because
   canonical tender URLs intentionally omit the historical ?source= parameter. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const requestedSource = new URL(request.url).searchParams.get('source')
  if (requestedSource && !isTenderSourceParam(requestedSource)) {
    return NextResponse.json(
      { error: 'Invalid tender source. Use cf or ft.' },
      { status: 400 },
    )
  }

  try {
    const published = await fetchPublishedTenderById(id)
    const source = inferTenderSourceParam(id, requestedSource, published?.source)
    const gov = await fetchGovTender(id, source, published?.url)
    const tender = mergeGovAndPublished(gov, published, id, source)

    if (!tender) {
      return NextResponse.json({ error: 'Tender not found' }, { status: 404 })
    }

    return NextResponse.json({ tender })
  } catch (error) {
    console.error('Tender detail API error:', error)
    return NextResponse.json({ error: 'Failed to fetch tender' }, { status: 502 })
  }
}
