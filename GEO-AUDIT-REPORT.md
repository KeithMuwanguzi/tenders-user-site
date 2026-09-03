# TenderLab technical SEO and GEO audit

Date: 3 September 2026

Scope: working copy, protected preview and current production crawl endpoints
Method: rendered representative templates, rate-limited crawl of 50 indexable pages, built-page checks, source/schema review and platform-specific discovery controls

## Outcome

**On-site technical SEO/GEO readiness: 100/100 against the 20-point release checklist below.**

**Composite GEO market readiness: 84/100.**
**Production status: HOLD until live booking and payment integrations pass.**

The two scores answer different questions. The technical score measures what TenderLab controls in the website. The composite score also includes authority, third-party mentions, named expertise and platform presence. Those external signals cannot truthfully be declared 100% by changing code.

No search engine or consultant can guarantee first position for any keyword. The business target is therefore measured as growth across the 304-query opportunity portfolio, including counts in positions 1, top 3, top 10 and top 20.

## Weighted composite GEO score

| Category | Weight | Score | Weighted contribution | Main constraint |
| --- | ---: | ---: | ---: | --- |
| Citability | 25% | 88/100 | 22.0 | More first-hand procurement analysis and primary evidence are required |
| Brand authority | 20% | 70/100 | 14.0 | Genuine third-party citations and association/partner coverage take time |
| E-E-A-T | 20% | 75/100 | 15.0 | The site does not yet publish approved named expert/reviewer profiles |
| Technical GEO | 15% | 100/100 | 15.0 | Pass |
| Schema | 10% | 95/100 | 9.5 | Person/ProfilePage markup must wait for factual approved profiles |
| Platform optimisation | 10% | 85/100 | 8.5 | Search Console AI reporting and cross-platform citation baselines require live account access |
| **Total** | **100%** |  | **84/100** | External authority and accountable expertise, not crawl code |

## 20-point technical release checklist

Each item is worth five points.

| # | Control | Result | Evidence |
| ---: | --- | --- | --- |
| 1 | HTTPS production canonical | Pass | `https://www.tenderlab.co.uk` is the single configured site URL |
| 2 | Public robots policy | Pass | Wildcard crawl allowed and both sitemaps declared |
| 3 | AI search crawler access | Pass | OAI-SearchBot, ChatGPT-User, PerplexityBot and ClaudeBot explicitly allowed |
| 4 | Preview protection | Pass | Non-production hosts receive `noindex, nofollow, noarchive` |
| 5 | Structural sitemap | Pass | Core, service, care-setting, guide, case-study and available blog routes included |
| 6 | Tender sitemap | Pass | Live notice discovery is separated into a daily-updated sitemap |
| 7 | Canonical integrity | Pass | Built-page verification found no homepage leakage or query-parameter canonicals |
| 8 | Redirect/duplicate control | Pass | Legacy nested care-setting routes redirect to canonical routes |
| 9 | Unique title and description | Pass | Representative rendered templates contain page-specific metadata |
| 10 | One clear H1 | Pass | The 50-page rendered sample contained one H1 per page |
| 11 | Server-rendered primary content | Pass | Main headings, body copy and JSON-LD are present without client interaction |
| 12 | Semantic navigation and landmarks | Pass | Header, main, footer, labels and skip navigation are implemented |
| 13 | Organization/WebSite entity schema | Pass | Stable `@id` graph, legal identifier and verified `sameAs` profiles |
| 14 | Page-specific schema | Pass | Service, Article/BlogPosting, CollectionPage, Breadcrumb and visible FAQ markup |
| 15 | Schema/content parity | Pass | FAQs and claims emitted in JSON-LD are visible on their associated pages |
| 16 | Internal link integrity | Pass | Earlier built verification covered 95 pages; rendered crawl found no failed internal targets |
| 17 | Mobile accessibility | Pass | Representative templates recorded zero automated WCAG A/AA violations |
| 18 | Image and social metadata | Pass | Open Graph images, meaningful alt handling and large image preview policy |
| 19 | Agent-readable controls | Pass | Forms and interactions use accessible names, states and standard links/buttons |
| 20 | AI reference files | Pass | `llms.txt` and detailed reference file accurately describe the entity and evidence limits |

Google currently states that `llms.txt` has no effect on Google Search or its generative features. It is retained for other systems and does not contribute extra Google ranking points.

## Citability findings

### Strong

- a clear niche: UK health and social care tender writing;
- directly answerable FAQs across services and care settings;
- separate definitions for 92%, 200+, £50M+ and 5/5 instead of merging the measures;
- named public bodies and procurement contexts in case studies;
- live tender pages that can answer current opportunity queries;
- consistent caveats that past performance does not guarantee an award.

