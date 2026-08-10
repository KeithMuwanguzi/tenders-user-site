'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blogs'
import { categoryColor, contextualBlogImage, estimateReadMinutes, formatBlogDate } from '@/lib/blogs'
import { renderMarkdownSafe } from './renderMarkdown'
import BlogCard from './BlogCard'

type Props = {
  post: BlogPost
  posts: BlogPost[]
}

export default function BlogDetailView({ post, posts }: Props) {
  const [progress, setProgress] = useState(0)
  const html = useMemo(() => renderMarkdownSafe(post.body || ''), [post.body])
  const color = categoryColor(post.category)
  const dateLabel = formatBlogDate(post.publishedAt)
  const readMinutes = estimateReadMinutes(post.body)
  const topicText = `${post.title} ${post.category} ${post.tags.join(' ')}`.toLowerCase()
  const fallbackImage = contextualBlogImage(post)
  const tenderHub = topicText.includes('domiciliary') || topicText.includes('home care')
    ? { href: '/tenders/domiciliary-care', label: 'Domiciliary care tenders' }
    : topicText.includes('supported living') || topicText.includes('supported accommodation')
      ? { href: '/tenders/supported-living', label: 'Supported living tenders' }
      : topicText.includes('mental health')
        ? { href: '/tenders/mental-health', label: 'Mental health tenders' }
        : topicText.includes('complex care') || topicText.includes('chc')
          ? { href: '/tenders/complex-care-chc', label: 'Complex care and CHC tenders' }
          : topicText.includes('residential') || topicText.includes('nursing')
            ? { href: '/tenders/residential-nursing-care', label: 'Residential and nursing tenders' }
            : topicText.includes('children') || topicText.includes('young people')
              ? { href: '/tenders/children-young-people', label: "Children's services tenders" }
              : { href: '/tenders', label: 'All live care tenders' }

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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [post.slug])

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
        <div className="container blog-v2-article__hero-content">
          <Link href="/blog" className="blog-v2-article__back">
            <span aria-hidden>←</span> All articles
          </Link>

          <div className="blog-v2-article__hero-grid">
            <div className="blog-v2-article__hero-text">
              <div className="blog-v2-article__meta">
                <span className="blog-v2-article__cat" style={{ background: color }}>
                  {post.category}
                </span>
                {dateLabel && <time dateTime={post.publishedAt ?? undefined}>{dateLabel}</time>}
                <span>{readMinutes} min read</span>
              </div>
              <h1 className="blog-v2-article__title">{post.title}</h1>
            </div>

            <figure className="blog-v2-article__hero-media">
              <Image
                src={post.imageUrl || fallbackImage}
                alt={`Editorial image for ${post.title}`}
                fill
                priority
                quality={88}
                sizes="(max-width: 900px) 100vw, 48vw"
                className="blog-v2-article__hero-img"
              />
              {post.imageCredit && (
                <figcaption className="blog-v2-article__credit">Image: {post.imageCredit}</figcaption>
              )}
            </figure>

            <div className="blog-v2-article__hero-support">
              {post.excerpt && <p className="blog-v2-article__lead">{post.excerpt}</p>}
              <p className="blog-v2-article__byline">
                Published by the TenderLab editorial team. Tender guidance is checked against the source material
                available on the publication date.
              </p>
            </div>
          </div>
        </div>
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
            {post.body ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>

          <footer className="blog-v2-article__footer">
            <div className="blog-v2-article__editorial-note">
              <strong>Use the official documents for a live procurement.</strong>
              <p>
                This article provides general tender guidance. Requirements, dates and contract
                terms must be checked against the buyer&apos;s current notice and tender pack.
              </p>
            </div>
            <Link href="/contact#enquiry" className="btn btn-primary">
              Discuss a live tender
            </Link>
            <Link href="/blog" className="btn btn-ghost" scroll>
              Back to all articles
            </Link>
          </footer>
        </div>

        <aside className="blog-v2-article__rail" aria-label="Sidebar">
          <div className="blog-v2-rail-card blog-v2-rail-card--cta">
            <p className="blog-v2-rail-card__label">Next useful step</p>
            <h2>Apply the guidance to the opportunity in front of you.</h2>
            <p>Compare the tender requirements with your evidence, delivery model, mobilisation and commercial position.</p>
            <Link href="/services" className="btn btn-primary btn-sm">
              Compare support options
            </Link>
            <Link href={tenderHub.href} className="blog-v2-rail-card__secondary-link">
              Browse {tenderHub.label.toLowerCase()}
            </Link>
          </div>

          {related.length > 0 && (
            <div className="blog-v2-rail-card">
              <h3>Continue reading</h3>
              <ul className="blog-v2-rail-list">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} scroll>
                      <span
                        className="blog-v2-rail-list__cat"
                        style={{ color: categoryColor(r.category) }}
                      >
                        {r.category}
                      </span>
                      <span className="blog-v2-rail-list__title">{r.title}</span>
                    </Link>
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
              <Link href="/blog" className="blog-v2-related__all">
                View all
              </Link>
            </div>
            <div className="blog-v2-related__grid">
              {related.map((r) => (
                <BlogCard
                  key={r.slug}
                  post={r}
                  dateLabel={formatBlogDate(r.publishedAt)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
