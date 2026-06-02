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
  BRAND,
} from '@/lib/seo'
import HybridE from '@/components/HybridE'
import { type TOCItem } from '@/components/TOC'
import { getCohortTag } from '@/lib/care-settings-relations'
import LiveTendersWidget from '@/components/rail/LiveTendersWidget'
import RelatedCareSettingsWidget from '@/components/rail/RelatedCareSettingsWidget'
import RelatedCaseStudyWidget from '@/components/rail/RelatedCaseStudyWidget'
import ConsultationCTA from '@/components/rail/ConsultationCTA'
import NewsletterWidget from '@/components/rail/NewsletterWidget'

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
 * Pull the <article> or <main> body from the static HTML file and parse out
 * the section structure for Hybrid E:
 *  - extract each <section class="cs-block"> (or fallback to h2 boundaries)
 *  - rewrite the section header into the editorial-serif pattern
 *    (eyebrow + serif title + rule) with an id we can target from the TOC
 *  - return the rewritten HTML plus the TOC item list
 */
function buildSectionedBodyAndTOC(html: string): { html: string; toc: TOCItem[] } {
  // Grab the inner of the article/main if present, else the whole body fragment.
  let body = html
  const article = html.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i)
  if (article) body = article[1]
  else {
    const main = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i)
    if (main) body = main[1]
  }

  // Strip any <h1> from the body since the page H1 lives outside the wrapper.
  body = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '')

  const toc: TOCItem[] = []

  // Rewrite "<h2><span class="num">Section NN</span>Title</h2>" patterns into
  // the Hybrid E editorial-serif header.
  const rewritten = body.replace(
    /<h2[^>]*>\s*<span[^>]*class="num"[^>]*>\s*Section\s*(\d+)\s*<\/span>\s*([\s\S]*?)<\/h2>/gi,
    (_match, n: string, titleHtml: string) => {
      const num = String(n).padStart(2, '0')
      const anchor = `sec-${num}`
      const label = String(titleHtml).replace(/<[^>]+>/g, '').trim()
      toc.push({ label, num, anchor })
      return [
        `<div class="he-section" id="${anchor}">`,
        `  <span class="he-section__eyebrow">Section ${num} · ${label}</span>`,
        `  <h2 class="he-section__title">${label}</h2>`,
        `  <hr class="he-section__rule" />`,
        `<div class="he-section__body">`,
      ].join('\n')
    }
  )

  // Close each .he-section before the next one opens, and at the end.
  // Naive closer: split on the opening tag we inserted and re-join with closers.
  const parts = rewritten.split('<div class="he-section" id="')
  let closedHtml = parts[0]
  for (let i = 1; i < parts.length; i++) {
    if (i > 1) closedHtml += '</div></div>' // close prev body + prev section
    closedHtml += '<div class="he-section" id="' + parts[i]
  }
  if (parts.length > 1) closedHtml += '</div></div>' // close the final section

  return { html: closedHtml, toc }
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
  const heroImg = SETTING_IMAGES[slug] || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80'
  const cohort = getCohortTag(slug)

  const { html: bodyHtml, toc } = buildSectionedBodyAndTOC(html)

  return (
    <main>
      <Script id={`ld-cs-${slug}-service`} type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: title, description, url: canonicalUrl(`/care-settings/${slug}`) })) }} />
      <Script id={`ld-cs-${slug}-faq`} type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(defaultFaq)) }} />
      <Script id={`ld-cs-${slug}-breadcrumb`} type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Care Settings', path: '/care-settings' },
        { name: title, path: `/care-settings/${slug}` },
      ])) }} />

      <section className="cs-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(11,31,58,0.45) 0%, rgba(11,31,58,0.85) 100%), url(${heroImg})` }}>
        <div className="container">
          <nav className="cs-crumb" aria-label="Breadcrumb">
            <a href="/care-settings">Care Settings</a>
            <span> / </span>
            <span>{title}</span>
          </nav>
          <h1 className="cs-title">{title}</h1>
          <p className="cs-strap">{description}</p>
        </div>
      </section>

      <HybridE
        tocItems={toc}
        rail={
          <div className="he-rail">
            <LiveTendersWidget cohort={cohort} variant="dark" title={`Live tenders · ${title}`} />
            <RelatedCareSettingsWidget currentSlug={slug} />
            <RelatedCaseStudyWidget cohort={cohort} />
            <ConsultationCTA
              title={`${title} tender on the horizon?`}
              body="Free 20-minute call to scope your bid."
              ref={`care-${slug}`}
            />
            <NewsletterWidget />
          </div>
        }
      >
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </HybridE>
    </main>
  )
}
