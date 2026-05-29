import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.tenderlab.co.uk/sitemap.xml',
    host: 'https://www.tenderlab.co.uk',
  }
}
