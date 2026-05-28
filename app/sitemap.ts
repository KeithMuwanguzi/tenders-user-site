import type { MetadataRoute } from 'next'
import { readdir } from 'fs/promises'
import path from 'path'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { SERVICES_DATA } from '@/lib/services-data'
import { fetchBlogs } from '@/lib/sheets'

const BASE = 'https://www.tenderlab.co.uk'

// Revalidate the sitemap every hour so newly-added blog posts (sourced from
// Google Sheets at request time) and newly-added care setting HTML files
// (auto-discovered from /public) get listed promptly.
export const revalidate = 3600

async function getCareSettingSlugs(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'public/Page Content HTML Files/care-settings')
    const files = await readdir(dir)
    return files
      .filter((f) => f.endsWith('.html') && f !== 'index.html')
      .map((f) => f.replace(/\.html$/, ''))
  } catch {
    return []
  }
}

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

  const careSettingSlugs = await getCareSettingSlugs()
  const careSettings: MetadataRoute.Sitemap = careSettingSlugs.map((slug) => ({
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

  let blog: MetadataRoute.Sitemap = []
  try {
    const posts = await fetchBlogs()
    blog = posts
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch {
    // If the sheet fetch fails at build time we still emit the rest of the sitemap.
    blog = []
  }

  return [...core, ...services, ...careSettings, ...caseStudies, ...blog]
}
