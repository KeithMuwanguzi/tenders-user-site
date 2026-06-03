'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blogs'
import { categoryColor, formatBlogDate } from '@/lib/blogs'
import { renderMarkdownSafe } from './renderMarkdown'
import BlogCard from './BlogCard'

type Props = {
  post: BlogPost
  posts: BlogPost[]
  bodyLoading?: boolean
  onBack: () => void
  onOpenPost: (slug: string) => void
  onPrefetchPost?: (slug: string) => void
}

export default function BlogDetailView({
  post,
  posts,
  bodyLoading = false,
  onBack,
  onOpenPost,
  onPrefetchPost,
}: Props) {
  const [progress, setProgress] = useState(0)
  const html = useMemo(() => renderMarkdownSafe(post.body || ''), [post.body])
  const color = categoryColor(post.category)
  const dateLabel = formatBlogDate(post.publishedAt)

  const related = useMemo(
    () =>
      posts
        .filter((p) => p.slug !== post.slug)
        .sort((a, b) => {
          if (a.category === post.category && b.category !== post.category) return -1
          if (b.category === post.category && a.category !== post.category) return 1
          return 0
        })
        .slice(0, 3),
    [posts, post.slug, post.category],
  )

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [post.slug])

  return (
    <article className="blog-v2-article">
      <div
        className="blog-v2-article__progress"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      <header className="blog-v2-article__hero">
        {post.imageUrl && (
          <div className="blog-v2-article__hero-media">
            <Image
              src={post.imageUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="blog-v2-article__hero-img"
            />
            <div className="blog-v2-article__hero-gradient" aria-hidden />
          </div>
        )}

        <div className="container blog-v2-article__hero-content">
          <button type="button" className="blog-v2-article__back" onClick={onBack}>
            <span aria-hidden>←</span> All articles
          </button>

          <div className="blog-v2-article__hero-text">
            <div className="blog-v2-article__meta">
              <span className="blog-v2-article__cat" style={{ background: color }}>
                {post.category}
              </span>
              {dateLabel && <time dateTime={post.publishedAt ?? undefined}>{dateLabel}</time>}
            </div>
            <h1 className="blog-v2-article__title">{post.title}</h1>
            {post.excerpt && <p className="blog-v2-article__lead">{post.excerpt}</p>}
          </div>
        </div>

        {post.imageCredit && (
          <p className="blog-v2-article__credit container">Image: {post.imageCredit}</p>
        )}
      </header>

      <div className="blog-v2-article__layout container">
        <div className="blog-v2-article__main">
          {post.tags.length > 0 && (
            <ul className="blog-v2-article__tags" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          <div className="blog-v2-article__prose">
            {bodyLoading ? (
              <div className="blog-v2-article__prose-loading" aria-busy="true" aria-label="Loading article">
                <div className="blog-v2-detail-loading__line blog-v2-detail-loading__line--lg" />
                <div className="blog-v2-detail-loading__line" />
                <div className="blog-v2-detail-loading__line" />
                <div className="blog-v2-detail-loading__line blog-v2-detail-loading__line--short" />
              </div>
            ) : post.body ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>

          <footer className="blog-v2-article__footer">
            <Link href="/contact" className="btn btn-primary">
              Book a free consultation
            </Link>
            <button type="button" className="btn btn-ghost" onClick={onBack}>
              Back to all articles
            </button>
          </footer>
        </div>

        <aside className="blog-v2-article__rail" aria-label="Sidebar">
          <div className="blog-v2-rail-card blog-v2-rail-card--cta">
            <p className="blog-v2-rail-card__label">TenderLab</p>
            <h2>Win more UK care tenders</h2>
            <p>Evaluator-trained bid writers. Specification mirroring, pre-submission review, full bid builds.</p>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get started
            </Link>
          </div>

          {related.length > 0 && (
            <div className="blog-v2-rail-card">
              <h3>Continue reading</h3>
              <ul className="blog-v2-rail-list">
                {related.map((r) => (
                  <li key={r.slug}>
                    <button type="button" onClick={() => onOpenPost(r.slug)}>
                      <span
                        className="blog-v2-rail-list__cat"
                        style={{ color: categoryColor(r.category) }}
                      >
                        {r.category}
                      </span>
                      <span className="blog-v2-rail-list__title">{r.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="blog-v2-related">
          <div className="container">
            <div className="blog-v2-related__head">
              <h2>Related insights</h2>
              <button type="button" className="blog-v2-related__all" onClick={onBack}>
                View all
              </button>
            </div>
            <div className="blog-v2-related__grid">
              {related.map((r) => (
                <BlogCard
                  key={r.slug}
                  post={r}
                  dateLabel={formatBlogDate(r.publishedAt)}
                  onOpen={onOpenPost}
                  onPrefetch={onPrefetchPost}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
