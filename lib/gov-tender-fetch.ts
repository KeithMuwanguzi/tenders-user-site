import {
  officialNoticeUrl,
  sourceLabelFromParam,
  type TenderSourceLabel,
  type TenderSourceParam,
} from '@/lib/tender-sources'

export type TenderDetailSection = {
  title: string
  paragraphs: string[]
}

export type GovTenderDetail = {
  id: string
  title: string
  description: string
  fullDescription: string
  sections: TenderDetailSection[]
  publishedDate: string
  deadline: string | null
  value: string | null
  location: string | null
  organisation: string | null
  status: string
  source: TenderSourceLabel
  externalUrl: string
  noticeIdentifier: string | null
  procurementIdentifier: string | null
  noticeType: string | null
  cpvDescription: string | null
  sector: string | null
  legalBasis: string | null
  procedure: string | null
  submissionUrl: string | null
  buyerAddress: string | null
  buyerWebsite: string | null
  regionCode: string | null
  awardedDate: string | null
  awardedValue: string | null
  awardedSupplier: string | null
  contactName: string | null
  contactEmail: string | null
  documents: { title: string; url: string }[]
  category: string | null
  curatedOnTenderLab: string | null
}

const EMPTY_EXTRA = { category: null, curatedOnTenderLab: null }

const FT_NOTICE_ID = /(\d{6}-\d{4})/

export function extractFtApiId(routeId: string, storedUrl?: string | null): string {
  const fromUrl = storedUrl?.match(FT_NOTICE_ID)?.[1]
  if (fromUrl) return fromUrl
  if (FT_NOTICE_ID.test(routeId)) return routeId.match(FT_NOTICE_ID)![1]
  return routeId
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\u00a3/g, '£')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 20)
}

function uniqueParagraphs(paragraphs: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of paragraphs) {
    const key = p.slice(0, 120).toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
  }
  return out
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

function formatPartyAddress(party: {
  address?: {
    streetAddress?: string
    locality?: string
    region?: string
    postalCode?: string
    countryName?: string
  }
}): string | null {
  const a = party.address
  if (!a) return null
  const parts = [
    a.streetAddress,
    a.locality,
    a.postalCode,
    a.region,
    a.countryName,
  ].filter(Boolean)
  return parts.length ? parts.join(', ') : null
}

function buyerParty(parties: unknown[]): Record<string, unknown> | null {
  for (const p of parties) {
    const party = p as { roles?: string[] }
    if (party.roles?.includes('buyer')) return party as Record<string, unknown>
  }
  return null
}

function buildSections(blocks: { title: string; text: string }[]): TenderDetailSection[] {
  return blocks
    .map(({ title, text }) => ({
      title,
      paragraphs: uniqueParagraphs(splitParagraphs(htmlToPlainText(text))),
    }))
    .filter((s) => s.paragraphs.length > 0)
}

function combineFullDescription(sections: TenderDetailSection[], fallback: string): string {
  const fromSections = sections.flatMap((s) => s.paragraphs).join('\n\n')
  return fromSections.length > fallback.length ? fromSections : fallback
}

function ftExternalUrl(release: { id?: string; ocid?: string }, apiId: string, storedUrl?: string | null): string {
  const trimmed = storedUrl?.trim()
  if (trimmed) return trimmed
  const noticeId = String(release.id || '')
  if (FT_NOTICE_ID.test(noticeId)) {
    return `https://www.find-tender.service.gov.uk/Notice/${noticeId.match(FT_NOTICE_ID)![1]}`
  }
  return officialNoticeUrl(release.ocid || apiId, 'Find a Tender', null)
}

