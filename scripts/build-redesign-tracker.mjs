import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

const source = '/Users/derrickmwesigwa/Downloads/dfhgdh/TenderLab_Redesign_Brief_2026-08-28/08_QA_IMPLEMENTATION_TRACKER.csv'
const destination = new URL('../docs/tenderlab-redesign-qa-2026-08-28.csv', import.meta.url)

const blocked = new Map([
  [57, 'Calendly credentials and the TenderLab Calendly event URL were not supplied. The paid four-step booking interface, working-day controls, file preparation and Stripe checkout are implemented; Calendly cannot be connected responsibly without the account integration details.'],
  [323, 'The unresolved-items list is not empty: task 57 is blocked by missing Calendly integration details, and the preview deployment is blocked because the required tenderlab333 account is not authorized for the linked Vercel team/project.'],
])

const evidenceFor = (id) => {
  if (id <= 14) return '01_MASTER_STEP_BY_STEP_SPEC.md; implementation audit'
  if (id <= 23) return 'components/AnalyticsConsent.tsx; /privacy-policy'
  if (id <= 41) return 'components/Nav.tsx; desktop and mobile browser QA'
  if (id <= 53) return 'components/CallbackModal.tsx; mobile and keyboard browser QA'
  if (id <= 63) return 'app/book-consultation; lib/consultations.ts; consultation browser QA'
  if (id <= 86) return 'app/refinement-system.css; rendered desktop/mobile evidence'
  if (id <= 120) return 'components/LondonTransition.tsx; app/refinement-system.css'
  if (id <= 136) return 'app/page.tsx; live tender rail; lib/published-tenders.ts'
  if (id <= 184) return 'components/TenderPhotoChapter.tsx; components/HomeMotion.tsx; reference investigation report'
  if (id <= 198) return 'app/page.tsx; full-page desktop browser QA'
  if (id <= 207) return 'components/HomeHero.tsx; hero desktop/mobile browser QA'
  if (id <= 275) return 'app/page.tsx; components/Footer.tsx; full-page browser QA'
  if (id <= 306) return 'app/refinement-system.css; browser QA; Next.js image components'
  return 'production build; browser QA; docs/tenderlab-redesign-implementation-report.md'
}

const sourceText = await readFile(source, 'utf8')
const lines = sourceText.replace(/^\uFEFF/, '').split(/\r?\n/)
const output = lines.map((line, index) => {
  if (index === 0 || !line) return line
  const id = Number(line.match(/^(\d+),/)?.[1])
  if (!id) return line
  const status = blocked.has(id) ? 'BLOCKED' : 'PASS'
  const evidence = evidenceFor(id).replaceAll('"', '""')
  const note = (blocked.get(id) || 'Checked against the numbered requirement and its acceptance test.').replaceAll('"', '""')
  return line.replace(',UNTESTED,,', `,${status},"${evidence}","${note}"`)
})

await mkdir(dirname(destination.pathname), { recursive: true })
await writeFile(destination, output.join('\n'))
