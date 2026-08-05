import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialPageHero from '@/components/EditorialPageHero'
import JsonLd from '@/components/JsonLd'
import styles from '@/app/EditorialPages.module.css'
import {
  BRAND,
  breadcrumbSchema,
  defaultOpenGraph,
  defaultTwitter,
  faqSchema,
  webPageSchema,
} from '@/lib/seo'

const title = 'Tender Writing Results and Proof | TenderLab'
const description =
  'Understand TenderLab’s 92% recorded win rate, 200+ supported submissions, £50M+ combined contract value and 5/5 question scores, with definitions and limits.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/proof' },
  openGraph: defaultOpenGraph({
    title,
    description,
    path: '/proof',
    image: '/images/editorial/tenderlab-proof-hero-v1.png',
  }),
  twitter: defaultTwitter({ title, description, image: '/images/editorial/tenderlab-proof-hero-v1.png' }),
}

const claims = [
  {
    value: BRAND.winRate,
    title: 'Recorded historic win rate',
    explanation:
      'TenderLab’s confirmed historic management figure for supported submissions. It is reported separately from the 200+ submission count and is not a forecast or guarantee.',
  },
  {
    value: BRAND.submissions,
    title: 'Submissions supported',
    explanation:
      'TenderLab’s confirmed count of tender and framework submissions supported. It measures work completed and is not presented as the published denominator for the 92% figure.',
  },
  {
    value: BRAND.contractValue,
    title: 'Combined contract value',
    explanation:
      'TenderLab’s confirmed aggregate contract value linked to successful supported submissions. It is contract value, not TenderLab revenue, client profit or cash received.',
  },
  {
    value: BRAND.topScore,
    title: 'Question scores recorded',
    explanation:
      'Supported responses have received 5/5 where a five-point scale was used. The measure does not mean that every question or every submission received 5/5.',
  },
]

const proofQuestions = [
  {
    question: 'Does TenderLab guarantee that a tender will win?',
    answer:
      'No. A procurement outcome depends on the provider, eligibility, evidence, delivery model, price, competition and the buyer’s evaluation. TenderLab can improve the structure, relevance and clarity of a submission but cannot control the award decision.',
  },
  {
    question: 'Can I see procurement-specific examples?',
    answer:
      'Yes. The case-study library explains the commissioning context, the provider’s starting point, the work TenderLab completed and the recorded outcome where publication is appropriate.',
  },
  {
    question: 'How should I compare tender-writing providers?',
    answer:
      'Use historic results as one part of the decision. Also examine sector knowledge, who will do the work, how evidence is gathered, how quality is controlled and whether the adviser will identify when an opportunity is not suitable.',
  },
  {
    question: 'Why are the four figures not combined?',
    answer:
      'They describe different measures: a historic win-rate figure, a count of supported submissions, aggregate contract value and individual question scores. Combining them would suggest one reporting cohort that has not been established.',
  },
]

