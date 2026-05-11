import { NextRequest, NextResponse } from 'next/server'

const CF_BASE = 'https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || 'health social care'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = 20

  try {
    const cfUrl = new URL(CF_BASE)
    cfUrl.searchParams.set('queryString', query)
    cfUrl.searchParams.set('stage', 'tender')
    cfUrl.searchParams.set('size', String(pageSize))

    const response = await fetch(cfUrl.toString(), {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Contracts Finder responded with ${response.status}`)
    }

    const data = await response.json()

    // The API returns releases directly at the top level
    const releases: CFRelease[] = data.releases || []

    const tenders = releases
      .filter((r) => r.tender)
      .map((release) => {
        const tender = release.tender!
        const noticeUrl = extractNoticeUrl(release)

        return {
          id: release.ocid || release.id || Math.random().toString(36),
          title: tender.title || 'Untitled opportunity',
          description: tender.description || '',
          publishedDate: release.date || '',
          deadline: tender.tenderPeriod?.endDate || null,
          value: formatValue(tender.value),
          location: extractLocation(tender),
          organisation: release.buyer?.name || null,
          status: tender.status === 'complete' ? 'Awarded' : 'Open',
          url: noticeUrl,
        }
      })

    return NextResponse.json({ tenders, page, total: tenders.length })
  } catch (error) {
    console.error('Contracts Finder API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tenders', tenders: [] },
      { status: 502 }
    )
  }
}

function formatValue(value: { amount?: number; currency?: string } | null | undefined): string | null {
  if (!value?.amount) return null
  const amount = value.amount
  if (amount >= 1_000_000) return `£${(amount / 1_000_000).toFixed(1)}m`
  if (amount >= 1_000) return `£${(amount / 1_000).toFixed(0)}k`
  return `£${amount.toLocaleString()}`
}

function extractLocation(tender: CFTender): string | null {
  const items = tender.items
  if (items?.[0]?.deliveryAddresses?.[0]?.region) {
    return items[0].deliveryAddresses[0].region
  }
  return null
}

function extractNoticeUrl(release: CFRelease): string {
  // Try to find a notice URL from awards or use the ocid
  const awards = release.awards
  if (awards?.[0]?.documents?.[0]?.url) {
    return awards[0].documents[0].url
  }
  const id = release.id || ''
  const noticeId = id.split('-').slice(-1)[0] || ''
  return `https://www.contractsfinder.service.gov.uk/Notice/${noticeId}`
}

// Types matching actual Contracts Finder OCDS response
interface CFTender {
  id?: string
  title?: string
  description?: string
  status?: string
  value?: { amount?: number; currency?: string }
  tenderPeriod?: { endDate?: string }
  items?: Array<{ deliveryAddresses?: Array<{ region?: string; countryName?: string }> }>
}

interface CFRelease {
  ocid?: string
  id?: string
  date?: string
  initiationType?: string
  tender?: CFTender
  buyer?: { id?: string; name?: string }
  awards?: Array<{
    documents?: Array<{ url?: string }>
  }>
}
