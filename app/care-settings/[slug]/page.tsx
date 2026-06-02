import { readFile, readdir } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import type { Metadata } from 'next'
import {
  canonicalUrl,
  defaultOpenGraph,
  defaultTwitter,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  defaultFaq,
} from '@/lib/seo'
import HybridE from '@/components/HybridE'
import type { TOCItem } from '@/components/TOC'
import LiveTendersWidget from '@/components/rail/LiveTendersWidget'
import RelatedCareSettingsWidget from '@/components/rail/RelatedCareSettingsWidget'
import ConsultationCTA from '@/components/rail/ConsultationCTA'

const HTML_DIR = path.join(
  process.cwd(),
  'public/Page Content HTML Files/care-settings'
)

const SETTING_IMAGES: Record<string, string> = {
  'domiciliary-care': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=80',
  'live-in-care': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80',
  'residential-care': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80',
  'nursing-care': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&q=80',
  'supported-living': 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&q=80',
  'extra-care-housing': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
  'day-services': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
  'reablement-services': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  'short-breaks-and-respite': 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=1200&q=80',
  'shared-lives': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
  'outreach-community-support': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80',
  'crisis-rapid-response': 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&q=80',
  'childrens-residential-care': 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=1200&q=80',
  'supported-accommodation': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
  'fostering-services': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=1200&q=80',
  'leaving-care-services': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80',
  'childrens-short-breaks': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
  'family-support-and-outreach': 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=80',
  'housing-related-support': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
  'temporary-accommodation': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
  'emergency-accommodation': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  'supported-housing': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
  'community-health-services': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
  'continuing-healthcare': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
  'complex-care': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
  'rehabilitation-services': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  'end-of-life-and-palliative-care': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80',
  'hospital-discharge-services': 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const files = await readdir(HTML_DIR)
    return files
      .filter(f => f.endsWith('.html') && f !== 'index.html')
      .map(f => ({ slug: f.replace(/\.html$/, '') }))
  } catch {
    return []
  }
}

async function getPageHtml(slug: string): Promise<string | null> {
  try {
    const file = path.join(HTML_DIR, `${slug}.html`)
    return await readFile(file, 'utf8')
  } catch {
    return null
  }
}

function extractTitle(html: string, slug: string): string {
  const t = html.match(/<title>([^<]+)<\/title>/i)
  if (t) return t[1].replace(/\s*\|\s*TenderLab.*$/i, '').trim()
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1) return h1[1].replace(/<[^>]+>/g, '').trim()
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function extractMetaDescription(html: string, fallback: string): string {
  const m = html.match(/<meta name="description" content="([^"]+)"/i)
  return m ? m[1] : fallback
}

/**
 * Walk the HTML string, find every <h2>, inject an id if missing, and
 * collect a TOCItem list. Returns the augmented HTML and the TOC items
 * so HybridE can render the sticky table of contents.
 *
 * Numbering rule. Care setting HTML files label their H2s as "Section 01
 * Title", "Section 02 Title", and so on. We extract that printed number
 * (which may skip values - one file goes 01-10 then 12) so the TOC matches
 * what the reader sees on the page. If no "Section NN" prefix is present
 * we fall back to a sequential counter.
 *
 * Non-mutating to existing ids: if the H2 already has an id, that id is
 * reused as the TOC anchor.
 */
function buildTocAndContent(html: string): {
  tocItems: TOCItem[]
  processedHtml: string
} {
  const tocItems: TOCItem[] = []
  let fallbackCounter = 0

  const processedHtml = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, rawAttrs: string, inner: string) => {
      fallbackCounter++
      const existingIdMatch = rawAttrs.match(/\sid="([^"]+)"/i)
      const rawText = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

      // Skip empty headings (TOC would render an empty row).
      if (!rawText) {
        return `<h2${rawAttrs}>${inner}</h2>`
      }

      // Try to read the printed section number from the H2 text itself.
      // Matches "Section 12 Where this applies" and similar phrasings.
      const sectionMatch = rawText.match(
        /^section\s+(\d+)\s*[:.\-–—]?\s*(.+)$/i
      )

      let num: string
      let label: string
      if (sectionMatch) {
        num = sectionMatch[1].padStart(2, '0')
        label = sectionMatch[2].trim()
      } else {
        num = String(fallbackCounter).padStart(2, '0')
        label = rawText
      }

      const anchor = existingIdMatch
        ? existingIdMatch[1]
        : `sec-${num}`

      tocItems.push({ label, num, anchor })

      if (existingIdMatch) {
        return `<h2${rawAttrs}>${inner}</h2>`
      }
      return `<h2${rawAttrs} id="${anchor}">${inner}</h2>`
    }
  )

  return { tocItems, processedHtml }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const html = await getPageHtml(slug)
  if (!html) return { title: 'Care Setting Not Found | TenderLab' }
  const title = extractTitle(html, slug)
  const description = extractMetaDescription(
    html,
    `Specialist ${title.toLowerCase()} tender writing for UK care providers. 92% win rate across 200+ submissions.`
  )
  const pathname = `/care-settings/${slug}`
  const fullTitle = `${title} | TenderLab`
  return {
    title: fullTitle,
    description,
    alternates: { canonical: canonicalUrl(pathname) },
    openGraph: defaultOpenGraph({ title: fullTitle, description, path: pathname }),
    twitter: defaultTwitter({ title: fullTitle, description }),
  }
}

export default async function CareSettingPage({ params }: Props) {
  const { slug } = await params
  const html = await getPageHtml(slug)
  if (!html) notFound()

  const title = extractTitle(html, slug)
  const description = extractMetaDescription(
    html,
    `Specialist ${title.toLowerCase()} tender writing for UK care providers.`
  )

  const { tocItems, processedHtml } = buildTocAndContent(html)

  // SETTING_IMAGES is currently informational; we may use it for a future
  // hero swap. Reference it once so eslint does not warn about unused vars.
  const _heroImage = SETTING_IMAGES[slug]

  // Right rail recipe for care setting pages:
  //   1. Live Tenders (cohort filter = slug; API returns top 3 active)
  //   2. Related Care Settings (cohort-adjacent siblings)
  //   3. Consultation CTA (with attribution to the slug)
  const rail = (
    <>
      <LiveTendersWidget cohort={slug} limit={3} />
      <RelatedCareSettingsWidget currentSlug={slug} />
      <ConsultationCTA
        title="Bidding in this setting?"
        body="Free 20-minute call to scope your bid. 92% win rate across 200+ submissions."
        attribution={`care-setting:${slug}`}
      />
    </>
  )

  return (
    <main>
      <Script
        id={`ld-cs-${slug}-service`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: title,
              description,
              path: `/care-settings/${slug}`,
            })
          ),
        }}
      />
      <Script
        id={`ld-cs-${slug}-faq`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(defaultFaq)) }}
      />
      <Script
        id={`ld-cs-${slug}-breadcrumb`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Care Settings', path: '/care-settings' },
              { name: title, path: `/care-settings/${slug}` },
            ])
          ),
        }}
      />

      <HybridE tocItems={tocItems} rail={rail}>
        <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
      </HybridE>
    </main>
  )
}
