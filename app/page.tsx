import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CampaignHero from '@/components/CampaignHero'
import PortalConveyor from '@/components/PortalConveyor'
import ResultsCarousel from '@/components/ResultsCarousel'
import { fetchBlogs, formatBlogDate } from '@/lib/blogs'
import { fetchPublishedTenders } from '@/lib/published-tenders'
import { CASE_STUDIES } from '@/lib/case-studies-data'
import { DIRECT_CLIENTS, VERIFIED_CLIENT_REVIEWS } from '@/lib/client-proof'
import { defaultOpenGraph, defaultTwitter } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'Health and Social Care Tender Writing Services | TenderLab' },
  description: 'Specialist tender writing and bid support for UK health and social care providers. Evidence-led submissions for council, NHS and ICB contracts.',
  alternates: { canonical: '/' },
  openGraph: defaultOpenGraph({ title: 'Health and Social Care Tender Writing Services | TenderLab', description: 'TenderLab turns operational evidence into clear, compliant submissions built for the scoring sheet.', path: '/' }),
  twitter: defaultTwitter({ title: 'Health and Social Care Tender Writing Services | TenderLab', description: 'TenderLab turns operational evidence into clear, compliant submissions built for the scoring sheet.' }),
}

const services = [
  { number: '01', title: 'Complete bid writing', label: 'Core service', text: 'We map the procurement pack, gather operational evidence and develop the response through to final review.', href: '/services/bid-writing', image: '/design-v4/images/service-writing.png' },
  { number: '02', title: 'Bid viability', label: 'Decide first', text: 'We test the mandatory requirements, evidence, delivery position and commercial fit before you commit.', href: '/services/bid-viability', image: '/design-v4/images/service-viability.png' },
  { number: '03', title: 'Pre-submission review', label: 'Independent challenge', text: 'We expose compliance gaps, unsupported claims and places where the evaluator may struggle to award marks.', href: '/services/pre-submission-review', image: '/design-v4/images/service-review.png' },
  { number: '04', title: 'Tender training', label: 'Build capability', text: 'Your team learns qualification, evidence selection, response architecture and evaluator-led review using real buyer documents.', href: '/services/tender-training', image: '/design-v4/images/service-training.png' },
]

const settings = [
  ['Domiciliary care', '/care-settings/domiciliary-care'],
  ['Supported living', '/care-settings/supported-living'],
  ["Children's services", '/care-settings/childrens-services'],
  ['Complex care and CHC', '/care-settings/complex-care-and-continuing-healthcare'],
  ['Residential and nursing care', '/care-settings/residential-care'],
  ['Housing and community support', '/care-settings/housing-related-support'],
]

const method = [
  ['01', 'Read the entire procurement pack', 'Conditions, specification, questions, descriptors, attachments and submission rules are mapped first.'],
  ['02', 'Build the response architecture', 'Each scored requirement becomes a controlled answer plan with evidence needs and owners.'],
  ['03', 'Develop evidence with your team', 'Real roles, controls, records, safeguards and outcomes replace generic promises.'],
  ['04', 'Challenge before submission', 'Compliance, clarity, evidence and evaluator effort are tested before release.'],
]

const faqs = [
  ['What does TenderLab need before assessing a tender?', 'Send the notice link or procurement pack, deadline, lots under consideration and a short description of your current services.'],
  ['Will TenderLab accept any tender writing project?', 'No. We only confirm a full writing engagement after checking that the available information supports a responsible view that the provider meets the tender requirements.'],
  ['Can you work from a response we have already drafted?', 'Yes. We retain strong material and rebuild areas where proof, structure or compliance are weak.'],
  ['Do you guarantee that every tender will be won?', 'No responsible tender writer can guarantee an award. We improve compliance, evidence, clarity and scoreability while being honest about risks that writing cannot solve.'],
  ['Do you support newly registered providers?', 'Yes, where the published conditions and the provider’s actual delivery position support a responsible bid.'],
  ['Do you offer tender training?', 'Yes. Training covers qualification, evidence development, answer architecture and evaluator-led review.'],
]

