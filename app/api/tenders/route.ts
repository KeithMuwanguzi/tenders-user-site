import { NextRequest, NextResponse } from 'next/server'

/* ─── Unified Tender type returned to the client ─── */
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

/* ================================================================
   1. CONTRACTS FINDER — V2 POST search_notices (stage = "Open")
   ================================================================ */
const CF_SEARCH = 'https://www.contractsfinder.service.gov.uk/api/rest/2/search_notices/json'

async function fetchContractsFinder(keyword: string): Promise<Tender[]> {
  const body = {
    searchCriteria: {
      keyword,
      statuses: ['Open'],      // Image 2: "Opportunity" = Open
      types: null,
      regions: null,
      postcode: null,
      radius: 0,
      valueFrom: null,
      valueTo: null,
      publishedFrom: null,
      publishedTo: null,
      deadlineFrom: null,
      deadlineTo: null,
      approachMarketFrom: null,
      approachMarketTo: null,
      awardedFrom: null,
      awardedTo: null,
      isSubcontract: null,
      suitableForSme: null,
      suitableForVco: null,
      awardedToSme: null,
      awardedToVcse: null,
      cpvCodes: null,
    },
    size: 100,
  }

  const res = await fetch(CF_SEARCH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
    next: { revalidate: 300 },
  })

  if (!res.ok) throw new Error(`Contracts Finder V2 ${res.status}`)

  const data = await res.json()
  const hits: CFHit[] = data.noticeList || []

  return hits.map((h) => {
    const n = h.item
    return {
      id: n.id || Math.random().toString(36),
      title: n.title || 'Untitled opportunity',
      description: n.description || '',
      publishedDate: n.publishedDate || '',
      deadline: n.deadlineDate || null,
      value: fmtCFValue(n.valueLow, n.valueHigh),
      location: n.regionText || n.region || null,
      organisation: n.organisationName || null,
      status: n.noticeStatus === 'Awarded' ? 'Awarded' : 'Open',
      url: `https://www.contractsfinder.service.gov.uk/Notice/${n.id}`,
      source: 'Contracts Finder' as const,
    }
  })
}

function fmtCFValue(low: number | null | undefined, high: number | null | undefined): string | null {
  const v = high ?? low
  if (!v) return null
  if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`
  if (v >= 1_000) return `£${(v / 1_000).toFixed(0)}k`
  return `£${v.toLocaleString()}`
}

interface CFNotice {
  id?: string
  title?: string
  description?: string
  publishedDate?: string
  deadlineDate?: string
  valueLow?: number
  valueHigh?: number
  region?: string
  regionText?: string
  organisationName?: string
  noticeStatus?: string
  noticeType?: string
}
interface CFHit { score: number; item: CFNotice }

/* ================================================================
   2. FIND A TENDER — OCDS release packages (last 14 days,
      filtered to tender.status = "active" → Open / Tender stage)
   ================================================================ */
const FT_OCDS = 'https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages'

async function fetchFindATender(keyword: string): Promise<Tender[]> {
  const now = new Date()
  const from = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

  const url = new URL(FT_OCDS)
  url.searchParams.set('updatedFrom', from.toISOString())
  url.searchParams.set('updatedTo', now.toISOString())

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  })

  if (!res.ok) throw new Error(`Find a Tender OCDS ${res.status}`)

  const data = await res.json()
  const releases: FTRelease[] = data.releases || []

  const kw = keyword.toLowerCase().split(/\s+/)

  return releases
    .filter((r) => {
      // Image 1: "Open opportunities only" + "Tender" stage
      const status = r.tender?.status?.toLowerCase()
      if (status !== 'active') return false
      // Keyword filter (title or description)
      const text = `${r.tender?.title ?? ''} ${r.tender?.description ?? ''}`.toLowerCase()
      return kw.some((w) => text.includes(w))
    })
    .slice(0, 50)
    .map((r) => {
      const t = r.tender!
      const noticeId = r.id?.match(/(\d{6}-\d{4})/)?.[1]
      return {
        id: r.ocid || r.id || Math.random().toString(36),
        title: t.title || 'Untitled opportunity',
        description: t.description || '',
        publishedDate: r.date || '',
        deadline: t.tenderPeriod?.endDate || null,
        value: fmtOCDSValue(t.value),
        location: t.items?.[0]?.deliveryAddresses?.[0]?.region || null,
        organisation: r.buyer?.name || null,
        status: 'Open',
        url: noticeId
          ? `https://www.find-tender.service.gov.uk/Notice/${noticeId}`
          : `https://www.find-tender.service.gov.uk/Search/Results`,
        source: 'Find a Tender' as const,
      }
    })
}

function fmtOCDSValue(value: { amount?: number; currency?: string } | null | undefined): string | null {
  if (!value?.amount) return null
  const a = value.amount
  if (a >= 1_000_000) return `£${(a / 1_000_000).toFixed(1)}m`
  if (a >= 1_000) return `£${(a / 1_000).toFixed(0)}k`
  return `£${a.toLocaleString()}`
}

interface FTRelease {
  ocid?: string
  id?: string
  date?: string
  tender?: {
    title?: string
    description?: string
    status?: string
    value?: { amount?: number; currency?: string }
    tenderPeriod?: { endDate?: string }
    items?: Array<{ deliveryAddresses?: Array<{ region?: string }> }>
  }
  buyer?: { name?: string }
}

/* ================================================================
   3. COMBINED API HANDLER
   ================================================================ */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || 'health social care'
  const sourceFilter = searchParams.get('source') || 'all' // all | cf | ft
  const page = parseInt(searchParams.get('page') || '1', 10)

  try {
    const fetches: Promise<Tender[]>[] = []

    if (sourceFilter === 'all' || sourceFilter === 'cf') {
      fetches.push(fetchContractsFinder(query).catch((e) => {
        console.error('Contracts Finder error:', e)
        return [] as Tender[]
      }))
    }
    if (sourceFilter === 'all' || sourceFilter === 'ft') {
      fetches.push(fetchFindATender(query).catch((e) => {
        console.error('Find a Tender error:', e)
        return [] as Tender[]
      }))
    }

    const results = await Promise.all(fetches)
    const tenders = results
      .flat()
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())

    return NextResponse.json({ tenders, page, total: tenders.length })
  } catch (error) {
    console.error('Tenders API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tenders', tenders: [] },
      { status: 502 }
    )
  }
}