export async function fetchFTNotice(
  routeId: string,
  storedUrl?: string | null,
): Promise<GovTenderDetail | null> {
  const apiId = extractFtApiId(routeId, storedUrl)
  const url = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages/${encodeURIComponent(apiId)}`
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 1800 },
    })
    if (!res.ok) return null
    const data = await res.json()
    const releases = data?.releases
    if (!releases?.length) return null

    const r = releases[0] as Record<string, unknown>
    const t = (r.tender || {}) as Record<string, unknown>
    const lots = (t.lots || []) as { description?: string }[]
    const parties = (r.parties || []) as unknown[]
    const buyer = buyerParty(parties)
    const classification = (t.classification || {}) as { description?: string; id?: string }
    const items = (t.items || []) as {
      deliveryAddresses?: { region?: string }[]
    }[]
    const regionCode = items[0]?.deliveryAddresses?.[0]?.region || buyer?.address
      ? ((buyer as { address?: { region?: string } }).address?.region ?? null)
      : null

    const lotText = lots.map((l) => l.description || '').filter(Boolean).join('\n\n')
    const releaseDesc = String(r.description || '')
    const tenderDesc = String(t.description || '')

    const sectionBlocks: { title: string; text: string }[] = []
    if (releaseDesc) sectionBlocks.push({ title: 'Notice summary', text: releaseDesc })
    if (tenderDesc) sectionBlocks.push({ title: 'Opportunity overview', text: tenderDesc })
    if (lotText) sectionBlocks.push({ title: 'Contract and delivery', text: lotText })

    if (buyer) {
      const lines = [
        String((buyer as { name?: string }).name || ''),
        formatPartyAddress(buyer as { address?: { streetAddress?: string } }) || '',
        (buyer as { contactPoint?: { name?: string; email?: string } }).contactPoint?.name
          ? `Contact: ${(buyer as { contactPoint: { name: string } }).contactPoint.name}`
          : '',
        (buyer as { contactPoint?: { email?: string } }).contactPoint?.email
          ? `Email: ${(buyer as { contactPoint: { email: string } }).contactPoint.email}`
          : '',
        (buyer as { details?: { url?: string; buyerProfile?: string } }).details?.url
          ? `Website: ${(buyer as { details: { url: string } }).details.url}`
          : '',
      ].filter(Boolean)
      sectionBlocks.push({ title: 'Contracting authority', text: lines.join('\n') })
    }

    const procedureParts = [
      t.procurementMethodDetails ? `Procedure: ${t.procurementMethodDetails}` : '',
      t.procurementMethod ? `Method: ${t.procurementMethod}` : '',
      (t.legalBasis as { id?: string })?.id ? `Legal basis: ${(t.legalBasis as { id: string }).id}` : '',
    ].filter(Boolean)
    if (procedureParts.length) {
      sectionBlocks.push({ title: 'Procedure', text: procedureParts.join('\n') })
    }

    const submissionUrl =
      String(t.submissionMethodDetails || '') ||
      String((t.communication as { atypicalToolUrl?: string })?.atypicalToolUrl || '') ||
      String((buyer as { contactPoint?: { url?: string } })?.contactPoint?.url || '')

    if (submissionUrl) {
      sectionBlocks.push({
        title: 'How to respond',
        text: `Submissions and documents are handled via:\n${submissionUrl}`,
      })
    }

    const sections = buildSections(sectionBlocks)
    const plainTender = htmlToPlainText(tenderDesc)
    const fullDescription = combineFullDescription(sections, plainTender)

    const noticeId = String(r.id || '')
    const noticeIdentifier = FT_NOTICE_ID.test(noticeId) ? noticeId.match(FT_NOTICE_ID)![1] : noticeId || null

    return {
      id: String(r.ocid || routeId),
      title: String(t.title || 'Untitled opportunity'),
      description: plainTender,
      fullDescription,
      sections,
      publishedDate: String(r.date || ''),
      deadline: String((t.tenderPeriod as { endDate?: string })?.endDate || '') || null,
      value: fmtOCDS(t.value as { amount?: number }),
      location: regionCode,
      organisation: String((r.buyer as { name?: string })?.name || (buyer as { name?: string })?.name || ''),
      status: t.status === 'active' ? 'Open' : String(t.status || 'Unknown'),
      source: 'Find a Tender',
      externalUrl: ftExternalUrl(
        r as { id?: string; ocid?: string },
        apiId,
        storedUrl,
      ),
      noticeIdentifier,
      procurementIdentifier: String(r.ocid || '') || null,
      noticeType: Array.isArray(r.tag) ? String(r.tag[0] || '') : String(r.tag || '') || null,
      cpvDescription: classification.description
        ? `${classification.id ? `${classification.id} — ` : ''}${classification.description}`
        : null,
      sector: String(t.mainProcurementCategory || '') || null,
      legalBasis: (t.legalBasis as { id?: string })?.id
        ? String((t.legalBasis as { id: string }).id)
        : null,
      procedure: String(t.procurementMethodDetails || t.procurementMethod || '') || null,
      submissionUrl: submissionUrl || null,
      buyerAddress: buyer ? formatPartyAddress(buyer as { address?: { streetAddress?: string } }) : null,
      buyerWebsite:
        String((buyer as { details?: { url?: string } })?.details?.url || '') ||
        String((buyer as { details?: { buyerProfile?: string } })?.details?.buyerProfile || '') ||
        null,
      regionCode: regionCode || null,
      awardedDate: null,
      awardedValue: null,
      awardedSupplier: null,
      contactName: String((buyer as { contactPoint?: { name?: string } })?.contactPoint?.name || '') || null,
      contactEmail: String((buyer as { contactPoint?: { email?: string } })?.contactPoint?.email || '') || null,
      documents: ((t.documents || []) as { title?: string; url?: string }[]).map((d) => ({
        title: d.title || 'Document',
        url: d.url || '',
      })),
      ...EMPTY_EXTRA,
    }
  } catch {
    return null
  }
}

export async function fetchCFNotice(
  routeId: string,
  storedUrl?: string | null,
): Promise<GovTenderDetail | null> {
  const url = `https://www.contractsfinder.service.gov.uk/api/rest/2/get_published_notice/json/${encodeURIComponent(routeId)}`
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 1800 },
    })
    if (!res.ok) return null
    const data = await res.json()
    const n = data?.notice
    if (!n) return null

    const desc = htmlToPlainText(n.description || n.summary || '')
    const extra = n.additionalText ? htmlToPlainText(n.additionalText) : ''
    const sections = buildSections([
      { title: 'Opportunity overview', text: desc },
      ...(extra ? [{ title: 'Additional information', text: extra }] : []),
      ...(n.organisationName
        ? [
            {
              title: 'Contracting authority',
              text: [
                n.organisationName,
                n.contactName ? `Contact: ${n.contactName}` : '',
                n.contactEmail ? `Email: ${n.contactEmail}` : '',
              ]
                .filter(Boolean)
                .join('\n'),
            },
          ]
        : []),
    ])
    const fullDescription = combineFullDescription(sections, desc)

    return {
      id: n.id || routeId,
      title: n.title || 'Untitled opportunity',
      description: desc,
      fullDescription,
      sections,
      publishedDate: n.publishedDate || '',
      deadline: n.deadlineDate || null,
      value: fmtValue(n.valueLow, n.valueHigh),
      location: n.regionText || n.region || null,
      organisation: n.organisationName || null,
      status: n.noticeStatus === 'Awarded' ? 'Awarded' : n.noticeStatus || 'Open',
      source: 'Contracts Finder',
      externalUrl: officialNoticeUrl(routeId, 'Contracts Finder', storedUrl || n.url),
      noticeIdentifier: n.id || routeId,
      procurementIdentifier: null,
      noticeType: n.noticeType || null,
      cpvDescription: n.cpvDescription || n.cpvDescriptionExpanded || null,
      sector: n.sector || null,
      legalBasis: null,
      procedure: n.procurementMethod || null,
      submissionUrl: n.url || null,
      buyerAddress: null,
      buyerWebsite: null,
      regionCode: n.region || null,
      awardedDate: n.awardedDate || null,
      awardedValue: n.awardedValue ? fmtSingle(n.awardedValue) : null,
      awardedSupplier: n.awardedSupplier || null,
      contactName: n.contactName || null,
      contactEmail: n.contactEmail || null,
      documents: (n.documents || []).map((d: { title?: string; url?: string }) => ({
        title: d.title || 'Document',
        url: d.url || '',
      })),
      ...EMPTY_EXTRA,
    }
  } catch {
    return null
  }
}

export async function fetchGovTender(
  routeId: string,
  sourceParam: TenderSourceParam,
  storedUrl?: string | null,
): Promise<GovTenderDetail | null> {
  return sourceParam === 'ft'
    ? fetchFTNotice(routeId, storedUrl)
    : fetchCFNotice(routeId, storedUrl)
}
