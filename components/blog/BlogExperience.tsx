'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { BlogPost, BlogPostFromApi } from '@/lib/blogs'
import { useBlogPosts } from './BlogPostsProvider'
import BlogListingView from './BlogListingView'
import BlogDetailView from './BlogDetailView'

const SITE_TITLE = 'TenderLab'

type Faq = { q: string; a: string }

function slugFromPathname(pathname: string): string | null {
  if (!pathname.startsWith('/blog/')) return null
  const rest = pathname.slice('/blog/'.length).replace(/\/$/, '')
  return rest ? decodeURIComponent(rest) : null
}

function setDocumentTitle(post: BlogPost | null) {
  if (typeof document === 'undefined') return
  document.title = post ? `${post.title} | ${SITE_TITLE}` : `UK Care Tender Writing Blog | ${SITE_TITLE}`
}

function mapApiPost(row: BlogPostFromApi): BlogPost {
  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    tags: row.tags ?? [],
    excerpt: row.excerpt,
    body: row.body,
    imageUrl: row.imageUrl ?? '',
    imageSource: row.imageSource ?? '',
    imageCredit: row.imageCredit ?? '',
    publishedAt: row.publishedAt ?? null,
  }
}

type Props = {
  initialPost?: BlogPost | null
  faqs?: Faq[]
}

export default function BlogExperience({ initialPost = null, faqs = [] }: Props) {
  const { posts, mergePost } = useBlogPosts()
  const pathname = usePathname()
  const router = useRouter()
  const activeSlug = slugFromPathname(pathname)
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)

  useEffect(() => {
    if (initialPost?.slug && initialPost.body?.trim()) {
      mergePost(initialPost)
    }
  }, [initialPost, mergePost])

  const activePost = useMemo(() => {
    if (!activeSlug) return null
    const fromList = posts.find((p) => p.slug === activeSlug)
    if (fromList?.body?.trim()) return fromList
    if (initialPost?.slug === activeSlug && initialPost.body?.trim()) return initialPost
    return fromList ?? (initialPost?.slug === activeSlug ? initialPost : null)
  }, [activeSlug, posts, initialPost])

  useEffect(() => {
    if (!activeSlug) {
      setDocumentTitle(null)
      return
    }
    setDocumentTitle(activePost)
  }, [activeSlug, activePost])

  useEffect(() => {
    if (!activeSlug) return
    const existing = posts.find((p) => p.slug === activeSlug)
    if (existing?.body?.trim()) return
    if (initialPost?.slug === activeSlug && initialPost.body?.trim()) return

    let cancelled = false
    setLoadingSlug(activeSlug)

    fetch(`/api/blogs/${encodeURIComponent(activeSlug)}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: BlogPostFromApi | null) => {
        if (cancelled || !data?.body?.trim()) return
        mergePost(mapApiPost(data))
      })
      .finally(() => {
        if (!cancelled) setLoadingSlug(null)
      })

    return () => {
      cancelled = true
    }
  }, [activeSlug, posts, initialPost, mergePost])

  const openPost = useCallback(
    (slug: string) => {
      if (!posts.some((p) => p.slug === slug)) return
      router.push(`/blog/${slug}`, { scroll: false })
      window.scrollTo({ top: 0, behavior: 'auto' })
    },
    [posts, router],
  )

  const closePost = useCallback(() => {
    router.push('/blog', { scroll: false })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [router])

  const isDetail = Boolean(activeSlug)
  const isLoadingDetail =
    Boolean(activeSlug) && (!activePost?.body?.trim() || loadingSlug === activeSlug)

  return (
    <main className={`blog-v2${isDetail ? ' blog-v2--detail' : ' blog-v2--list'}`}>
      <div className="blog-v2__stage" aria-live="polite">
        <section
          className="blog-v2__view blog-v2__view--list"
          hidden={isDetail}
          aria-hidden={isDetail}
        >
          <BlogListingView posts={posts} faqs={faqs} onOpenPost={openPost} />
        </section>

        <section
          className="blog-v2__view blog-v2__view--detail"
          hidden={!isDetail}
          aria-hidden={!isDetail}
        >
          {isLoadingDetail && (
            <div className="blog-v2-detail-loading" aria-busy="true" aria-label="Loading article">
              <div className="blog-v2-detail-loading__bar" />
              <div className="blog-v2-detail-loading__line blog-v2-detail-loading__line--lg" />
              <div className="blog-v2-detail-loading__line" />
              <div className="blog-v2-detail-loading__line" />
              <div className="blog-v2-detail-loading__line blog-v2-detail-loading__line--short" />
            </div>
          )}
          {activePost && !isLoadingDetail && (
            <BlogDetailView
              key={activePost.slug}
              post={activePost}
              posts={posts}
              onBack={closePost}
              onOpenPost={openPost}
            />
          )}
        </section>
      </div>
    </main>
  )
}
