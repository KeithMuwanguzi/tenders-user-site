/** Blog posts are served from the Portal API, see `lib/blogs.ts`. */
export {
  fetchBlogs,
  fetchBlogBySlug,
  formatBlogDate,
  categoryColor,
  slugify,
  type BlogPost,
} from './blogs'

function parseRow(line: string): string[] {
  const cols: string[] = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++ }
      else inQ = !inQ
    } else if (c === ',' && !inQ) {
      cols.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  cols.push(cur.trim())
  return cols
}

/* ── Reviews Sheet ── */

const REVIEWS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1zRSWG6NPbWsfqOGticiTX0OlXaT35d3eEEx5oQFCMeA/gviz/tq?tqx=out:csv'

export type Review = {
  name: string
  role: string
  quote: string
  rating: number
}

const VERIFIED_REVIEW_FALLBACK: Review[] = [
  {
    name: 'Collins',
    role: 'Manager, Living Plus Care',
    rating: 5,
    quote:
      "It has been a pleasure working with Khol and his team, and I don't believe I could ever go back to doing tenders without their assistance. What I deeply appreciate is that they do not solely focus on writing bids; they have developed a deep understanding of our business, how we communicate, what our strengths are and what is important to us.",
  },
  {
    name: 'Janine',
    role: 'Director, Sorelle Support',
    rating: 5,
    quote:
      "From the outset, the team took the time to understand our organisation, our values and the services we provide, rather than offering a generic approach. They don't just write bids; they help you understand what commissioners are looking for and how to continuously improve your organisation.",
  },
]

export async function fetchReviews(): Promise<Review[]> {
  try {
    const res = await fetch(REVIEWS_SHEET_URL, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Reviews sheet fetch failed: ${res.status}`)
    const text = await res.text()
    const lines = text.trim().split(/\r?\n/).filter(Boolean)
    if (lines.length < 2) return VERIFIED_REVIEW_FALLBACK

    const headers = parseRow(lines[0]).map(h =>
      h.toLowerCase().replace(/\s+/g, '_')
    )

    const reviews = lines.slice(1).map(line => {
      const vals = parseRow(line)
      const row = Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']))
      return {
        name: row.name ?? '',
        role: row.role ?? '',
        quote: row.quote ?? '',
        rating: parseInt(row.rating ?? '5', 10) || 5,
      }
    }).filter(review => review.name && review.quote)

    return reviews.length > 0 ? reviews : VERIFIED_REVIEW_FALLBACK
  } catch (error) {
    console.warn('[reviews] using verified local fallback:', error)
    return VERIFIED_REVIEW_FALLBACK
  }
}
