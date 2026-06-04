import type { PublishedTenderSnapshot } from '@/lib/published-tenders'
import {
  officialNoticeUrl,
  sourceLabelFromParam,
  type TenderSourceParam,
} from '@/lib/tender-sources'

export type TenderDetail = {
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
  category: string | null
  noticeType: string | null
  cpvDescription: string | null
  sector: string | null
  awardedDate: string | null
  awardedValue: string | null
  awardedSupplier: string | null
  contactName: string | null
  contactEmail: string | null
  documents: { title: string; url: string }[]
  curatedOnTenderLab: string | null
}

function pickLongerDescription(a: string, b: string): string {
  const left = (a || '').trim()
  const right = (b || '').trim()
  return right.length > left.length ? right : left
}

export function snapshotToDetail(
  published: PublishedTenderSnapshot,
  sourceParam: TenderSourceParam,
): TenderDetail {
  const source = published.source || sourceLabelFromParam(sourceParam)
  return {
    id: published.id,
    title: published.title || 'Untitled opportunity',
    description: published.description || '',
    publishedDate: published.publishedDate || '',
    deadline: published.deadline,
    value: published.value,
    location: published.location,
    organisation: published.organisation,
    status: published.status || 'Open',
    source,
    externalUrl: officialNoticeUrl(published.id, source, published.url),
    category: published.category ?? null,
    noticeType: null,
    cpvDescription: null,
    sector: null,
    awardedDate: null,
    awardedValue: null,
    awardedSupplier: null,
    contactName: null,
    contactEmail: null,
    documents: [],
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

  const merged: TenderDetail = {
    ...gov,
    id: gov.id || id,
    source,
    externalUrl,
    description: pickLongerDescription(gov.description, published?.description || ''),
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

  return merged
}
