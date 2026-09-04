export type Consultation = {
  id: string
  title: string
  duration: string
  price: number
  description: string
  preparation: string
  documentsRequired: boolean
  deductible: boolean
}

export const CONSULTATIONS: Consultation[] = [
  {
    id: 'tender-consultation',
    title: 'Tender Consultation',
    duration: '30 minutes',
    price: 0,
    description: 'Understand how public-sector care procurement works, what commissioners score and whether your organisation is ready to bid.',
    preparation: 'No tender-pack review is included. Bring your questions and a short summary of your organisation.',
    documentsRequired: false,
    deductible: false,
  },
  {
    id: 'bid-feedback-debrief',
    title: 'Bid Feedback Debrief',
    duration: '60 minutes',
    price: 175,
    description: 'Understand where marks were lost, what the evaluator feedback means and what would have made the response stronger.',
    preparation: 'Upload the award letter, evaluator feedback and submitted answers at least 48 hours before the session.',
    documentsRequired: true,
    deductible: false,
  },
  {
    id: 'tender-readiness-review',
    title: 'Tender Readiness Review',
    duration: '60 minutes',
    price: 195,
    description: 'Identify the company-side evidence that could prevent you passing a selection questionnaire before a live tender appears.',
    preparation: 'Upload relevant policies, insurance, accreditation, CQC, financial and contract evidence at least 48 hours before the session.',
    documentsRequired: true,
    deductible: true,
  },
  {
    id: 'tender-briefing',
    title: 'Tender Briefing',
    duration: 'Written briefing',
    price: 250,
    description: 'A full reading of one named tender pack, followed by a written gap analysis and an honest view on whether the opportunity is worth pursuing.',
    preparation: 'Upload the complete procurement pack and identify the lot or service you are considering.',
    documentsRequired: true,
    deductible: true,
  },
]

export const CONSULTATION_BY_ID = new Map(CONSULTATIONS.map((item) => [item.id, item]))

// Calendly's current plan supports one active event type. The written Tender
// Briefing does not require a calendar event, so it can be offered alongside
// the free consultation while paid video consultations remain unavailable.
export const PUBLIC_CONSULTATIONS = CONSULTATIONS.filter(
  (item) => item.price === 0 || item.id === 'tender-briefing',
)
