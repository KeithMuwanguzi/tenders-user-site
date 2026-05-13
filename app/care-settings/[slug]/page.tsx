import { readFile, readdir } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

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

async function getHtml(slug: string): Promise<string | null> {
  const fp = path.join(HTML_DIR, `${slug}.html`)
  try {
    return await readFile(fp, 'utf-8')
  } catch {
    return null
  }
}

function extractTag(html: string, open: string): string {
  const si = html.indexOf(open)
  if (si === -1) return ''
  const bodyStart = html.indexOf('>', si) + 1
  /* Find the matching closing tag — handle 1 level of nesting */
  const tagName = open.match(/<(\w+)/)?.[1] ?? 'div'
  const closeTag = `</${tagName}>`
  const ei = html.indexOf(closeTag, bodyStart)
  if (ei === -1) return ''
  return html.slice(bodyStart, ei)
}

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, '').trim()
}

function metaContent(html: string, name: string): string {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]+)"`))
  return m ? m[1] : ''
}

function titleText(html: string): string {
  const m = html.match(/<title>([^<]+)<\/title>/)
  return m ? m[1].split('|')[0].trim() : ''
}

function articleHtml(raw: string): string {
  const start = raw.indexOf('<article class="tlp"')
  const end = raw.indexOf('</article>', start)
  if (start === -1 || end === -1) return ''
  let block = raw.slice(start, end + '</article>'.length)

  /* Rewrite relative HTML links → Next.js routes */
  block = block
    .replace(/href="index\.html"/g, 'href="/care-settings"')
    .replace(/href="\.\.\/care-settings\//g, 'href="/care-settings/')
    .replace(/href="\.\.\/services\//g, 'href="/services/')
    .replace(/href="\.\.\/about\.html"/g, 'href="/about"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/"')
    .replace(/href="\.\.\/([^"]+)\.html"/g, 'href="/$1"')

  return block
}

export async function generateStaticParams() {
  try {
    const files = await readdir(HTML_DIR)
    return files
      .filter((f) => f.endsWith('.html') && f !== 'index.html')
      .map((f) => ({ slug: f.replace('.html', '') }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const raw = await getHtml(slug)
  if (!raw) return {}
  return {
    title: `${titleText(raw)} | TenderLab`,
    description: metaContent(raw, 'description'),
  }
}

export default async function CareSettingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const raw = await getHtml(slug)
  if (!raw) notFound()

  const article = articleHtml(raw)
  const heroImage = SETTING_IMAGES[slug]
  const pageTitle = titleText(raw)

  return (
    <main className="care-setting-page">
      {heroImage && (
        <section className="cs-detail-hero">
          <div className="cs-detail-hero__bg">
            <Image
              src={heroImage}
              alt={pageTitle}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            />
          </div>
          <div className="cs-detail-hero__overlay" />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <h1 className="cs-detail-hero__title">{pageTitle}</h1>
          </div>
        </section>
      )}
      <div dangerouslySetInnerHTML={{ __html: article }} />
      <div style={{ height: 40 }} />
    </main>
  )
}
