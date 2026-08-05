import Link from 'next/link'
import { categoryColor, type BlogPost } from '@/lib/blogs'

type Props = {
  related: BlogPost[]
  currentSlug: string
}

export default function BlogPostAside({ related, currentSlug }: Props) {
  const items = related.filter((p) => p.slug !== currentSlug).slice(0, 4)

  return (
    <aside className="blog-aside" aria-label="Related articles">
      <div className="blog-aside__block blog-aside__cta">
        <p className="blog-aside__label">Work with TenderLab</p>
        <h2 className="blog-aside__title">Turn your service evidence into a clear submission</h2>
        <p className="blog-aside__text">
          Specialist support for health and social care providers, with a 92% recorded historic win rate and more than 200 submissions supported.
        </p>
        <Link href="/contact" className="btn btn-primary btn-sm">
          Discuss your tender
        </Link>
      </div>

      {items.length > 0 && (
        <div className="blog-aside__block">
          <h3 className="blog-aside__heading">More insights</h3>
          <ul className="blog-aside__list">
            {items.map((post) => (
              <li key={post.slug} className="blog-aside__item">
                <Link href={`/blog/${post.slug}`} className="blog-aside__link">
                  <span
                    className="blog-aside__tag"
                    style={{ color: categoryColor(post.category) }}
                  >
                    {post.category}
                  </span>
                  <span className="blog-aside__item-title">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/blog" className="blog-aside__all">
            View all articles →
          </Link>
        </div>
      )}
    </aside>
  )
}
