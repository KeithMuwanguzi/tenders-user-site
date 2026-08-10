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

/**
 * Resolve the upstream from durable record evidence rather than relying on a
 * query string. Canonical tender URLs deliberately omit ?source=, so detail
 * pages must remain complete after that parameter is consolidated away.
 */
export function inferTenderSourceParam(
  id: string,
  explicitSource?: string | null,
  storedSource?: TenderSourceLabel | string | null,
): TenderSourceParam {
  if (isTenderSourceParam(explicitSource)) return explicitSource
  if (storedSource === 'Find a Tender') return 'ft'
  if (storedSource === 'Contracts Finder') return 'cf'
  return /^ocds-/i.test(id) || /^\d{6}-\d{4}$/.test(id) ? 'ft' : 'cf'
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

export function submissionSystemName(url: string): string {
  const value = url.toLowerCase()
  if (value.includes('procontract.due-north.com')) return 'ProContract'
  if (value.includes('atamis') || value.includes('health-family.force.com')) return 'Atamis'
  if (value.includes('in-tendhost.co.uk')) return 'In-Tend'
  if (value.includes('delta-esourcing.com')) return 'Delta eSourcing'
  if (value.includes('jaggaer')) return 'JAGGAER'
  if (value.includes('etenderwales')) return 'eTenderWales'
  if (value.includes('eu-supply.com')) return 'EU Supply'
  return 'the buyer’s electronic tendering system'
}
