import { fetchBlogs } from '@/lib/blogs'
import { BlogPostsProvider } from '@/components/blog/BlogPostsProvider'

export const dynamic = 'force-dynamic'

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = await fetchBlogs()
  return <BlogPostsProvider posts={posts}>{children}</BlogPostsProvider>
}
