import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchBlogs, categoryColor } from '@/lib/sheets'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/* DEBUG VERSION
 * This file deliberately replaces <Image> with a plain <img> tag and wraps
 * each render stage in try/catch. If a stage throws, the page renders the
 * error message visibly so we can see what's actually crashing on production.
 * Revert to the standard recovery version once we identify the root cause.
 */

function renderMarkdownSafe(md: string): { html: string; error: string | null } {
  try {
    if (!md) return { html: '', error: null }
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const lines = md.replace(/\r\n/g, '\n').split('\n')
    const out: string[] = []
    let inList = false
    let listType: 'ul' | 'ol' | null = null
    let inPara = false
    const closeList = () => {
      if (inList) { out.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; listType = null }
    }
    const closePara = () => { if (inPara) { out.push('</p>'); inPara = false } }
    const inline = (s: string) => {
      let t = esc(s)
      t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, url) => {
        const safe = String(url).replace(/&amp;/g, '&').replace(/"/g, '%22')
        return `<a href="${safe}" rel="noopener">${txt}</a>`
      })
      t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      t = t.replace(/(^|\s)\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      t = t.replace(/`([^`]+)`/g, '<code>$1</code>')
      return t
    }
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim()
      if (!l) { closeList(); closePara(); continue }
      const h3 = l.match(/^###\s+(.+)/)
      const h2 = l.match(/^##\s+(.+)/)
      const h1 = l.match(/^#\s+(.+)/)
      if (h3) { closeList(); closePara(); out.push(`<h3>${inline(h3[1])}</h3>`); continue }
      if (h2) { closeList(); closePara(); out.push(`<h2>${inline(h2[1])}</h2>`); continue }
      if (h1) { closeList(); closePara(); out.push(`<h2>${inline(h1[1])}</h2>`); continue }
      if (/^[-*]\s+/.test(l)) {
        closePara()
        if (!inList || listType !== 'ul') { closeList(); out.push('<ul>'); inList = true; listType = 'ul' }
        out.push(`<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`); continue
      }
      if (/^\d+\.\s+/.test(l)) {
        closePara()
        if (!inList || listType !== 'ol') { closeList(); out.push('<ol>'); inList = true; listType = 'ol' }
        out.push(`<li>${inline(l.replace(/^\d+\.\s+/, ''))}</li>`); continue
      }
      if (/^>\s+/.test(l)) { closeList(); closePara(); out.push(`<blockquote>${inline(l.replace(/^>\s+/, ''))}</blockquote>`); continue }
      if (!inPara) { closeList(); out.push('<p>'); inPara = true } else { out.push(' ') }
      out.push(inline(l))
    }
    closeList(); closePara()
    return { html: out.join('\n'), error: null }
  } catch (e) {
    return { html: '', error: String((e as Error)?.stack ?? e) }
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const posts = await fetchBlogs()
    const post = posts.find((p) => p.slug === slug)
    if (!post) return { title: 'Post Not Found | TenderLab' }
    const pathname = `/blog/${slug}`
    return {
      title: `${post.title} | TenderLab`,
      description: post.excerpt,
      alternates: { canonical: pathname },
    }
  } catch (e) {
    return { title: 'TenderLab Blog (metadata error)' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  let stage = 'init'
  let debugInfo: Record<string, unknown> = {}
  try {
    stage = 'params'
    const { slug } = await params
    debugInfo.slug = slug

    stage = 'fetchBlogs'
    const posts = await fetchBlogs()
    debugInfo.postsCount = posts.length

    stage = 'findPost'
    const post = posts.find((p) => p.slug === slug)
    if (!post) notFound()
    debugInfo.postTitle = post!.title
    debugInfo.bodyLength = post!.body?.length ?? 0
    debugInfo.tagsCount = post!.tags?.length ?? 0
    debugInfo.hasImageUrl = !!post!.imageUrl

    stage = 'categoryColor'
    const color = categoryColor(post!.category)

    stage = 'renderMarkdown'
    const { html, error: mdError } = renderMarkdownSafe(post!.body || '')
    if (mdError) {
      return (
        <main style={{ padding: '40px 20px', fontFamily: 'monospace' }}>
          <h1>Markdown render error</h1>
          <p>Slug: {slug}</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fee', padding: '12px', border: '1px solid #c33' }}>{mdError}</pre>
        </main>
      )
    }

    stage = 'render'
    return (
      <main className="blog-post">
        <Script
          id={`ld-blog-${slug}-article`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post!.title,
              description: post!.excerpt,
              url: `https://www.tenderlab.co.uk/blog/${slug}`,
              inLanguage: 'en-GB',
            }),
          }}
        />

        <section className="blog-post__hero">
          <div className="container blog-post__hero-inner">
            <nav className="blog-post__crumb" aria-label="Breadcrumb">
              <Link href="/blog">Blog</Link>
              <span className="blog-post__crumb-sep">/</span>
              <span>{post!.category}</span>
            </nav>
            <span className="blog-post__cat" style={{ background: color }}>{post!.category}</span>
            <h1 className="blog-post__title">{post!.title}</h1>
          </div>
        </section>

        {post!.imageUrl && (
          <div className="blog-post__img-section">
            <div className="container">
              <div className="blog-post__img-box" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                {/* DEBUG: plain img tag to bypass next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post!.imageUrl}
                  alt={post!.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {post!.imageCredit && (
                <p className="blog-post__img-credit">Image: {post!.imageCredit}</p>
              )}
            </div>
          </div>
        )}

        <div className="blog-post__body-wrap">
          <div className="container">
            <div className="blog-post__body">
              {post!.tags.length > 0 && (
                <div className="blog-post__tags">
                  {post!.tags.map((tag) => (
                    <span key={tag} className="blog-post__tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="blog-post__content">
                {post!.body ? (
                  <div className="blog-post__body-md" dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <p className="blog-post__excerpt">{post!.excerpt}</p>
                )}
              </div>

              <div className="blog-post__actions">
                <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
                <Link href="/blog" className="btn btn-ghost">Back to Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  } catch (err) {
    const e = err as Error
    return (
      <main style={{ padding: '40px 20px', fontFamily: 'monospace', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: '#c33' }}>Server-side render error (debug build)</h1>
        <p><strong>Failed at stage:</strong> {stage}</p>
        <p><strong>Error message:</strong> {e?.message ?? String(err)}</p>
        <h3>Debug info collected before crash:</h3>
        <pre style={{ background: '#eee', padding: '12px', border: '1px solid #999', overflowX: 'auto' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
        <h3>Stack trace:</h3>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fee', padding: '12px', border: '1px solid #c33', overflowX: 'auto' }}>
          {e?.stack ?? 'no stack'}
        </pre>
        <p><Link href="/blog">← back to blog</Link></p>
      </main>
    )
  }
}
