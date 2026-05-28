import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchBlogs, categoryColor } from '@/lib/sheets'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

function renderMarkdown(md: string): string {
  if (!md) return ''
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let inList = false; let listType: 'ul' | 'ol' | null = null; let inPara = false
  const closeList = () => { if (inList) { out.push(listType === 'ol' ? '</ol>' : '</ul>'); inList = false; listType = null } }
  const closePara = () => { if (inPara) { out.push('</p>'); inPara = false } }
  const inline = (s: string) => {
    let t = esc(s)
    t = t.replace(/\([^-]+)]\(([^)]+)\)/g, (_m, txt, url) => { const safe = String(url).replace(/&amp;/g, '&').replace(/"/g, '%22'); return `<a href=\"${safe}\" rel=\"noopener\">${txt}</a>` })
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    t = t.replace(/(^|\s)\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>')
    return t
  }
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]; const l = raw.trim()
    if (!l) { closeList(); closePara(); continue }
    const h3 = l.match(/^\#\#\#\s\(.+)/)
    const h2 = l.match(/^\#\#\s\(.+)/)
    const h1 = l.match(/^\#\s(.+)/)
    if (h3) { closeList(); closePara(); out.push(`<h3>${inline(h3[1])}</h3>`); continue }
    if (h2) { closeList(); closePara(); out.push(`<h2>${inline(h2[1])}</h2>`); continue }
    if (h1) { closeList(); closePara(); out.push(`<h2>${inline(h1[1])}</h2>`); continue }
    if (/^[-*]\s[/.test(l)) { closePara(); if (!inList || listType !== 'ul') { closeList(); out.push('<ul>'); inList = true; listType = 'ul' } out.push(`<li>${inline(l.replace(/^[-*]\s[/, ''))}</li>`); continue }
    if (/^\d+\.\s+/.test(l)) { closePara(); if (!inList || listType !== 'ol') { closeList(); out.push('<ol>'); inList = true; listType = 'ol' } out.push(`<li>${inline(l.replace(/^\d+\.\s+/, ''))}</li>`); continue }
    if (/^>\s+/.test(l)) { closeList(); closePara(); out.push(`<blockquote>${inline(l.replace(/^>\s+/, ''))}</blockquote>`); continue }
    if (!inPara) { closeList(); out.push('<p>'); inPara = true } else { out.push(' ') }
    out.push(inline(l))
  }
  closeList(); closePara();
  return out.join('\n')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = await fetchBlogs()
  const post = posts.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found | TenderLab' }
  const pathname = `/blog/${slug}`
  return {
    title: `${post.title} | TenderLab`,
    description: post.excerpt,
    alternates: { canonical: pathname },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.tenderlab.co.uk${pathname}`,
      type: 'article',
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }

  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const posts = await fetchBlogs()
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const color = categoryColor(post.category)

  return (
    <main className="blog-post">
      <Script id={`ld-blog-${slug}-article`} type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `https://www.tenderlab.co.uk/blog/${slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.tenderlab.co.uk/blog/${slug}` },
        image: post.imageUrl ? [post.imageUrl] : undefined,
        author: { '@type': 'Organization', name: 'TenderLab', url: 'https://www.tenderlab.co.uk' },
        publisher: { '@id': 'https://www.tenderlab.co.uk/#organization' },
        articleSection: post.category,
        keywords: post.tags.join(', '),
        inLanguage: 'en-GB',
      }) }} />
      <Script id={`ld-blog-${slug}-breadcrumb`} type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tenderlab.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.tenderlab.co.uk/blog' },
          { '@type': 'ListItem', position: 3, name: post.category, item: `https://www.tenderlab.co.uk/blog/${slug}` },
        ],
      }) }} />


      {/* Hero */}
      <section className="blog-post__hero">
        <div className="container blog-post__hero-inner">
          <nav className="blog-post__crumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link>
            <span className="blog-post__crumb-sep">/</span>
            <span>{post.category}</span>
          </nav>
          <span className="blog-post__cat" style={{ background: color }}>
            {post.category}
          </span>
          <h1 className="blog-post__title">{post.title}</h1>
        </div>
      </section>

      {/* Featured image */}
      {post.imageUrl && (
        <div className="blog-post__img-section">
          <div className="container">
            <div className="blog-post__img-box">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1140px"
                className="blog-post__img"
                priority
              />
            </div>
            {post.imageCredit && (
              <p className="blog-post__img-credit">Image: {post.imageCredit}</p>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      <div className="blog-post__body-wrap">
        <div className="container">
          <div className="blog-post__body">

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="blog-post__tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-post__tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="blog-post__content">
              {post.body ? (\n            <div className="blog-post__body" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />\n          ) : (\n            <p className="blog-post__excerpt">{post.excerpt}</p>\n          )}
              <div className="blog-post__divider" />
              <p className="blog-post__note">
                For full analysis, specification breakdowns, and tender-specific insights, speak to TenderLab directly.
              </p>
            </div>

            {/* Actions */}
            <div className="blog-post__actions">
              <Link href="/contact" className="btn btn-primary">
                Book a Free Consultation
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                ← Back to Blog
              </Link>
            </div>

          </div>
        </div>
      </div>

    </main>
  )
}
