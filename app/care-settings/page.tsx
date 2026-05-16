import type { Metadata } from 'next'
import Link from 'next/link'
import TimelineScroll from '@/components/TimelineScroll'

export const metadata: Metadata = {
  title: 'Care Sector Tender Writing | Domiciliary, Supported Living, NHS | TenderLab',
  description:
    'Specialist tender writing across 28 care settings. Domiciliary care, supported living, NHS, children\'s services, and residential care bid writing.',
}

const STEPS = [
  { id: 'adult-social-care', label: '01 Adult Social Care' },
  { id: 'childrens-services', label: "02 Children's Services" },
  { id: 'housing-and-support', label: '03 Housing and Support' },
  { id: 'health-and-clinical-services', label: '04 Health and Clinical Services' },
]

export default function CareSettingsPage() {
  return (
    <div className="tl-page">
      {/* Hero */}
      <section className="tl-hero" aria-labelledby="hero-title">
        <div className="tl-hero-glow" aria-hidden="true" />
        <div className="tl-hero-inner">
          <div className="tl-hero-eye">Care Settings &middot; UK Health and Social Care</div>
          <h1 id="hero-title" className="tl-hero-title">Every commissioning route, every service model.</h1>
          <p className="tl-hero-sub cats" aria-label="Four care setting categories">
            <span>Adult Social Care</span><span>Children&apos;s Services</span><span>Housing and Support</span><span>Health and Clinical Services</span>
          </p>
          <p className="tl-hero-sub">Twenty-eight specialised tender-writing pages mapped to how commissioners actually procure. <strong>Healthcare tender writing</strong>, <strong>care sector bid writing</strong>, and <strong>NHS bid writing services</strong> across the full procurement landscape, covering <strong>domiciliary care tender writing</strong>, <strong>supported living tender writing</strong>, <strong>bid writing for care homes</strong>, and <strong>social care tender writing</strong> in every commissioning route used by NHS trusts, integrated care boards, and local authorities.</p>
          <Link className="tl-btn-red" href="/contact">Book a Free Consultation</Link>
        </div>
      </section>

      {/* Specialist Cohorts Strip */}
      <section className="tl-cohorts" aria-labelledby="cohorts-eye">
        <div className="tl-cohorts-inner">
          <div>
            <div className="tl-cohorts-eye" id="cohorts-eye">Specialist Cohorts</div>
            <p>Seven specialist cohorts run across every care setting we write for. Each cohort carries its own evidence base, regulatory framework, and outcomes set.</p>
          </div>
          <div className="tl-cohorts-pills" role="list">
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#mental-health">Mental Health</Link>
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#learning-disabilities">Learning Disabilities</Link>
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#autism">Autism</Link>
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#substance-misuse">Substance Misuse</Link>
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#physical-disabilities">Physical Disabilities</Link>
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#older-people">Older People</Link>
            <Link className="tl-cohort-pill" role="listitem" href="/care-settings#forensic-high-risk">Forensic / High Risk</Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <main className="tl-timeline" aria-label="Four care setting categories">

        {/* 01 ADULT SOCIAL CARE : image left */}
        <article className="tl-step" id="adult-social-care">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Adult social care pathway across three swimlanes home-based community and residential with twelve setting cards">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="0" y="0" width="500" height="44" fill="#192231"/>
                  <text x="20" y="28" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="2">ADULT SOCIAL CARE · PATHWAY</text>
                  <rect x="378" y="10" width="106" height="24" rx="12" fill="#D4382C"/>
                  <text x="392" y="26" fontSize="10" fontWeight="800" fill="#fff" letterSpacing="1">12 SETTINGS</text>
                  <rect x="16" y="58" width="148" height="242" rx="6" fill="#fff" stroke="#eee"/>
                  <rect x="176" y="58" width="148" height="242" rx="6" fill="#fff" stroke="#eee"/>
                  <rect x="336" y="58" width="148" height="242" rx="6" fill="#fff" stroke="#eee"/>
                  <rect x="16" y="58" width="148" height="30" rx="6" fill="rgba(212,56,44,.08)"/>
                  <text x="36" y="78" fontSize="10" fontWeight="700" fill="#D4382C" letterSpacing="1.5">HOME-BASED</text>
                  <rect x="176" y="58" width="148" height="30" rx="6" fill="rgba(212,56,44,.08)"/>
                  <text x="200" y="78" fontSize="10" fontWeight="700" fill="#D4382C" letterSpacing="1.5">COMMUNITY</text>
                  <rect x="336" y="58" width="148" height="30" rx="6" fill="rgba(212,56,44,.08)"/>
                  <text x="358" y="78" fontSize="10" fontWeight="700" fill="#D4382C" letterSpacing="1.5">RESIDENTIAL</text>
                  {/* HOME-BASED column */}
                  <g>
                    <rect x="22" y="96" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <polygon points="32,120 42,110 52,120 52,128 32,128" fill="#192231"/>
                    <rect x="38" y="120" width="6" height="8" fill="#FAFAF5"/>
                    <text x="62" y="116" fontSize="10" fontWeight="700" fill="#192231">Domiciliary Care</text>
                    <text x="62" y="128" fontSize="8" fill="#6B7280">Hourly visits · own home</text>
                    <rect x="22" y="144" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <circle cx="42" cy="166" r="10" fill="#D4382C"/>
                    <text x="38" y="170" fontSize="11" fontWeight="800" fill="#fff">↑</text>
                    <text x="62" y="164" fontSize="10" fontWeight="700" fill="#192231">Reablement</text>
                    <text x="62" y="176" fontSize="8" fill="#6B7280">6-week intensive</text>
                    <rect x="22" y="192" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <polygon points="32,216 42,206 52,216 52,224 32,224" fill="#192231"/>
                    <circle cx="48" cy="222" r="2.5" fill="#D4382C"/>
                    <text x="62" y="212" fontSize="10" fontWeight="700" fill="#192231">Live-in Care</text>
                    <text x="62" y="224" fontSize="8" fill="#6B7280">24/7 in own home</text>
                    <rect x="22" y="240" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <circle cx="42" cy="262" r="10" fill="none" stroke="#D4382C" strokeWidth="2"/>
                    <circle cx="42" cy="262" r="3" fill="#D4382C"/>
                    <text x="62" y="260" fontSize="10" fontWeight="700" fill="#192231">Outreach Support</text>
                    <text x="62" y="272" fontSize="8" fill="#6B7280">Community-based contact</text>
                  </g>
                  {/* COMMUNITY column */}
                  <g>
                    <rect x="182" y="96" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <rect x="195" y="108" width="18" height="18" fill="#D4382C"/>
                    <line x1="195" y1="117" x2="213" y2="117" stroke="#fff" strokeWidth="1"/>
                    <line x1="204" y1="108" x2="204" y2="126" stroke="#fff" strokeWidth="1"/>
                    <text x="222" y="116" fontSize="10" fontWeight="700" fill="#192231">Supported Living</text>
                    <text x="222" y="128" fontSize="8" fill="#6B7280">Self-contained tenancies</text>
                    <rect x="182" y="144" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <rect x="195" y="156" width="18" height="18" fill="#192231"/>
                    <circle cx="204" cy="165" r="2" fill="#D4382C"/>
                    <text x="222" y="164" fontSize="10" fontWeight="700" fill="#192231">Extra Care</text>
                    <text x="222" y="176" fontSize="8" fill="#6B7280">Housing + on-site care</text>
                    <rect x="182" y="192" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <circle cx="204" cy="213" r="9" fill="#D4382C"/>
                    <text x="201" y="216" fontSize="10" fontWeight="800" fill="#fff">D</text>
                    <text x="222" y="212" fontSize="10" fontWeight="700" fill="#192231">Day Care</text>
                    <text x="222" y="224" fontSize="8" fill="#6B7280">Day services + transport</text>
                    <rect x="182" y="240" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <g fill="#192231"><rect x="194" y="252" width="18" height="18"/><circle cx="203" cy="261" r="3" fill="#D4382C"/></g>
                    <text x="222" y="260" fontSize="10" fontWeight="700" fill="#192231">Complex Care</text>
                    <text x="222" y="272" fontSize="8" fill="#6B7280">Multi-cohort packages</text>
                  </g>
                  {/* RESIDENTIAL column */}
                  <g>
                    <rect x="342" y="96" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <polygon points="350,116 362,104 374,116 374,128 350,128" fill="#192231"/>
                    <text x="382" y="116" fontSize="10" fontWeight="700" fill="#192231">Residential</text>
                    <text x="382" y="128" fontSize="8" fill="#6B7280">Care home · CQC regulated</text>
                    <rect x="342" y="144" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <polygon points="350,164 362,152 374,164 374,176 350,176" fill="#D4382C"/>
                    <text x="358" y="172" fontSize="9" fontWeight="800" fill="#fff">+</text>
                    <text x="382" y="164" fontSize="10" fontWeight="700" fill="#192231">Nursing Care</text>
                    <text x="382" y="176" fontSize="8" fill="#6B7280">RGN / RMN 24/7</text>
                    <rect x="342" y="192" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <polygon points="350,212 362,200 374,212 374,224 350,224" fill="#192231"/>
                    <text x="382" y="212" fontSize="10" fontWeight="700" fill="#192231">Dementia Care</text>
                    <text x="382" y="224" fontSize="8" fill="#6B7280">Specialist memory care</text>
                    <rect x="342" y="240" width="136" height="44" rx="4" fill="#fff" stroke="#192231" strokeWidth="1"/>
                    <polygon points="350,260 362,248 374,260 374,272 350,272" fill="#D4382C"/>
                    <text x="382" y="260" fontSize="10" fontWeight="700" fill="#192231">End of Life Care</text>
                    <text x="382" y="272" fontSize="8" fill="#6B7280">Palliative · NICE-aligned</text>
                  </g>
                  {/* Escalation arrows */}
                  <g stroke="#D4382C" strokeWidth="2" fill="#D4382C" data-draw="">
                    <line x1="164" y1="170" x2="180" y2="170" strokeLinecap="round"/>
                    <polygon points="180,164 188,170 180,176"/>
                    <line x1="324" y1="170" x2="340" y2="170" strokeLinecap="round"/>
                    <polygon points="340,164 348,170 340,176"/>
                  </g>
                  <text x="166" y="160" fontSize="8" fill="#6B7280" fontWeight="700" letterSpacing="1">STEP-UP</text>
                  <text x="326" y="160" fontSize="8" fill="#6B7280" fontWeight="700" letterSpacing="1">STEP-UP</text>
                  {/* CQC stamp footer */}
                  <rect x="16" y="316" width="232" height="64" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                  <circle cx="46" cy="348" r="22" fill="none" stroke="#D4382C" strokeWidth="2.5"/>
                  <text x="34" y="346" fontSize="10" fontWeight="800" fill="#D4382C">CQC</text>
                  <text x="32" y="358" fontSize="6" fontWeight="700" fill="#D4382C">REGULATED</text>
                  <text x="84" y="334" fontSize="10" fontWeight="700" fill="#192231">All 12 settings regulated</text>
                  <text x="84" y="350" fontSize="9" fill="#6B7280">Care Quality Commission</text>
                  <text x="84" y="364" fontSize="9" fill="#6B7280">Health &amp; Social Care Act 2008</text>
                  {/* Pathway metrics */}
                  <rect x="252" y="316" width="232" height="64" rx="6" fill="#192231"/>
                  <text x="266" y="334" fontSize="9" fontWeight="700" fill="#fff" letterSpacing="1.5">PATHWAY METRICS</text>
                  <line x1="266" y1="340" x2="470" y2="340" stroke="rgba(255,255,255,.12)"/>
                  <text x="266" y="364" fontSize="22" fontWeight="800" fill="#fff">12</text>
                  <text x="292" y="364" fontSize="9" fill="rgba(255,255,255,.7)">settings</text>
                  <text x="350" y="364" fontSize="22" fontWeight="800" fill="#D4382C">3</text>
                  <text x="370" y="364" fontSize="9" fill="rgba(255,255,255,.7)">zones</text>
                  <text x="416" y="364" fontSize="22" fontWeight="800" fill="#fff">7</text>
                  <text x="438" y="364" fontSize="9" fill="rgba(255,255,255,.7)">cohorts</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">01</span> Category</div>
            <h2 className="tl-step-title">Adult Social Care</h2>
            <p>The breadth of <strong>social care tender writing</strong> in England: from <strong>domiciliary care tender writing</strong> and reablement through <strong>supported living tender writing</strong> and extra care, into <strong>bid writing for care homes</strong>, nursing, and complex care. Twelve settings, each commissioned differently, each scored by different criteria, each written under the same scoring-led discipline by our <strong>social care bid writing consultants</strong>.</p>
            <p>Used by CQC-registered providers tendering into local authority frameworks, ICB call-offs, and direct award lots. <strong>CQC registered provider tender writing</strong> embedded in every submission.</p>
            <div className="tl-callout"><span className="tl-counter" data-target="12">0</span><span className="tl-lab">settings covered</span></div>
            <ul className="tl-chips">
              <li><Link href="/care-settings/domiciliary-care">Domiciliary Care</Link></li>
              <li><Link href="/care-settings/supported-living">Supported Living</Link></li>
              <li><Link href="/care-settings/residential-care">Residential Care</Link></li>
              <li><Link href="/care-settings/nursing-care">Nursing Care</Link></li>
              <li><Link href="/care-settings/reablement">Reablement</Link></li>
              <li><Link href="/care-settings/day-care">Day Care</Link></li>
              <li><Link href="/care-settings/live-in-care">Live-in Care</Link></li>
              <li><Link href="/care-settings/extra-care-housing">Extra Care Housing</Link></li>
              <li><Link href="/care-settings/outreach-support">Outreach Support</Link></li>
              <li><Link href="/care-settings/complex-care">Complex Care</Link></li>
              <li><Link href="/care-settings/dementia-care">Dementia Care</Link></li>
              <li><Link href="/care-settings/end-of-life-care">End of Life Care</Link></li>
            </ul>
            <Link className="tl-step-link" href="/care-settings/adult-social-care">Explore Adult Social Care settings &rarr;</Link>
          </div>
        </article>

        {/* 02 CHILDREN'S SERVICES : image right */}
        <article className="tl-step" id="childrens-services">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">02</span> Category</div>
            <h2 className="tl-step-title">Children&apos;s Services</h2>
            <p>Ofsted-registered settings, regulated supported accommodation for sixteen and seventeen year-olds, fostering, and SEND. <strong>Care services tender writing</strong> in the children&apos;s space turns on quality of care, safeguarding governance, transitions, and outcomes against the Quality Standards. Every method statement aligns to Ofsted&apos;s social care common inspection framework and to the commissioner&apos;s own KPI suite.</p>
            <p>Written for independent providers tendering into local authority frameworks, regional commissioning hubs, and DfE-funded supported accommodation lots.</p>
            <div className="tl-callout"><span className="tl-counter" data-target="6">0</span><span className="tl-lab">settings covered</span></div>
            <ul className="tl-chips">
              <li><Link href="/care-settings/childrens-residential">Children&apos;s Residential</Link></li>
              <li><Link href="/care-settings/supported-accommodation-16-25">Supported Accom. 16-25</Link></li>
              <li><Link href="/care-settings/fostering">Fostering</Link></li>
              <li><Link href="/care-settings/short-breaks">Short Breaks</Link></li>
              <li><Link href="/care-settings/family-support">Family Support</Link></li>
              <li><Link href="/care-settings/send-services">SEND Services</Link></li>
            </ul>
            <Link className="tl-step-link" href="/care-settings/childrens-services">Explore Children&apos;s Services settings &rarr;</Link>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Children's services age pathway with six setting bars positioned along a 0 to 25 age axis">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="0" y="0" width="500" height="44" fill="#192231"/>
                  <text x="20" y="28" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="2">CHILDREN&apos;S SERVICES · AGE PATHWAY</text>
                  <rect x="386" y="10" width="98" height="24" rx="12" fill="#D4382C"/>
                  <text x="402" y="26" fontSize="10" fontWeight="800" fill="#fff" letterSpacing="1">6 SETTINGS</text>
                  <text x="20" y="68" fontSize="9" fontWeight="700" fill="#192231" letterSpacing="1.5">AGE PATHWAY</text>
                  <text x="412" y="68" fontSize="9" fontWeight="700" fill="#6B7280" letterSpacing="1.5">YEARS 0 → 25</text>
                  <line x1="20" y1="84" x2="480" y2="84" stroke="#192231" strokeWidth="2"/>
                  <g stroke="#192231" strokeWidth="1">
                    <line x1="20" y1="78" x2="20" y2="90"/><line x1="112" y1="81" x2="112" y2="87"/>
                    <line x1="204" y1="78" x2="204" y2="90"/><line x1="296" y1="81" x2="296" y2="87"/>
                    <line x1="388" y1="78" x2="388" y2="90"/><line x1="480" y1="78" x2="480" y2="90"/>
                  </g>
                  <g fontSize="9" fontWeight="700" fill="#192231">
                    <text x="14" y="106">0</text><text x="106" y="106">5</text>
                    <text x="196" y="106">10</text><text x="288" y="106">16</text>
                    <text x="380" y="106">21</text><text x="472" y="106">25</text>
                  </g>
                  {/* Family Support: 0-18 */}
                  <rect x="20" y="120" width="386" height="32" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                  <rect x="20" y="120" width="386" height="32" rx="4" fill="rgba(212,56,44,.08)"/>
                  <rect x="20" y="120" width="6" height="32" fill="#D4382C"/>
                  <text x="36" y="138" fontSize="10" fontWeight="700" fill="#192231">FAMILY SUPPORT</text>
                  <text x="36" y="148" fontSize="8" fill="#6B7280">Early help · edge-of-care · CIN plans</text>
                  <rect x="372" y="125" width="30" height="22" rx="3" fill="#D4382C"/>
                  <text x="378" y="140" fontSize="8" fontWeight="800" fill="#fff" letterSpacing=".5">CA89</text>
                  {/* SEND: 0-25 */}
                  <rect x="20" y="158" width="460" height="32" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                  <rect x="20" y="158" width="460" height="32" rx="4" fill="rgba(212,56,44,.08)"/>
                  <rect x="20" y="158" width="6" height="32" fill="#D4382C"/>
                  <text x="36" y="176" fontSize="10" fontWeight="700" fill="#192231">SEND SERVICES</text>
                  <text x="36" y="186" fontSize="8" fill="#6B7280">EHCP · SEND Code of Practice · CFA 2014</text>
                  <rect x="446" y="163" width="30" height="22" rx="3" fill="#D4382C"/>
                  <text x="450" y="178" fontSize="8" fontWeight="800" fill="#fff" letterSpacing=".5">EHCP</text>
                  {/* Short Breaks: 0-18 */}
                  <rect x="20" y="196" width="386" height="32" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                  <rect x="20" y="196" width="386" height="32" rx="4" fill="rgba(212,56,44,.08)"/>
                  <rect x="20" y="196" width="6" height="32" fill="#D4382C"/>
                  <text x="36" y="214" fontSize="10" fontWeight="700" fill="#192231">SHORT BREAKS</text>
                  <text x="36" y="224" fontSize="8" fill="#6B7280">Respite · disabled children · Reg. 7</text>
                  <rect x="372" y="201" width="30" height="22" rx="3" fill="#D4382C"/>
                  <text x="382" y="216" fontSize="8" fontWeight="800" fill="#fff" letterSpacing=".5">SB</text>
                  {/* Fostering: 0-18 */}
                  <rect x="20" y="234" width="386" height="32" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                  <rect x="20" y="234" width="386" height="32" rx="4" fill="rgba(212,56,44,.16)"/>
                  <rect x="20" y="234" width="6" height="32" fill="#D4382C"/>
                  <text x="36" y="252" fontSize="10" fontWeight="700" fill="#192231">FOSTERING</text>
                  <text x="36" y="262" fontSize="8" fill="#6B7280">IFA · LAC · therapeutic · parent + child</text>
                  <rect x="372" y="239" width="30" height="22" rx="3" fill="#D4382C"/>
                  <text x="380" y="254" fontSize="8" fontWeight="800" fill="#fff" letterSpacing=".5">IFA</text>
                  {/* Children's Residential: 5-18 */}
                  <rect x="112" y="272" width="294" height="32" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                  <rect x="112" y="272" width="294" height="32" rx="4" fill="rgba(212,56,44,.16)"/>
                  <rect x="112" y="272" width="6" height="32" fill="#D4382C"/>
                  <text x="128" y="290" fontSize="10" fontWeight="700" fill="#192231">CHILDREN&apos;S RESIDENTIAL</text>
                  <text x="128" y="300" fontSize="8" fill="#6B7280">Solo · group · secure · Reg. 5</text>
                  <rect x="372" y="277" width="30" height="22" rx="3" fill="#D4382C"/>
                  <text x="384" y="292" fontSize="8" fontWeight="800" fill="#fff" letterSpacing=".5">RH</text>
                  {/* Supported Accom. 16-25 */}
                  <rect x="296" y="310" width="184" height="32" rx="4" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                  <rect x="296" y="310" width="184" height="32" rx="4" fill="rgba(212,56,44,.18)"/>
                  <rect x="296" y="310" width="6" height="32" fill="#D4382C"/>
                  <text x="312" y="328" fontSize="10" fontWeight="700" fill="#D4382C">SUPP. ACCOM. 16-25</text>
                  <text x="312" y="338" fontSize="8" fill="#6B7280">Regulated post-Oct 2023 · care leavers</text>
                  <rect x="446" y="315" width="30" height="22" rx="3" fill="#D4382C"/>
                  <text x="455" y="330" fontSize="8" fontWeight="800" fill="#fff" letterSpacing=".5">SA</text>
                  {/* Ofsted shield */}
                  <g transform="translate(20 354)">
                    <path d="M0 0 L40 0 L40 22 Q40 32 20 38 Q0 32 0 22 Z" fill="#192231"/>
                    <polygon points="20,8 23,15 31,15 25,20 27,28 20,23 13,28 15,20 9,15 17,15" fill="#D4382C" data-draw=""/>
                  </g>
                  <text x="70" y="370" fontSize="10" fontWeight="700" fill="#192231">OFSTED-REGULATED · SCCIF</text>
                  <text x="70" y="384" fontSize="9" fill="#6B7280">Quality Standards · social care common inspection framework</text>
                  <rect x="386" y="358" width="98" height="34" rx="4" fill="#D4382C"/>
                  <text x="398" y="374" fontSize="9" fontWeight="700" fill="#fff" letterSpacing="1.5">OUTCOMES</text>
                  <text x="398" y="388" fontSize="8" fill="rgba(255,255,255,.85)">Stability · education</text>
                </g>
              </svg>
            </div>
          </div>
        </article>

        {/* 03 HOUSING AND SUPPORT : image left */}
        <article className="tl-step" id="housing-and-support">
          <div className="tl-col tl-col-left">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Housing and support tenancy journey from crisis through refuge and supported housing into move-on">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="0" y="0" width="500" height="44" fill="#192231"/>
                  <text x="20" y="28" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="2">HOUSING &amp; SUPPORT · TENANCY JOURNEY</text>
                  <rect x="384" y="10" width="100" height="24" rx="12" fill="#D4382C"/>
                  <text x="402" y="26" fontSize="10" fontWeight="800" fill="#fff" letterSpacing="1">4 SETTINGS</text>
                  {/* Stage cards row */}
                  <g>
                    <rect x="22" y="64" width="112" height="98" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                    <rect x="22" y="64" width="112" height="22" rx="6" fill="#192231"/>
                    <text x="36" y="79" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">CRISIS</text>
                    <g transform="translate(76,114)">
                      <circle cx="0" cy="-6" r="6" fill="#D4382C"/>
                      <path d="M-12 4 L12 4 L8 16 L-8 16 Z" fill="#D4382C"/>
                    </g>
                    <text x="34" y="148" fontSize="9" fontWeight="700" fill="#192231">HOMELESSNESS</text>
                    <text x="34" y="158" fontSize="7" fill="#6B7280">Rough sleeping · single</text>
                    <rect x="142" y="64" width="112" height="98" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                    <rect x="142" y="64" width="112" height="22" rx="6" fill="#192231"/>
                    <text x="158" y="79" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">EMERGENCY</text>
                    <g transform="translate(198,118)">
                      <path d="M0 -14 L11 -10 L11 6 Q11 14 0 18 Q-11 14 -11 6 L-11 -10 Z" fill="#D4382C"/>
                      <text x="-4" y="6" fontSize="10" fontWeight="800" fill="#fff">R</text>
                    </g>
                    <text x="154" y="148" fontSize="9" fontWeight="700" fill="#192231">REFUGE &amp; DA</text>
                    <text x="156" y="158" fontSize="7" fill="#6B7280">Sanctuary · women&apos;s refuge</text>
                    <rect x="262" y="64" width="112" height="98" rx="6" fill="#fff" stroke="#192231" strokeWidth="1.5"/>
                    <rect x="262" y="64" width="112" height="22" rx="6" fill="#192231"/>
                    <text x="278" y="79" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">SUPPORTED</text>
                    <g transform="translate(318,114)">
                      <rect x="-10" y="-12" width="20" height="26" fill="#192231"/>
                      <rect x="-6" y="-8" width="12" height="22" fill="#FAFAF5"/>
                      <circle cx="4" cy="2" r="1.6" fill="#D4382C"/>
                      <path d="M-18 -16 Q0 -26 18 -16" fill="none" stroke="#D4382C" strokeWidth="2"/>
                    </g>
                    <text x="274" y="148" fontSize="9" fontWeight="700" fill="#192231">HOUSING SUPPORT</text>
                    <text x="276" y="158" fontSize="7" fill="#6B7280">Floating · tenancy sustain</text>
                    <rect x="382" y="64" width="96" height="98" rx="6" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                    <rect x="382" y="64" width="96" height="22" rx="6" fill="#D4382C"/>
                    <text x="394" y="79" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">INDEPENDENT</text>
                    <g transform="translate(430,114)">
                      <rect x="-10" y="-12" width="20" height="26" fill="#fff" stroke="#192231" strokeWidth="2"/>
                      <circle cx="2" cy="2" r="2" fill="#D4382C"/>
                      <text x="-4" y="24" fontSize="11" fontWeight="800" fill="#D4382C">✓</text>
                    </g>
                    <text x="396" y="148" fontSize="9" fontWeight="700" fill="#192231">MOVE-ON</text>
                    <text x="394" y="158" fontSize="7" fill="#6B7280">Resettlement · own tenancy</text>
                  </g>
                  {/* Journey axis */}
                  <line x1="44" y1="200" x2="468" y2="200" stroke="#192231" strokeWidth="3"/>
                  <polygon points="466,194 478,200 466,206" fill="#192231"/>
                  <g>
                    <circle cx="78" cy="200" r="16" fill="#D4382C"/>
                    <text x="71" y="205" fontSize="11" fontWeight="800" fill="#fff">01</text>
                    <circle cx="198" cy="200" r="16" fill="#192231"/>
                    <text x="191" y="205" fontSize="11" fontWeight="800" fill="#fff">02</text>
                    <circle cx="318" cy="200" r="16" fill="#D4382C"/>
                    <text x="311" y="205" fontSize="11" fontWeight="800" fill="#fff">03</text>
                    <circle cx="438" cy="200" r="16" fill="#192231"/>
                    <text x="431" y="205" fontSize="11" fontWeight="800" fill="#fff">04</text>
                  </g>
                  <g fontSize="8" fill="#6B7280" fontWeight="700" letterSpacing="1">
                    <text x="58" y="234" textAnchor="start">DAY 0</text>
                    <text x="174" y="234" textAnchor="start">WEEK 1-12</text>
                    <text x="290" y="234" textAnchor="start">MONTH 3-12</text>
                    <text x="414" y="234" textAnchor="start">MONTH 12+</text>
                  </g>
                  {/* Support arc */}
                  <path d="M78,184 Q258,142 438,184" fill="none" stroke="#D4382C" strokeWidth="2" strokeDasharray="5 4" data-draw=""/>
                  <rect x="226" y="148" width="64" height="22" rx="11" fill="#FAFAF5"/>
                  <text x="234" y="163" fontSize="10" fontWeight="700" fill="#D4382C" letterSpacing="2">SUPPORT</text>
                  {/* KPI panel */}
                  <rect x="22" y="252" width="456" height="128" rx="6" fill="#fff" stroke="#192231" strokeWidth="1"/>
                  <text x="36" y="272" fontSize="10" fontWeight="700" fill="#192231" letterSpacing="1.5">PATHWAY OUTCOMES</text>
                  <line x1="36" y1="278" x2="464" y2="278" stroke="#eee"/>
                  <g>
                    <text x="36" y="298" fontSize="9" fill="#6B7280" letterSpacing="1">TENANCIES SUSTAINED</text>
                    <text x="36" y="332" fontSize="32" fontWeight="800" fill="#D4382C">95<tspan fontSize="18" dy="-4">%</tspan></text>
                    <text x="36" y="354" fontSize="8" fill="#6B7280">12 months post move-on</text>
                    <text x="170" y="298" fontSize="9" fill="#6B7280" letterSpacing="1">MOVE-ON RATE</text>
                    <text x="170" y="332" fontSize="32" fontWeight="800" fill="#192231">68<tspan fontSize="18" dy="-4">%</tspan></text>
                    <text x="170" y="354" fontSize="8" fill="#6B7280">within 12 months</text>
                    <text x="294" y="298" fontSize="9" fill="#6B7280" letterSpacing="1">RE-PRESENT.</text>
                    <text x="294" y="332" fontSize="22" fontWeight="800" fill="#D4382C">↓ 42%</text>
                    <text x="294" y="354" fontSize="8" fill="#6B7280">vs sector baseline</text>
                    <text x="406" y="298" fontSize="9" fill="#6B7280" letterSpacing="1">SECTOR</text>
                    <text x="406" y="320" fontSize="13" fontWeight="800" fill="#192231">MHCLG</text>
                    <text x="406" y="334" fontSize="9" fill="#6B7280">RSI · CHAIN</text>
                    <text x="406" y="346" fontSize="9" fill="#6B7280">DAHA</text>
                  </g>
                  <rect x="22" y="368" width="456" height="2" fill="#D4382C"/>
                  <text x="36" y="385" fontSize="8" fill="#6B7280" fontWeight="700" letterSpacing="1.5">HRS FUNDING · HOUSING SUPPORT GRANT · ROUGH SLEEPING INITIATIVE</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-eyebrow"><span className="tl-num">03</span> Category</div>
            <h2 className="tl-step-title">Housing and Support</h2>
            <p>Commissioned housing-led services where the contract scores on tenancy sustainment, harm reduction, and move-on. We write to local authority housing-related support specifications, MHCLG-funded rough sleeping initiatives, and homelessness pathway lots. Each submission is structured to evidence the Quality Statements commissioners use to differentiate tenders inside a saturated market.</p>
            <p>Used by housing associations, registered providers, and specialist support providers tendering into county and unitary commissioning routes.</p>
            <div className="tl-callout"><span className="tl-counter" data-target="4">0</span><span className="tl-lab">settings covered</span></div>
            <ul className="tl-chips">
              <li><Link href="/care-settings/homelessness-services">Homelessness Services</Link></li>
              <li><Link href="/care-settings/refuge-domestic-abuse">Refuge &amp; Domestic Abuse</Link></li>
              <li><Link href="/care-settings/housing-support">Housing Support</Link></li>
              <li><Link href="/care-settings/move-on-accommodation">Move-on Accommodation</Link></li>
            </ul>
            <Link className="tl-step-link" href="/care-settings/housing-and-support">Explore Housing and Support settings &rarr;</Link>
          </div>
        </article>

        {/* 04 HEALTH AND CLINICAL SERVICES : image right */}
        <article className="tl-step" id="health-and-clinical-services">
          <div className="tl-col tl-col-left">
            <div className="tl-eyebrow"><span className="tl-num">04</span> Category</div>
            <h2 className="tl-step-title">Health and Clinical Services</h2>
            <p>The clinical end of UK public sector procurement: <strong>NHS tender writing</strong> for community services, continuing healthcare packages, hospital discharge, mental health, substance misuse, and rehabilitation. Specifications carry NHS Standard Contract obligations, CQUIN-style improvement schedules, and integrated care board KPI suites; our <strong>healthcare bid consultants</strong> write each method statement to evidence them all.</p>
            <p><strong>Healthcare procurement bid writing</strong>, <strong>NHS bid writing services</strong>, and <strong>contract bid writing healthcare</strong> are delivered under the same scoring-led discipline that runs across every category.</p>
            <div className="tl-callout"><span className="tl-counter" data-target="6">0</span><span className="tl-lab">settings covered</span></div>
            <ul className="tl-chips">
              <li><Link href="/care-settings/nhs-community-services">NHS Community Services</Link></li>
              <li><Link href="/care-settings/continuing-healthcare">Continuing Healthcare (CHC)</Link></li>
              <li><Link href="/care-settings/hospital-discharge">Hospital Discharge</Link></li>
              <li><Link href="/care-settings/mental-health-services">Mental Health Services</Link></li>
              <li><Link href="/care-settings/substance-misuse">Substance Misuse</Link></li>
              <li><Link href="/care-settings/rehabilitation">Rehabilitation</Link></li>
            </ul>
            <Link className="tl-step-link" href="/care-settings/health-and-clinical-services">Explore Health and Clinical Services settings &rarr;</Link>
          </div>
          <div className="tl-center"><span className="tl-dot" aria-hidden="true" /></div>
          <div className="tl-col tl-col-right">
            <div className="tl-visual">
              <svg viewBox="0 0 500 400" role="img" aria-label="Health and clinical services NHS pathway with ECG heartbeat across three zones community integrated care and acute step-down">
                <rect width="500" height="400" fill="#FAFAF5"/>
                <g fontFamily="Inter, sans-serif">
                  <rect x="0" y="0" width="500" height="44" fill="#192231"/>
                  <text x="20" y="28" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="2">HEALTH &amp; CLINICAL · NHS PATHWAY</text>
                  <rect x="386" y="10" width="98" height="24" rx="12" fill="#D4382C"/>
                  <text x="402" y="26" fontSize="10" fontWeight="800" fill="#fff" letterSpacing="1">6 SETTINGS</text>
                  {/* Zone backgrounds */}
                  <rect x="16" y="58" width="152" height="222" rx="6" fill="rgba(25,34,49,.03)"/>
                  <rect x="176" y="58" width="148" height="222" rx="6" fill="rgba(212,56,44,.06)"/>
                  <rect x="332" y="58" width="152" height="222" rx="6" fill="rgba(25,34,49,.03)"/>
                  {/* Zone headers */}
                  <g fontWeight="700" letterSpacing="1.5">
                    <rect x="16" y="58" width="152" height="28" rx="6" fill="rgba(212,56,44,.08)"/>
                    <text x="36" y="77" fontSize="10" fill="#D4382C">COMMUNITY</text>
                    <rect x="176" y="58" width="148" height="28" rx="6" fill="rgba(212,56,44,.12)"/>
                    <text x="194" y="77" fontSize="10" fill="#D4382C">INTEGRATED CARE</text>
                    <rect x="332" y="58" width="152" height="28" rx="6" fill="rgba(212,56,44,.08)"/>
                    <text x="350" y="77" fontSize="10" fill="#D4382C">ACUTE / STEP-DOWN</text>
                  </g>
                  {/* ECG heartbeat line */}
                  <path d="M16 178 L60 178 L72 178 L80 160 L86 200 L94 128 L102 200 L110 178 L154 178 L170 178 L180 178 L188 165 L196 190 L204 175 L240 175 L252 175 L260 140 L268 210 L276 175 L312 175 L332 175 L344 175 L352 162 L360 188 L368 175 L412 175 L432 175 L440 152 L448 198 L456 175 L484 175"
                    fill="none" stroke="#D4382C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-draw=""/>
                  {/* COMMUNITY ZONE */}
                  <g>
                    <rect x="22" y="98" width="140" height="50" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                    <rect x="22" y="98" width="4" height="50" fill="#D4382C"/>
                    <text x="34" y="116" fontSize="10" fontWeight="700" fill="#192231">NHS Community</text>
                    <text x="34" y="128" fontSize="8" fill="#6B7280">District nursing · therapy</text>
                    <rect x="120" y="132" width="36" height="12" rx="2" fill="#192231"/>
                    <text x="127" y="141" fontSize="7" fontWeight="700" fill="#fff" letterSpacing=".5">NHS-SC</text>
                    <rect x="22" y="208" width="140" height="50" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                    <rect x="22" y="208" width="4" height="50" fill="#D4382C"/>
                    <text x="34" y="226" fontSize="10" fontWeight="700" fill="#192231">Mental Health</text>
                    <text x="34" y="238" fontSize="8" fill="#6B7280">CMHT · community recovery</text>
                    <rect x="120" y="242" width="36" height="12" rx="2" fill="#D4382C"/>
                    <text x="127" y="251" fontSize="7" fontWeight="700" fill="#fff" letterSpacing=".5">CMHT</text>
                    <rect x="22" y="262" width="140" height="14" rx="3" fill="rgba(25,34,49,.05)"/>
                    <text x="32" y="273" fontSize="9" fontWeight="700" fill="#192231">Substance Misuse</text>
                    <circle cx="148" cy="269" r="4" fill="#D4382C"/>
                  </g>
                  {/* INTEGRATED CARE ZONE */}
                  <g>
                    <rect x="182" y="98" width="136" height="50" rx="4" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                    <rect x="182" y="98" width="4" height="50" fill="#D4382C"/>
                    <text x="194" y="116" fontSize="10" fontWeight="700" fill="#D4382C">Continuing HC</text>
                    <text x="194" y="128" fontSize="8" fill="#6B7280">CHC packages · PHB</text>
                    <rect x="280" y="132" width="32" height="12" rx="2" fill="#D4382C"/>
                    <text x="287" y="141" fontSize="7" fontWeight="700" fill="#fff" letterSpacing=".5">CHC</text>
                    <rect x="182" y="208" width="136" height="50" rx="4" fill="#fff" stroke="#D4382C" strokeWidth="2"/>
                    <rect x="182" y="208" width="4" height="50" fill="#D4382C"/>
                    <text x="194" y="226" fontSize="10" fontWeight="700" fill="#D4382C">Hospital Discharge</text>
                    <text x="194" y="238" fontSize="8" fill="#6B7280">D2A · 4-pathway model</text>
                    <rect x="280" y="242" width="32" height="12" rx="2" fill="#192231"/>
                    <text x="288" y="251" fontSize="7" fontWeight="700" fill="#fff" letterSpacing=".5">D2A</text>
                  </g>
                  {/* ACUTE / STEP-DOWN ZONE */}
                  <g>
                    <rect x="338" y="98" width="140" height="50" rx="4" fill="#fff" stroke="#192231" strokeWidth="1.2"/>
                    <rect x="338" y="98" width="4" height="50" fill="#D4382C"/>
                    <text x="350" y="116" fontSize="10" fontWeight="700" fill="#192231">Rehabilitation</text>
                    <text x="350" y="128" fontSize="8" fill="#6B7280">Step-down · neuro-rehab</text>
                    <rect x="436" y="132" width="38" height="12" rx="2" fill="#D4382C"/>
                    <text x="443" y="141" fontSize="7" fontWeight="700" fill="#fff" letterSpacing=".5">REHAB</text>
                    <rect x="338" y="208" width="140" height="50" rx="4" fill="#192231"/>
                    <text x="350" y="226" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1">42 ICBs</text>
                    <text x="350" y="238" fontSize="8" fill="rgba(255,255,255,.65)">Integrated Care Boards</text>
                    <text x="350" y="250" fontSize="8" fill="rgba(255,255,255,.65)">England-wide</text>
                  </g>
                  {/* ECG label */}
                  <g>
                    <rect x="332" y="262" width="146" height="14" rx="3" fill="rgba(212,56,44,.08)"/>
                    <text x="342" y="273" fontSize="8" fontWeight="700" fill="#D4382C" letterSpacing="1.5">ECG · PATIENT FLOW</text>
                  </g>
                  {/* NHS commissioning alignment footer */}
                  <rect x="16" y="294" width="468" height="90" rx="6" fill="#fff" stroke="#192231" strokeWidth="1"/>
                  <text x="30" y="314" fontSize="10" fontWeight="700" fill="#192231" letterSpacing="1.5">NHS COMMISSIONING ALIGNMENT</text>
                  <line x1="30" y1="320" x2="470" y2="320" stroke="#eee"/>
                  <g>
                    <text x="30" y="340" fontSize="9" fill="#6B7280" letterSpacing="1">CONTRACT</text>
                    <text x="30" y="362" fontSize="13" fontWeight="800" fill="#192231">NHS Standard</text>
                    <text x="30" y="376" fontSize="8" fill="#6B7280">Schedule 2A-2G</text>
                    <text x="148" y="340" fontSize="9" fill="#6B7280" letterSpacing="1">FUNDING</text>
                    <text x="148" y="362" fontSize="13" fontWeight="800" fill="#192231">ICB · NHSE</text>
                    <text x="148" y="376" fontSize="8" fill="#6B7280">CHC delegated</text>
                    <text x="252" y="340" fontSize="9" fill="#6B7280" letterSpacing="1">FRAMEWORK</text>
                    <text x="252" y="362" fontSize="13" fontWeight="800" fill="#D4382C">CQUIN-aligned</text>
                    <text x="252" y="376" fontSize="8" fill="#6B7280">2024/25 cycle</text>
                    <text x="380" y="340" fontSize="9" fill="#6B7280" letterSpacing="1">REGULATOR</text>
                    <text x="380" y="362" fontSize="13" fontWeight="800" fill="#192231">CQC &amp; NHS</text>
                    <text x="380" y="376" fontSize="8" fill="#6B7280">SAF-aligned</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </article>

      </main>

      {/* Closing CTA */}
      <section className="tl-closer">
        <div className="tl-eye">Get Started</div>
        <h2>Ready to Win in Your Care Setting?</h2>
        <p>Tell us which setting you are targeting and we will show you exactly how we approach it.</p>
        <div className="tl-closer-actions">
          <Link className="tl-btn-white" href="/contact">Book a Free Consultation</Link>
          <Link className="tl-alt" href="/services">View All Services</Link>
        </div>
      </section>

      <TimelineScroll steps={STEPS} />
    </div>
  )
}
