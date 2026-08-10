# Accessibility and technical QA register

Date: 10 August 2026  
Environment tested: compiled production build at `127.0.0.1:3000`; private-preview retest pending deployment

## Gate results

| Area | Result | Evidence / acceptance test |
|---|---|---|
| Public asset boundary | PASS | `verify-public-assets` passed |
| Integration contracts | PASS | `verify-site-contracts` passed |
| Claims controls | PASS | `verify-claims` passed against the claims register |
| Type safety | PASS | TypeScript no-error check passed |
| Production compilation | PASS | Next.js 15 production build completed; 105 pages generated or configured dynamically |
| Canonicals and built links | PASS | 94 built pages verified |
| Runtime internal links | PASS | 300 pages, 158 internal targets, zero broken, zero absolute TenderLab escapes |
| Main sitemap | PASS | HTTP 200; canonical `www` URLs |
| Live tender sitemap | PASS | HTTP 200; 231 live tender detail URLs after proxy fallback correction |
| Robots | PASS | Crawl allowed; both sitemaps declared; canonical host declared |
| Redirects | PASS | Sampled historic URLs return one-hop permanent HTTP 308 |
| Security headers | PASS | CSP, HSTS, nosniff, frame denial, referrer and permissions policies present |
| Contact validation | PASS | Missing required data returns 400; disallowed origin returns 403; no message sent during test |
| Contact form delivery | CONTROLLED RETEST | Dual SMTP/VPS implementation reviewed; live delivery requires configured preview variables and one controlled real submission |
| Contextual tender enquiry | PASS | Tender title, description, authority, deadline and service type carry to `#enquiry` and prefill the form |
| Mobile overflow | PASS | Ten representative page types at 390 × 844 showed no horizontal overflow |
| Responsive headings | PASS | Representative mobile H1 sizes remained within 46.8–54.6 px with controlled wrapping |
| Mobile/desktop accessibility audit | PASS | Lighthouse accessibility 100 on homepage, contact, tenders and blog |
| SEO audit | PASS | Lighthouse SEO 100 on homepage, tenders and blog; contact metadata exists in rendered HTML (Lighthouse reported 91 because Next streams metadata for a dynamic route to non-bot clients) |
| Best practices | PASS | Lighthouse 100 on tested pages |
| Desktop performance | PASS | Homepage Lighthouse performance 98 |
| Mobile performance | PASS WITH NON-BLOCKING OPTIMISATION | Simulated slow-device results 74–79; server response 6–10 ms and LCP image was early/high-priority; remaining opportunity is global CSS splitting |
| Image delivery | PASS | 22 editorial PNGs converted to WebP; editorial asset directory reduced to 9.5 MB; hero image delivered responsively |
| Reduced motion | PASS | Motion rules include reduced-motion treatment |
| Semantic structure | PASS | One H1 on tested routes; landmark, skip link, labelled navigation, form labels and native details present |
| Indexability | PASS | Indexable pages use HTTP 200, self-canonical, internal links and sitemap inclusion; dynamic tender routes remain server rendered |

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

## Non-blocking items for post-preview measurement

- Split the two global CSS bundles by route only if preview field data confirms mobile LCP remains above the 2.5-second target. The local Lighthouse model reports unused CSS but the measured server and image timings are already fast; premature splitting would add maintenance risk across 100+ templates.
- Replace the current square schema/favicon logo only when an approved master brand asset is supplied. The visible navigation and footer use the transparent wordmark asset.
- Run one controlled real enquiry after preview environment variables are confirmed. This is intentionally not simulated because it would create a real external email and portal record.

No Critical accessibility or technical defect remains in the compiled candidate. Private-preview verification is still required before the formal Launch Gate can be signed.
