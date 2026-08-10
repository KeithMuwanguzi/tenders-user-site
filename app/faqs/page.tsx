import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialPageHero from '@/components/EditorialPageHero'
import JsonLd from '@/components/JsonLd'
import styles from '@/app/EditorialPages.module.css'
import {
  breadcrumbSchema,
  defaultOpenGraph,
  defaultTwitter,
  faqSchema,
  webPageSchema,
} from '@/lib/seo'

const title = 'Tender Writing FAQs for Care Providers | TenderLab'
const description =
  'Answers about care tender writing, bid review, tender viability, fees, evidence, urgent deadlines, live tenders, results and working with TenderLab.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/faqs' },
  openGraph: defaultOpenGraph({
    title,
    description,
    path: '/faqs',
    image: '/images/editorial/tenderlab-faq-hero-v1.webp',
  }),
  twitter: defaultTwitter({ title, description, image: '/images/editorial/tenderlab-faq-hero-v1.webp' }),
}

const faqGroups = [
  {
    heading: 'Choosing the right tender support',
    introduction: 'Choose by the decision and work your organisation needs, not by a service name alone.',
    items: [
      {
        question: 'What is the difference between bid writing, tender viability and bid review?',
        answer: 'Bid writing supports the production of a tender response. Tender viability examines whether an opportunity fits the provider before substantial writing begins. Pre-submission review evaluates an existing draft against the published requirements and identifies the changes needed before submission.',
      },
      {
        question: 'Can TenderLab support a care provider bidding for the first time?',
        answer: 'Yes, when the timetable and available evidence support responsible work. A first-time bid begins with the same published conditions, operational facts and accountable people as any other submission. If material evidence is missing, the right first step may be readiness work rather than immediate drafting.',
      },
      {
        question: 'Which health and social care tenders does TenderLab cover?',
        answer: 'TenderLab supports UK health and social care procurement across domiciliary care, supported living, supported accommodation, children’s services, mental health, complex and community health, residential care and related services. The tender documents and provider evidence determine the exact scope.',
      },
      {
        question: 'Can TenderLab support an ongoing programme of tenders?',
        answer: 'Yes. Ongoing bid support can be scoped for organisations managing a procurement pipeline rather than one submission. Capacity, priorities, responsibilities, review points and response times must be agreed for the programme concerned.',
      },
      {
        question: 'Can you help after an unsuccessful tender?',
        answer: 'A lost-bid debrief can examine evaluator feedback, the submitted response and the procurement requirements to identify specific lessons. It should separate fixable response problems from factors such as eligibility, price or competition that writing alone could not change.',
      },
    ],
  },
  {
    heading: 'Scope, evidence and deadlines',
    introduction: 'A reliable scope depends on the real tender pack, the deadline and the people who hold the evidence.',
    items: [
      {
        question: 'What does TenderLab need from our organisation?',
        answer: 'The provider supplies the tender documents, operational facts, responsible people and records needed to support the response. TenderLab organises the requirements, develops the agreed content and identifies evidence gaps. The provider remains responsible for approving the accuracy of its commitments.',
      },
      {
        question: 'How long does care tender writing take?',
        answer: 'The timetable depends on the procurement, the number and complexity of responses, the closing date and how quickly the provider can supply and approve evidence. Share the tender pack and deadline at the first enquiry so TenderLab can determine whether a responsible programme is possible.',
      },
      {
        question: 'Can TenderLab work to an urgent tender deadline?',
        answer: 'Availability depends on the time remaining, the work required and the speed at which the provider can supply evidence and approve decisions. An urgent deadline may require a narrower scope, and TenderLab will not confirm work that cannot be delivered responsibly.',
      },
      {
        question: 'Will TenderLab invent examples or evidence if our records are incomplete?',
        answer: 'No. A persuasive sentence cannot replace a missing record, responsible owner or deliverable operating process. TenderLab can identify the gap and help express genuine evidence clearly, but the final submission must remain truthful.',
      },
      {
        question: 'Who is responsible for submitting the tender?',
        answer: 'Unless the written engagement says otherwise, the provider retains responsibility for final approval, portal access and submission. TenderLab can check the agreed response files and submission requirements, but the organisation must know who has authority to approve and upload.',
      },
    ],
  },
  {
    heading: 'Fees, confidentiality and working arrangements',
    introduction: 'The commercial and information-handling arrangements should be understood before the engagement begins.',
    items: [
      {
        question: 'How is the price for tender writing decided?',
        answer: 'Pricing is based on the confirmed scope, deadline, document set, number and complexity of responses, and the responsibilities agreed between TenderLab and the provider. The fee and scope are recorded in the engagement documents before work starts.',
      },
      {
        question: 'Can we ask for only part of the tender to be supported?',
        answer: 'Yes, when the division of responsibility is clear and does not undermine consistency across the submission. The scope should identify which questions, documents and review tasks TenderLab owns and how information will be shared between contributors.',
      },
      {
        question: 'How are tender documents shared?',
        answer: 'The website enquiry form accepts a summary rather than attachments. After the enquiry is reviewed, TenderLab can confirm the appropriate route for the documents needed to understand the procurement and define the scope.',
      },
      {
        question: 'How is confidential information handled?',
        answer: 'Information is handled for the agreed purpose and according to the relevant engagement and privacy arrangements. Do not place unnecessary sensitive personal data in the initial website form. The Privacy Policy explains how website and enquiry data is handled.',
      },
      {
        question: 'Does TenderLab guarantee that we will win the contract?',
        answer: 'No. The outcome depends on the provider, eligibility, evidence, delivery model, price, competition and the buyer’s evaluation. TenderLab can improve the quality and clarity of the submission, but recorded past performance does not guarantee the next award.',
      },
    ],
  },
  {
    heading: 'Live tenders, case studies and results',
    introduction: 'Search data and performance figures are useful when their source, definition and limits remain visible.',
    items: [
      {
        question: 'Where does the live tender information come from?',
        answer: 'TenderLab uses published UK public procurement data, including notices from Contracts Finder and Find a Tender. Always read the official source notice and procurement documents before making a bid decision because the official record controls the dates, requirements and status.',
      },
      {
        question: 'Can I search live care tenders by service, region or deadline?',
        answer: 'The live tenders page supports keyword and category filtering, with controls for official source, region, deadline and result order. Filters help narrow the feed, but the source notice and tender documents remain the authoritative record.',
      },
      {
        question: 'Does finding a relevant care tender mean we should bid?',
        answer: 'No. Relevance is only the first test. Participation conditions, evidence, delivery capacity, mobilisation, commercial exposure and the deadline all affect whether the opportunity deserves the organisation’s time.',
      },
      {
        question: 'What do the 92%, 200+, £50M+ and 5/5 figures mean?',
        answer: 'They are four separate TenderLab management measures: a 92% recorded historic win rate, more than 200 submissions supported, more than £50 million in combined contract value linked to successful supported submissions, and supported answers that have received 5/5 where a five-point scale was used. They describe past work and do not guarantee a future result.',
      },
      {
        question: 'What should I look for in a TenderLab case study?',
        answer: 'Look for the commissioning context, provider starting point, TenderLab’s stated contribution and the recorded outcome. Apply the lesson carefully because every specification, competitive field and provider evidence base is different.',
      },
    ],
  },
]

