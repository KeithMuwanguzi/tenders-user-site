import type { GovTenderDetail, TenderDetailSection } from '@/lib/gov-tender-fetch'
import type { PublishedTenderSnapshot } from '@/lib/published-tenders'
import {
  officialNoticeUrl,
  sourceLabelFromParam,
  type TenderSourceParam,
} from '@/lib/tender-sources'

export type TenderDetail = GovTenderDetail

function pickLongerDescription(a: string, b: string): string {
  const left = (a || '').trim()
  const right = (b || '').trim()
  return right.length > left.length ? right : left
}

function mergeSections(
  gov: TenderDetailSection[],
  publishedText: string,
): TenderDetailSection[] {
  if (!publishedText.trim()) return gov
  const pubParagraphs = publishedText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 40)
  if (!pubParagraphs.length) return gov
  const existing = new Set(gov.flatMap((s) => s.paragraphs.map((p) => p.slice(0, 80).toLowerCase())))
  const extra = pubParagraphs.filter((p) => !existing.has(p.slice(0, 80).toLowerCase()))
  if (!extra.length) return gov
  return [
    ...gov,
    { title: 'Curated summary', paragraphs: extra },
  ]
}

export function snapshotToDetail(
  published: PublishedTenderSnapshot,
  sourceParam: TenderSourceParam,
): TenderDetail {
  const source = published.source || sourceLabelFromParam(sourceParam)
  const desc = published.description || ''
  return {
    id: published.id,
    title: published.title || 'Untitled opportunity',
    description: desc,
    fullDescription: desc,
    sections: desc.trim()
      ? [{ title: 'Opportunity overview', paragraphs: [desc.trim()] }]
      : [],
    publishedDate: published.publishedDate || '',
    deadline: published.deadline,
    value: published.value,
    location: published.location,
    organisation: published.organisation,
    status: published.status || 'Open',
    source,
    externalUrl: officialNoticeUrl(published.id, source, published.url),
    noticeIdentifier: null,
    procurementIdentifier: null,
    noticeType: null,
    cpvDescription: null,
    sector: null,
    legalBasis: null,
    procedure: null,
    // The stored snapshot URL is the official notice, not necessarily the
    // buyer's electronic tendering system. Never relabel it as a submission
    // portal when the richer official record is temporarily unavailable.
    submissionUrl: null,
    buyerAddress: null,
    buyerWebsite: null,
    regionCode: null,
    awardedDate: null,
    awardedValue: null,
    awardedSupplier: null,
    contactName: null,
    contactEmail: null,
    documents: [],
    category: published.category ?? null,
    curatedOnTenderLab: published.published_at ?? null,
  }
}

export function mergeGovAndPublished(
  gov: TenderDetail | null,
  published: PublishedTenderSnapshot | null,
  id: string,
  sourceParam: TenderSourceParam,
): TenderDetail | null {
  if (!gov && !published) return null
  if (!gov && published) return snapshotToDetail(published, sourceParam)
  if (!gov) return null

  const source = gov.source || (published?.source ?? sourceLabelFromParam(sourceParam))
  const externalUrl = officialNoticeUrl(
    id,
    source,
    published?.url || gov.externalUrl,
  )

  const publishedDesc = published?.description || ''
  const description = pickLongerDescription(gov.description, publishedDesc)
  const sections = mergeSections(gov.sections, publishedDesc)
  const fullDescription = pickLongerDescription(gov.fullDescription, publishedDesc)

  return {
    ...gov,
    id: gov.id || id,
    source,
    externalUrl,
    description,
    fullDescription: fullDescription.length >= description.length ? fullDescription : description,
    sections,
    title: gov.title || published?.title || 'Untitled opportunity',
    publishedDate: gov.publishedDate || published?.publishedDate || '',
    deadline: gov.deadline ?? published?.deadline ?? null,
    value: gov.value ?? published?.value ?? null,
    location: gov.location ?? published?.location ?? null,
    organisation: gov.organisation ?? published?.organisation ?? null,
    status: gov.status || published?.status || 'Open',
    category: published?.category ?? gov.category ?? null,
    curatedOnTenderLab: published?.published_at ?? gov.curatedOnTenderLab ?? null,
  }
}
