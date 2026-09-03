import { Metadata } from "next";
import Link from "next/link";
import LegalHeroVisual from "@/components/LegalHeroVisual";

export const metadata: Metadata = {
  title: "Privacy Policy | TenderLab",
  description:
    "How TenderLab Ltd collects, uses and protects your personal data under UK GDPR, the Data Protection Act 2018 and PECR. Last updated 5 June 2026.",
  alternates: { canonical: "https://www.tenderlab.co.uk/privacy-policy" },
  robots: { index: true, follow: true },
};

const sections = [
  { id: "sec-01", n: "01", t: "Who we are" },
  { id: "sec-02", n: "02", t: "Personal data we collect" },
  { id: "sec-03", n: "03", t: "Lawful basis under UK GDPR" },
  { id: "sec-04", n: "04", t: "How we use your data" },
  { id: "sec-05", n: "05", t: "Who we share data with" },
  { id: "sec-06", n: "06", t: "International transfers" },
  { id: "sec-07", n: "07", t: "Data retention" },
  { id: "sec-08", n: "08", t: "Your rights" },
  { id: "sec-09", n: "09", t: "Cookies and PECR consent" },
  { id: "sec-10", n: "10", t: "Children's data" },
  { id: "sec-11", n: "11", t: "Security measures" },
  { id: "sec-12", n: "12", t: "Changes to this notice" },
  { id: "sec-13", n: "13", t: "Complaints and the ICO" },
  { id: "sec-14", n: "14", t: "Contact the Data Protection Lead" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: "https://www.tenderlab.co.uk/privacy-policy",
            inLanguage: "en-GB",
            publisher: { "@id": "https://www.tenderlab.co.uk/#organization" },
            dateModified: "2026-06-05",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.tenderlab.co.uk" },
              { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://www.tenderlab.co.uk/privacy-policy" },
            ],
          }),
        }}
      />

      <div className="he-wrap">
        <div className="container">
          <div className="he-hero">
            <p className="he-eyebrow">Legal</p>
            <h1 className="he-title">Privacy Policy</h1>
            <p className="he-sub">
              How TenderLab Ltd collects, uses and protects your personal data under the
              UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018
              and the Privacy and Electronic Communications Regulations 2003 (PECR).
            </p>
            <p className="he-meta">Last updated: 5 June 2026</p>
          </div>

          <div className="he-grid he-grid--3col">
            <aside className="he-toc-col">
              <nav className="he-toc" aria-label="On this page">
                <div className="he-toc__label">On this page</div>
                <ul className="he-toc__list">
                  {sections.map((s, i) => (
                    <li key={s.id} className={`he-toc__item${i === 0 ? " is-active" : ""}`}>
                      <a href={`#${s.id}`} className="he-toc__link">
                        <span className="he-toc__n">{s.n}</span>
                        <span className="he-toc__text">{s.t}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <main className="he-content-col">
              <section className="cs-block" id="sec-01">
                <h2><span className="num">Section 01</span>Who we are</h2>
                <p>
                  TenderLab is a trading name of <strong>TenderLab Ltd</strong>, a private limited company
                  registered in England and Wales under Companies House number <strong>17184263</strong>.
                  Our registered office is 128 City Road, London, EC1V 2NX.
                </p>
                <p>
                  TenderLab Ltd is the <strong>data controller</strong> for the personal data described in this notice
                  under <a href="https://www.legislation.gov.uk/eur/2016/679/contents" target="_blank" rel="noopener noreferrer">UK GDPR</a>
                  {" "}and the <a href="https://www.legislation.gov.uk/ukpga/2018/12/contents" target="_blank" rel="noopener noreferrer">Data Protection Act 2018</a>.
                </p>
                <p>
                  For data protection enquiries email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a> or write to
                  Data Protection Lead, TenderLab Ltd, 128 City Road, London, EC1V 2NX.
                </p>
              </section>

              <section className="cs-block" id="sec-02">
                <h2><span className="num">Section 02</span>Personal data we collect</h2>
                <p>We collect personal data only when you provide it or when it is necessary to deliver our services.</p>
                <p><strong>Contact data.</strong> When you submit the consultation form, email us, message us, call us or book a meeting, we collect your name, work email address, phone number, organisation name, job role, sector and the contents of your enquiry.</p>
                <p><strong>Engagement data.</strong> Once you become a client, we collect company contact details, tender specifications you share with us, draft response content, verified evidence used to populate your submission (CQC ratings, Ofsted ratings, case examples, audit data, training records), commissioner contacts you nominate and correspondence between us.</p>
                <p><strong>Financial data.</strong> For invoicing we hold billing contact, billing address, VAT number where applicable and bank reference details. We do not store card numbers; payment is processed by your bank or accounts payable team.</p>
                <p><strong>Site analytics.</strong> Anonymised page views, referring URL, device type, browser and approximate location at regional level. We do not capture personally identifying information through analytics.</p>
                <p><strong>Cookies and similar technologies.</strong> Strictly necessary cookies to deliver the site, and optional analytics cookies you accept via the consent banner. See <a href="#sec-09">Section 09</a>.</p>
                <p><strong>Marketing data.</strong> If you tick the marketing checkbox on a form or subscribe to our newsletter, we hold your email address, name and the date you opted in.</p>
              </section>

              <section className="cs-block" id="sec-03">
                <h2><span className="num">Section 03</span>Lawful basis under UK GDPR</h2>
                <p>UK GDPR Article 6 requires a lawful basis for every processing activity. The bases we rely on for each purpose are set out below.</p>
                <p><strong>Consent (Article 6(1)(a)).</strong> Marketing newsletter sign-up; optional analytics cookies. You can withdraw consent at any time without affecting the lawfulness of processing before withdrawal.</p>
                <p><strong>Contract (Article 6(1)(b)).</strong> Delivery of the consultancy services set out in your engagement letter, invoicing under that engagement and the steps necessary before entering the contract.</p>
                <p><strong>Legitimate interest (Article 6(1)(f)).</strong> Responding to a business enquiry you sent us; anonymised site analytics; contacting existing or recent clients about closely related services. We balance our interest against your rights and you can object at any time.</p>
                <p><strong>Legal obligation (Article 6(1)(c)).</strong> Retaining financial records under HMRC and Companies House rules; responses to lawful regulator or court requests.</p>
                <p>
                  Where we collect special category data (rarely; only when included in evidence you share with us for a bid), we rely on Article 9(2)(a) explicit consent and Schedule 1 of
                  the <a href="https://www.legislation.gov.uk/ukpga/2018/12/contents" target="_blank" rel="noopener noreferrer">Data Protection Act 2018</a>.
                </p>
              </section>

              <section className="cs-block" id="sec-04">
                <h2><span className="num">Section 04</span>How we use your data</h2>
                <p>We use the personal data we hold only for the purposes set out below.</p>
                <ul>
                  <li>Respond to enquiries and arrange an initial discussion about the opportunity or support required.</li>
                  <li>Deliver tender qualification, bid writing, pre-submission review, lost bid debrief, tender readiness, training, retained tender support and mobilisation support under your engagement letter.</li>
                  <li>Manage the day-to-day client relationship: scheduling, draft reviews, version control, evidence verification, sign-off and submission.</li>
                  <li>Send service updates relating to your active engagement (deadline reminders, draft review prompts, mobilisation alerts).</li>
                  <li>Send marketing communications where you have given consent. Every marketing email has a one-click unsubscribe link.</li>
                  <li>Invoice you and keep financial records as required by HMRC and the Companies Act 2006.</li>
                  <li>Comply with our legal obligations, including anti-money-laundering checks and responses to lawful regulator or court requests.</li>
                  <li>Improve our website and content through anonymised analytics.</li>
                </ul>
              </section>

              <section className="cs-block" id="sec-05">
                <h2><span className="num">Section 05</span>Who we share data with</h2>
                <p>We do not sell your data and we do not share it for unrelated marketing. We share it only with the recipients below, each bound by written agreements that meet UK GDPR Article 28.</p>
                <ul>
                  <li><strong>Hosting and CDN:</strong> Vercel Inc. (United States, with UK Data Bridge safeguards) and Cloudflare Inc.</li>
                  <li><strong>Email and document storage:</strong> Google LLC (Google Workspace).</li>
                  <li><strong>Accounting and bookkeeping:</strong> our accountants for statutory reporting under the Companies Act 2006 and HMRC rules.</li>
                  <li><strong>Payment infrastructure:</strong> Stripe for secure card payments, and our bank and your bank or accounts payable provider for invoice settlement. TenderLab does not receive or store complete card details.</li>
                  <li><strong>Appointment scheduling:</strong> Calendly for selecting an available appointment and issuing booking confirmations. Where enabled on the event, Google Calendar and Google Meet provide the calendar invitation and online meeting link.</li>
                  <li><strong>Professional advisors:</strong> legal, insurance and indemnity advisors on a need-to-know basis.</li>
                  <li><strong>Regulators, law enforcement or courts:</strong> where we are legally compelled to disclose.</li>
                  <li><strong>A successor entity:</strong> in the event of a merger, acquisition or sale of business, subject to confidentiality safeguards.</li>
                </ul>
                <p>Each processor is contractually bound to process your data only on our documented instructions, maintain confidentiality, apply appropriate security measures and assist us with subject rights requests.</p>
              </section>

              <section className="cs-block" id="sec-06">
                <h2><span className="num">Section 06</span>International transfers</h2>
                <p>Our infrastructure providers may transfer or store data outside the UK, primarily in the European Economic Area and the United States.</p>
                <p>Where data leaves the UK we rely on the following safeguards under UK GDPR Chapter V.</p>
                <ul>
                  <li>The UK's <strong>adequacy regulations</strong> for transfers to the EEA and other approved third countries.</li>
                  <li>The <strong>UK-US Data Bridge</strong> for transfers to participating US recipients certified under the UK extension to the EU-US Data Privacy Framework.</li>
                  <li>The <strong>UK International Data Transfer Agreement (IDTA)</strong> or the EU Standard Contractual Clauses with the UK Addendum for other recipients.</li>
                </ul>
                <p>You can request a copy of the relevant safeguards by emailing the Data Protection Lead.</p>
              </section>

              <section className="cs-block" id="sec-07">
                <h2><span className="num">Section 07</span>Data retention</h2>
                <p>We retain personal data only as long as we need it.</p>
                <p><strong>Consultation enquiries.</strong> 24 months from the date of last contact, then deleted, unless you become a client.</p>
                <p><strong>Active client files.</strong> Duration of the engagement plus <strong>7 years</strong> for HMRC, contractual record-keeping and limitation period purposes. Tender drafts are archived at this point, not deleted, in case of re-bids.</p>
                <p><strong>Marketing subscriber data.</strong> Until you unsubscribe, with an annual review to remove inactive subscribers (no engagement in 24 months).</p>
                <p><strong>Financial records.</strong> 7 years from the end of the relevant accounting period under the Companies Act 2006 and HMRC rules.</p>
                <p><strong>Site analytics.</strong> Anonymised aggregates only; retained at most 26 months.</p>
              </section>

              <section className="cs-block" id="sec-08">
                <h2><span className="num">Section 08</span>Your rights</h2>
                <p>UK GDPR Articles 15 to 22 give you the following rights over your personal data.</p>
                <ul>
                  <li><strong>Right of access (Article 15)</strong> - a copy of the data we hold about you.</li>
                  <li><strong>Right to rectification (Article 16)</strong> - correction of inaccurate or incomplete data.</li>
                  <li><strong>Right to erasure (Article 17)</strong> - "right to be forgotten" where the legal grounds apply.</li>
                  <li><strong>Right to restriction (Article 18)</strong> - while we investigate an accuracy or lawfulness concern.</li>
                  <li><strong>Right to data portability (Article 20)</strong> - for data you provided under consent or contract, in a structured, machine-readable format.</li>
                  <li><strong>Right to object (Article 21)</strong> - to processing based on legitimate interest, including profiling, and an absolute right to object to direct marketing.</li>
                  <li><strong>Rights relating to automated decision-making (Article 22)</strong> - we do not make automated decisions that produce legal or similarly significant effects about you.</li>
                  <li><strong>Right to withdraw consent</strong> at any time, without affecting the lawfulness of processing before withdrawal.</li>
                </ul>
                <p>
                  To exercise any of these rights, email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>. We respond within one calendar month as required by UK GDPR Article 12. Complex or multiple requests may be extended by two further months; if so, we will tell you within the first month.
                </p>
              </section>

              <section className="cs-block" id="sec-09">
                <h2><span className="num">Section 09</span>Cookies and PECR consent</h2>
                <p>The <a href="https://www.legislation.gov.uk/uksi/2003/2426/contents" target="_blank" rel="noopener noreferrer">Privacy and Electronic Communications Regulations 2003</a> (PECR) govern cookies and electronic marketing. This site uses two categories of cookie.</p>
                <p><strong>Strictly necessary cookies.</strong> Required to deliver the page, remember your consent choices and protect against fraud. PECR Regulation 6(4) does not require consent for these.</p>
                <p><strong>Optional analytics cookies.</strong> Google Analytics is loaded only after you accept this category. It helps us understand page visits, navigation and site performance using aggregated usage information. If you reject analytics, the analytics script is not loaded.</p>
                <p><strong>Booking services.</strong> If you choose to book, the confirmation page can load Calendly so you can select a genuine available appointment. Paid services redirect to Stripe Checkout. These services may use cookies or similar storage required to complete the booking, prevent fraud and remember the transaction.</p>
                <p>We do not use third-party advertising cookies, behavioural advertising cookies or cross-site tracking pixels.</p>
                <div className="he-cookie-table" role="region" aria-label="TenderLab cookie categories">
                  <div><strong>Necessary</strong><span>Consent preference and essential site operation</span><em>Always active</em></div>
                  <div><strong>Analytics</strong><span>Google Analytics page and navigation measurement</span><em>Optional</em></div>
                </div>
                <p>Use the <strong>Cookie settings</strong> control at the bottom of any page to review, accept or withdraw analytics consent whenever you choose.</p>
                <p>Marketing emails are sent only with prior consent (PECR Regulation 22) or to existing customers about closely related services with a one-click unsubscribe (the "soft opt-in").</p>
              </section>

              <section className="cs-block" id="sec-10">
                <h2><span className="num">Section 10</span>Children's data</h2>
                <p>Our services are sold to businesses operating in UK health and social care. The site and our forms are not directed at children and we do not knowingly collect personal data from anyone under 18. If you believe we hold data about a child, contact us and we will delete it without delay.</p>
              </section>

              <section className="cs-block" id="sec-11">
                <h2><span className="num">Section 11</span>Security measures</h2>
                <p>We apply technical and organisational measures appropriate to the risk under UK GDPR Article 32.</p>
                <ul>
                  <li>Encrypted in transit (TLS 1.2 or higher) and at rest across our hosting and document storage.</li>
                  <li>Multi-factor authentication on all staff accounts and on infrastructure consoles.</li>
                  <li>Role-based access controls on shared drives and case files.</li>
                  <li>Confidentiality clauses in every employment, contractor and processor agreement.</li>
                  <li>Documented incident response procedure including notification to the ICO within 72 hours of becoming aware of a notifiable personal data breach (UK GDPR Article 33).</li>
                  <li>Annual review of access rights, retention and processor due diligence.</li>
                </ul>
              </section>

              <section className="cs-block" id="sec-12">
                <h2><span className="num">Section 12</span>Changes to this notice</h2>
                <p>We review this notice at least annually and update it when our processing changes. The "Last updated" date at the top of the page records the most recent change. Material changes are communicated by email to active clients and by a banner on the site.</p>
              </section>

              <section className="cs-block" id="sec-13">
                <h2><span className="num">Section 13</span>Complaints and the ICO</h2>
                <p>If you are unhappy with how we have handled your personal data, contact the Data Protection Lead first so we can put it right.</p>
                <p>You also have the right to complain to the <strong>Information Commissioner's Office</strong>, the UK supervisory authority for data protection.</p>
                <p>
                  Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF.
                  Telephone <strong>0303 123 1113</strong>.
                  Online <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk/make-a-complaint</a>.
                </p>
              </section>

              <section className="cs-block" id="sec-14">
                <h2><span className="num">Section 14</span>Contact the Data Protection Lead</h2>
                <p>
                  Email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a> or write to
                  Data Protection Lead, TenderLab Ltd, 128 City Road, London, EC1V 2NX.
                </p>
                <p>
                  TenderLab Ltd. Companies House <strong>17184263</strong>. Registered office: 128 City Road, London, EC1V 2NX.
                  See also our <Link href="/terms">Terms of Service</Link> and <Link href="/contact">Contact</Link> page.
                </p>
              </section>
            </main>

            <aside className="he-side" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
