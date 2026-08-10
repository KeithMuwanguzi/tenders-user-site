# Accessibility and technical QA register

Date: 10 August 2026  
Environment tested: compiled production build and TenderLab-controlled Vercel preview at `https://tenderlab-website-git-agent-23bbe9-tenderlab333-7841s-projects.vercel.app`

## Gate results

| Area | Result | Evidence / acceptance test |
|---|---|---|
| Public asset boundary | PASS | `verify-public-assets` passed |
| Integration contracts | PASS | `verify-site-contracts` passed |
| Claims controls | PASS | `verify-claims` passed against the claims register |
| Type safety | PASS | TypeScript no-error check passed |
| Production compilation | PASS | Next.js 15 production build completed; 105 pages generated or configured dynamically |
| Canonicals and built links | PASS | 101 built pages verified across the 105-route production build |
| Runtime internal links | PASS | 300 pages, 158 internal targets, zero broken, zero absolute TenderLab escapes |
| Main sitemap | PASS | HTTP 200; canonical `www` URLs |
| Live tender sitemap | PASS | HTTP 200; 231 live tender detail URLs after proxy fallback correction |
| Robots | PASS | Crawl allowed; both sitemaps declared; canonical host declared |
| Redirects | PASS | Sampled historic URLs return one-hop permanent HTTP 308 |
| Security headers | PASS | CSP, HSTS, nosniff, frame denial, referrer and permissions policies present |
| Contact validation | PASS | Missing required data returns 400; disallowed origin returns 403; no message sent during test |
| Contact form delivery | PASS WITH MINOR NON-BLOCKING ITEM | A clearly labelled controlled submission returned HTTP 200 with `portal: true` and appeared in the signed-in TenderLab Portal as a new unread enquiry (`TenderLab Preview QA`, TenderLab Ltd, Bid viability). No matching alert appeared in `tenderlab333@gmail.com`; the enquiry itself is safely stored and actionable, while email-alert delivery remains an operational follow-up |
| Contextual tender enquiry | PASS | Tender title, description, authority, deadline and service type carry to `#enquiry` and prefill the form |
| Mobile overflow | PASS | Ten representative page types at 390 × 844 showed no horizontal overflow |
| Responsive headings | PASS | Representative mobile H1 sizes remained within 46.8–54.6 px with controlled wrapping |
| Mobile/desktop accessibility audit | PASS | Lighthouse accessibility 100 on homepage, contact, tenders and blog |
| SEO audit | PASS | Local production-mode Lighthouse SEO 100 on homepage, tenders and blog; contact metadata exists in both standard rendered HTML and Googlebot HTML. Deployed-preview SEO scores of 54–66 are deliberately reduced by the mandatory preview `noindex` header and are not production scores |
| Best practices | PASS WITH PREVIEW-ONLY EXCEPTION | Local production-mode Lighthouse 100. Deployed-preview Lighthouse 92 solely because Vercel's injected preview toolbar is blocked by the site's CSP; that toolbar is absent from the production site |
| Desktop performance | PASS | Homepage production-mode Lighthouse performance 98 |
| Mobile performance | PASS WITH NON-BLOCKING OPTIMISATION | Local simulated slow-device results 74–79; deployed preview 77–88 on representative routes. Server response remained fast and the LCP image was early/high-priority; remaining opportunity is evidence-led global CSS splitting |
| Image delivery | PASS | 22 editorial PNGs converted to WebP; editorial asset directory reduced to 9.5 MB; hero image delivered responsively |
| Reduced motion | PASS | Motion rules include reduced-motion treatment |
| Semantic structure | PASS | One H1 on tested routes; landmark, skip link, labelled navigation, form labels and native details present |
| Indexability | PASS | Indexable pages use HTTP 200, self-canonical, internal links and sitemap inclusion; dynamic tender routes remain server rendered |
| Preview index protection | PASS | Any Vercel preview host receives `X-Robots-Tag: noindex, nofollow, noarchive`; the production domain remains indexable |
| Official tender-detail integrity | PASS | Exact regression test against Find a Tender notice `074292-2026`: clean canonical route infers the correct source; five rich official-data sections, both lots, values, participation conditions, award criteria, timetable, authority and CPV data render; the Find a Tender notice and ProContract submission system are labelled and linked separately |

