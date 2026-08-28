# TenderLab redesign implementation report — 28 August 2026

## Instruction hierarchy used

- The numbered 323-task master specification is the governing implementation checklist.
- The pasted 180-item correction list is treated as an abbreviated instruction source.
- Supplied screenshots and linked websites are visual and interaction evidence, not literal content to copy.
- Existing verified TenderLab content, real tender data, client logos, reviews and booking prices remain the source of truth.

## What was rejected from the previous pass

- the repeated thin pale skyline strip;
- pale blush, aqua and yellow cards as the dominant identity;
- a rounded bordered box for almost every content type;
- dark unrelated technology-style bands;
- large empty gaps that separated otherwise related chapters;
- treating colour changes as a substitute for composition.

## Implemented visual system

- Five different London/Thames transition roles: layered foreground, solid architectural edge, quiet panorama, image-overlap transition and deep river/footer landing.
- A bright TenderLab palette led by company red, white, deep red and the established blue support tone.
- Open editorial proof, provider, guide and FAQ layouts.
- One dominant Complete Bid Writing feature followed by a compact comparison.
- An image-led healthcare-specialism chapter with staggered positioning.
- A tender-practice photo chapter with restrained scroll-linked movement.
- A branded live-opportunity rail that remains readable without motion.
- Selective rounded treatment retained for verified testimonial cards and the callback/booking interfaces where the content is genuinely card-like.

## Reference principles adapted

- Access Point: a reusable landscape system with distinct foreground, line-art, saturated-edge, overlap and footer roles, translated into London/public-sector architecture rather than copied mountains.
- Scroll Marquee / Tropical Berry: opposed editorial type movement, a practical image chapter and a direct Go to Tenders action.
- Two Two: alternating editorial scale, asymmetric image placement and quieter typography-led chapters.
- Daily Interaction 105: restrained depth and image movement; essential information remains visible without hover or animation.

## Functional checks

- Desktop navigation order and labels match the brief.
- Contact Us remains inside About Us.
- Live Tenders sits immediately before Request a Callback.
- Request a Callback opens on the current page, traps focus, closes with Escape and fits a 390px mobile viewport.
- The mobile menu keeps Live Tenders and Request a Callback prominent.
- The cookie notice uses familiar Accept cookies / Reject optional cookies wording and contains no “measure visits” choice.
- Tender Consultation is £80; there is no free consultation wording.
- Booking progresses through attendee/preparation, working-day date/time, details and secure payment stages.
- Weekends and listed UK bank holidays are rejected; bookable times run from 10:00 through 16:00 for a session ending by 17:00.
- The production build compiles all 108 routes.

## Screenshot-by-screenshot correction summary

- Results/statistics: replaced the four pastel metric cards and oversized introduction with an open editorial proof chapter. The 92% result now leads with the qualification, drafting, independent-review and evaluator-review explanation; the three supporting figures remain compact.
- FAQs: replaced the oversized card grid and repeated pale skyline with a compact question ledger, one panorama transition and clear expanded states.
- Provider proof: separated direct provider engagements from review-platform evidence, restored the real provider logos and removed the incorrect Trustpilot substitute from Absolute Care Services.
- Case studies: changed the soft equal-card grid into a staggered awards composition with contract-won seals, council names and direct case-study actions.
- Guides/blogs: replaced the large pastel guide blocks with compact editorial rows and article-derived thumbnails; blog calls to action now say Book a consultation.
- Repeated separators: removed the single thin skyline treatment and assigned five distinct transition roles so adjacent chapters do not repeat the same silhouette.

## Final responsive and interaction QA

- Desktop: checked at 1440 × 1000, including the homepage, Services, provider proof and lazy-loaded imagery.
- Tablet: checked at 900 × 1100; no horizontal overflow was present and the collage hero retained its reading order.
- Mobile: checked at 390 × 844 for the homepage, navigation drawer, callback dialog and consultation steps 1–2.
- Keyboard: the mobile callback opens without leaving the drawer active behind it; one Escape closes the dialog and focus returns to the menu button. Focus trapping is implemented for both navigation and callback dialogs.
- Motion: all non-essential reveals and scroll-linked movement have `prefers-reduced-motion` fallbacks; content remains visible without animation.
- Runtime: the clean production-browser pass produced no console errors. Images loaded when scrolled into view; the production build reports a 115 kB first-load bundle for the homepage and 145 kB for the consultation page.

## Unresolved item

Calendly cannot be connected without the TenderLab Calendly event URL and account/API integration details. The booking interface and Stripe checkout route are present, but claiming a live Calendly integration without those details would be false. This is recorded as BLOCKED in tracker task 57 and keeps task 323 blocked.

The preview deployment was also attempted from the required `tenderlab333` CLI account, but the currently linked Vercel team/project returned `Not authorized`. This does not affect the local production build or branch, but a hosted preview requires that account to be granted access to the linked Vercel project (or the project to be relinked by its owner).
