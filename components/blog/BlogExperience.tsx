'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

async function fetchPostBody(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = (await res.json()) as BlogPostFromApi
  if (!data?.body?.trim()) return null
  return mapApiPost(data)
}

type Props = {
  initialPost?: BlogPost | null
  faqs?: Faq[]
}

export default function BlogExperience({ initialPost = null, faqs = [] }: Props) {
  const { posts, mergePost } = useBlogPosts()
  const pathname = usePathname()
  const router = useRouter()
  const [viewSlug, setViewSlug] = useState<string | null>(() => slugFromPathname(pathname))
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)
  const prefetchingRef = useRef(new Set<string>())
  const loadingBodiesRef = useRef(new Set<string>())

  useEffect(() => {
    if (initialPost?.slug && initialPost.body?.trim()) {
      mergePost(initialPost)
    }
  }, [initialPost, mergePost])

  // Keep in sync when Next.js actually navigates (e.g. direct link to /blog/slug)
  useEffect(() => {
    const routeSlug = slugFromPathname(pathname)
    const urlSlug =
      typeof window !== 'undefined' ? slugFromPathname(window.location.pathname) : null
    if (routeSlug && routeSlug === urlSlug) {
      setViewSlug(routeSlug)
    }
  }, [pathname])

  const activePost = useMemo(() => {
    if (!viewSlug) return null
    const fromList = posts.find((p) => p.slug === viewSlug)
    if (fromList) return fromList
    if (initialPost?.slug === viewSlug) return initialPost
    return null
  }, [viewSlug, posts, initialPost])

  useEffect(() => {
    if (!viewSlug) {
      setDocumentTitle(null)
      return
    }
    setDocumentTitle(activePost)
  }, [viewSlug, activePost])

  const loadFullPost = useCallback(
    async (slug: string) => {
      const existing = posts.find((p) => p.slug === slug)
      if (existing?.body?.trim()) return
      if (initialPost?.slug === slug && initialPost.body?.trim()) return
      if (loadingBodiesRef.current.has(slug)) return

      loadingBodiesRef.current.add(slug)
      setLoadingSlug(slug)
      try {
        const full = await fetchPostBody(slug)
        if (full) mergePost(full)
      } finally {
        loadingBodiesRef.current.delete(slug)
        setLoadingSlug((current) => (current === slug ? null : current))
      }
    },
    [posts, initialPost, mergePost],
  )

  useEffect(() => {
    if (!viewSlug) return
    loadFullPost(viewSlug)
  }, [viewSlug, loadFullPost])

  const prefetchPost = useCallback(
    (slug: string) => {
      router.prefetch(`/blog/${slug}`)
      if (prefetchingRef.current.has(slug)) return
      const existing = posts.find((p) => p.slug === slug)
      if (existing?.body?.trim()) return
      prefetchingRef.current.add(slug)
      fetchPostBody(slug)
        .then((full) => {
          if (full) mergePost(full)
        })
        .finally(() => {
          prefetchingRef.current.delete(slug)
        })
    },
    [posts, mergePost, router],
  )

  const openPost = useCallback(
    (slug: string) => {
      const post = posts.find((p) => p.slug === slug)
      if (!post) return
      setViewSlug(slug)
      setDocumentTitle(post)
      window.history.pushState({ blogSlug: slug }, '', `/blog/${slug}`)
      if (!post.body?.trim()) {
        loadFullPost(slug)
      }
    },
    [posts, loadFullPost],
  )

  const closePost = useCallback(() => {
    setViewSlug(null)
    setDocumentTitle(null)
    window.history.pushState({ blogSlug: null }, '', '/blog')
  }, [])

  useEffect(() => {
    const onPopState = () => {
      const slug = slugFromPathname(window.location.pathname)
      setViewSlug(slug)
      const post = slug ? (posts.find((p) => p.slug === slug) ?? null) : null
      setDocumentTitle(post)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [posts])

  const isDetail = Boolean(viewSlug)
  const bodyLoading = Boolean(
    viewSlug && activePost && !activePost.body?.trim() && loadingSlug === viewSlug,
  )

  return (
    <main className={`blog-v2${isDetail ? ' blog-v2--detail' : ' blog-v2--list'}`}>
      <div className="blog-v2__stage" aria-live="polite">
        <section
          className="blog-v2__view blog-v2__view--list"
          hidden={isDetail}
          aria-hidden={isDetail}
        >
          <BlogListingView
            posts={posts}
            faqs={faqs}
            onOpenPost={openPost}
            onPrefetchPost={prefetchPost}
          />
        </section>

        <section
          className="blog-v2__view blog-v2__view--detail"
          hidden={!isDetail}
          aria-hidden={!isDetail}
        >
          {activePost && (
            <BlogDetailView
              key={activePost.slug}
              post={activePost}
              posts={posts}
              bodyLoading={bodyLoading}
              onBack={closePost}
              onOpenPost={openPost}
              onPrefetchPost={prefetchPost}
            />
          )}
        </section>
      </div>
    </main>
  )
}
