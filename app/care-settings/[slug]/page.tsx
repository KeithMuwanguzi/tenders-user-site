import { readFile, readdir } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

const HTML_DIR = path.join(
  process.cwd(),
  'public/Page Content HTML Files/care-settings'
)

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

  return (
    <main className="care-setting-page">
      <div dangerouslySetInnerHTML={{ __html: article }} />
      <div style={{ height: 40 }} />
    </main>
  )
}
