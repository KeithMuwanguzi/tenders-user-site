import { readFile, readdir } from 'fs/promises'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import EditorialHero from '@/components/EditorialHero'
import EditorialFaq from '@/components/EditorialFaq'
import ContractWonMedallion from '@/components/ContractWonMedallion'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import {
  breadcrumbSchema,
  canonicalUrl,
  defaultFaq,
  defaultOpenGraph,
  defaultTwitter,
  faqSchema,
  serviceSchema,
} from '@/lib/seo'

const HTML_DIR = path.join(
  process.cwd(),
  'content/private-source-assets/page-content-html/care-settings'
)

type Props = { params: Promise<{ slug: string }> }
type TocItem = { label: string; num: string; anchor: string }
type Visual = { image: string; alt: string; tone: 'cream' | 'blue' | 'peach' | 'yellow' }

const HOME_CARE_SLUGS = new Set([
  'domiciliary-care',
  'live-in-care',
  'residential-care',
  'nursing-care',
  'reablement-services',
  'rehabilitation-services',
  'end-of-life-and-palliative-care',
  'hospital-discharge-services',
  'short-breaks-and-respite',
])

const CHILDREN_SLUGS = new Set([
  'childrens-residential-care',
  'supported-accommodation',
  'fostering-services',
  'leaving-care-services',
  'childrens-short-breaks',
  'family-support-and-outreach',
])

const CLINICAL_SLUGS = new Set([
  'community-health-services',
  'continuing-healthcare',
  'complex-care',
  'complex-care-and-continuing-healthcare',
  'crisis-rapid-response',
])

const HOUSING_SLUGS = new Set([
  'housing-related-support',
  'housing-support',
  'supported-housing',
  'temporary-accommodation',
  'emergency-accommodation',
])

const CASE_STUDY_COHORT: Record<string, string> = {
  'domiciliary-care': 'domiciliary',
  'live-in-care': 'domiciliary',
  'reablement-services': 'domiciliary',
  'residential-care': 'multi-service',
  'nursing-care': 'multi-service',
  'supported-living': 'supported-living',
  'extra-care-housing': 'supported-living',
  'learning-disability-services': 'supported-living',
  'housing-related-support': 'supported-living',
  'temporary-accommodation': 'supported-living',
  'emergency-accommodation': 'supported-living',
  'supported-housing': 'supported-living',
  'childrens-residential-care': 'childrens',
  'supported-accommodation': 'childrens',
  'fostering-services': 'childrens',
  'leaving-care-services': 'childrens',
  'childrens-short-breaks': 'childrens',
  'family-support-and-outreach': 'childrens',
  'short-breaks-and-respite': 'childrens',
  'mental-health-services': 'mental-health',
  'crisis-rapid-response': 'mental-health',
  'substance-misuse-services': 'mental-health',
}

export async function generateStaticParams() {
  try {
    const files = await readdir(HTML_DIR)
    return files
      .filter(file => file.endsWith('.html') && file !== 'index.html')
      .map(file => ({ slug: file.replace(/\.html$/, '') }))
  } catch {
    return []
  }
}

async function getPageHtml(slug: string): Promise<string | null> {
  try {
    return await readFile(path.join(HTML_DIR, `${slug}.html`), 'utf8')
  } catch {
    return null
  }
}

function plainText(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#x27;|&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractClassText(html: string, className: string): string {
  const match = html.match(
    new RegExp(`<[^>]+class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/[^>]+>`, 'i')
  )
  return match ? plainText(match[1]) : ''
}

function extractTitle(html: string, slug: string): string {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  const title = h1
    ? plainText(h1[1])
    : slug.replace(/-/g, ' ').replace(/\b\w/g, character => character.toUpperCase())

  return title
    .replace(/\s*\|\s*92%.*$/i, '')
    .replace(/\s+Tender Writers?$/i, '')
    .trim()
}

function extractMetaDescription(html: string, fallback: string): string {
  const match = html.match(/<meta name="description" content="([^"]+)"/i)
  const description = match ? plainText(match[1]) : fallback
  return description
    .replace(/\s*92%\s+win rate[^.]*\.?/gi, '')
    .replace(/\s*across\s+200\+\s+submissions\.?/gi, '')
    .trim()
}

