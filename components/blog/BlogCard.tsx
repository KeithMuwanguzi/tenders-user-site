'use client'

import Image from 'next/image'
import Link from 'next/link'
import { categoryColor, estimateReadMinutes } from '@/lib/blogs'
import type { BlogPost } from '@/lib/blogs'

type Props = {
  post: Pick<BlogPost, 'slug' | 'title' | 'category' | 'excerpt' | 'imageUrl' | 'body'>
  variant?: 'default' | 'featured'
  dateLabel?: string
}

export default function BlogCard({
  post,
  variant = 'default',
  dateLabel,
}: Props) {
  const featured = variant === 'featured'
  const readMinutes = estimateReadMinutes(post.body)

  return (
    <article className={`blog-v2-card blog-v2-card--${variant}`}>
      <Link
        href={`/blog/${post.slug}`}
        scroll
        className="blog-v2-card__hit"
        aria-label={`Read: ${post.title}`}
      >
        {post.imageUrl ? (
          <div className="blog-v2-card__media">
            <Image
              src={post.imageUrl}
              alt=""
              fill
              sizes={
                featured
                  ? '(max-width: 1024px) 100vw, 55vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
              className="blog-v2-card__img"
            />
            <span className="blog-v2-card__media-shade" aria-hidden />
          </div>
        ) : (
          <div className="blog-v2-card__media blog-v2-card__media--placeholder" aria-hidden />
        )}

        <div className="blog-v2-card__body">
          <div className="blog-v2-card__meta">
            <span
              className="blog-v2-card__cat"
              style={{ background: categoryColor(post.category) }}
            >
              {post.category}
            </span>
            {dateLabel && <time className="blog-v2-card__date">{dateLabel}</time>}
            <span className="blog-v2-card__read-time">{readMinutes} min read</span>
          </div>
          <h2 className="blog-v2-card__title">{post.title}</h2>
          {post.excerpt && <p className="blog-v2-card__excerpt">{post.excerpt}</p>}
          <span className="blog-v2-card__cta">
            Read article
            <span className="blog-v2-card__cta-arrow" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}
