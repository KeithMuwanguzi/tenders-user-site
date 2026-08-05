import fs from 'node:fs'

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4320'
const input = process.argv[2] || '/tmp/tenderlab-crawl-urls.txt'
const tenderLabHosts = new Set(['tenderlab.co.uk', 'www.tenderlab.co.uk'])

const toLocalUrl = (value) => {
  const target = new URL(value, origin)
  if (target.origin === origin || tenderLabHosts.has(target.hostname.toLowerCase())) {
    return new URL(target.pathname + target.search, origin).href
  }
  return null
}

const sitemapPages = async () => {
  const discovered = new Set([origin + '/'])
  for (const sitemapPath of ['/sitemap.xml', '/sitemap-tenders.xml']) {
    const response = await fetch(origin + sitemapPath)
    if (!response.ok) continue
    const xml = await response.text()
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const local = toLocalUrl(match[1])
      if (local) discovered.add(local)
    }
  }
  return [...discovered]
}

const pages = fs.existsSync(input)
  ? fs.readFileSync(input, 'utf8').trim().split(/\n+/).slice(0, 300)
  : (await sitemapPages()).slice(0, 300)
const hrefs = new Set()
const escapedTenderLabLinks = []

for (let i = 0; i < pages.length; i += 10) {
  await Promise.all(
    pages.slice(i, i + 10).map(async (url) => {
      const html = await (await fetch(url)).text()
      for (const match of html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi)) {
        try {
          const target = new URL(match[1], origin)
          const isCanonicalHost = tenderLabHosts.has(target.hostname.toLowerCase())
          const local = toLocalUrl(target.href)
          if (isCanonicalHost) {
            escapedTenderLabLinks.push({ page: url, href: target.href })
          }
          if (local) {
            const localTarget = new URL(local)
            if (
              !localTarget.pathname.startsWith('/_next/') &&
              !localTarget.pathname.startsWith('/api/')
            ) {
              hrefs.add(localTarget.pathname + localTarget.search)
            }
          }
        } catch {
          // Ignore malformed third-party markup; it is not an internal target.
        }
      }
    }),
  )
}

const targets = [...hrefs]
const broken = []
for (let i = 0; i < targets.length; i += 15) {
  await Promise.all(
    targets.slice(i, i + 15).map(async (path) => {
      try {
        const response = await fetch(origin + path, { redirect: 'follow' })
        if (response.status >= 400) broken.push({ status: response.status, path })
      } catch {
        broken.push({ status: 0, path })
      }
    }),
  )
}

console.log(JSON.stringify({
  pagesScanned: pages.length,
  internalTargets: targets.length,
  escapedTenderLabLinks,
  broken,
}, null, 2))
