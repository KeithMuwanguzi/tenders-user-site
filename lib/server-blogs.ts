import { fetchBlogs, type BlogPost } from '@/lib/blogs'
import { isPortalApiAvailable } from '@/lib/portal-api'

export type BlogFetchResult =
  | { status: 'ok'; posts: BlogPost[] }
  | { status: 'unavailable'; posts: [] }

export async function fetchBlogsResult(): Promise<BlogFetchResult> {
  if (process.env.SKIP_BUILD_TIME_FETCH === 'true') {
    return { status: 'ok', posts: [] }
  }
  if (!isPortalApiAvailable()) return { status: 'unavailable', posts: [] }

  const posts = await fetchBlogs()
  return posts.length > 0
    ? { status: 'ok', posts }
    : { status: 'unavailable', posts: [] }
}
