import type { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { SERVICES_DATA } from '@/lib/services-data'
import { fetchBlogs } from '@/lib/sheets'

const BASE = 'https://www.tenderlab.co.uk'

// Revalidate the sitemap every hour so newly-added blog posts (sourced from
// Google Sheets at request time) get listed promptly.
export const revalidate = 3600

// Hardcoded list of care setting slugs. Mirrors every HTML file under
// public/Page Content HTML Files/care-settings/ minus index.html.
// Hardcoded (rather than read via fs.readdir) because Vercel serverless does
// not expose the public folder file tree at sitemap render time, which is why
// these URLs were previously absent from the sitemap.
const CARE_SETTING_SLUGS: string[] = [
  'autism-services',
  'care-home-accommodation',
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
  'health-services',
  'hospital-discharge-services',
  'housing-related-support',
  'housing-support',
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
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/care-settings`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tenders`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/process`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/reviews`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/score-my-response`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const services: MetadataRoute.Sitemap = SERVICES_DATA.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const careSettings: MetadataRoute.Sitemap = CARE_SETTING_SLUGS.map((slug) => ({
    url: `${BASE}/care-settings/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Blog posts from the Google Sheet CMS. Deduplicate on slug in case the
  // Sheet has duplicate rows (we have seen this happen during manual data entry).
  let blog: MetadataRoute.Sitemap = []
  try {
    const posts = await fetchBlogs()
    const seen = new Set<string>()
    blog = posts
      .filter((p) => {
        if (!p.slug) return false
        if (seen.has(p.slug)) return false
        seen.add(p.slug)
        return true
      })
      .map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch {
    blog = []
  }

  return [...core, ...services, ...careSettings, ...caseStudies, ...blog]
}