function visualFor(slug: string): Visual {
  const tailored: Record<string, Visual> = {
    'domiciliary-care': {
      image: '/images/editorial/tenderlab-domiciliary-care-hero-v1.jpg',
      alt: 'A domiciliary care worker supporting an older person at home, connected to care records and commissioner evidence',
      tone: 'yellow',
    },
    'live-in-care': {
      image: '/images/editorial/tenderlab-live-in-care-hero-v1.jpg',
      alt: 'A live-in carer supporting a person in their own home, connected to continuity and care-planning evidence',
      tone: 'cream',
    },
    'supported-living': {
      image: '/images/editorial/tenderlab-supported-living-hero-v1.jpg',
      alt: 'A person and support worker planning independent living, connected to tenancy, choice and outcomes evidence',
      tone: 'blue',
    },
    'residential-care': {
      image: '/images/editorial/tenderlab-residential-care-hero-v1.jpg',
      alt: 'An older person and residential care worker in a communal home setting, connected to governance and quality evidence',
      tone: 'peach',
    },
    'nursing-care': {
      image: '/images/editorial/tenderlab-nursing-care-hero-v1.jpg',
      alt: 'A nurse supporting an older person in a care setting, connected to clinical oversight and quality evidence',
      tone: 'blue',
    },
    'extra-care-housing': {
      image: '/images/editorial/tenderlab-extra-care-hero-v1.jpg',
      alt: 'An extra care housing resident and support professional, connected to housing, independence and care evidence',
      tone: 'yellow',
    },
    'shared-lives': {
      image: '/images/editorial/tenderlab-shared-lives-hero-v1.jpg',
      alt: 'A Shared Lives household spending time together, connected to matching, safeguarding and outcomes evidence',
      tone: 'peach',
    },
    'day-services': {
      image: '/images/editorial/tenderlab-day-services-hero-v1.jpg',
      alt: 'People taking part in a community day service, connected to activity, inclusion and outcomes evidence',
      tone: 'yellow',
    },
    'short-breaks-and-respite': {
      image: '/images/editorial/tenderlab-short-breaks-respite-hero-v1.jpg',
      alt: 'A respite support worker with a person using the service, connected to continuity, safety and family support evidence',
      tone: 'peach',
    },
    'reablement-services': {
      image: '/images/editorial/tenderlab-reablement-rehabilitation-hero-v1.jpg',
      alt: 'A reablement professional supporting recovery at home, connected to goals, progress and independence evidence',
      tone: 'blue',
    },
    'rehabilitation-services': {
      image: '/images/editorial/tenderlab-reablement-rehabilitation-hero-v1.jpg',
      alt: 'A rehabilitation professional supporting recovery, connected to multidisciplinary goals and outcomes evidence',
      tone: 'blue',
    },
    'mental-health-services': {
      image: '/images/editorial/tenderlab-mental-health-hero-v1.jpg',
      alt: 'A mental health professional in conversation with a person, connected to recovery, risk and partnership evidence',
      tone: 'blue',
    },
    'complex-care': {
      image: '/images/editorial/tenderlab-complex-care-chc-hero-v1.jpg',
      alt: 'A complex care professional supporting a person at home, connected to clinical governance and coordinated-care evidence',
      tone: 'blue',
    },
    'complex-care-and-continuing-healthcare': {
      image: '/images/editorial/tenderlab-complex-care-chc-hero-v1.jpg',
      alt: 'A continuing healthcare team coordinating complex care at home, connected to clinical and funding evidence',
      tone: 'blue',
    },
    'continuing-healthcare': {
      image: '/images/editorial/tenderlab-complex-care-chc-hero-v1.jpg',
      alt: 'A continuing healthcare professional coordinating complex care, connected to assessment and clinical evidence',
      tone: 'blue',
    },
    'housing-related-support': {
      image: '/images/editorial/tenderlab-housing-support-hero-v1.jpg',
      alt: 'A housing support worker and tenant reviewing a support plan, connected to tenancy and independence evidence',
      tone: 'cream',
    },
    'supported-housing': {
      image: '/images/editorial/tenderlab-housing-support-hero-v1.jpg',
      alt: 'A supported housing tenant and worker reviewing goals, connected to tenancy sustainment and outcomes evidence',
      tone: 'cream',
    },
  }

  if (tailored[slug]) return tailored[slug]

  if (CHILDREN_SLUGS.has(slug)) {
    return {
      image: '/images/editorial/tenderlab-childrens-services-hero-v1.webp',
      alt: 'A family-support professional discussing a plan at home, linked to safe accommodation and children’s service evidence',
      tone: 'peach',
    }
  }

  if (CLINICAL_SLUGS.has(slug)) {
    return {
      image: '/images/editorial/tenderlab-community-health-hero-v1.webp',
      alt: 'A community nurse supporting a person at home, linked to multidisciplinary review and clinical governance evidence',
      tone: 'blue',
    }
  }

  if (HOUSING_SLUGS.has(slug)) {
    return {
      image: '/images/editorial/tenderlab-housing-support-hero-v1.webp',
      alt: 'A tenant and housing support worker discussing support at home, linked to tenancy and outcomes evidence',
      tone: 'cream',
    }
  }

  if (HOME_CARE_SLUGS.has(slug)) {
    return {
      image: '/images/editorial/tenderlab-adult-social-care-hero-v1.webp',
      alt: 'A care professional supporting an older person at home, linked to provider records and service evidence',
      tone: 'yellow',
    }
  }

  return {
    image: '/images/editorial/tenderlab-adult-social-care-hero-v1.webp',
    alt: 'Care delivery and provider evidence connected in an editorial collage',
    tone: 'cream',
  }
}

