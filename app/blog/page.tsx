import type { Metadata } from 'next'
import BlogListingView from '@/components/blog/BlogListingView'
import EditorialHero from '@/components/EditorialHero'
import { fetchBlogs } from '@/lib/blogs'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UK Care Tender Writing Insights and Procurement Analysis | TenderLab',
  description:
    'Practical analysis of UK health and social care tenders, commissioner requirements, operational evidence, bid writing and public procurement for care providers.',
  alternates: { canonical: 'https://www.tenderlab.co.uk/blog' },
  openGraph: {
    title: 'UK Care Tender Writing Blog and Insights | TenderLab',
    description:
      'Live tender analysis, bid writing strategy, and commissioning trends for UK health and social care providers.',
    url: 'https://www.tenderlab.co.uk/blog',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'What does TenderLab cover in these articles?',
    a: 'The library covers live procurement notices, participation conditions, health and social care commissioning, bid writing, operational evidence, mobilisation, pricing and the questions care-provider leaders face before deciding whether to bid.',
  },
  {
    q: 'Can I use an article as the answer to a tender question?',
    a: 'No. An article can help your team understand the issue, but the buyer documents, specification, question wording and scoring descriptors must control the response to a live procurement.',
  },
  {
    q: 'How should I check whether guidance is still current?',
    a: 'Start with the publication date, then check the official procurement notice, buyer documents and any current legislation or regulator guidance linked in the article. The official source remains authoritative.',
  },
  {
    q: 'Can TenderLab review a specific opportunity with us?',
    a: 'Yes. Send the opportunity link or buyer documents through the contact page. We will first examine the mandatory requirements, service scope, evidence, mobilisation and commercial position before discussing full tender-writing support.',
  },
]

export default async function BlogPage() {
  const posts = await fetchBlogs()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': 'https://www.tenderlab.co.uk/blog#blog',
            name: 'TenderLab Blog: UK Care Tender Writing Insights',
            url: 'https://www.tenderlab.co.uk/blog',
            publisher: { '@id': 'https://www.tenderlab.co.uk/#organization' },
          }),
        }}
      />
      <main className="blog-v2 blog-v2--list">
        <EditorialHero
          eyebrow="Tender advice for care providers"
          title="Care tender analysis built around the decision in front of you."
          intro="Find suitable opportunities, test whether they fit, gather evidence and build responses that evaluators can follow and score."
          image="/images/editorial/tenderlab-blog-hero-v1.webp"
          imageAlt="An editor connecting operational care evidence to clear tender guidance"
          primaryLabel="Browse the analysis"
          primaryHref="#blog-library"
          secondaryLabel="Book a consultation"
          secondaryHref="/book-consultation"
        />
        <div id="blog-library">
        <BlogListingView posts={posts} faqs={FAQS} />
        </div>
      </main>
    </>
  )
}
