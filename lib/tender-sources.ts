export type TenderSourceLabel = 'Contracts Finder' | 'Find a Tender'

export type TenderSourceParam = 'cf' | 'ft'

export function isTenderSourceParam(
  value: string | null | undefined,
): value is TenderSourceParam {
  return value === 'cf' || value === 'ft'
}

export function sourceParamFromLabel(source: TenderSourceLabel | string): TenderSourceParam {
  return source === 'Find a Tender' ? 'ft' : 'cf'
}

export function sourceLabelFromParam(param: string): TenderSourceLabel {
  return param === 'ft' ? 'Find a Tender' : 'Contracts Finder'
}

/** Official gov.uk notice URL — prefers stored snapshot url from the portal. */
export function officialNoticeUrl(
  id: string,
  source: TenderSourceLabel | string,
  storedUrl?: string | null,
): string {
  const trimmed = storedUrl?.trim()
  if (trimmed) return trimmed
  if (source === 'Find a Tender') {
    return `https://www.find-tender.service.gov.uk/Notice/${id}`
  }
  return `https://www.contractsfinder.service.gov.uk/Notice/${id}`
}

/** Neutral label — platform names are not shown in the public UI. */
export function officialSourceLinkLabel(_source?: TenderSourceLabel | string): string {
  return 'View official notice'
}