function extractArticleSections(html: string): string {
  const article = html.match(/<article\b[^>]*class="[^"]*\btlp\b[^"]*"[^>]*>([\s\S]*?)<\/article>/i)
  const source = article ? article[1] : html
  const firstSection = source.search(/<section\b[^>]*class="[^"]*\bcs-block\b/i)
  const start = firstSection >= 0 ? firstSection : 0
  const cta = source.search(/<div\b[^>]*class="[^"]*\bcta-block\b/i)
  const end = cta > start ? cta : source.length

  return source
    .slice(start, end)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/href="index\.html"/gi, 'href="/care-settings"')
    .replace(/href="\.\.\/care-settings\/([^"]+?)\.html"/gi, 'href="/care-settings/$1"')
    .replace(/href="\.\.\/case-studies\/([^"]+?)\.html"/gi, 'href="/case-studies/$1"')
    .replace(/href="\.\.\/services\.html(?:#[^"]*)?"/gi, 'href="/services"')
    .replace(/href="\.\.\/services\/([^"]+?)\.html"/gi, 'href="/services/$1"')
    .replace(/href="\.\.\/blog\/([^"]+?)\.html"/gi, 'href="/blog/$1"')
    .replace(/href="\.\.\/[^"]+?\.html"/gi, 'href="/case-studies"')
    .replace(
      /href="https:\/\/www\.tenderlab\.co\.uk\/care-settings\/([^"\/]+)\/?"/gi,
      'href="/care-settings/$1"'
    )
    .replace(
      /href="https:\/\/(?:www\.)?tenderlab\.co\.uk([^"#?]*)([^" ]*)"/gi,
      'href="$1$2"'
    )
}

function buildTocAndContent(html: string): { tocItems: TocItem[]; processedHtml: string } {
  const tocItems: TocItem[] = []
  let counter = 0

  const processedHtml = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, rawAttributes: string, inner: string) => {
      counter += 1
      const rawText = plainText(inner)
      if (!rawText) return `<h2${rawAttributes}>${inner}</h2>`

      const section = rawText.match(/^section\s+(\d+)\s*[:.\-–—]?\s*(.+)$/i)
      const num = (section ? section[1] : String(counter)).padStart(2, '0')
      const label = section ? section[2].trim() : rawText
      const existingId = rawAttributes.match(/\sid="([^"]+)"/i)?.[1]
      const anchor = existingId || `section-${num}`

      tocItems.push({ label, num, anchor })
      return existingId
        ? `<h2${rawAttributes}>${inner}</h2>`
        : `<h2${rawAttributes} id="${anchor}">${inner}</h2>`
    }
  )

  return { tocItems, processedHtml }
}

