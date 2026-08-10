import { type NextRequest, NextResponse } from 'next/server'

/**
 * middleware.ts — SEO hygiene layer
 *
 * Fixes three classes of bad URLs found in the May/June 2026 Search Console audit:
 *
 * 1. Double-slash blog URLs  /blog//slug  -> 301 -> /blog/slug
 * 2. 410 Gone for the 109 phantom /blog/ slugs (fragment, sentence, doubled)
 * 3. /faq and /faq/ -> /faqs  (preserves the dedicated answer library)
 */

// ─── Exact phantom slugs confirmed in Search Console 404 report ─────────────
const PHANTOM_BLOG_SLUGS: ReadonlySet<string> = new Set([
  // Type A – fragment/heading slugs accidentally registered as routes
  'named', 'first', 'second', 'third', 'instead', 'same-situation',
  'related-content', 'remove-claims', 'for-some-questions', 'three-steps',
  'a-weak-case-example', 'a-scoring-case-example', 'conclusion-and-next-steps',
  'skip-ahead-to-uncover', 'our-safeguarding-lead', 'note-in-our-case-studies',
  'note-in-our-experience', 'get-someone-else-to-do-it',
  'compare-these-two-sentences', 'for-adult-social-care-cqc',

  // Type B – slug repeated with "blog" concatenated in the middle
  'the-5-tender-writing-skills-that-separate-winners-from-runners-upblogthe-5-tender-writing-skills-that-separate-winners-from-runners-up',
  'tender-writing-software-vs-human-bid-writers-2026-comparisonblogtender-writing-software-vs-human-bid-writers-2026-comparison',
  'tender-writing-courses-uk-5-options-comparedblogtender-writing-courses-uk-5-options-compared',

  // Type C – full sentences from article body text slugified as route slugs
  'build-a-case-example-library-of-8-12-anonymised-examples-before-you-draft-question-1-each-example-follows-the-5-beat-structure-each-method-statement-pulls-from-this-library-where-contextually-appropriate',
  'statements-like-we-have-strong-safeguarding-processes-score-zero-on-evidence-statements-like-during-the-6-months-from-january-to-june-2025-we-completed-47-section-42-safeguarding-referrals-across-our-3-essex-services',
  'a-childrens-residential-bid-using-cqc-framing-or-an-adult-care-bid-using-ofsted-framing-tells-the-evaluator-the-team-has-not-understood-the-cohort-it-is-an-automatic-scoring-loss-on-any-question-that-touches-regulation',
  'what-does-it-mean-to-mirror-the-evaluation-criteriamirror',
  'why-does-my-method-statement-need-a-direct-thesis-sentencethesis',
  'how-do-i-get-section-42-wording-right',
  'in-march-2025-a-service-user-with-diagnosed-dementia',
  'what-counts-as-evidence-in-a-tender-responseevidence',
  'read-it-carefully-care-act-2014-section-42-enquiries-are-led-by-the-local-authority',
  'it-means-printing-the-scoring-grid-and-mapping-each-paragraph-of-your-response-to-a-named-criterion-in-the-marking-scheme',
  'the-same-applies-to-programme-names',
  'conclusion-and-next-stepsconclusion',
  'how-do-i-cut-to-the-word-limit-without-losing-scoring-evidencewordlimit',
  'what-does-it-mean-to-mirror-the-evaluation-criteria',
  'how-do-i-write-a-safeguarding-method-statementsafeguarding',
  'what-is-a-thesis-sentence-in-bid-writingthesis',
  'section-42-enquiries-are-formal-investigations-under-the-care-act-2014-triggered-when-a-local-authority-has-reasonable-cause-to-suspect-an-adult-with-care-and-support-needs-is-experiencing-or-at-risk-of-abuse-or-neglect',
  'what-does-good-evidence-look-like-in-a-tender-response',
  'why-does-structure-matter-in-a-method-statement',
  'how-does-mirroring-the-criteria-improve-scores',
  'what-is-the-5-beat-structure-in-bid-writing',
  'how-do-i-use-a-case-example-in-a-bid',
  'what-makes-a-strong-safeguarding-statement',
  'how-do-i-write-for-an-evaluator',
  'what-is-a-method-statement-in-a-tender',
  'how-long-should-a-method-statement-be',
  'what-is-the-difference-between-a-claim-and-evidence',
  'why-do-evaluators-score-evidence-higher-than-claims',
  'what-is-section-42-of-the-care-act-2014',
  'how-do-i-reference-legislation-in-a-bid',
  'what-is-a-dols-authorisation',
  'what-is-a-cqc-regulation-in-bid-writing',
  'what-is-the-mca-2005-and-why-does-it-matter-in-bids',
  'how-do-i-structure-a-complex-care-bid',
  'what-is-a-service-user-journey-in-a-bid',
  'how-do-i-demonstrate-person-centred-care-in-a-bid',
  'what-is-a-bid-debrief-and-why-does-it-matter',
  'how-do-i-calculate-a-social-value-commitment',
  'what-is-tupe-and-when-does-it-apply-to-bids',
  'what-is-a-framework-agreement-in-public-procurement',
  'what-is-a-dps-in-procurement',
  'what-is-find-a-tender-service',
  'what-is-contracts-finder',
  'how-do-i-find-health-and-social-care-tenders',
  'what-is-an-itt-in-procurement',
  'what-is-a-pre-qualification-questionnaire-pqq',
  'how-do-i-pass-a-pqq',
  'what-is-a-standstill-period-in-procurement',
  'what-is-alcatel-standstill',
  'what-is-a-debriefing-after-a-lost-tender',
  'how-do-i-score-my-own-bid-response',
  'what-is-a-bid-review-process',
  'how-do-i-improve-my-tender-win-rate',
  'what-is-a-bid-no-bid-decision',
  'how-do-i-manage-multiple-tenders-at-once',
  'what-software-do-bid-writers-use',
  'what-is-the-difference-between-a-bid-writer-and-a-bid-manager',
  'how-much-does-a-bid-writer-cost',
  'what-qualifications-does-a-bid-writer-need',
  'what-is-apmp-certification-for-bid-writers',
  'how-do-i-become-a-bid-writer',
  'what-is-a-tender-ready-programme',
])

