/**
 * Internal Portal API base URL for server-side fetches (Docker / VPS).
 * Browser clients should use same-origin `/api/*` routes on the website.
 */
export function getPortalApiUrl(): string {
  // During `docker build` the API container is not running, skip upstream calls.
  if (process.env.SKIP_BUILD_TIME_FETCH === 'true') {
    return ''
  }

  // Server integrations must be configured explicitly. Do not fall back to a
  // Docker-only hostname, a retired provider or a NEXT_PUBLIC variable: those
  // behaviours make a Vercel build look healthy while runtime data is broken.
  const raw = process.env.PORTAL_API_URL || ''
  return raw.replace(/\/$/, '')
}

/** True when server-side Portal API calls should be skipped (image build). */
export function isPortalApiAvailable(): boolean {
  return getPortalApiUrl().length > 0
}
