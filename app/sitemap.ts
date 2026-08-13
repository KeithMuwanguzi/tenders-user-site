import type { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { SERVICES_DATA } from '@/lib/services-data'
import { fetchBlogsResult } from '@/lib/server-blogs'
import { TENDER_LANDING_PAGES } from '@/lib/tender-landing-pages'
import { DECISION_GUIDES } from '@/lib/decision-guides'

const BASE = 'https://www.tenderlab.co.uk'
const STRUCTURAL_UPDATED = new Date('2026-07-30T00:00:00.000Z')

// Resolve the publishing feed at request time. This prevents a transient CMS
// outage from failing a deployment build or baking an empty blog archive into
// the generated sitemap.
export const dynamic = 'force-dynamic'

function validDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

// Hardcoded list of care setting slugs. Mirrors every HTML file under
// content/private-source-assets/page-content-html/care-settings/ minus index.html.
// Hardcoded (rather than read via fs.readdir) because Vercel serverless does
// not expose the public folder file tree at sitemap render time, which is why
// these URLs were previously absent from the sitemap.
const CARE_SETTING_SLUGS: string[] = [
  'autism-services',
  'childrens-residential-care',
  'childrens-services',
  'childrens-short-breaks',
  'community-health-services',
  'complex-care',
  'complex-care-and-continuing-healthcare',
  'continuing-healthcare',
  'crisis-rapid-response',
  'day-services',
  'domiciliary-care',
  'emergency-accommodation',
  'end-of-life-and-palliative-care',
  'extra-care-housing',
  'family-support-and-outreach',
  'fostering-services',
  'hospital-discharge-services',
  'housing-related-support',
  'learning-disability-services',
  'leaving-care-services',
  'live-in-care',
  'mental-health-services',
  'nursing-care',
  'outreach-community-support',
  'reablement-services',
  'rehabilitation-services',
  'residential-care',
  'shared-lives',
  'short-breaks-and-respite',
  'substance-misuse-services',
  'supported-accommodation',
  'supported-housing',
  'supported-living',
  'temporary-accommodation',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/care-settings`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/care-settings/health-social-care`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/case-studies`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tenders`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/process`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/reviews`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/proof`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faqs`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/book-consultation`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const services: MetadataRoute.Sitemap = SERVICES_DATA.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const careSettings: MetadataRoute.Sitemap = CARE_SETTING_SLUGS.map((slug) => ({
    url: `${BASE}/care-settings/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const tenderHubs: MetadataRoute.Sitemap = TENDER_LANDING_PAGES.map((page) => ({
    url: `${BASE}/tenders/${page.slug}`,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }))

  const guides: MetadataRoute.Sitemap = DECISION_GUIDES.map(({ slug }) => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: STRUCTURAL_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Blog posts from the Google Sheet CMS. Deduplicate on slug in case the
  // Sheet has duplicate rows (we have seen this happen during manual data entry).
  const blogResult = await fetchBlogsResult()
  if (blogResult.status === 'unavailable') {
    // A sitemap is a discovery aid, not a deletion instruction. Keep the
    // independently valid structural routes available during a CMS outage;
    // published article URLs return automatically when the feed recovers.
    console.warn('[sitemap] blog feed unavailable; returning structural routes')
  }

  const seen = new Set<string>()
  const blog: MetadataRoute.Sitemap = blogResult.posts
    .filter((p) => {
      if (!p.slug || !p.title?.trim() || !p.body?.trim()) return false
      if (seen.has(p.slug)) return false
      seen.add(p.slug)
      return true
    })
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: validDate(p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...core, ...services, ...careSettings, ...tenderHubs, ...guides, ...caseStudies, ...blog]
}
