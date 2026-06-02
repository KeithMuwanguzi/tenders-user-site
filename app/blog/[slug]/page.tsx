import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchBlogs, categoryColor } from '@/lib/sheets'
import Script from 'next/script'
import HybridE from '@/components/HybridE'
import { type TOCItem } from '@/components/TOC'
import RelatedInsightsWidget from '@/components/rail/RelatedInsightsWidget'
import RelatedCaseStudyWidget from '@/components/rail/RelatedCaseStudyWidget'
import ConsultationCTA from '@/components/rail/ConsultationCTA'
import NewsletterWidget from '@/components/rail/NewsletterWidget'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

/**
 * Extracts H2 headings from rendered markdown so we can build the TOC
 * AND inject anchor ids so the TOC links can scroll to them.
 */
function extractTOCAndAnchorize(html: string): { html: string; toc: TOCItem[] } {
  const toc: TOCItem[] = []
  let counter = 0
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner) => {
    counter += 1
    const num = String(counter).padStart(2, '0')
    const anchor = `sec-${num}`
    const label = String(inner).replace(/<[^>]+>/g, '').trim()
    toc.push({ label, num, anchor })
    return `<h2 id="${anchor}" class="he-section__title">${inner}</h2>`
  })
  return { html: out, toc }
}

function renderMarkdown(md: string): string {
  if (!md) return ''
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | null = null
  let inPara = false
  const closeList = () => {
    if (inList) {
      out.push(listType === 'ol' ? '</ol>' : '</ul>')
      inList = false; listType = null
    }
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
    const raw = lines[i]
    const l = raw.trim()
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
  return out.join('\n')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = await fetchBlogs()
  const post = posts.find((p) => p.slug === slug)
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const posts = await fetchBlogs()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const color = categoryColor(post.category)
  const rawHtml = renderMarkdown(post.body || '')
  const { html, toc } = extractTOCAndAnchorize(rawHtml)
  const cohort = post.tags[0] || post.category

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
          }),
        }}
      />
      <Script
        id={`ld-blog-${slug}-breadcrumb`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tenderlab.co.uk' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.tenderlab.co.uk/blog' },
              { '@type': 'ListItem', position: 3, name: post.category, item: `https://www.tenderlab.co.uk/blog/${slug}` },
            ],
          }),
        }}
      />

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

      <HybridE
        tocItems={toc}
        rail={
          <div className="he-rail">
            <RelatedInsightsWidget tagFilter={cohort} excludeSlug={slug} />
            <RelatedCaseStudyWidget cohort={cohort} />
            <ConsultationCTA ref={`blog-${slug}`} />
            <NewsletterWidget />
          </div>
        }
      >
        {post.tags.length > 0 && (
          <div className="blog-post__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post__tag">{tag}</span>
            ))}
          </div>
        )}
        {post.body ? (
          <div
            className="blog-post__body-md he-section__body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="blog-post__excerpt">{post.excerpt}</p>
        )}
        <div className="blog-post__actions">
          <Link href="/contact" className="btn btn-primary">
            Book a Free Consultation
          </Link>
          <Link href="/blog" className="btn btn-ghost">
            Back to Blog
          </Link>
        </div>
      </HybridE>
    </main>
  )
}
