import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = process.cwd()
const appOutput = resolve(root, '.next/server/app')
const appSource = resolve(root, 'app')
const publicRoot = resolve(root, 'public')
assert.ok(existsSync(appOutput), 'Build output is missing. Run `npm run build` first.')

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? filesUnder(path) : [path]
  })
}

const htmlFiles = filesUnder(appOutput).filter((path) => path.endsWith('.html'))
assert.ok(htmlFiles.length > 0, 'No prerendered HTML pages were found.')

const prerenderedRoutes = new Set(
  htmlFiles.map((path) => {
    const rel = relative(appOutput, path).replace(/\\/g, '/').replace(/\.html$/, '')
    return rel === 'index' ? '/' : `/${rel.replace(/\/index$/, '')}`
  }),
)

const sourceRoutes = new Set(
  filesUnder(appSource)
    .filter((path) => path.endsWith('/page.tsx') && !path.includes('/['))
    .map((path) => {
      const rel = relative(appSource, path).replace(/\\/g, '/').replace(/\/page\.tsx$/, '')
      return rel ? `/${rel}` : '/'
    }),
)

const dynamicRoutePatterns = [
  /^\/blog\/[^/]+$/,
  /^\/care-settings\/[^/]+$/,
  /^\/care-settings\/(childrens-services|health-social-care)\/[^/]+$/,
  /^\/case-studies\/[^/]+$/,
  /^\/services\/[^/]+$/,
  /^\/tenders\/[^/]+$/,
]

const ignoredPaths = ['/api/', '/_next/']
const failures = []

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const route = relative(appOutput, file).replace(/\\/g, '/').replace(/\.html$/, '')
  const pathname = route === 'index' ? '/' : `/${route.replace(/\/index$/, '')}`

  const canonicalMatches = [
    ...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/gi),
  ]
  if (canonicalMatches.length !== 1) {
    failures.push(`${pathname}: expected one canonical, found ${canonicalMatches.length}`)
  } else {
    const canonical = new URL(canonicalMatches[0][1], 'https://www.tenderlab.co.uk')
    if (pathname !== '/' && canonical.pathname === '/') {
      failures.push(`${pathname}: incorrectly canonicalises to the homepage`)
    }
    if (canonical.search) {
      failures.push(`${pathname}: canonical contains query parameters`)
    }
  }

  for (const match of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
    const rawHref = match[1]
    if (!rawHref.startsWith('/')) continue
    const linkedPath = rawHref.split('?')[0].replace(/\/$/, '') || '/'
    if (ignoredPaths.some((prefix) => linkedPath.startsWith(prefix))) continue
    if (/\.[a-z0-9]{2,5}$/i.test(linkedPath)) {
      if (!existsSync(join(publicRoot, linkedPath))) {
        failures.push(`${pathname}: missing public asset ${rawHref}`)
      }
      continue
    }
    const exists =
      prerenderedRoutes.has(linkedPath) ||
      sourceRoutes.has(linkedPath) ||
      dynamicRoutePatterns.some((pattern) => pattern.test(linkedPath))
    if (!exists) failures.push(`${pathname}: broken internal link ${rawHref}`)
  }
}

assert.equal(
  failures.length,
  0,
  `Built-site verification failed:\n${[...new Set(failures)].join('\n')}`,
)

console.log(`Built-site canonicals and internal links verified across ${htmlFiles.length} pages.`)
