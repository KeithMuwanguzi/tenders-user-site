import Link from 'next/link'
import { getPortalApiUrl, isPortalApiAvailable } from '@/lib/portal-api'

type PortalTender = {
  id: string
  title: string
  organisation?: string
  publishedDate?: string
  deadline?: string
  source?: 'Contracts Finder' | 'Find a Tender'
  status?: string
}

export const revalidate = 3600

export async function fetchTenderIndex(): Promise<PortalTender[]> {
  if (!isPortalApiAvailable()) return []
  try {
    const baseUrl = getPortalApiUrl()
    const upstream = new URL(`${baseUrl}/api/tenders/published`)
    upstream.searchParams.set('active_only', 'true')
    upstream.searchParams.set('limit', '500')
    let res = await fetch(upstream.toString(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    })
    if (res.status === 404 && /^https?:\/\//.test(baseUrl)) {
      const publicProxy = new URL(`${baseUrl}/api/tenders`)
      publicProxy.searchParams.set('active_only', 'true')
      publicProxy.searchParams.set('limit', '500')
      res = await fetch(publicProxy.toString(), {
        headers: { Accept: 'application/json' },
        next: { revalidate: 3600 },
      })
    }
    if (!res.ok) return []
    const data = await res.json()
    if (Array.isArray(data)) return data as PortalTender[]
    if (Array.isArray(data?.tenders)) return data.tenders as PortalTender[]
    return []
  } catch {
    return []
  }
}

function formatDate(value?: string): string | null {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function TenderIndex() {
  const tenders = (await fetchTenderIndex()).filter((t) => t.id && t.title)
  if (tenders.length === 0) return null

  return (
    <section className="tenders-index" aria-labelledby="tenders-index-title">
      <div className="container">
        <h2 id="tenders-index-title">All current opportunities</h2>
        <p>
          {tenders.length} live health and social care notices, newest first. Every entry links to
          the full notice detail, deadline and provider requirements.
        </p>
        <ul>
          {tenders.map((t) => {
            const published = formatDate(t.publishedDate)
            const deadline = formatDate(t.deadline)
            return (
              <li key={t.id}>
                <Link href={`/tenders/${encodeURIComponent(t.id)}`}>{t.title}</Link>
                <p>
                  {[t.organisation, t.source, published && `Published ${published}`, deadline && `Closes ${deadline}`]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
