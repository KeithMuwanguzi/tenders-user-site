/** Track which tender IDs were seen on the previous fetch and sort newest-first. */

export type TenderSortMode = 'source' | 'curated'

export type TenderWithNewness<T> = T & { isNew: boolean }

export function parseTenderSortTime(value: string | null | undefined): number {
  if (!value) return 0
  const t = Date.parse(value)
  return Number.isNaN(t) ? 0 : t
}

export function tenderSortTimestamp(
  tender: { publishedDate?: string; published_at?: string | null },
  mode: TenderSortMode,
): number {
  if (mode === 'curated') {
    const curated = parseTenderSortTime(tender.published_at ?? undefined)
    if (curated) return curated
  }
  return parseTenderSortTime(tender.publishedDate)
}

export function sortTendersNewestFirst<T extends { publishedDate?: string; published_at?: string | null }>(
  tenders: T[],
  mode: TenderSortMode = 'source',
): T[] {
  return [...tenders].sort(
    (a, b) => tenderSortTimestamp(b, mode) - tenderSortTimestamp(a, mode),
  )
}

export function applyNewness<T extends { id: string }>(
  tenders: T[],
  previousSnapshot: string[],
  hasLoadedBefore: boolean,
): {
  tenders: TenderWithNewness<T>[]
  snapshot: string[]
  newCount: number
} {
  const previous = new Set(previousSnapshot)
  let newCount = 0

  const withNew = tenders.map((t) => {
    const isNew = hasLoadedBefore && !previous.has(t.id)
    if (isNew) newCount += 1
    return { ...t, isNew }
  })

  const snapshot = tenders.map((t) => t.id)
  return { tenders: withNew, snapshot, newCount }
}

function publicSnapshotKeys(source: string) {
  const key = source || 'all'
  return {
    ids: `tenderlab-public-tender-snapshot-${key}`,
    loaded: `tenderlab-public-tender-loaded-${key}`,
  }
}

export function loadPublicTenderSnapshot(source: string): { ids: string[]; hasLoadedBefore: boolean } {
  if (typeof window === 'undefined') return { ids: [], hasLoadedBefore: false }
  const keys = publicSnapshotKeys(source)
  try {
    const raw = localStorage.getItem(keys.ids)
    const ids = raw ? (JSON.parse(raw) as string[]) : []
    const hasLoadedBefore = localStorage.getItem(keys.loaded) === '1'
    return { ids: Array.isArray(ids) ? ids : [], hasLoadedBefore }
  } catch {
    return { ids: [], hasLoadedBefore: false }
  }
}

export function savePublicTenderSnapshot(ids: string[], source: string): void {
  if (typeof window === 'undefined') return
  const keys = publicSnapshotKeys(source)
  try {
    localStorage.setItem(keys.ids, JSON.stringify(ids))
    localStorage.setItem(keys.loaded, '1')
  } catch {
    /* ignore quota errors */
  }
}
