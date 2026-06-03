import type { Metadata } from 'next'
import BlogExperience from '@/components/blog/BlogExperience'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UK Care Tender Writing Blog and Insights | TenderLab',
  description:
    'Live tender analysis, bid writing strategy, and commissioning trends for UK health and social care providers. 92% win rate across 200+ submissions.',
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
    q: 'How often does the TenderLab blog publish?',
    a: 'We publish 2 to 3 posts per week across Live Tender Analysis and Sector Insights. Top-traffic posts are refreshed quarterly.',
  },
  {
    q: 'What is a Live Tender Analysis post?',
    a: 'A breakdown of a currently live UK public sector care tender: cohort, statutory context, scoring battlegrounds, and win-rate playbook from 200+ submissions.',
  },
  {
    q: 'Are these posts written by a human?',
    a: 'Yes. Every post is written by an evaluator-trained bid writer. AI assists research only; framing and references are human-verified.',
  },
  {
    q: 'Can I get email alerts when a new post goes live?',
    a: 'Yes. Subscribe from any post footer for monthly insights and subscriber-only briefings.',
  },
]

export default function BlogPage() {
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
      <BlogExperience faqs={FAQS} />
    </>
  )
}
