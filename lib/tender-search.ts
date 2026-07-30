import type { Tender } from '@/store/tendersSlice'

export type TenderSearchFilters = {
  keyword: string
  location: string
  organisation: string
  noticeOrCpv: string
}

export const EMPTY_TENDER_SEARCH: TenderSearchFilters = {
  keyword: '',
  location: '',
  organisation: '',
  noticeOrCpv: '',
}

export function hasActiveTenderSearch(filters: TenderSearchFilters): boolean {
  return Boolean(
    filters.keyword.trim() ||
      filters.location.trim() ||
      filters.organisation.trim() ||
      filters.noticeOrCpv.trim(),
  )
}

function haystack(tender: Tender): string {
  return [
    tender.title,
    tender.description,
    tender.organisation,
    tender.location,
    tender.category,
    tender.id,
    tender.value,
    tender.status,
    tender.source,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function includesAllWords(text: string, query: string): boolean {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean)
  if (words.length === 0) return true
  return words.every((w) => text.includes(w))
}

function includesPhrase(text: string, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return text.includes(q)
}

/** Live client-side filter over the curated published list. */
export function filterTendersBySearch(
  tenders: Tender[],
  filters: TenderSearchFilters,
): Tender[] {
  if (!hasActiveTenderSearch(filters)) return tenders

  const keyword = filters.keyword.trim()
  const location = filters.location.trim()
  const organisation = filters.organisation.trim()
  const noticeOrCpv = filters.noticeOrCpv.trim().toLowerCase()

  return tenders.filter((tender) => {
    const text = haystack(tender)

    if (keyword && !includesAllWords(text, keyword)) return false

    if (location) {
      const loc = (tender.location || '').toLowerCase()
      if (!includesAllWords(loc || text, location)) return false
    }

    if (organisation) {
      const org = (tender.organisation || '').toLowerCase()
      if (!includesAllWords(org || text, organisation)) return false
    }

    if (noticeOrCpv) {
      const id = (tender.id || '').toLowerCase()
      const idMatch = id.includes(noticeOrCpv) || includesPhrase(id, noticeOrCpv)
      // CPV codes often appear in titles/descriptions when admins paste notice text.
      const cpvMatch = includesPhrase(text, noticeOrCpv)
      if (!idMatch && !cpvMatch) return false
    }

    return true
  })
}