export default async function HomePage() {
  const [posts, tenders] = await Promise.all([fetchBlogs(), fetchPublishedTenders(3)])
  const results = [CASE_STUDIES[1], CASE_STUDIES[0], CASE_STUDIES[4], CASE_STUDIES[2]].map((study) => ({
    slug: study.slug, category: study.categoryLabel, council: study.council, result: study.transformation, image: study.image,
  }))
  return (
    <main className="campaign-home">
      <CampaignHero />

      <section className="campaign-experience" aria-labelledby="experience-title">
        <header className="campaign-experience__head">
          <div><p className="campaign-eyebrow">Recorded experience</p><h2 id="experience-title">Evidence, with the qualification attached.</h2></div>
          <p>Four different measures are kept separate so a decision-maker can understand exactly what each figure means.</p>
        </header>
        <div className="campaign-experience__grid">
          {[
            ['92%', 'Historic recorded win rate', 'Based on TenderLab’s recorded tender outcomes.', '/design-v4/images/service-review.png'],
            ['200+', 'Submissions supported', 'A separate measure of completed and reviewed submissions.', '/design-v4/images/method-team.png'],
            ['£50M+', 'Aggregate contract value', 'Linked to successful submissions supported by TenderLab.', '/design-v4/images/cases/essex.png'],
            ['5/5', 'Documented question scores', 'Where buyers used a five-point evaluation scale.', '/design-v4/images/service-training.png'],
          ].map(([value, title, text, image], index) => (
            <article className={`campaign-metric campaign-metric--${index + 1}`} key={value}>
              <Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" />
              <div><strong>{value}</strong><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="campaign-section campaign-services" id="services">
        <div className="campaign-shell">
          <header className="campaign-section-head"><div><p className="campaign-eyebrow">Tender writing services</p><h2>Support shaped around the work in front of you.</h2></div><p>The right starting point depends on whether you are deciding, writing, reviewing or building a stronger tender function.</p></header>
          <div className="campaign-service-grid">
            {services.map((service) => (
              <Link className="campaign-service" href={service.href} key={service.number}>
                <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                <div><span>{service.number} · {service.label}</span><h3>{service.title}</h3><p>{service.text}</p><b>Explore {service.title.toLowerCase()} →</b></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="campaign-consultation">
        <Image src="/design-v4/images/service-viability.png" alt="A TenderLab specialist examining public-sector tender requirements" fill sizes="(max-width: 800px) 100vw, 38vw" />
        <div><p className="campaign-eyebrow">Focused expert consultations</p><h2>Bring us the decision, feedback or tender pack that needs attention.</h2><p>Choose a focused service with a clear price, clear preparation requirements and a defined outcome.</p></div>
        <Link className="campaign-button campaign-button--coral" href="/book-consultation">Choose a consultation</Link>
      </section>

      <section className="campaign-setting">
        <div className="campaign-setting__image"><Image src="/design-v4/images/care-context.png" alt="A care manager and colleague reviewing operational evidence in a home setting" fill sizes="(max-width: 800px) 100vw, 48vw" /><span>A service model understood in context</span></div>
        <div className="campaign-setting__copy"><p className="campaign-eyebrow">Health and social care specialism</p><h2>Care is not a generic service.</h2><p>Good tender writing begins with the realities behind the specification: dignity, safeguarding, workforce continuity, medicines, outcomes, mobilisation and accountable leadership.</p><div>{settings.map(([label, href]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}</div></div>
      </section>

      <section className="campaign-tenders">
        <div className="campaign-tenders__intro"><p className="campaign-eyebrow">Live public-sector opportunities</p><h2>Find the opportunity. Then test whether it fits.</h2><p>Search current care opportunities drawn from official public-sector notices, then examine the buyer documents before committing your team.</p><Link className="campaign-button campaign-button--dark" href="/tenders">Explore live tenders</Link><Image src="/design-v4/images/editorial/live-tenders.webp" alt="Public-sector tender opportunities and procurement documents" fill sizes="(max-width: 850px) 100vw, 42vw" /></div>
        <div className="campaign-tenders__list">
          <div className="campaign-tenders__search"><span>Current opportunities</span><Link href="/tenders">Search and filter all tenders →</Link></div>
          {(tenders.length ? tenders : [
            { id: 'domiciliary-care', title: 'Domiciliary care and home support', organisation: 'Councils and public bodies', deadline: null },
            { id: 'supported-living', title: 'Supported living and community support', organisation: 'Current framework and contract opportunities', deadline: null },
            { id: 'children-young-people', title: "Children's services and supported accommodation", organisation: 'Current commissioned-service opportunities', deadline: null },
          ]).map((tender, index) => (
            <Link className="campaign-tender-row" href={tender.id.includes('ocds') ? `/tenders/${tender.id}` : `/tenders/${tender.id}`} key={tender.id}><span>0{index + 1}</span><div><b>{tender.organisation || 'Public-sector buyer'}</b><h3>{tender.title}</h3>{tender.deadline ? <p>Deadline {new Date(tender.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p> : null}</div><em>Open opportunity →</em></Link>
          ))}
        </div>
      </section>

      <PortalConveyor />

      <section className="campaign-method">
        <div className="campaign-method__visual"><Image src="/design-v4/images/method-team.png" alt="A multidisciplinary team developing a tender response around buyer documents" fill sizes="(max-width: 850px) 100vw, 48vw" /><span>Evidence before assertion</span></div>
        <div className="campaign-method__copy"><p className="campaign-eyebrow">The TenderLab method</p><h2>A controlled response process, without losing the human service.</h2><div>{method.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><Link className="campaign-text-link" href="/process">See how the work is controlled →</Link></div>
      </section>

      <section className="campaign-section campaign-results-section"><div className="campaign-shell"><header className="campaign-section-head"><div><p className="campaign-eyebrow">Documented results</p><h2>Contract awards, with the work behind them.</h2></div><p>Each case study separates the provider’s starting point, procurement challenge and documented outcome.</p></header><ResultsCarousel results={results} /></div></section>

      <section className="campaign-section campaign-clients"><div className="campaign-shell"><header className="campaign-section-head"><div><p className="campaign-eyebrow">Direct TenderLab engagements</p><h2>Care providers that have worked directly with TenderLab.</h2></div><p>Selected organisations supported through direct TenderLab engagements.</p></header><div className="campaign-client-showcase"><a className="campaign-client-feature" href={DIRECT_CLIENTS[0].href} target="_blank" rel="noopener noreferrer"><span>Featured direct engagement</span><Image src={DIRECT_CLIENTS[0].logo} alt={DIRECT_CLIENTS[0].name} width={300} height={110} /><p>“They understand our business, how we communicate, our strengths and what is important to us.”</p><b>Living Plus Care · verified client feedback</b></a><div className="campaign-client-grid">{DIRECT_CLIENTS.slice(1).map((client) => <a href={client.href} target="_blank" rel="noopener noreferrer" key={client.name} className={client.name === 'Sorelle Support' ? 'is-dark' : ''}><Image src={client.logo} alt={client.name} width={220} height={86} /></a>)}</div></div></div></section>

      <section className="campaign-reviews"><div className="campaign-reviews__intro"><p className="campaign-eyebrow">Independent client feedback</p><h2>Trust is built in the details of the work.</h2><p>Published feedback is linked directly to its independent source.</p><span>★★★★★ <small>Verified reviews</small></span></div><div className="campaign-reviews__list">{VERIFIED_CLIENT_REVIEWS.slice(0, 2).map((review) => <a href={review.href} target="_blank" rel="noopener noreferrer" key={review.organisation}>{review.logo ? <Image src={review.logo} alt={review.organisation} width={190} height={70} /> : null}<blockquote>“{review.quote?.split('\n\n')[0]}”</blockquote><span>{review.person} · {review.role}</span><b>Read verified review →</b></a>)}</div></section>

          <section className="campaign-section campaign-insights"><div className="campaign-shell"><header className="campaign-section-head"><div><p className="campaign-eyebrow">TenderLab blogs</p><h2>Practical analysis for care providers pursuing public contracts.</h2></div><p>Decision support for finding, qualifying, preparing and reviewing opportunities.</p></header><div className="campaign-article-grid">{posts.slice(0, 3).map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><Image src={post.imageUrl || '/design-v4/images/article-qualification.webp'} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /><div><span>{post.category || 'Tender guidance'} · {formatBlogDate(post.publishedAt)}</span><h3>{post.title}</h3><p>{post.excerpt}</p><b>Read the article →</b></div></Link>)}</div><Link className="campaign-button campaign-button--dark" href="/blog">Browse all blogs</Link></div></section>

      <section className="campaign-faq"><div className="campaign-faq__intro"><p className="campaign-eyebrow">Frequently asked questions</p><h2>Clear answers before you share the tender documents.</h2><p>If the question concerns a live opportunity, send the notice or procurement pack and we will respond in context.</p><Link className="campaign-text-link" href="/faqs">Browse all questions →</Link></div><div className="campaign-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section className="campaign-contact"><div className="campaign-contact__image"><Image src="/design-v4/images/editorial/contact.webp" alt="TenderLab reviewing a procurement pack before responding to an enquiry" fill sizes="(max-width: 800px) 100vw, 52vw" /><div><span>Have a tender in front of you?</span><h2>Bring us the buyer documents.</h2><p>We begin with the published requirements, deadline and what your organisation can genuinely evidence.</p><a href="tel:+441707240393">01707 240393</a><a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a></div></div><div className="campaign-contact__choice"><p className="campaign-eyebrow">Choose the useful next step</p><h2>Talk through the tender or book focused advice.</h2><p>Use the enquiry form for a live opportunity, or choose a fixed-price consultation when you need a defined piece of advice.</p><Link className="campaign-button campaign-button--coral" href="/contact">Contact TenderLab</Link><Link className="campaign-text-link" href="/book-consultation">Book a consultation →</Link></div></section>
    </main>
  )
}