export default function ProofPage() {
  return (
    <main className={styles.page}>
      <JsonLd
        id="ld-proof-page"
        data={webPageSchema({
          name: title,
          description,
          path: '/proof',
          about: 'TenderLab tender writing results and evidence',
        })}
      />
      <JsonLd
        id="ld-proof-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Results and proof', path: '/proof' },
        ])}
      />
      <JsonLd id="ld-proof-faq" data={faqSchema(proofQuestions)} />

      <EditorialPageHero
        id="proof-title"
        eyebrow="TenderLab results and proof"
        title="Performance figures you can examine properly."
        description="TenderLab reports four confirmed measures from past work. This page keeps them separate, explains what each one represents and shows the limits that should shape a responsible buying decision."
        image="/images/editorial/tenderlab-proof-hero-v1.png"
        imageAlt="Tender specialists reviewing a performance ledger, evaluation scores and supporting records"
        caption="Useful proof includes the result, its definition and the context needed to interpret it."
        primaryAction={{ href: '#recorded-measures', label: 'Examine the figures' }}
        secondaryAction={{ href: '/case-studies', label: 'Read case studies' }}
        tone="yellow"
      />

      <section id="recorded-measures" className={`${styles.section} ${styles.sectionWhite}`} aria-labelledby="proof-measures-title">
        <div className={`${styles.container} ${styles.proofLedger}`}>
          <div className={styles.proofContext}>
            <p className={styles.label}>Recorded measures</p>
            <h2 id="proof-measures-title">Four figures, with four different meanings.</h2>
            <p>
              The definitions are part of the evidence. They prevent a strong headline from being
              mistaken for a promise about the next procurement.
            </p>
            <p><Link className={styles.textLink} href="/case-studies">Examine procurement-specific examples</Link>.</p>
          </div>
          <div>
            <div className={styles.metricList}>
              {claims.map((claim) => (
                <article className={styles.metric} key={claim.title}>
                  <strong className={styles.metricValue}>{claim.value}</strong>
                  <div>
                    <h3>{claim.title}</h3>
                    <p>{claim.explanation}</p>
                  </div>
                </article>
              ))}
            </div>
            <aside className={styles.notice}>
              <strong>These are records of past work, not award forecasts.</strong>
              <p>The provider’s eligibility, evidence, delivery model, mobilisation, price, competition and the buyer’s scoring remain material to every result.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionBlue}`} aria-labelledby="proof-built-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>How stronger submissions are built</p>
            <div>
              <h2 id="proof-built-title" className={styles.sectionTitle}>The quality of the decision comes before the confidence of the prose.</h2>
              <p className={styles.sectionIntro}>
                TenderLab tests whether the opportunity fits, whether the provider can evidence the
                promised service and whether the complete submission answers the published criteria.
              </p>
            </div>
          </div>
          <div className={styles.chapterList}>
            <article className={styles.chapter}>
              <h3>Fit and conditions</h3>
              <div><p>Participation rules, service scope, geography, deadline and commercial exposure are reviewed before substantial writing begins.</p></div>
            </article>
            <article className={styles.chapter}>
              <h3>Operational evidence</h3>
              <div><p>Claims are connected to responsible people, controls, records, frequencies and outcomes that the provider can stand behind.</p></div>
            </article>
            <article className={styles.chapter}>
              <h3>Evaluator access</h3>
              <div><p>The response structure makes the commitment, delivery method, evidence and intended outcome easy to find within the word count.</p></div>
            </article>
            <article className={styles.chapter}>
              <h3>Complete-bid control</h3>
              <div><p>Responses, attachments, portal requirements and provider approvals are checked against one requirement map before handover.</p></div>
            </article>
          </div>
          <div className={styles.outputStrip}>
            <h3>Use more than one form of evidence.</h3>
            <ul className={styles.outputList}>
              <li>Defined performance measures</li>
              <li>Procurement-specific case studies</li>
              <li>Client experience and reviews</li>
              <li>A visible working process</li>
              <li>Legal and editorial accountability</li>
              <li>Clear limitations and corrections</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWhite}`} aria-labelledby="proof-questions-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>Choosing responsibly</p>
            <div>
              <h2 id="proof-questions-title" className={styles.sectionTitle}>Questions to ask before relying on any success claim.</h2>
            </div>
          </div>
          <div className={styles.faqGroups}>
            <section className={styles.faqGroup}>
              <div>
                <h2>Read the evidence in context.</h2>
                <p className={styles.faqGroupIntro}>A clear limitation makes a result more useful, not less credible.</p>
              </div>
              <div className={styles.faqList}>
                {proofQuestions.map((item) => (
                  <details className={styles.faqItem} key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="proof-cta-title">
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div>
            <p className={styles.label}>Evidence for your decision</p>
            <h2 id="proof-cta-title">Compare the record with the support your tender actually needs.</h2>
          </div>
          <div className={styles.ctaBody}>
            <p>Share the opportunity, deadline and documents. TenderLab will use the published requirements and your current evidence to explain the responsible next step.</p>
            <div className={styles.ctaActions}>
              <Link className={styles.ctaPrimary} href="/contact?ref=proof-cta">Start your tender enquiry <span aria-hidden="true">↗</span></Link>
              <Link className={styles.ctaSecondary} href="/process">See how the work is controlled <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
