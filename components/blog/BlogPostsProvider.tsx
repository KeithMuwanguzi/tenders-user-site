'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { BlogPost } from '@/lib/blogs'

type BlogPostsContextValue = {
  posts: BlogPost[]
  mergePost: (post: BlogPost) => void
}

const BlogPostsContext = createContext<BlogPostsContextValue>({
  posts: [],
  mergePost: () => {},
})

export function BlogPostsProvider({
  posts: initialPosts,
  children,
}: {
  posts: BlogPost[]
  children: ReactNode
}) {
  const [posts, setPosts] = useState(initialPosts)

  useEffect(() => {
    setPosts(initialPosts)
  }, [initialPosts])

  const mergePost = useCallback((post: BlogPost) => {
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.slug === post.slug)
      if (idx === -1) return [...prev, post]
      const next = [...prev]
      next[idx] = { ...next[idx], ...post }
      return next
    })
  }, [])

  const value = useMemo(() => ({ posts, mergePost }), [posts, mergePost])

  return <BlogPostsContext.Provider value={value}>{children}</BlogPostsContext.Provider>
}

export function useBlogPosts() {
  return useContext(BlogPostsContext)
}