/** Type B: slug has "blog" embedded after the 20th character (doubled path bug) */
function isDoubledSlug(slug: string): boolean {
  return slug.indexOf('blog', 20) !== -1
}

/** Type C: all real post slugs are < 80 chars; longer ones are sentence text */
function isSentenceSlug(slug: string): boolean {
  return slug.length > 80
}

function gone410(): NextResponse {
  return new NextResponse(null, {
    status: 410,
    headers: {
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}

function protectPreview(request: NextRequest, response: NextResponse): NextResponse {
  const hostname = request.nextUrl.hostname.toLowerCase()
  if (process.env.VERCEL_ENV === 'preview' || hostname.endsWith('.vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }
  return response
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  // Search Console shows that legacy ?source=cf and ?source=ft tender URLs
  // already receive impressions and clicks. Permanently consolidate them into
  // the clean detail URL so those signals are transferred rather than merely
  // hiding the duplicates from future crawls in robots.txt.
  if (pathname.startsWith('/tenders/') && request.nextUrl.searchParams.has('source')) {
    const url = request.nextUrl.clone()
    url.searchParams.delete('source')
    return protectPreview(request, NextResponse.redirect(url, { status: 301 }))
  }

  // 1. Fix double-slash /blog//slug -> /blog/slug (301)
  if (pathname.startsWith('/blog//')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace('/blog//', '/blog/')
    return protectPreview(request, NextResponse.redirect(url, { status: 301 }))
  }

  // 2. 410 Gone for phantom blog slugs
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.slice('/blog/'.length)
    if (slug && (PHANTOM_BLOG_SLUGS.has(slug) || isDoubledSlug(slug) || isSentenceSlug(slug))) {
      return protectPreview(request, gone410())
    }
  }

  // 3. Preserve the legacy singular path while consolidating on /faqs.
  if (pathname === '/faq' || pathname === '/faq/') {
    const url = request.nextUrl.clone()
    url.pathname = '/faqs'
    return protectPreview(request, NextResponse.redirect(url, { status: 301 }))
  }

  return protectPreview(request, NextResponse.next())
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
  }
