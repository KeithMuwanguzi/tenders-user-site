import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  trailingSlash: false,
  // Low-memory VPS builds: one page at a time, longer timeout for heavy routes.
  staticPageGenerationTimeout: 300,
  experimental: {
    staticGenerationMaxConcurrency: 1,
  },
  images: {
    qualities: [75, 84, 88],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenderlab.co.uk',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.hounslow.gov.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.sefton.gov.uk',
      },
    ],
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.blob.vercel-storage.com https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net",
      "upgrade-insecure-requests",
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // ── Renamed pages (old URL -> new URL) ────────────────────────────
      { source: '/live-tenders', destination: '/tenders', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/journal', destination: '/blog', permanent: true },
      { source: '/7-step-tender-writing-process', destination: '/process', permanent: true },
      { source: '/services/bid-team-coaching', destination: '/services/tender-training', permanent: true },
      { source: '/services/pipeline-tracking', destination: '/services/tender-retainer', permanent: true },
      { source: '/services/bid-no-bid', destination: '/services/bid-viability', permanent: true },
      { source: '/score-my-response', destination: '/services/pre-submission-review', permanent: true },
      { source: '/faq', destination: '/faqs', permanent: true },
      { source: '/about-old', destination: '/about', permanent: true },
      { source: '/services/bid-management', destination: '/services/tender-retainer', permanent: true },
      { source: '/services/social-value', destination: '/services/bid-writing', permanent: true },
      { source: '/services/pqq-writing', destination: '/services/bid-writing', permanent: true },
      { source: '/health-and-social-care-bid-writing', destination: '/services/bid-writing', permanent: true },
      { source: '/nhs-tenders', destination: '/tenders', permanent: true },
      { source: '/local-authority-tenders', destination: '/tenders', permanent: true },
      { source: '/sectors/supported-living', destination: '/care-settings/supported-living', permanent: true },
      // Consolidate true care-setting synonyms so search engines do not split
      // authority across two pages that answer the same intent.
      { source: '/care-settings/care-home-accommodation', destination: '/care-settings/residential-care', permanent: true },
      { source: '/care-settings/health-services', destination: '/care-settings/community-health-services', permanent: true },
      { source: '/care-settings/housing-support', destination: '/care-settings/housing-related-support', permanent: true },

      // ── Trailing-slash normalisation ──────────────────────────────────
      // These appeared as "Page with redirect" in the May 2026 Search Console
      // audit. Next.js trailingSlash:false handles most of these automatically,
      // but the explicit entries ensure 301s are clean and cacheable.
      { source: '/about/', destination: '/about', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/reviews/', destination: '/reviews', permanent: true },
      { source: '/case-studies/', destination: '/case-studies', permanent: true },
      { source: '/faq/', destination: '/faqs', permanent: true },
      { source: '/live-tenders/', destination: '/tenders', permanent: true },
      { source: '/about-old/', destination: '/about', permanent: true },
      { source: '/blog/', destination: '/blog', permanent: true },

      // ── Blog posts moved from root to /blog/ ──────────────────────────
      { source: '/12-tender-writing-tips-from-an-evaluator-trained-bid-team', destination: '/blog/12-tender-writing-tips-from-an-evaluator-trained-bid-team', permanent: true },
      { source: '/12-tender-writing-tips-from-an-evaluator-trained-bid-team/', destination: '/blog/12-tender-writing-tips-from-an-evaluator-trained-bid-team', permanent: true },
      { source: '/the-5-tender-writing-skills-that-separate-winners-from-runners-up', destination: '/blog/the-5-tender-writing-skills-that-separate-winners-from-runners-up', permanent: true },
      { source: '/the-5-tender-writing-skills-that-separate-winners-from-runners-up/', destination: '/blog/the-5-tender-writing-skills-that-separate-winners-from-runners-up', permanent: true },
      { source: '/tender-writing-courses-uk-5-options-compared', destination: '/blog/tender-writing-courses-uk-5-options-compared', permanent: true },
      { source: '/tender-writing-software-vs-human-bid-writers-2026-comparison', destination: '/blog/tender-writing-software-vs-human-bid-writers-2026-comparison', permanent: true },
      { source: '/free-tender-writing-training-a-beginners-guide', destination: '/blog/free-tender-writing-training-a-beginners-guide', permanent: true },
      { source: '/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031/', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027/', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/blog/how-to-get-on-a-care-framework-frameworks-dps-and-approved-provider-lists-explained', destination: '/blog/which-care-tenders-should-you-bid-for', permanent: true },
      { source: '/blog/london-borough-of-bromley-domiciliary-care-framework-2026-to-2030-provider-qualification-analysis', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/blog/durham-county-council-domiciliary-care-spot-purchase-select-list-2026-to-2031-provider-qualification-analysis', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/blog/city-of-york-council-care-at-home-domiciliary-care-approved-provider-list-2024-to-2027-provider-qualification-analysis', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/blog/newcastle-city-council-home-care-services-framework-2026-to-2034-provider-qualification-analysis', destination: '/tenders/domiciliary-care', permanent: true },
      { source: '/blog/procurement-act-2023-light-touch-regime-adult-social-care-provider-guide', destination: '/blog/light-touch-regime-england-vs-scotland-care-tenders-2026', permanent: true },

      // ── Non-www to www ────────────────────────────────────────────────
      // (Belt and braces — Vercel domain settings usually handle this)
      { source: '/:path*', has: [{ type: 'host', value: 'tenderlab.co.uk' }], destination: 'https://www.tenderlab.co.uk/:path*', permanent: true },
    ]
  },
}

export default nextConfig