### Required to improve the composite score

- publish original, primary-source-backed analysis of current notices and award trends;
- expose the evaluation method using redacted, permissioned examples;
- show publication and review ownership for important guides;
- add quotable factual summaries that are supported by the fuller surrounding explanation;
- refresh high-value guides after material regulatory or procurement changes, not by date alone.

## Brand authority findings

The Organization graph links Companies House, Google Business Profile, Trustpilot, LinkedIn, Facebook and Instagram. This is a solid entity foundation. It is not equivalent to independent editorial authority.

The next gains must come from real-world sources:

- client websites and permissioned case-study references;
- care associations and sector partners;
- procurement publications, webinars and podcasts;
- relevant professional profiles for accountable TenderLab experts;
- primary-source-cited quarterly tender intelligence.

Paid, reciprocal or simulated mentions are excluded from the strategy.

## E-E-A-T findings

The site demonstrates experience through procurement-specific copy, case studies, proof definitions and care-setting detail. Legal identity, contact details and policy pages are present.

The primary gap is named accountability. The current blog correctly uses the organisation as author rather than inventing a person. To improve:

1. publish approved profiles for the people who write or review important content;
2. state relevant, verifiable background without unsupported credential language;
3. add “written by”, “reviewed by” and review dates only where a real person accepted responsibility;
4. link those profiles to appropriate professional pages;
5. then add Person and ProfilePage schema matching the visible content.

## Platform readiness

### Google AI Overviews and AI Mode

- eligible technical structure and crawl controls are present;
- success still depends on indexing, core ranking systems, usefulness and authority;
- monitor through Search Console’s generative AI performance reporting;
- do not generate a page for every query variation.

### ChatGPT search

- OAI-SearchBot is explicitly allowed;
- public pages are indexable and citeable;
- track referrals carrying `utm_source=chatgpt.com`;
- keep important facts in accessible HTML and attach their evidence boundaries.

### Perplexity, Claude and Bing/Copilot

- public crawling is permitted;
- server-rendered copy and conventional schema are available;
- platform-specific citation tests should be repeated after production launch and recrawl.

## Technical evidence already obtained

- full production-mode build passed 101 routes;
- built canonical/internal-link verification passed 95 pages;
- a separate rate-limited rendered crawl sampled 50 pages and 106 internal targets with no failures;
- representative homepage and booking Lighthouse runs returned 100 for accessibility, best practices and SEO;
- booking Lighthouse returned 100 in all non-performance categories;
- homepage measured browser LCP was approximately 1.8 seconds, while simulated mobile Lighthouse performance was 75 because the dynamic tender feed was delayed under throttling;
- preview deployments are protected from indexing.

## Booking and payment release gate

Implemented in code:

- free 30-minute Tender Consultation bypasses Stripe;
- prepared paid services use one-off Stripe Checkout;
- webhook signatures are verified before payment state is stored;
- paid confirmation is verified server-side;
- Calendly is available only after a valid free confirmation or verified payment;
- the security policy permits Calendly framing;
- privacy wording identifies Stripe, Calendly, Google Calendar and Google Meet.

Still required in the live TenderLab accounts:

1. connect Stripe and add `STRIPE_SECRET_KEY`;
2. create the production webhook for `https://www.tenderlab.co.uk/api/webhooks/stripe` and add `STRIPE_WEBHOOK_SECRET`;
3. add the free and paid Calendly event URLs;
4. connect TenderLab’s Google Calendar and enable Google Meet on those events;
5. add TenderLab SMTP/transactional email credentials;
6. complete one free booking and one Stripe test payment through confirmation, notifications, calendar and Meet link.

Current release decision: **HOLD**. These are real account-level connections and cannot be replaced by placeholders or code-only tests.

## Measurement baseline after launch

- sitemap URLs submitted, discovered and indexed;
- non-indexed reasons by template, with report freshness checked first;
- 304 target queries grouped by core services, care setting, live opportunities, procurement decisions and region;
- queries in position 1, top 3, top 10 and top 20;
- cited pages in Google AI features and external answer engines;
- ChatGPT referral sessions and conversions;
- consultation and paid checkout completion by landing page.

## Final position

TenderLab’s on-site technical GEO layer is complete against the declared checklist. The remaining path from 84 composite points toward 100 is not more crawler markup. It is sustained publication of original procurement evidence, approved named expertise, earned third-party authority, platform measurement and proven user outcomes.
