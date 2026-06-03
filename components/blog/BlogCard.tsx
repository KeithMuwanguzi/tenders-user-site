import Link from 'next/link'
import Image from 'next/image'
import { categoryColor } from '@/lib/blogs'

export type BlogCardPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  imageUrl: string
}

type Props = {
  post: BlogCardPost
  variant?: 'default' | 'featured'
  dateLabel?: string
}

export default function BlogCard({ post, variant = 'default', dateLabel }: Props) {
  const featured = variant === 'featured'

  return (
    <article className={`blog-card blog-card--${variant}`}>
      {post.imageUrl && (
        <Link
          href={`/blog/${post.slug}`}
          className="blog-card__img-link"
          tabIndex={featured ? 0 : -1}
          aria-hidden={!featured}
        >
          <div className="blog-card__img-wrap">
            <Image
              src={post.imageUrl}
              alt=""
              fill
              sizes={featured ? '(max-width: 1024px) 100vw, 55vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              className="blog-card__img"
            />
          </div>
        </Link>
      )}
      <div className="blog-card__body">
        <div className="blog-card__meta-row">
          <span
            className="blog-card__cat"
            style={{ background: categoryColor(post.category) }}
          >
            {post.category}
          </span>
          {dateLabel && <time className="blog-card__date">{dateLabel}</time>}
        </div>
        <h2 className="blog-card__title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
        <Link href={`/blog/${post.slug}`} className="blog-card__cta">
          Read article →
        </Link>
      </div>
    </article>
  )
}
