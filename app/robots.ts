import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/*?ref=', '/*?utm_', '/*?source='] },
    sitemap: [
      'https://www.tenderlab.co.uk/sitemap.xml',
      'https://www.tenderlab.co.uk/sitemap-tenders.xml',
    ],
    host: 'https://www.tenderlab.co.uk',
  }
}
