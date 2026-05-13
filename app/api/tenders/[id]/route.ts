import { NextRequest, NextResponse } from 'next/server'

/* ================================================================
   Single Tender Detail API
   GET /api/tenders/[id]?source=cf|ft
   ================================================================ */

interface TenderDetail {
  id: string
  title: string
  description: string
  publishedDate: string
  deadline: string | null
  value: string | null
  location: string | null
  organisation: string | null
  status: string
  source: 'Contracts Finder' | 'Find a Tender'
  externalUrl: string
  noticeType: string | null
  cpvDescription: string | null
  sector: string | null
  awardedDate: string | null
  awardedValue: string | null
  awardedSupplier: string | null
  contactName: string | null
  contactEmail: string | null
  documents: { title: string; url: string }[]
}

/* ─── Contracts Finder V2: get_published_notice ─── */
async function fetchCFNotice(id: string): Promise<TenderDetail | null> {
  const url = `https://www.contractsfinder.service.gov.uk/api/rest/2/get_published_notice/json/${id}`

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  })

  if (!res.ok) return null

  const data = await res.json()
  const n = data?.notice

  if (!n) return null

  return {
    id: n.id || id,
    title: n.title || 'Untitled opportunity',
    description: n.description || n.summary || '',
    publishedDate: n.publishedDate || '',
    deadline: n.deadlineDate || null,
    value: fmtValue(n.valueLow, n.valueHigh),
    location: n.regionText || n.region || null,
    organisation: n.organisationName || null,
    status: n.noticeStatus === 'Awarded' ? 'Awarded' : n.noticeStatus || 'Open',
    source: 'Contracts Finder',
    externalUrl: `https://www.contractsfinder.service.gov.uk/Notice/${id}`,
    noticeType: n.noticeType || null,
    cpvDescription: n.cpvDescription || n.cpvDescriptionExpanded || null,
    sector: n.sector || null,
    awardedDate: n.awardedDate || null,
    awardedValue: n.awardedValue ? fmtSingle(n.awardedValue) : null,
    awardedSupplier: n.awardedSupplier || null,
    contactName: n.contactName || null,
    contactEmail: n.contactEmail || null,
    documents: (n.documents || []).map((d: { title?: string; url?: string }) => ({
      title: d.title || 'Document',
      url: d.url || '',
    })),
  }
}

/* ─── Find a Tender: OCDS release package by notice ID ─── */
async function fetchFTNotice(id: string): Promise<TenderDetail | null> {
  const url = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages/${id}`

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  })

  if (!res.ok) return null

  const data = await res.json()
  const releases = data?.releases
  if (!releases?.length) return null

  const r = releases[0]
  const t = r.tender || {}

  return {
    id: r.ocid || r.id || id,
    title: t.title || 'Untitled opportunity',
    description: t.description || '',
    publishedDate: r.date || '',
    deadline: t.tenderPeriod?.endDate || null,
    value: fmtOCDS(t.value),
    location: t.items?.[0]?.deliveryAddresses?.[0]?.region || null,
    organisation: r.buyer?.name || null,
    status: t.status === 'active' ? 'Open' : t.status || 'Unknown',
    source: 'Find a Tender',
    externalUrl: `https://www.find-tender.service.gov.uk/Notice/${id}`,
    noticeType: r.tag?.[0] || null,
    cpvDescription: t.items?.[0]?.classification?.description || null,
    sector: null,
    awardedDate: null,
    awardedValue: null,
    awardedSupplier: null,
    contactName: r.buyer?.contactPoint?.name || null,
    contactEmail: r.buyer?.contactPoint?.email || null,
    documents: (t.documents || []).map((d: { title?: string; url?: string }) => ({
      title: d.title || 'Document',
      url: d.url || '',
    })),
  }
}

function fmtValue(low: number | null | undefined, high: number | null | undefined): string | null {
  const v = high ?? low
  if (!v) return null
  if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`
  if (v >= 1_000) return `£${(v / 1_000).toFixed(0)}k`
  return `£${v.toLocaleString()}`
}

function fmtSingle(v: number): string | null {
  if (!v) return null
  if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`
  if (v >= 1_000) return `£${(v / 1_000).toFixed(0)}k`
  return `£${v.toLocaleString()}`
}

function fmtOCDS(value: { amount?: number; currency?: string } | null | undefined): string | null {
  if (!value?.amount) return null
  const a = value.amount
  if (a >= 1_000_000) return `£${(a / 1_000_000).toFixed(1)}m`
  if (a >= 1_000) return `£${(a / 1_000).toFixed(0)}k`
  return `£${a.toLocaleString()}`
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const source = searchParams.get('source') || 'cf'

  try {
    let tender: TenderDetail | null = null

    if (source === 'ft') {
      tender = await fetchFTNotice(id)
    } else {
      tender = await fetchCFNotice(id)
    }

    if (!tender) {
      return NextResponse.json({ error: 'Tender not found' }, { status: 404 })
    }

    return NextResponse.json({ tender })
  } catch (error) {
    console.error('Tender detail API error:', error)
    return NextResponse.json({ error: 'Failed to fetch tender' }, { status: 502 })
  }
}
