import Link from 'next/link'
import { categoryColor, formatBlogDate, type BlogCardPost } from '@/lib/blogs'

type Props = {
  related: BlogCardPost[]
  currentSlug: string
}

export default function BlogPostAside({ related, currentSlug }: Props) {
  const items = related.filter((p) => p.slug !== currentSlug).slice(0, 4)

  return (
    <aside className="blog-aside" aria-label="Related articles">
      <div className="blog-aside__block blog-aside__cta">
        <p className="blog-aside__label">Work with TenderLab</p>
        <h2 className="blog-aside__title">Win your next care sector tender</h2>
        <p className="blog-aside__text">
          Evaluator-trained bid writers. 92% win rate across 200+ UK submissions.
        </p>
        <Link href="/contact" className="btn btn-primary btn-sm">
          Book a free consultation
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