## Accessibility checks performed

- Keyboard-oriented navigation structure reviewed: burger is a real button, submenu controls expose `aria-expanded`, the drawer is a labelled modal dialog, Escape handling and focus return are implemented, and inactive drawer content is inert.
- Skip link targets the main site-content container.
- Contact inputs have explicit labels, autocomplete hints, required state, length limits and an alert region for server errors.
- Native link and button semantics are used; CTA cards remain real links rather than scripted divs.
- Text and surfaces passed Lighthouse contrast checks on all sampled page types.
- Decorative paths and thread devices are hidden from assistive technology; meaningful editorial images have contextual alternative text.
- Layouts were checked at mobile width for reflow and horizontal overflow.

## Technical findings corrected during QA

1. The live tender sitemap called only the private VPS endpoint. A public preview therefore returned a false 503/404 when it was intentionally configured through the public proxy. Added the same bounded fallback used by the visible tender feed. Retest: HTTP 200, 231 tender URLs.
2. Tender qualification CTA contained a blank red button in the inherited styles. Corrected text colour, label and surrounding light editorial panel.
3. Tender listing markup did not match the redesigned filter CSS scope. Aligned the ID so search, sort, source, care-setting, result-count and pagination controls render as designed.
4. Legacy absolute TenderLab links could escape a preview into the old implementation. Sanitised internal CMS links and verified zero escaped links in the crawl.
5. Heavy editorial PNG originals were still shipped beside WebP versions. Removed the unused originals and retained recoverability in Git.
6. Preview hosts needed an explicit search-engine safety boundary. Added host/environment-aware `X-Robots-Tag` protection without applying it to the production domain.
7. Tender/blog reads and enquiry delivery were incorrectly forced through one upstream host, while the live infrastructure exposes them separately. Added `PORTAL_INQUIRY_API_URL`; the Portal API stores an enquiry when website SMTP is unavailable and receives the relay marker only when the website already emailed, preventing duplicate records and preserving the enquiry even if email alerting is unavailable.
8. A controlled end-to-end preview submission was made using the labelled identity `TenderLab Preview QA`. The API returned HTTP 200 (`email: false`, `portal: true`) and the signed-in Portal displayed it as the newest unread enquiry. This confirms the primary operational record is not lost. Gmail was searched read-only in the correct `tenderlab333@gmail.com` account; no alert was present, so email notification is not falsely marked as passed.
9. A post-gate review found that clean tender-detail URLs lost their `source` query parameter after canonical redirection. Find a Tender records could therefore fall back to a short curated snapshot, and the official notice URL could be presented incorrectly as a submission portal. Source inference now uses the stored source and official identifier, the detail page and API share one merge pipeline, and published-notice URLs are kept separate from true buyer submission systems. The Oldham `ocds-h6vhtk-06dca8` regression fixture passes against the official Find a Tender OCDS release package and correctly identifies ProContract as the submission system.

## Non-blocking items for post-preview measurement

- Split the two global CSS bundles by route only if preview field data confirms mobile LCP remains above the 2.5-second target. The local Lighthouse model reports unused CSS but the measured server and image timings are already fast; premature splitting would add maintenance risk across 100+ templates.
- Replace the current square schema/favicon logo only when an approved master brand asset is supplied. The visible navigation and footer use the transparent wordmark asset.
- Investigate or add Portal-side email-alert configuration after launch preparation if an email alert is operationally required. This is non-blocking because the form acknowledgement succeeds and every enquiry is preserved as an unread record in the Portal; the Portal should remain the authoritative queue.

No Critical or High accessibility or technical defect remains in the candidate. The private preview, contextual enquiry route, live data APIs, crawl boundary, mobile layouts and Portal delivery have been verified. The formal Launch Gate is recorded separately.
