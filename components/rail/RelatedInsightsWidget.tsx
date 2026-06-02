import Link from 'next/link'
import { fetchBlogs, categoryColor, type BlogPost } from '@/lib/sheets'

type Props = {
  /** Optional tag filter to surface cohort-relevant posts first. */
  tagFilter?: string
  /** Maximum cards to show. Default 3. */
  limit?: number
  /** Slug to exclude (e.g. the current page). */
  excludeSlug?: string
  /** Optional widget title override. */
  title?: string
}

export default async function RelatedInsightsWidget({
  tagFilter,
  limit = 3,
  excludeSlug,
  title = 'Related insights',
}: Props) {
  let posts: BlogPost[] = []
  try {
    posts = await fetchBlogs()
  } catch {
    return null
  }

  const filtered = posts
    .filter(p => p.slug && p.slug !== excludeSlug)
    .filter(p => {
      if (!tagFilter) return true
      const hay = [...p.tags, p.category, p.title]
        .join(' ')
        .toLowerCase()
      return hay.includes(tagFilter.toLowerCase())
    })

  const final = filtered.length >= limit ? filtered : [
    ...filtered,
    ...posts.filter(p => p.slug !== excludeSlug && !filtered.includes(p)),
  ]

  const cards = final.slice(0, limit)
  if (!cards.length) return null

  return (
    <div className="he-widget">
      <div className="he-widget__head">
        <span className="he-widget__dot" />
        <h3>{title}</h3>
      </div>
      <div className="he-widget__body">
        {cards.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="he-blog-item">
            <div
              className="he-blog-item__thumb"
              style={{
                background: categoryColor(p.category),
                backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="he-blog-item__text">
              <div
                className="he-blog-item__tag"
                style={{ color: categoryColor(p.category) }}
              >
                {p.category}
              </div>
              <div className="he-blog-item__ttl">{p.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
