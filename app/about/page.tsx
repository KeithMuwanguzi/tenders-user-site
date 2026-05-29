import type { Metadata } from 'next'
import Link from 'next/link'
import TimelineScroll from '@/components/TimelineScroll'

export const metadata: Metadata = {
  title: 'About TenderLab | Specialist Tender Writing Consultants UK Health & Social Care',
  description:
    'TenderLab is a team of specialist tender writing consultants and bid writing consultants working exclusively across UK health and social care. We structure submissions to meet the exact criteria used by local authorities and commissioning bodies to score, rank, and award contracts.',
}

const STEPS = [
  { id: 'our-position', label: '01 Our Position' },
  { id: 'our-specialism', label: '02 Our Specialism' },
  { id: 'who-we-work-with', label: '03 Who We Work With' },
  { id: 'what-we-do', label: '04 What We Do' },
  { id: 'our-method', label: '05 Our Method' },
  { id: 'evaluator-thinking', label: '06 Evaluator Thinking' },
  { id: 'track-record', label: '07 Track Record' },
  { id: 'confidence', label: '08 The Difference' },
  { id: 'procurement-routes', label: '09 Procurement Routes' },
]

export default function AboutPage() {
  return (
    <div className="tl-page">
      {/* Hero */}
      <section className="tl-hero" aria-labelledby="hero-title">
        <div className="tl-hero-glow" aria-hidden="true" />
        <div className="tl-hero-inner">
          <h1 id="hero-title" className="tl-hero-title">About TenderLab: Specialist Tender Writing Consultants</h1>
          <p className="tl-hero-sub">
            TenderLab is a team of specialist <strong>tender writing consultants</strong> and <strong>bid writing consultants</strong> working exclusively across UK health and social care. We structure submissions to meet the exact criteria used by local authorities and commissioning bodies to score, rank, and award contracts.
          </p>
          <Link className="tl-btn-red" href="/contact">Free consultation</Link>
        </div>
      </section>

      {/* Timeline */}
      <main className="tl-timeline" aria-label="About TenderLab in nine sections">

        {/* 01: Image Left, Text Right */}
        <article className="tl-step" id="our-position">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Tender scoring matrix">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif" fontSize="12" fill="#192231">
                  <rect x="40" y="40" width="420" height="40" fill="#192231"/>
                  <text x="60" y="65" fill="#fff" fontWeight="700">EVALUATION CRITERIA</text>
                  <text x="320" y="65" fill="#fff" fontWeight="700">WEIGHT</text>
                  <text x="410" y="65" fill="#fff" fontWeight="700">SCORE</text>
                  <rect x="40" y="90" width="420" height="44" fill="#fff" stroke="#eee"/>
                  <text x="60" y="118">Service delivery</text><text x="330" y="118">30%</text>
                  <rect x="395" y="102" width="50" height="20" fill="#D4382C" rx="2"/>
                  <text x="405" y="117" fill="#fff" fontWeight="700">9 / 10</text>
                  <rect x="40" y="138" width="420" height="44" fill="#fff" stroke="#eee"/>
                  <text x="60" y="166">Safeguarding</text><text x="330" y="166">20%</text>
                  <rect x="395" y="150" width="50" height="20" fill="#D4382C" rx="2"/>
                  <text x="405" y="165" fill="#fff" fontWeight="700">9 / 10</text>
                  <rect x="40" y="186" width="420" height="44" fill="#fff" stroke="#eee"/>
                  <text x="60" y="214">Workforce</text><text x="330" y="214">15%</text>
                  <rect x="395" y="198" width="50" height="20" fill="#D4382C" rx="2"/>
                  <text x="405" y="213" fill="#fff" fontWeight="700">8 / 10</text>
                  <rect x="40" y="234" width="420" height="44" fill="#fff" stroke="#eee"/>
                  <text x="60" y="262">Outcomes</text><text x="330" y="262">15%</text>
                  <rect x="395" y="246" width="50" height="20" fill="#D4382C" rx="2"/>
                  <text x="405" y="261" fill="#fff" fontWeight="700">9 / 10</text>
                  <rect x="40" y="282" width="420" height="44" fill="#fff" stroke="#eee"/>
                  <text x="60" y="310">Price</text><text x="330" y="310">20%</text>
                  <rect x="395" y="294" width="50" height="20" fill="#192231" rx="2"/>
                  <text x="411" y="309" fill="#fff" fontWeight="700">7 / 10</text>
                  <rect x="40" y="340" width="420" height="30" fill="#192231"/>
                  <text x="60" y="360" fill="#fff" fontWeight="700">TOTAL QUALITY-WEIGHTED SCORE</text>
                  <text x="410" y="360" fill="#fff" fontWeight="700">86%</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">01</span> Our Position</div>
            <h2 className="tl-step-title">We work to the scoring system</h2>
            <p>As specialist <strong>professional tender writers</strong>, we know that tender outcomes are decided by scoring. Every question in a health or social care tender carries a weighted score, and evaluators mark responses against published criteria. Our role is to ensure your submission addresses every scoring point, in the right order, with the right evidence.</p>
            <p>We do not write generically. We reverse-engineer the scoring methodology used by NHS trusts, local authorities, and integrated care boards so that each answer is structured to achieve the maximum available marks.</p>
            <div className="tl-callout">If it is not in the scoring criteria, it does not belong in the response.</div>
          </div>
        </article>

        {/* 02: Text Left, Image Right */}
        <article className="tl-step" id="our-specialism">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">02</span> Our Specialism</div>
            <h2 className="tl-step-title">Health and social care. Nothing else.</h2>
            <p>Unlike general <strong>bid writing companies</strong> that spread across construction, IT, and defence, TenderLab works in a single sector. We are <strong>healthcare bid consultants</strong> and <strong>social care bid writing consultants</strong> who understand the language commissioners use, the outcomes they prioritise, and the evidence they expect to see.</p>
            <p>From domiciliary care and supported living to complex NHS community contracts, our knowledge of <Link href="/care-settings" className="tl-step-link" style={{ display: 'inline', fontSize: 'inherit', letterSpacing: 'normal', textTransform: 'none', textDecoration: 'underline', marginTop: 0 }}>care sector bid writing across 17 settings</Link> means we know what good looks like before a single word is drafted.</p>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Healthcare bid writing UK coverage map">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fill="none" stroke="#192231" strokeWidth="1.5" opacity=".2">
                  <path d="M220 60 C200 80,180 120,175 160 C170 200,160 230,170 260 C175 280,190 310,200 330 C210 345,225 355,230 360 C232 350,228 340,240 330 C250 320,265 300,270 280 C275 260,280 240,278 220 C276 200,280 180,275 160 C272 140,265 120,260 100 C255 85,245 70,235 62 Z"/>
                </g>
                <g fill="#D4382C">
                  <circle cx="230" cy="320" r="6"/><text x="242" y="324" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">London</text>
                  <circle cx="245" cy="250" r="6"/><text x="257" y="254" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Birmingham</text>
                  <circle cx="240" cy="200" r="6"/><text x="252" y="204" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Manchester</text>
                  <circle cx="260" cy="170" r="6"/><text x="272" y="174" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Leeds</text>
                  <circle cx="210" cy="280" r="6"/><text x="222" y="284" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Bristol</text>
                  <circle cx="270" cy="230" r="6"/><text x="282" y="234" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Nottingham</text>
                  <circle cx="255" cy="290" r="6"/><text x="267" y="294" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Cambridge</text>
                  <circle cx="230" cy="150" r="6"/><text x="242" y="154" fontFamily="Inter, sans-serif" fontSize="9" fill="#192231">Liverpool</text>
                </g>
                <rect x="30" y="40" width="160" height="50" rx="4" fill="#192231"/>
                <text x="50" y="60" fontFamily="Inter, sans-serif" fontSize="11" fill="#fff" fontWeight="700">CONTRACT COVERAGE</text>
                <circle cx="50" cy="76" r="5" fill="#D4382C"/>
                <text x="62" y="80" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,.8)">Active NHS / LA contract</text>
                <rect x="340" y="340" width="130" height="40" rx="4" fill="#D4382C"/>
                <text x="360" y="366" fontFamily="Inter, sans-serif" fontSize="14" fill="#fff" fontWeight="700">150+ contracts</text>
              </svg>
            </div>
          </div>
        </article>

        {/* 03: Image Left, Text Right */}
        <article className="tl-step" id="who-we-work-with">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Bid writing consultants supporting care providers at every stage">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="40" y="100" width="120" height="200" rx="6" fill="#fff" stroke="#eee" strokeWidth="1.5"/>
                  <circle cx="100" cy="155" r="28" fill="none" stroke="#D4382C" strokeWidth="2"/>
                  <text x="92" y="160" fontSize="22" fill="#D4382C" fontWeight="700">1</text>
                  <text x="60" y="210" fontSize="12" fontWeight="700" fill="#192231">Start-up</text>
                  <text x="52" y="228" fontSize="10" fill="#6B7280">First tender</text>
                  <text x="52" y="244" fontSize="10" fill="#6B7280">No track record</text>
                  <text x="52" y="260" fontSize="10" fill="#6B7280">CQC registered</text>
                  <rect x="190" y="70" width="120" height="260" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <circle cx="250" cy="125" r="28" fill="#D4382C"/>
                  <text x="238" y="130" fontSize="22" fill="#fff" fontWeight="700">10</text>
                  <text x="205" y="180" fontSize="12" fontWeight="700" fill="#192231">Growing</text>
                  <text x="202" y="198" fontSize="10" fill="#6B7280">Multiple contracts</text>
                  <text x="202" y="214" fontSize="10" fill="#6B7280">Expanding areas</text>
                  <text x="202" y="230" fontSize="10" fill="#6B7280">Building team</text>
                  <text x="202" y="246" fontSize="10" fill="#6B7280">Framework bids</text>
                  <rect x="340" y="50" width="120" height="280" rx="6" fill="#fff" stroke="#eee" strokeWidth="1.5"/>
                  <circle cx="400" cy="105" r="28" fill="none" stroke="#192231" strokeWidth="2"/>
                  <text x="384" y="110" fontSize="22" fill="#192231" fontWeight="700">50+</text>
                  <text x="353" y="160" fontSize="12" fontWeight="700" fill="#192231">Established</text>
                  <text x="352" y="178" fontSize="10" fill="#6B7280">National provider</text>
                  <text x="352" y="194" fontSize="10" fill="#6B7280">Multi-region bids</text>
                  <text x="352" y="210" fontSize="10" fill="#6B7280">Large frameworks</text>
                  <text x="352" y="226" fontSize="10" fill="#6B7280">Retender defence</text>
                  <line x1="160" y1="200" x2="190" y2="200" stroke="#D4382C" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <line x1="310" y1="200" x2="340" y2="200" stroke="#D4382C" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#D4382C"/></marker></defs>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">03</span> Who We Work With</div>
            <h2 className="tl-step-title">From first tender to framework defence</h2>
            <p>We support care providers at every stage. Whether you are a start-up submitting your first tender, a growing organisation entering new local authority areas, or an established provider defending a retender, our <strong>bid writing consultants</strong> adapt the approach to match your position.</p>
            <p>Small providers benefit from structured answer templates and evidence coaching. Larger providers use our <strong>tender writing services</strong> for high-value framework bids where the margin between first and second place is measured in fractions of a percentage point.</p>
          </div>
        </article>

        {/* 04: Text Left, Image Right */}
        <article className="tl-step" id="what-we-do">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">04</span> What We Do</div>
            <h2 className="tl-step-title">We transform answers, not decorate them</h2>
            <p>Most failed bids do not fail because the provider is poor. They fail because the response does not match what the evaluator is looking for. Our <strong>tender writing consultants</strong> restructure every answer so that the evidence appears exactly where the scoring criteria expect it.</p>
            <p>We rewrite generic paragraphs into scored, structured responses with clear headings, quantified outcomes, and named roles. The result is a submission that reads as if you already understand how the commissioner thinks.</p>
            <div className="tl-callout">We do not add adjectives. We add evidence, structure, and scoring alignment.</div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Before and after tender transformation">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="30" y="50" width="190" height="160" rx="6" fill="#fff" stroke="#eee" strokeWidth="1.5"/>
                  <rect x="30" y="50" width="190" height="32" rx="6" fill="#6B7280"/>
                  <text x="85" y="72" fontSize="12" fill="#fff" fontWeight="700">BEFORE</text>
                  <rect x="46" y="96" width="158" height="6" rx="2" fill="#ddd"/>
                  <rect x="46" y="110" width="140" height="6" rx="2" fill="#ddd"/>
                  <rect x="46" y="124" width="150" height="6" rx="2" fill="#ddd"/>
                  <rect x="46" y="138" width="130" height="6" rx="2" fill="#ddd"/>
                  <rect x="46" y="152" width="155" height="6" rx="2" fill="#ddd"/>
                  <text x="46" y="198" fontSize="10" fill="#6B7280">Generic. Unstructured. No evidence.</text>
                  <g fill="#D4382C"><rect x="232" y="120" width="36" height="24" rx="4"/><text x="239" y="137" fontSize="14" fill="#fff" fontWeight="700">→</text></g>
                  <rect x="280" y="50" width="190" height="220" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <rect x="280" y="50" width="190" height="32" rx="6" fill="#D4382C"/>
                  <text x="342" y="72" fontSize="12" fill="#fff" fontWeight="700">AFTER</text>
                  <text x="296" y="102" fontSize="10" fontWeight="700" fill="#192231">1.1 Service Delivery Model</text>
                  <rect x="296" y="110" width="158" height="5" rx="2" fill="#192231" opacity=".15"/>
                  <text x="296" y="146" fontSize="10" fontWeight="700" fill="#192231">1.2 Evidenced Outcomes</text>
                  <rect x="296" y="154" width="150" height="5" rx="2" fill="#192231" opacity=".15"/>
                  <text x="296" y="190" fontSize="10" fontWeight="700" fill="#192231">1.3 Named Staff &amp; Roles</text>
                  <rect x="296" y="198" width="145" height="5" rx="2" fill="#192231" opacity=".15"/>
                  <rect x="380" y="238" width="80" height="24" rx="12" fill="#D4382C"/>
                  <text x="393" y="255" fontSize="11" fill="#fff" fontWeight="700">9 / 10</text>
                  <rect x="30" y="310" width="190" height="50" rx="4" fill="#eee"/>
                  <text x="65" y="335" fontSize="10" fill="#6B7280">Score: </text>
                  <text x="105" y="335" fontSize="14" fontWeight="700" fill="#6B7280">4 / 10</text>
                  <rect x="280" y="310" width="190" height="50" rx="4" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                  <text x="315" y="335" fontSize="10" fill="#D4382C">Score: </text>
                  <text x="355" y="335" fontSize="14" fontWeight="700" fill="#D4382C">9 / 10</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 05: Image Left, Text Right */}
        <article className="tl-step" id="our-method">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Specification mapped to answer architecture">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="30" y="40" width="160" height="320" rx="6" fill="#192231"/>
                  <text x="55" y="68" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="1">SPECIFICATION</text>
                  <g fontSize="10" fill="rgba(255,255,255,.75)">
                    <rect x="46" y="88" width="128" height="30" rx="3" fill="rgba(255,255,255,.1)"/>
                    <text x="56" y="107">Q1: Service model</text>
                    <rect x="46" y="128" width="128" height="30" rx="3" fill="rgba(255,255,255,.1)"/>
                    <text x="56" y="147">Q2: Safeguarding</text>
                    <rect x="46" y="168" width="128" height="30" rx="3" fill="rgba(255,255,255,.1)"/>
                    <text x="56" y="187">Q3: Workforce</text>
                    <rect x="46" y="208" width="128" height="30" rx="3" fill="rgba(255,255,255,.1)"/>
                    <text x="56" y="227">Q4: Quality</text>
                    <rect x="46" y="248" width="128" height="30" rx="3" fill="rgba(255,255,255,.15)"/>
                    <text x="56" y="267">Q5: Outcomes</text>
                    <rect x="46" y="288" width="128" height="30" rx="3" fill="rgba(255,255,255,.1)"/>
                    <text x="56" y="307">Q6: Social value</text>
                  </g>
                  <g stroke="#D4382C" strokeWidth="1.5" fill="none">
                    <path d="M190 103 C220 103,220 78,250 78"/>
                    <path d="M190 143 C220 143,220 128,250 128"/>
                    <path d="M190 183 C220 183,220 178,250 178"/>
                    <path d="M190 223 C220 223,220 228,250 228"/>
                    <path d="M190 263 C220 263,220 278,250 278"/>
                    <path d="M190 303 C220 303,220 328,250 328"/>
                  </g>
                  <rect x="250" y="40" width="220" height="320" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <text x="290" y="68" fontSize="11" fontWeight="700" fill="#D4382C" letterSpacing="1">ANSWER ARCHITECTURE</text>
                  <g fontSize="10" fill="#192231">
                    <rect x="266" y="82" width="188" height="40" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="276" y="99" fontWeight="600">1. Service delivery model</text>
                    <text x="276" y="114" fill="#6B7280">Evidence + named roles + KPIs</text>
                    <rect x="266" y="132" width="188" height="40" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="276" y="149" fontWeight="600">2. Safeguarding procedures</text>
                    <text x="276" y="164" fill="#6B7280">Policies + training + escalation</text>
                    <rect x="266" y="182" width="188" height="40" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="276" y="199" fontWeight="600">3. Recruitment &amp; retention</text>
                    <text x="276" y="214" fill="#6B7280">DBS + supervision + competency</text>
                    <rect x="266" y="232" width="188" height="40" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="276" y="249" fontWeight="600">4. Quality assurance</text>
                    <text x="276" y="264" fill="#6B7280">Audits + feedback + improvement</text>
                    <rect x="266" y="282" width="188" height="40" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="276" y="299" fontWeight="600">5. Measurable outcomes</text>
                    <text x="276" y="314" fill="#6B7280">Baseline + target + method</text>
                    <rect x="266" y="332" width="188" height="22" rx="3" fill="rgba(212,56,44,.06)"/>
                    <text x="276" y="348" fontWeight="600">6. Social value commitments</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">05</span> Our Method</div>
            <h2 className="tl-step-title">Specification in, scored answer out</h2>
            <p>Every tender response we write begins with the specification, not a template. Our <strong>professional tender writers</strong> read the full document pack, extract each evaluation criterion, and build a bespoke answer architecture that maps directly to the scoring matrix.</p>
            <p>This means every paragraph, heading, and piece of evidence in the final submission exists because the specification asked for it. Nothing is assumed. Nothing is borrowed from a previous bid without checking it fits.</p>
            <Link href="/services" className="tl-step-link">Explore our tender writing services →</Link>
          </div>
        </article>

        {/* 06: Text Left, Image Right */}
        <article className="tl-step" id="evaluator-thinking">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">06</span> Evaluator Thinking</div>
            <h2 className="tl-step-title">We write for the person who scores</h2>
            <p>Evaluators work to a structured marking guide. They look for specific statements, quantified evidence, and clear links between your approach and the outcomes the commissioner has prioritised. Our <strong>healthcare bid consultants</strong> write with this in mind at every stage.</p>
            <p>We anticipate the evaluator&apos;s checklist and structure answers so that every scoring criterion can be ticked without the reader having to search for it. When an evaluator can score quickly and confidently, the marks go up.</p>
            <div className="tl-callout">The evaluator should never have to guess what you mean.</div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Evaluator checklist all criteria met">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="80" y="30" width="340" height="340" rx="8" fill="#fff" stroke="#eee" strokeWidth="1.5"/>
                  <rect x="80" y="30" width="340" height="44" rx="8" fill="#192231"/>
                  <text x="160" y="58" fontSize="13" fill="#fff" fontWeight="700" letterSpacing="1">EVALUATOR CHECKLIST</text>
                  <g fontSize="13" fill="#192231">
                    <rect x="104" y="92" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="109" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="108">Service model clearly described</text>
                    <rect x="104" y="128" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="145" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="144">Named roles and responsibilities</text>
                    <rect x="104" y="164" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="181" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="180">Quantified outcomes with baselines</text>
                    <rect x="104" y="200" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="217" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="216">Safeguarding procedures evidenced</text>
                    <rect x="104" y="236" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="253" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="252">Workforce plan with retention strategy</text>
                    <rect x="104" y="272" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="289" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="288">Social value commitments measurable</text>
                    <rect x="104" y="308" width="22" height="22" rx="3" fill="#D4382C"/>
                    <text x="109" y="325" fontSize="14" fill="#fff" fontWeight="700">✓</text>
                    <text x="140" y="324">Continuous improvement cycle shown</text>
                  </g>
                  <rect x="160" y="348" width="180" height="36" rx="18" fill="#D4382C"/>
                  <text x="195" y="372" fontSize="14" fill="#fff" fontWeight="700">ALL CRITERIA MET</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 07: Image Left, Text Right */}
        <article className="tl-step" id="track-record">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Contract award certificate with 87% win rate">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="100" y="40" width="300" height="250" rx="8" fill="#fff" stroke="#192231" strokeWidth="2"/>
                  <rect x="100" y="40" width="300" height="50" rx="8" fill="#192231"/>
                  <text x="175" y="72" fontSize="14" fill="#fff" fontWeight="700" letterSpacing="1">CONTRACT AWARD</text>
                  <circle cx="250" cy="145" r="40" fill="none" stroke="#D4382C" strokeWidth="2.5"/>
                  <circle cx="250" cy="145" r="32" fill="none" stroke="#D4382C" strokeWidth="1" strokeDasharray="4,3"/>
                  <text x="228" y="142" fontSize="10" fill="#D4382C" fontWeight="700">AWARDED</text>
                  <text x="234" y="156" fontSize="10" fill="#D4382C">2024</text>
                  <text x="155" y="210" fontSize="11" fill="#6B7280">Framework:</text>
                  <text x="225" y="210" fontSize="11" fill="#192231" fontWeight="600">NHS Community Services</text>
                  <text x="155" y="232" fontSize="11" fill="#6B7280">Quality score:</text>
                  <text x="235" y="232" fontSize="11" fill="#D4382C" fontWeight="700">92%</text>
                  <text x="155" y="254" fontSize="11" fill="#6B7280">Position:</text>
                  <text x="210" y="254" fontSize="11" fill="#192231" fontWeight="600">1st of 14 bidders</text>
                  <text x="155" y="276" fontSize="11" fill="#6B7280">Value:</text>
                  <text x="195" y="276" fontSize="11" fill="#192231" fontWeight="600">Multi-year framework</text>
                  <rect x="100" y="310" width="145" height="60" rx="4" fill="#192231"/>
                  <text x="130" y="337" fontSize="22" fill="#fff" fontWeight="800">87%</text>
                  <text x="118" y="358" fontSize="10" fill="rgba(255,255,255,.7)">Average win rate</text>
                  <rect x="255" y="310" width="145" height="60" rx="4" fill="#D4382C"/>
                  <text x="287" y="337" fontSize="22" fill="#fff" fontWeight="800">150+</text>
                  <text x="280" y="358" fontSize="10" fill="rgba(255,255,255,.9)">Contracts secured</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">07</span> Track Record</div>
            <h2 className="tl-step-title">Measured in contract wins, not word counts</h2>
            <p>We are a results-led <strong>bid writing agency</strong>. Our success is measured by one metric: whether you win the contract. We have supported providers to secure places on NHS frameworks, local authority approved provider lists, and direct award contracts across England.</p>
            <p>Our track record includes <Link href="/case-studies" className="tl-step-link" style={{ display: 'inline', fontSize: 'inherit', letterSpacing: 'normal', textTransform: 'none', textDecoration: 'underline', marginTop: 0 }}>NHS and local authority contract wins</Link> in domiciliary care, supported living, mental health, learning disabilities, substance misuse, and children&apos;s services.</p>
            <div className="tl-callout">We have an 87% average win rate across all submissions.</div>
          </div>
        </article>

        {/* 08: Text Left, Image Right */}
        <article className="tl-step" id="confidence">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">08</span> The Difference</div>
            <h2 className="tl-step-title">Confidence backed by scoring uplift</h2>
            <p>Providers who work with our <strong>tender writing consultants</strong> see a measurable improvement in their quality scores. That is not a vague claim. We track evaluation feedback, record scoring outcomes, and use the data to refine our approach for every subsequent bid.</p>
            <p>The typical pattern is clear: providers who previously scored in the 40-60% range move to 80%+ after working with us. The difference comes from structure, evidence placement, and scoring alignment, not from better writing alone.</p>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Quality score uplift bar chart before and after TenderLab">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <text x="140" y="40" fontSize="14" fontWeight="700" fill="#192231" letterSpacing="0.5">QUALITY SCORE UPLIFT</text>
                  <line x1="80" y1="60" x2="80" y2="320" stroke="#eee" strokeWidth="1"/>
                  <text x="40" y="85" fontSize="10" fill="#6B7280">100%</text>
                  <text x="48" y="145" fontSize="10" fill="#6B7280">80%</text>
                  <text x="48" y="205" fontSize="10" fill="#6B7280">60%</text>
                  <text x="48" y="265" fontSize="10" fill="#6B7280">40%</text>
                  <text x="48" y="325" fontSize="10" fill="#6B7280">20%</text>
                  <g stroke="#eee" strokeWidth="1">
                    <line x1="80" y1="80" x2="450" y2="80"/>
                    <line x1="80" y1="140" x2="450" y2="140"/>
                    <line x1="80" y1="200" x2="450" y2="200"/>
                    <line x1="80" y1="260" x2="450" y2="260"/>
                    <line x1="80" y1="320" x2="450" y2="320"/>
                  </g>
                  <rect x="110" y="224" width="45" height="96" rx="3" fill="#ddd"/>
                  <text x="116" y="216" fontSize="10" fill="#6B7280" fontWeight="600">48%</text>
                  <rect x="190" y="200" width="45" height="120" rx="3" fill="#ddd"/>
                  <text x="196" y="192" fontSize="10" fill="#6B7280" fontWeight="600">52%</text>
                  <rect x="270" y="236" width="45" height="84" rx="3" fill="#ddd"/>
                  <text x="276" y="228" fontSize="10" fill="#6B7280" fontWeight="600">44%</text>
                  <rect x="350" y="212" width="45" height="108" rx="3" fill="#ddd"/>
                  <text x="356" y="204" fontSize="10" fill="#6B7280" fontWeight="600">55%</text>
                  <rect x="155" y="104" width="45" height="216" rx="3" fill="#D4382C"/>
                  <text x="161" y="96" fontSize="10" fill="#D4382C" fontWeight="700">88%</text>
                  <rect x="235" y="92" width="45" height="228" rx="3" fill="#D4382C"/>
                  <text x="241" y="84" fontSize="10" fill="#D4382C" fontWeight="700">92%</text>
                  <rect x="315" y="116" width="45" height="204" rx="3" fill="#D4382C"/>
                  <text x="321" y="108" fontSize="10" fill="#D4382C" fontWeight="700">85%</text>
                  <rect x="395" y="98" width="45" height="222" rx="3" fill="#D4382C"/>
                  <text x="401" y="90" fontSize="10" fill="#D4382C" fontWeight="700">91%</text>
                  <text x="120" y="345" fontSize="9" fill="#6B7280">Client A</text>
                  <text x="200" y="345" fontSize="9" fill="#6B7280">Client B</text>
                  <text x="280" y="345" fontSize="9" fill="#6B7280">Client C</text>
                  <text x="360" y="345" fontSize="9" fill="#6B7280">Client D</text>
                  <rect x="140" y="365" width="12" height="12" rx="2" fill="#ddd"/>
                  <text x="158" y="376" fontSize="10" fill="#6B7280">Before TenderLab</text>
                  <rect x="280" y="365" width="12" height="12" rx="2" fill="#D4382C"/>
                  <text x="298" y="376" fontSize="10" fill="#D4382C" fontWeight="600">After TenderLab</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 09: Image Left, Text Right */}
        <article className="tl-step" id="procurement-routes">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Procurement routes hub diagram">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <text x="130" y="40" fontSize="13" fontWeight="700" fill="#192231" letterSpacing="1">PROCUREMENT ROUTES</text>
                  <circle cx="250" cy="200" r="50" fill="#192231"/>
                  <text x="215" y="195" fontSize="10" fill="#fff" fontWeight="700">TENDER</text>
                  <text x="225" y="210" fontSize="10" fill="#fff" fontWeight="700">LAB</text>
                  <line x1="200" y1="175" x2="100" y2="100" stroke="#D4382C" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="4" fill="#D4382C"/>
                  <rect x="30" y="60" width="140" height="50" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="1.5"/>
                  <text x="52" y="82" fontSize="11" fontWeight="700" fill="#192231">Frameworks</text>
                  <text x="42" y="100" fontSize="9" fill="#6B7280">NHS, LA, regional</text>
                  <line x1="300" y1="175" x2="400" y2="100" stroke="#D4382C" strokeWidth="2"/>
                  <circle cx="400" cy="100" r="4" fill="#D4382C"/>
                  <rect x="330" y="60" width="140" height="50" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="1.5"/>
                  <text x="340" y="82" fontSize="11" fontWeight="700" fill="#192231">Dynamic Purchasing</text>
                  <text x="362" y="100" fontSize="9" fill="#6B7280">DPS systems</text>
                  <line x1="200" y1="225" x2="100" y2="300" stroke="#D4382C" strokeWidth="2"/>
                  <circle cx="100" cy="300" r="4" fill="#D4382C"/>
                  <rect x="30" y="280" width="140" height="50" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="1.5"/>
                  <text x="38" y="302" fontSize="11" fontWeight="700" fill="#192231">Approved Lists</text>
                  <text x="40" y="320" fontSize="9" fill="#6B7280">Provider panels / APLs</text>
                  <line x1="300" y1="225" x2="400" y2="300" stroke="#D4382C" strokeWidth="2"/>
                  <circle cx="400" cy="300" r="4" fill="#D4382C"/>
                  <rect x="330" y="280" width="140" height="50" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="1.5"/>
                  <text x="348" y="302" fontSize="11" fontWeight="700" fill="#192231">Direct Award</text>
                  <text x="340" y="320" fontSize="9" fill="#6B7280">Spot / block contracts</text>
                  <rect x="140" y="360" width="220" height="28" rx="14" fill="rgba(212,56,44,.06)" stroke="#D4382C" strokeWidth="1"/>
                  <text x="160" y="379" fontSize="10" fill="#D4382C" fontWeight="600">All routes. One scoring methodology.</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">09</span> Procurement Routes</div>
            <h2 className="tl-step-title">Every route to contract, covered</h2>
            <p>Public sector care contracts are awarded through frameworks, dynamic purchasing systems, approved provider lists, and direct awards. Each route has its own process, but all share one thing: a quality evaluation that determines who wins.</p>
            <p>As experienced <strong>tender writing consultants</strong> and <strong>bid writing consultants</strong>, we work across all procurement routes. Whether you are joining a framework for the first time, responding to a call-off under an existing DPS, or submitting a spot-purchase proposal, we know the format, the expectations, and the scoring approach.</p>
            <div className="tl-callout">One methodology. Every procurement route. No gaps.</div>
          </div>
        </article>

      </main>

      {/* Closing CTA */}
      <section className="tl-closer">
        <h2>Specialist tender writing consultants for UK health and social care.</h2>
        <p>Built on evaluator intelligence. Healthcare bid writing, NHS tender writing, and framework bid writing for CQC-registered providers across England.</p>
        <Link className="tl-btn-white" href="/contact">Book a Free Consultation</Link>
      </section>

      <TimelineScroll steps={STEPS} />
    </div>
  )
}
