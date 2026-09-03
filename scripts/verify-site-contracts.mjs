import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFileSync(resolve(root, path), 'utf8')

const requiredFiles = [
  'app/api/inquiries/route.ts',
  'app/api/tenders/route.ts',
  'app/api/blogs/route.ts',
  'app/contact/ContactForm.tsx',
  'app/tenders/[id]/page.tsx',
  'app/blog/[slug]/page.tsx',
  'lib/portal-api.ts',
  'lib/seo.ts',
  'app/robots.ts',
  'app/sitemap.ts',
  'app/sitemap-tenders.xml/route.ts',
  'public/llms.txt',
  'public/llms-full.txt',
  'contracts/portal-inquiry.contract.json',
]

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `Required integration file is missing: ${file}`)
}

const contactForm = read('app/contact/ContactForm.tsx')
const inquiryRoute = read('app/api/inquiries/route.ts')
const tenderRoute = read('app/api/tenders/route.ts')
const blogRoute = read('app/api/blogs/route.ts')
const portalContract = JSON.parse(read('contracts/portal-inquiry.contract.json'))
const robots = read('app/robots.ts')
const sitemap = read('app/sitemap.ts')
const seo = read('lib/seo.ts')
const llms = read('public/llms.txt')

for (const field of [
  'name',
  'org',
  'email',
  'phone',
  'serviceType',
  'deadline',
  'authority',
  'howFound',
  'message',
  'tenderTitle',
  'tenderDescription',
  'tenderUrl',
  'website',
]) {
  assert.match(contactForm, new RegExp(`\\b${field}\\b`), `Contact form lost field: ${field}`)
}

assert.match(contactForm, /const INQUIRY_ENDPOINT = ['"]\/api\/inquiries['"]/)
assert.match(contactForm, /method:\s*['"]POST['"]/)
assert.match(contactForm, /JSON\.stringify\(form\)/)

for (const portalField of ['name', 'email', 'phone', 'company', 'subject', 'message']) {
  assert.match(
    inquiryRoute,
    new RegExp(`\\b${portalField}:`),
    `Website inquiry relay lost portal field: ${portalField}`,
  )
  assert.ok(
    portalContract.portalFields.includes(portalField),
    `Versioned Portal contract lost field: ${portalField}`,
  )
}

assert.match(inquiryRoute, /\/api\/inquiries\//)
assert.match(inquiryRoute, /['"]X-Inquiry-Source['"]:\s*['"]website-relay['"]/) 
assert.match(inquiryRoute, /['"]X-Inquiry-Token['"]:/)
assert.equal(portalContract.endpoint, '/api/inquiries/')
assert.equal(portalContract.method, 'POST')

for (const tenderField of ['tenderTitle', 'tenderDescription', 'tenderUrl']) {
  assert.ok(portalContract.websiteFields.includes(tenderField))
  assert.match(inquiryRoute, new RegExp(`data\\.${tenderField}`), `Inquiry delivery lost ${tenderField}`)
}

assert.match(tenderRoute, /\/api\/tenders\/published/)
assert.match(tenderRoute, /tenders,\s*\n?\s*page,\s*\n?\s*total:/)
assert.match(tenderRoute, /cache:\s*['"]no-store['"]/)

assert.match(blogRoute, /\/api\/blogs\/published\?limit=100/)
assert.match(blogRoute, /NextResponse\.json\(\{\s*posts\s*\}\)/)
assert.match(blogRoute, /cache:\s*['"]no-store['"]/)

// Keep the search and answer-engine discovery layer from silently regressing.
for (const crawler of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot']) {
  assert.match(robots, new RegExp(crawler), `AI discovery rule is missing: ${crawler}`)
}
assert.match(robots, /sitemap\.xml/)
assert.match(robots, /sitemap-tenders\.xml/)
assert.match(sitemap, /SERVICES_DATA/)
assert.match(sitemap, /CARE_SETTING_SLUGS/)
assert.match(sitemap, /TENDER_LANDING_PAGES/)
assert.match(sitemap, /DECISION_GUIDES/)
assert.match(sitemap, /CASE_STUDIES/)
for (const schemaType of ['Organization', 'WebSite', 'Service', 'BreadcrumbList', 'BlogPosting', 'FAQPage']) {
  assert.match(seo, new RegExp(schemaType), `Shared schema coverage is missing: ${schemaType}`)
}
assert.match(llms, /Companies House number 17184263/)
assert.match(llms, /Past performance does not guarantee/)
assert.match(llms, /canonical website/)

console.log('Website integration contracts verified.')
