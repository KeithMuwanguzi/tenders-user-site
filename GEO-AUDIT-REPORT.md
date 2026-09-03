# TenderLab final release and GEO audit

Date: 3 September 2026
Scope: current website working copy, plus live production crawl controls and sitemap availability
Status: **technically ready for preview; production booking integrations remain a release gate**

## Executive score

| Area | Score | Evidence |
| --- | ---: | --- |
| Crawlability and indexability | 10/10 | Valid robots file; structural and tender sitemaps respond; canonical checks pass. |
| On-page search targeting | 9.5/10 | Page-specific titles, descriptions, H1s and care/service terminology are present without keyword stuffing. |
| Structured data and entity clarity | 9.5/10 | Organization, WebSite, Service, Breadcrumb, Article and FAQ JSON-LD are generated where applicable. |
| AI retrieval readiness | 9/10 | Public `llms.txt`, answer-led FAQ content, proof definitions and entity links are present. |
| Accessibility | 10/10 | Automated WCAG A/AA checks show zero violations on representative templates; Lighthouse accessibility is 100. |
| Link integrity | 10/10 | Built-site verification covered 95 pages; a separate crawl checked 50 pages and 106 internal targets with no failures. |
| Conversion and booking readiness | 7/10 | Free and paid flows are implemented, but production Stripe, Calendly and notification credentials are not connected. |

Overall technical/GEO score: **93/100**.
Production release status: **conditional**.

## Crawl and indexing findings

- `robots.txt` returns 200, allows public crawling and declares both sitemaps.
- The live structural sitemap returned 174 URLs during the audit.
- The live tender sitemap returned 221 URLs during the audit.
- `llms.txt` returns 200 and identifies TenderLab, its legal entity, main services, proof page, care-setting coverage and canonical website.
- Preview deployments are protected with `noindex, nofollow, noarchive`; the production domain remains indexable.
- The homepage now places its title, description and canonical inside the document head for all crawler clients. This removed a Lighthouse SEO failure caused by streamed metadata.
- No page-level canonical in the 95-page build verification incorrectly points to the homepage or includes query parameters.

## Content and keyword coverage

The site already targets the commercially relevant subjects in natural page copy and metadata:

- health and social care tender writing;
- care-sector bid writing and bid support;
- council, NHS and ICB contracts;
- domiciliary care, supported living, residential/nursing care, children’s services, mental health and complex care tenders;
- bid viability, complete bid writing, pre-submission review, tender readiness, mobilisation, retained support and tender pipeline monitoring.

No generic keyword list was added. Google does not use a meta-keywords tag, and adding repeated keyword blocks would reduce content quality. The current approach uses a dedicated page, H1, title, description, visible answer copy and relevant internal links for each search intent.

## Link and page integrity

- Full build, type checking, public-asset validation, claim validation and integration-contract validation pass.
- Ninety-five prerendered pages passed canonical and internal-link validation.
- A rate-limited rendered crawl sampled 50 indexable pages. Every page returned 200 and included one H1, a title, description and canonical.
- The same crawl found 106 internal targets and zero broken targets.
- Thirty-four distinct external destinations were checked. Government, regulator, social, provider and official-notice links responded.
- Trustpilot returned 403 to the automated checker, which is bot protection rather than a visitor-facing missing page.
- Your Hope Care’s domain resolved but did not accept HTTPS connections. Its attribution remains visible, but the dead outbound click was removed until a working verified website is available.

## Accessibility and responsive QA

Representative automated checks covered:

- homepage;
- Book a Consultation;
- live tenders;
- domiciliary-care template;
- case-study library.

All now show zero axe WCAG A/AA violations. Lighthouse reports 100 accessibility and 100 SEO on the homepage and booking page. Desktop and 390-pixel mobile renders were visually checked for the hero, statistics, booking options, live-tender layout, footer choices and cookie controls.

## Performance note

The homepage Lighthouse run scored 75 for simulated mobile performance, 100 accessibility, 100 best practices and 100 SEO. Its measured browser LCP was approximately 1.8 seconds; Lighthouse’s simulated LCP estimate was materially higher because the dynamic homepage waits on the live portal feed under simulated throttling. The first hero image remains high-priority and automatic image rotation is delayed so it does not replace the initial LCP candidate during the critical loading window.

## Booking and payment verification

Implemented and locally verified:

- the 30-minute Tender Consultation is free and bypasses Stripe;
- paid prepared services create a one-off Stripe Checkout session;
- Stripe webhook signatures are verified before a payment is recorded;
- a paid confirmation page verifies the Checkout session server-side;
- Calendly is shown only after a valid free confirmation or verified payment;
- the Calendly frame is explicitly permitted by the production content security policy;
- the privacy policy now identifies Stripe, Calendly, Google Calendar and Google Meet accurately;
- the free flow was completed in a production-mode browser from selection through confirmation.

Google Meet is created by Calendly, not directly by this website. TenderLab must enable Google Calendar and Google Meet on each relevant Calendly event type.

## Production release gates

The following production values or account connections were not present in the linked Vercel project during the audit:

1. `STRIPE_SECRET_KEY`
2. `STRIPE_WEBHOOK_SECRET`
3. `NEXT_PUBLIC_CALENDLY_URL` for the free 30-minute consultation
4. `NEXT_PUBLIC_CALENDLY_BID_FEEDBACK_URL`
5. `NEXT_PUBLIC_CALENDLY_READINESS_URL`
6. SMTP credentials for TenderLab booking notifications

The Stripe webhook endpoint must be configured as:

`https://www.tenderlab.co.uk/api/webhooks/stripe`

Production must not be promoted until a Stripe test payment, webhook receipt, Calendly appointment, confirmation email and Google Meet invitation have all been completed successfully with TenderLab’s own accounts.

## Release decision

The design, internal routes, crawl controls, metadata, schema, responsive layouts and free booking path are ready for a protected preview. The final production promotion is blocked only by the missing third-party account configuration and the required real end-to-end booking tests.
