/** Blog posts are served from the Portal API — see `lib/blogs.ts`. */
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

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch(REVIEWS_SHEET_URL, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Reviews sheet fetch failed: ${res.status}`)
  const text = await res.text()
  const lines = text.trim().split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return []

  const headers = parseRow(lines[0]).map(h =>
    h.toLowerCase().replace(/\s+/g, '_')
  )

  return lines.slice(1).map(line => {
    const vals = parseRow(line)
    const row = Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']))
    return {
      name: row.name ?? '',
      role: row.role ?? '',
      quote: row.quote ?? '',
      rating: parseInt(row.rating ?? '5', 10) || 5,
    }
  })
}