function relatedCases(slug: string) {
  const cohort = CASE_STUDY_COHORT[slug]
  const matches = cohort ? CASE_STUDIES.filter(item => item.category === cohort) : []
  return (matches.length ? matches : CASE_STUDIES).slice(0, 3)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const html = await getPageHtml(slug)
  if (!html) return { title: 'Care Setting Not Found | TenderLab' }

  const setting = extractTitle(html, slug)
  const title = `${setting} Tender Writing | TenderLab`
  const description = extractMetaDescription(
    html,
    `Specialist tender writing and bid support for UK ${setting.toLowerCase()} providers.`
  )
  const pathname = `/care-settings/${slug}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(pathname) },
    openGraph: defaultOpenGraph({ title, description, path: pathname }),
    twitter: defaultTwitter({ title, description }),
  }
}

export default async function CareSettingPage({ params }: Props) {
  const { slug } = await params
  const html = await getPageHtml(slug)
  if (!html) notFound()

  const setting = extractTitle(html, slug)
  const lede = extractClassText(html, 'lede')
  const position = extractClassText(html, 'pos')
  const description = extractMetaDescription(
    html,
    `Specialist tender writing and bid support for UK ${setting.toLowerCase()} providers.`
  )
  const intro = position || lede || description
  const visual = visualFor(slug)
  const { tocItems, processedHtml } = buildTocAndContent(extractArticleSections(html))
  const cases = relatedCases(slug)
  const pathname = `/care-settings/${slug}`

  return (
    <main>
      <script
        id={`ld-care-setting-${slug}-service`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: `${setting} tender writing`,
              description,
              path: pathname,
            })
          ),
        }}
      />
      <script
        id={`ld-care-setting-${slug}-faq`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(defaultFaq)) }}
      />
      <script
        id={`ld-care-setting-${slug}-breadcrumb`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Care settings', path: '/care-settings' },
              { name: setting, path: pathname },
            ])
          ),
        }}
      />

      <EditorialHero
        eyebrow="Health and social care tender writing"
        title={`${setting} tender writing`}
        intro={intro}
        image={visual.image}
        imageAlt={visual.alt}
        tone={visual.tone}
        primaryLabel="Ask us to assess a tender"
        primaryHref="/contact#enquiry"
        secondaryLabel="Browse live tenders"
        secondaryHref="/tenders"
      />

      <nav className="ep-care-toc" aria-label="On this page">
        <div className="ep-shell">
          <span>On this page</span>
          <div>
            {tocItems.slice(0, 7).map(item => (
              <a href={`#${item.anchor}`} key={item.anchor}>
                <b>{item.num}</b> {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="ep-section ep-care-content">
        <div className="ep-shell ep-care-content__grid">
          <aside>
            <div className="ep-care-content__visual">
              <Image src={visual.image} alt={visual.alt} fill sizes="(max-width: 900px) 100vw, 32vw" />
            </div>
            <p className="ep-kicker">The TenderLab approach</p>
            <h2>Make the service clear enough to score.</h2>
            <p>
              We test the buyer’s conditions first, then build each answer from the
              provider’s real roles, controls, records and outcomes.
            </p>
            <Link href="/services" className="ep-link">
              Compare tender support <span aria-hidden="true">↗</span>
            </Link>
          </aside>
          <article
            className="ep-care-article"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </div>
      </section>

      <section className="ep-section ep-care-related">
        <div className="ep-shell">
          <div className="ep-section-head ep-section-head--split">
            <div>
              <p className="ep-kicker">Documented tender results</p>
              <h2>See how similar requirements were evidenced.</h2>
            </div>
            <p>
              Names and award details are shown only where TenderLab holds
              documentary evidence suitable for publication.
            </p>
          </div>
          <div className="ep-care-related__grid">
            {cases.map(item => (
              <Link href={`/case-studies/${item.slug}`} key={item.slug}>
                <ContractWonMedallion className="contract-won-medallion--related" />
                <span>{item.categoryLabel}</span>
                <h3>{item.council}</h3>
                <p>{item.result}</p>
                <strong>Inspect the case study ↗</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EditorialFaq
        title={`Questions about ${setting.toLowerCase()} tenders`}
        items={[
          {
            q: 'Will TenderLab confirm whether we should bid?',
            a: 'Before full writing starts, we review the published conditions, service scope, available evidence, mobilisation position and commercial fit. We explain material gaps and will not recommend proceeding simply to sell writing time.',
          },
          {
            q: 'Does TenderLab guarantee an award?',
            a: 'No. The buyer controls the evaluation and award. Our role is to improve the quality, traceability and compliance of the submission while giving you a clear view of bid risk.',
          },
          {
            q: 'What should we send for an initial assessment?',
            a: 'Send the notice or portal link, procurement documents, deadline, intended lots and a short description of your current service. We will tell you what else is needed after reading the pack.',
          },
        ]}
      />

      <section className="ep-section ep-care-cta">
        <div className="ep-shell ep-care-cta__grid">
          <div>
            <p className="ep-kicker">Have a live opportunity?</p>
            <h2>Check the requirements before committing to the response.</h2>
          </div>
          <div>
            <p>
              Share the buyer documents. We will identify the mandatory conditions,
              evidence gaps and practical next step before full tender writing begins.
            </p>
            <Link href="/contact#enquiry" className="ep-button ep-button--primary">
              Contact TenderLab <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
