import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Named rules make TenderLab's search-discovery policy unambiguous to
      // answer engines while the wildcard continues to cover ordinary crawlers.
      // OAI-SearchBot is the crawler OpenAI documents for ChatGPT search.
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
    ],
    sitemap: [
      'https://www.tenderlab.co.uk/sitemap.xml',
      'https://www.tenderlab.co.uk/sitemap-tenders.xml',
    ],
    host: 'https://www.tenderlab.co.uk',
  }
}
