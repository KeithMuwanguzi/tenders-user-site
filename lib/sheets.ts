const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1Ekf1lzSYNA5EB2ey3tO0MDxHvJ5AvVwDET1siLKF0lA/export?format=csv&gid=1759760324'

export type BlogPost = {
  title: string
  slug: string
  category: string
  tags: string[]
  excerpt: string
  imageUrl: string
  imageSource: string
  imageCredit: string
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

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

export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await fetch(SHEET_URL, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
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
      title: row.title ?? '',
      slug: slugify(row.title ?? ''),
      category: row.category ?? '',
      tags: (row.tags ?? '').split(',').map((t: string) => t.trim()).filter(Boolean),
      excerpt: row.excerpt ?? '',
      imageUrl: row.image_url ?? '',
      imageSource: row.image_source ?? '',
      imageCredit: row.image_credit ?? '',
    }
  })
}

export function categoryColor(cat: string): string {
  switch (cat) {
    case 'Live Tender Analysis': return '#D4382C'
    case 'Bid Strategy':         return '#2E5E8C'
    case 'Commissioning Trends': return '#0A6E5A'
    default:                     return '#3B5068'
  }
}
