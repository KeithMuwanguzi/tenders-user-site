# TenderLab SEO migration map

Date: 10 August 2026  
Candidate: `agent/tenderlab-phase2-working-20260810`  
Production domain: protected; not connected during Phase 2

## Rules

- `https://www.tenderlab.co.uk` is the only canonical host.
- Canonicals are self-referencing on indexable pages; there is no inherited homepage canonical.
- Permanent redirects use Next.js permanent responses (HTTP 308, treated as permanent by search engines).
- No indexed URL is removed without a closest useful destination.
- Redirect destinations were checked for HTTP 200 and chains were removed.
- Live tender detail URLs remain `/tenders/{id}` and are supplied through a separate live sitemap.

## Implemented URL map

| Previous URL | Final URL | Action | Reason |
|---|---|---|---|
| `/live-tenders` | `/tenders` | Permanent redirect | Plain navigation and retained live-tender intent |
| `/7-step-tender-writing-process` | `/process` | Permanent redirect | Consolidated process authority |
| `/services/bid-team-coaching` | `/services/tender-training` | Permanent redirect | Clear service name and retained intent |
| `/services/pipeline-tracking` | `/services/tender-retainer` | Permanent redirect | Pipeline support is part of retained tender management |
| `/services/bid-no-bid` | `/services/bid-viability` | Permanent redirect | Buyer-facing qualification terminology |
| `/score-my-response` | `/services/pre-submission-review` | Permanent redirect | Removes unsupported simulated scoring journey |
| `/faq` | `/faqs` | Permanent redirect | Canonical FAQ route |
| `/about-old` | `/about` | Permanent redirect | Removes obsolete duplicate |
| `/services/bid-management` | `/services/tender-retainer` | Permanent redirect | Consolidated service intent |
| `/services/social-value` | `/services/bid-writing` | Permanent redirect | Avoids thin standalone service page |
| `/services/pqq-writing` | `/services/bid-writing` | Permanent redirect | Consolidated writing intent |
| `/health-and-social-care-bid-writing` | `/services/bid-writing` | Permanent redirect | Preserves commercial query equity |
| `/nhs-tenders` | `/tenders` | Permanent redirect | Live opportunities hub |
| `/local-authority-tenders` | `/tenders` | Permanent redirect | Live opportunities hub |
| `/sectors/supported-living` | `/care-settings/supported-living` | Permanent redirect | Final information architecture |
| `/care-settings/care-home-accommodation` | `/care-settings/residential-care` | Permanent redirect | True intent synonym consolidation |
| `/care-settings/health-services` | `/care-settings/community-health-services` | Permanent redirect | More precise care-setting topic |
| `/care-settings/housing-support` | `/care-settings/housing-related-support` | Permanent redirect | True intent synonym consolidation |
| Legacy root blog slugs | Matching `/blog/{slug}` | Permanent redirect | Preserves article equity |
| Retired Durham, York, Bromley and Newcastle qualification-analysis posts | `/tenders/domiciliary-care` | Permanent redirect | Time-sensitive analyses retired into maintained live hub |
| Old framework explainer | `/blog/which-care-tenders-should-you-bid-for` | Permanent redirect | Closest current decision-support intent |
| Old Procurement Act article | `/blog/light-touch-regime-england-vs-scotland-care-tenders-2026` | Permanent redirect | Closest current legal/procurement topic |
| `tenderlab.co.uk/:path*` | `www.tenderlab.co.uk/:path*` | Permanent host redirect | One canonical domain |

Trailing-slash variants for key historic URLs are also normalised to their slashless canonical.

## Verification

- Sampled ten high-risk redirects: all returned permanent HTTP 308 and one-hop destinations.
- Built-site verifier checked canonicals and internal links across 94 generated pages.
- Runtime crawler checked 300 sitemap pages and 158 discovered internal targets: zero broken targets and zero links escaping to an absolute TenderLab host.
- `/sitemap-tenders.xml` now falls back correctly when a preview uses the public API proxy; test result was HTTP 200 with 231 live tender URLs.

## Production cutover requirement

Before changing the live domain, export the live Search Console landing-page list and backlink destinations once more. Compare it against this map and add any newly observed legacy URL before cutover. This is a final change-detection check, not permission to delay the candidate.
