# TenderLab final pre-production Launch Gate

Date: 10 August 2026  
Candidate branch: `agent/tenderlab-phase2-working-20260810`  
Code candidate: pending signed tender-data correction commit (supersedes `23567ee65368aa2601f344060bef0f19d77c69d2`)
Private preview: `https://tenderlab-website-git-agent-23bbe9-tenderlab333-7841s-projects.vercel.app`  
Production domain status: unchanged; no cutover performed

## Decision

**READY FOR PRODUCTION DEPLOYMENT, SUBJECT TO AN EXPLICIT PRODUCTION CUTOVER INSTRUCTION.**

The source-led rebuild, implementation, private preview, deployed crawl, responsive checks, technical checks, controlled form submission and adversarial review are complete. A post-gate tender-data defect was corrected before cutover: clean canonical tender routes now retain correct source identity, full official detail and a strict distinction between the published notice and the buyer's submission system. No Critical or High defect remains. Production DNS and the live `www.tenderlab.co.uk` service have not been changed.

## Formal gate

| Area | Result | Final evidence / residual item |
|---|---|---|
| Brand strategy | PASS | Qualification-first specialist positioning, care-sector focus and evidence-led promise are consistently implemented |
| Brand identity | PASS | One warm editorial system with controlled collage imagery, typography, spacing, colour and interaction rules |
| Differentiation | PASS | The site leads with tender fit, operational evidence and evaluator readability rather than generic bid-writing claims |
| Visual design | PASS | Legacy dark blocks, oversized empty cards and unrelated visuals were removed; page families now share the approved visual language |
| Typography | PASS | Responsive hierarchy, readable measures and moderate weights are implemented throughout |
| UX | PASS | Clear task-led navigation, active states, mobile drawer, predictable routes, contextual tender enquiry and reduced decision friction |
| Information architecture | PASS | Services, care settings, live tenders, case studies, blogs, About, FAQs and Contact have distinct purposes and internal relationships |
| Content | PASS | Buyer-facing British English, explicit service scope, training, comparisons, pricing context, objections and FAQs are implemented |
| Conversion | PASS | Major routes provide one primary next step supported by nearby proof and qualification-first expectations |
| Trust | PASS | Verified measures, direct-client evidence, case studies and independent review links are placed near relevant claims |
| PR / reputation | PASS | Claims are defensible and qualified; direct relationships are distinguished from indirect supported engagements |
| SEO | PASS | Intent-to-page map, unique metadata, descriptive internal links, useful page purposes and people-first content are implemented |
| Technical SEO | PASS | Production-mode canonicals, robots, sitemaps, metadata, headings, redirects, rendered routes and 404 behaviour pass automated checks |
| Indexability | PASS | Production pages are crawlable/indexable; preview hosts are deliberately protected by `X-Robots-Tag: noindex, nofollow, noarchive` |
| SEO migration | PASS | Old-to-new URL map and permanent redirect plan are complete; cutover validation remains part of the protected production action |
| Structured data | PASS | Organisation, service, article and breadcrumb data are limited to visible, supportable content and validate syntactically |
| Accessibility | PASS | Representative pages score Lighthouse accessibility 100; keyboard, focus, labels, landmarks, reflow and reduced motion are implemented |
| Mobile | PASS | Representative templates at 390 × 844 have no horizontal overflow; navigation and contextual enquiry journey work correctly |
| Performance | PASS WITH MINOR NON-BLOCKING ITEMS | Desktop homepage 98; representative preview mobile 77–88. Route-level CSS splitting should be considered only after production field data |
| Forms | PASS WITH MINOR NON-BLOCKING ITEM | Validation and origin rejection pass; controlled preview submission is stored as a new unread Portal enquiry. No matching Gmail alert was found, so email alerting remains an operational follow-up |
| Links | PASS | Deployed crawl covered 300 pages and 158 internal targets with zero broken targets and zero escapes to a legacy TenderLab implementation |
| Analytics | PASS | Consent-aware GA4 event architecture includes form success, telephone and email interactions; production verification is required immediately after cutover |
| Privacy / cookie implementation | PASS | Optional analytics remains consent-gated; the site works without consent and the privacy route explains the processing |
| Technical deployment | PASS | TenderLab-controlled Vercel branch preview builds and serves live tender/blog APIs. Production environment/domain remain protected |
| Tender data fidelity | PASS | The detail page and API use the same official-data merge pipeline; exact Find a Tender regression testing confirms full official sections and separates the official notice from the ProContract submission system |

## Adversarial red-team outcome

The final review looked specifically for unsupported claims, AI-like or inconsistent design, legacy/dark templates, incorrect imagery, dead navigation, escaped old-site links, broken routes, missing metadata, indexing contradictions, duplicate intent, form loss, mobile overflow, weak focus handling, performance regressions and production-domain changes.

Findings corrected before this gate included the tender-sitemap upstream mismatch, an invisible tender CTA, filter/CSS scope mismatch, escaped absolute links, unused heavy image originals, missing preview noindex protection and the split between content and enquiry API hosts.

The gate was reopened before production when notice `074292-2026` exposed a source-inference error. The release was paused, the mapping was corrected, and the official notice and submission-system links were separated. The previously signed commit must not be promoted; only the new correction commit may become the production candidate after its preview deployment passes.

No Critical or High red-team finding remains.

## Accepted minor residual items

1. Portal email alerts were not observed in `tenderlab333@gmail.com` during the controlled test. The enquiry itself is safely stored and visible as unread in the Portal, so this does not lose leads; the Portal is the authoritative queue until email alert configuration is confirmed.
2. Production field performance data does not yet exist for the new site. Review Core Web Vitals after launch before deciding whether to split the global CSS bundles.
3. Vercel's preview toolbar is blocked by the site's CSP and reduces the preview-only Lighthouse best-practices score. The toolbar is not part of production.

## Exact protected production action remaining

After explicit cutover approval:

1. Set the production Vercel environment values `PORTAL_API_URL=https://www.tenderlab.co.uk` and `PORTAL_INQUIRY_API_URL=https://admin.tenderlab.co.uk`.
2. Promote the signed candidate from this branch in TenderLab's Vercel project.
3. Attach only `www.tenderlab.co.uk`; preserve the current live service until the new deployment is healthy.
4. Verify HTTPS, redirects, robots, both sitemaps, canonicals, structured data, analytics, the Portal enquiry queue and representative live routes immediately after cutover.
5. Submit the production sitemap in Search Console and monitor indexing, migration errors and qualified enquiries. Do not request indexing for the protected Vercel preview.

Production cutover is intentionally not performed by this Phase 2 gate.