const faqItems = faqGroups.flatMap((group) => group.items)

export default function FaqsPage() {
  return (
    <main className={styles.page}>
      <JsonLd
        id="ld-faq-page"
        data={webPageSchema({
          name: title,
          description,
          path: '/faqs',
          about: 'Tender writing questions for UK care providers',
        })}
      />
      <JsonLd
        id="ld-faq-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tender writing FAQs', path: '/faqs' },
        ])}
      />
      <JsonLd id="ld-faq-questions" data={faqSchema(faqItems)} />

      <EditorialPageHero
        id="faqs-title"
        eyebrow="Tender writing questions for care providers"
        title="Clear answers before you commit to tender support."
        description="Understand which service fits, what your organisation must contribute, how scope and fees are agreed, where live tender data comes from and how TenderLab’s recorded results should be read."
        image="/images/editorial/tenderlab-faq-hero-v1.webp"
        imageAlt="A care provider director and tender specialist discussing questions beside procurement notes and evidence"
        caption="A useful first conversation begins with the actual procurement, the deadline and the decision your organisation needs to make."
        primaryAction={{ href: '#tender-writing-questions', label: 'Browse the questions' }}
        secondaryAction={{ href: '/contact?ref=faq-hero', label: 'Ask about your tender' }}
        tone="blue"
      />

      <section id="tender-writing-questions" className={`${styles.section} ${styles.sectionWhite}`} aria-label="Tender writing frequently asked questions">
        <div className={`${styles.container} ${styles.faqGroups}`}>
          {faqGroups.map((group) => (
            <section className={styles.faqGroup} key={group.heading}>
              <div>
                <p className={styles.label}>TenderLab answers</p>
                <h2>{group.heading}</h2>
                <p className={styles.faqGroupIntro}>{group.introduction}</p>
              </div>
              <div className={styles.faqList}>
                {group.items.map((item) => (
                  <details className={styles.faqItem} key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="faq-cta-title">
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div>
            <p className={styles.label}>Your procurement will have its own details</p>
            <h2 id="faq-cta-title">Ask the question against the tender in front of you.</h2>
          </div>
          <div className={styles.ctaBody}>
            <p>Include the care setting, commissioning authority and deadline when they are available. TenderLab can then consider the right service and the information needed to define it.</p>
            <div className={styles.ctaActions}>
              <Link className={styles.ctaPrimary} href="/contact?ref=faq-cta">Start your tender enquiry <span aria-hidden="true">↗</span></Link>
              <Link className={styles.ctaSecondary} href="/services">Compare services <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
