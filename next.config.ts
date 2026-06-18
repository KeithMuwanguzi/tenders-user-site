import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenderlab.co.uk',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // ── Renamed pages (old URL -> new URL) ────────────────────────────
      { source: '/live-tenders', destination: '/tenders', permanent: true },
      { source: '/7-step-tender-writing-process', destination: '/process', permanent: true },
      // /faq was incorrectly pointing to homepage — now points to /services
      // (middleware.ts also handles /faq and /faq/ as a belt-and-braces fix)
      { source: '/faq', destination: '/services', permanent: true },

      // ── Trailing-slash normalisation ──────────────────────────────────
      // These appeared as "Page with redirect" in the May 2026 Search Console
      // audit. Next.js trailingSlash:false handles most of these automatically,
      // but the explicit entries ensure 301s are clean and cacheable.
      { source: '/about/', destination: '/about', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/reviews/', destination: '/reviews', permanent: true },
      { source: '/case-studies/', destination: '/case-studies', permanent: true },
      { source: '/faq/', destination: '/services', permanent: true },
      { source: '/live-tenders/', destination: '/tenders', permanent: true },

      // ── Blog posts moved from root to /blog/ ──────────────────────────
      { source: '/12-tender-writing-tips-from-an-evaluator-trained-bid-team', destination: '/blog/12-tender-writing-tips-from-an-evaluator-trained-bid-team', permanent: true },
      { source: '/12-tender-writing-tips-from-an-evaluator-trained-bid-team/', destination: '/blog/12-tender-writing-tips-from-an-evaluator-trained-bid-team', permanent: true },
      { source: '/the-5-tender-writing-skills-that-separate-winners-from-runners-up', destination: '/blog/the-5-tender-writing-skills-that-separate-winners-from-runners-up', permanent: true },
      { source: '/the-5-tender-writing-skills-that-separate-winners-from-runners-up/', destination: '/blog/the-5-tender-writing-skills-that-separate-winners-from-runners-up', permanent: true },
      { source: '/tender-writing-courses-uk-5-options-compared', destination: '/blog/tender-writing-courses-uk-5-options-compared', permanent: true },
      { source: '/tender-writing-software-vs-human-bid-writers-2026-comparison', destination: '/blog/tender-writing-software-vs-human-bid-writers-2026-comparison', permanent: true },
      { source: '/free-tender-writing-training-a-beginners-guide', destination: '/blog/free-tender-writing-training-a-beginners-guide', permanent: true },
      { source: '/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031', destination: '/blog/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031-provider-qualification-analysis', permanent: true },
      { source: '/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031/', destination: '/blog/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031-provider-qualification-analysis', permanent: true },
      { source: '/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027', destination: '/blog/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027-provider-qualification-analysis', permanent: true },
      { source: '/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027/', destination: '/blog/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027-provider-qualification-analysis', permanent: true },

      // ── Migration recovery: legacy case-study URLs -> live case studies ──
      // Added 18 June 2026. These old URLs were 404ing in Search Console (120
      // not-found pages) after the late-May migration. Every destination below
      // was verified live (HTTP 200). This is the fix for the ranking drop.
      { source: '/choices-healthcare-essex-live-at-home', destination: '/case-studies/essex-domiciliary-framework-2025', permanent: true },
      { source: '/choices-healthcare-essex-live-at-home.html', destination: '/case-studies/essex-domiciliary-framework-2025', permanent: true },
      { source: '/livingstone-healthcare-essex-live-at-home', destination: '/case-studies/essex-live-at-home-tier-2-framework', permanent: true },
      { source: '/livingstone-healthcare-essex-live-at-home.html', destination: '/case-studies/essex-live-at-home-tier-2-framework', permanent: true },
      { source: '/inspire-care-outreach-dorset-open-framework', destination: '/case-studies/dorset-care-support-open-framework', permanent: true },
      { source: '/inspire-care-outreach-dorset-open-framework.html', destination: '/case-studies/dorset-care-support-open-framework', permanent: true },
      { source: '/choices-healthcare-southend-childrens-framework', destination: '/case-studies/southend-childrens-residential-framework', permanent: true },
      { source: '/choices-healthcare-southend-childrens-framework.html', destination: '/case-studies/southend-childrens-residential-framework', permanent: true },
      { source: '/havilah-care-bedford-supported-living', destination: '/case-studies/bedford-supported-living-framework', permanent: true },
      { source: '/havilah-care-bedford-supported-living.html', destination: '/case-studies/bedford-supported-living-framework', permanent: true },
      { source: '/nelson-ocean-central-bedfordshire-supported-living', destination: '/case-studies/central-bedfordshire-supported-living', permanent: true },
      { source: '/nelson-ocean-central-bedfordshire-supported-living.html', destination: '/case-studies/central-bedfordshire-supported-living', permanent: true },
      { source: '/rosecare-bradford-mental-health-supported-living', destination: '/case-studies/bradford-mental-health-provider-list', permanent: true },
      { source: '/rosecare-bradford-mental-health-supported-living.html', destination: '/case-studies/bradford-mental-health-provider-list', permanent: true },
      { source: '/alicelyn-sheffield-overnight-short-breaks', destination: '/case-studies/sheffield-dps-overnight-short-breaks', permanent: true },
      { source: '/alicelyn-sheffield-overnight-short-breaks.html', destination: '/case-studies/sheffield-dps-overnight-short-breaks', permanent: true },
      { source: '/in-home-carers-hertfordshire-children-young-people', destination: '/case-studies/hertfordshire-cyp-homecare-framework', permanent: true },
      { source: '/in-home-carers-hertfordshire-children-young-people.html', destination: '/case-studies/hertfordshire-cyp-homecare-framework', permanent: true },
      { source: '/pcas-childrens-services-procurement', destination: '/case-studies/childrens-services-direct-contract', permanent: true },
      { source: '/pcas-childrens-services-procurement.html', destination: '/case-studies/childrens-services-direct-contract', permanent: true },

      // ── Migration recovery: wrong /case-studies slugs -> correct slugs ──
      { source: '/case-studies/bedford-supported-living', destination: '/case-studies/bedford-supported-living-framework', permanent: true },
      { source: '/case-studies/choices-healthcare-southend-childrens-framework', destination: '/case-studies/southend-childrens-residential-framework', permanent: true },
      { source: '/case-studies/inspire-care-outreach-dorset-open-framework', destination: '/case-studies/dorset-care-support-open-framework', permanent: true },
      { source: '/case-studies/choices-healthcare-essex-live-at-home', destination: '/case-studies/essex-domiciliary-framework-2025', permanent: true },
      { source: '/case-studies/havilah-care-bedford-supported-living', destination: '/case-studies/bedford-supported-living-framework', permanent: true },

      // ── Migration recovery: removed blog post with no live equivalent ──
      { source: '/blog/tender-response-format-a-template-that-wins-uk-council-contracts', destination: '/blog', permanent: true },

      // ── Non-www to www ────────────────────────────────────────────────
      // (Belt and braces — Vercel domain settings usually handle this)
      { source: '/:path*', has: [{ type: 'host', value: 'tenderlab.co.uk' }], destination: 'https://www.tenderlab.co.uk/:path*', permanent: true },
    ]
  },
}

export default nextConfig
