import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | TenderLab",
  description:
    "TenderLab Ltd Terms of Service for tender writing, bid writing and consultancy engagements in UK health and social care. Last updated 5 June 2026.",
  alternates: { canonical: "https://www.tenderlab.co.uk/terms" },
  robots: { index: true, follow: true },
};

const sections = [
  { id: "sec-01", n: "01", t: "Who we are" },
  { id: "sec-02", n: "02", t: "Acceptance and version" },
  { id: "sec-03", n: "03", t: "Services we provide" },
  { id: "sec-04", n: "04", t: "Engagement formation" },
  { id: "sec-05", n: "05", t: "Fees and payment" },
  { id: "sec-06", n: "06", t: "Refund and cancellation policy" },
  { id: "sec-07", n: "07", t: "Intellectual property" },
  { id: "sec-08", n: "08", t: "Confidentiality" },
  { id: "sec-09", n: "09", t: "Conflicts of interest" },
  { id: "sec-10", n: "10", t: "Warranties and disclaimers" },
  { id: "sec-11", n: "11", t: "Limitation of liability" },
  { id: "sec-12", n: "12", t: "Indemnity" },
  { id: "sec-13", n: "13", t: "Termination" },
  { id: "sec-14", n: "14", t: "Force majeure" },
  { id: "sec-15", n: "15", t: "Data protection" },
  { id: "sec-16", n: "16", t: "Anti-bribery, modern slavery, equality" },
  { id: "sec-17", n: "17", t: "Governing law" },
  { id: "sec-18", n: "18", t: "Changes and contact" },
];

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Service",
            url: "https://www.tenderlab.co.uk/terms",
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
              { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://www.tenderlab.co.uk/terms" },
            ],
          }),
        }}
      />

      <div className="he-wrap">
        <div className="container">
          <div className="he-hero">
            <p className="he-eyebrow">Legal</p>
            <h1 className="he-title">Terms of Service</h1>
            <p className="he-sub">
              The contractual terms under which TenderLab Ltd provides tender writing, bid
              writing and consultancy services to UK health and social care providers. Drafted
              under the laws of England and Wales.
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
                  These terms are issued by <strong>TenderLab Ltd</strong>, a private limited company
                  registered in England and Wales under Companies House number <strong>17184263</strong>,
                  with registered office at 128 City Road, London, EC1V 2NX. TenderLab is our trading name.
                </p>
                <p>
                  References to "we", "us" and "our" mean TenderLab Ltd. References to "you" and "your"
                  mean the client identified in the engagement letter or the user of this site.
                </p>
                <p>
                  Email <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>.
                </p>
              </section>

              <section className="cs-block" id="sec-02">
                <h2><span className="num">Section 02</span>Acceptance and version</h2>
                <p>
                  By using this website or engaging our services you agree to these terms. If you do not
                  accept them, do not use the site or our services. These terms are made available under
                  the <a href="https://www.legislation.gov.uk/uksi/2002/2013/contents" target="_blank" rel="noopener noreferrer">Electronic Commerce (EC Directive) Regulations 2002</a>.
                </p>
                <p>
                  The version on this page at the date of your engagement applies for the duration of that
                  engagement. Material updates affecting a live engagement will be notified to you in
                  writing and require your written agreement to apply. For site visitors, the most recent
                  version applies from the "Last updated" date at the top of the page.
                </p>
              </section>

              <section className="cs-block" id="sec-03">
                <h2><span className="num">Section 03</span>Services we provide</h2>
                <p>We provide the following services for UK health and social care providers.</p>
                <ul>
                  <li><strong>Tender writing and bid writing</strong> for adult social care, children's residential, supported accommodation, supported living, complex care, Continuing Healthcare and other regulated and non-regulated services.</li>
                  <li><strong>Bid strategy and pre-submission review</strong> by an evaluator-perspective writer who has not drafted the bid.</li>
                  <li><strong>Lost bid debrief</strong> and rewrite plan against the published scoring feedback.</li>
                  <li><strong>Tender readiness audit</strong> against qualification gates (Ofsted, CQC, DBS, cyber, insurance, financials).</li>
                  <li><strong>Bid team coaching</strong> structured around CQC Quality Statements, the Supported Accommodation (England) Regulations 2023, Care Act 2014 Section 42 and the Mental Capacity Act 2005 five statutory principles.</li>
                  <li><strong>Pipeline tracking and tender alerts</strong> via our managed feed.</li>
                  <li><strong>Mobilisation support</strong> for newly awarded contracts.</li>
                  <li><strong>Tender retainer</strong> for ongoing bid programmes.</li>
                </ul>
                <p>Service-specific scope, deliverables, milestones and fees are set out in your engagement letter.</p>
              </section>

              <section className="cs-block" id="sec-04">
                <h2><span className="num">Section 04</span>Engagement formation</h2>
                <p>Each engagement begins with a written engagement letter signed by both parties. The engagement letter sets out the scope of work, deliverables, timelines, named lead, fees, payment terms and any variation from these standard terms.</p>
                <p>Where the engagement letter conflicts with these terms, the engagement letter prevails. Where the engagement letter is silent, these terms apply.</p>
                <p>Changes to scope are documented in a written change order that records the new scope, the impact on timelines and any change in fees.</p>
              </section>

              <section className="cs-block" id="sec-05">
                <h2><span className="num">Section 05</span>Fees and payment</h2>
                <p>Fees are stated in your engagement letter. Unless agreed otherwise:</p>
                <ul>
                  <li>Invoices are payable within <strong>14 days</strong> of invoice date.</li>
                  <li>For new clients and engagements above £4,000, we may require a <strong>50% deposit</strong> before work begins, with the balance on submission.</li>
                  <li>For retainers, fees are billed monthly in advance.</li>
                  <li>Late payments accrue statutory interest, fixed sum and reasonable recovery costs under the <a href="https://www.legislation.gov.uk/uksi/2013/395/contents" target="_blank" rel="noopener noreferrer">Late Payment of Commercial Debts Regulations 2013</a> amending the Late Payment of Commercial Debts (Interest) Act 1998.</li>
                  <li>Quoted fees exclude VAT. Where we are not VAT-registered we will say so; if our position changes we will indicate VAT separately on invoices.</li>
                  <li>Out-of-pocket expenses (portal fees, courier, regulator search fees) are charged at cost with receipts.</li>
                </ul>
                <p>We may suspend work on overdue accounts after providing 7 days' written notice. Suspension does not relieve you of the duty to pay for work performed.</p>
              </section>

              <section className="cs-block" id="sec-06">
                <h2><span className="num">Section 06</span>Refund and cancellation policy</h2>
                <p>Our services are sold to businesses for purposes related to their trade. Statutory consumer cancellation rights under the <a href="https://www.legislation.gov.uk/uksi/2013/3134/contents" target="_blank" rel="noopener noreferrer">Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</a> do not apply because you are not contracting as a consumer.</p>
                <p><strong>Cancellation before work begins.</strong> Cancel by written notice at any time before we have started work and we will refund any deposit paid in full within 14 days.</p>
                <p><strong>Cancellation during a project.</strong> Cancel by written notice and we will stop work and invoice for time spent and expenses incurred to the cancellation date, including any work in progress. We will deliver to you all draft content produced to that date. Any prepaid balance above amounts due is refunded within 14 days.</p>
                <p><strong>Cancellation of a retainer.</strong> Either party may cancel a monthly retainer by written notice with effect from the end of the next full calendar month. Retainer fees are not refunded for the notice period.</p>
                <p><strong>Refund of completed work.</strong> Once a deliverable is signed off in writing, fees for that deliverable are non-refundable, save where we have committed a material breach you have notified us of and we have failed to remedy under <a href="#sec-13">Section 13</a>.</p>
                <p><strong>Refund of tender outcomes.</strong> We do not refund fees on the basis that a bid was unsuccessful. Tender outcomes depend on factors outside our control. See <a href="#sec-10">Section 10</a>.</p>
                <p><strong>Refund route.</strong> Refunds are made by bank transfer to the originating account within 14 days of the refund event.</p>
              </section>

              <section className="cs-block" id="sec-07">
                <h2><span className="num">Section 07</span>Intellectual property</h2>
                <p><strong>Submission content.</strong> On full payment of fees, you receive a non-exclusive, perpetual, irrevocable licence to use the submission content we produce for the procurement it was written for and any directly related re-bid.</p>
                <p><strong>Our underlying assets.</strong> We retain ownership of our underlying frameworks, templates, methodology, the TenderLab Quality Gate, the case-example library and the bid coaching curriculum.</p>
                <p><strong>Reuse of patterns.</strong> We may reuse and adapt content patterns we develop, provided we do not disclose your confidential information and do not reuse client-specific evidence without your consent.</p>
                <p><strong>Your inputs.</strong> Materials you supply (logos, case examples, policies, photographs) remain your intellectual property; you grant us a limited licence to use them for the engagement.</p>
              </section>

              <section className="cs-block" id="sec-08">
                <h2><span className="num">Section 08</span>Confidentiality</h2>
                <p>We treat all client information as confidential. We do not disclose your engagement, your bids, your pricing or any commissioner-specific evidence to third parties except as required by law or by our hosting and infrastructure providers acting on our documented instructions.</p>
                <p>We expect the same in return: do not share our methodology, the TenderLab Quality Gate or draft content with competitors or third parties without our written consent.</p>
                <p>Confidentiality obligations survive termination for 7 years.</p>
              </section>

              <section className="cs-block" id="sec-09">
                <h2><span className="num">Section 09</span>Conflicts of interest</h2>
                <p>We do not draft competing bids against an existing client for the same lot or geography in the same procurement window. Where a potential conflict arises we disclose it in writing and either decline the second engagement or proceed only with informed written consent from both parties.</p>
                <p>We do not share commissioner-specific intelligence between competing clients.</p>
              </section>

              <section className="cs-block" id="sec-10">
                <h2><span className="num">Section 10</span>Warranties and disclaimers</h2>
                <p>We warrant that we will perform the services with reasonable care and skill in accordance with industry standards for tender writing and bid consultancy.</p>
                <p>Where we cite a <strong>92% win rate across 200+ submissions</strong>, this refers to the aggregate of bids where the full submission was written or quality-gated by us and the commissioner has issued a final scoring decision. Failed PQQs we did not draft, withdrawn bids and bids still awaiting outcome are excluded. The win rate is a historical statement, not a contractual warranty of future outcomes.</p>
                <p>Past performance is not a guarantee of future results. Tender outcomes depend on factors outside our control, including price competition, evaluator interpretation, commissioner internal processes, your CQC or Ofsted rating, your financial standing and the quality of evidence you supply.</p>
                <p>Except as expressly stated, we exclude all other warranties to the maximum extent permitted by law.</p>
              </section>

              <section className="cs-block" id="sec-11">
                <h2><span className="num">Section 11</span>Limitation of liability</h2>
                <p>Nothing in these terms limits or excludes our liability for: death or personal injury caused by our negligence; fraud or fraudulent misrepresentation; breach of statutory duties that cannot be excluded under English law.</p>
                <p>Subject to that:</p>
                <ul>
                  <li>Our total aggregate liability arising out of or in connection with any engagement is limited to the <strong>fees paid by you for that engagement in the 12 months preceding the claim</strong>, or £25,000, whichever is greater.</li>
                  <li>We are not liable for loss of profit, loss of business opportunity, loss of contract, loss of anticipated savings, loss of goodwill or any indirect or consequential loss.</li>
                  <li>We are not liable for outcomes that depend on factors outside our control.</li>
                </ul>
              </section>

              <section className="cs-block" id="sec-12">
                <h2><span className="num">Section 12</span>Indemnity</h2>
                <p>You indemnify us against all claims, losses, damages, costs and expenses (including reasonable legal fees) arising from:</p>
                <ul>
                  <li>Any breach by you of these terms or the engagement letter.</li>
                  <li>Inaccurate or unverified evidence you supply for inclusion in a submission.</li>
                  <li>Misrepresentation of your service to the commissioner.</li>
                  <li>Misuse of our methodology, the TenderLab Quality Gate or our intellectual property.</li>
                  <li>Your infringement of any third-party intellectual property right in materials you supply to us.</li>
                </ul>
                <p>We indemnify you against claims that the submission content we drafted infringes the intellectual property rights of a third party, subject to the liability cap in <a href="#sec-11">Section 11</a>.</p>
              </section>

              <section className="cs-block" id="sec-13">
                <h2><span className="num">Section 13</span>Termination</h2>
                <p>Either party may terminate an engagement by written notice with <strong>14 days' warning</strong>, or immediately if the other party commits a material breach that is not remedied within 14 days of written notice.</p>
                <p>On termination:</p>
                <ul>
                  <li>You pay for all work performed up to the termination date, including reasonable wind-down work.</li>
                  <li>We deliver to you all draft content produced to the termination date.</li>
                  <li>Sections 06 (refund), 07 (IP), 08 (confidentiality), 10 (warranties), 11 (liability), 12 (indemnity) and 17 (governing law) survive termination.</li>
                </ul>
              </section>

              <section className="cs-block" id="sec-14">
                <h2><span className="num">Section 14</span>Force majeure</h2>
                <p>Neither party is liable for delay or failure to perform caused by events outside reasonable control, including acts of God, war, terrorism, pandemic, government action, prolonged failure of internet or hosting infrastructure or industrial action. The affected party will notify the other promptly and resume performance as soon as the event ends.</p>
              </section>

              <section className="cs-block" id="sec-15">
                <h2><span className="num">Section 15</span>Data protection</h2>
                <p>Personal data is processed under our <Link href="/privacy-policy">Privacy Policy</Link>, which forms part of these terms. Where we act as a data processor for personal data you share with us (for example, service user evidence inside bid drafts), we process it only on your documented instructions and apply the security measures set out in the Privacy Policy.</p>
              </section>

              <section className="cs-block" id="sec-16">
                <h2><span className="num">Section 16</span>Anti-bribery, modern slavery, equality</h2>
                <p>We comply with the <a href="https://www.legislation.gov.uk/ukpga/2010/23/contents" target="_blank" rel="noopener noreferrer">Bribery Act 2010</a>. We do not offer, give, solicit or accept bribes. We expect the same of our clients.</p>
                <p>We comply with the <a href="https://www.legislation.gov.uk/ukpga/2015/30/contents" target="_blank" rel="noopener noreferrer">Modern Slavery Act 2015</a>. We do not use forced labour, hold staff documents or tolerate slavery or human trafficking in our supply chain.</p>
                <p>We comply with the <a href="https://www.legislation.gov.uk/ukpga/2010/15/contents" target="_blank" rel="noopener noreferrer">Equality Act 2010</a>. We do not discriminate on the basis of any protected characteristic in delivery of our services or our employment practices.</p>
              </section>

              <section className="cs-block" id="sec-17">
                <h2><span className="num">Section 17</span>Governing law</h2>
                <p>These terms and any non-contractual obligations arising under them are governed by the laws of <strong>England and Wales</strong>. The courts of England and Wales have exclusive jurisdiction over any disputes.</p>
                <p>Before commencing court proceedings, the parties agree to attempt resolution by senior-level meeting within 14 days, and where that fails, by mediation under the Centre for Effective Dispute Resolution (CEDR) Model Mediation Procedure.</p>
              </section>

              <section className="cs-block" id="sec-18">
                <h2><span className="num">Section 18</span>Changes and contact</h2>
                <p>We may update these terms from time to time. The "Last updated" date at the top of this page records the most recent change. For complaints, raise the issue with your engagement lead first; escalate to the Director by emailing <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a> with "Formal complaint" in the subject line. We acknowledge formal complaints within 5 working days and respond substantively within 20 working days.</p>
                <p>
                  TenderLab Ltd. Companies House <strong>17184263</strong>. Registered office: 128 City Road, London, EC1V 2NX.
                  See also our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/contact">Contact</Link> page.
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
