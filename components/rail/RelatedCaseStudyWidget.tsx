import Link from 'next/link'
import { CASE_STUDIES, type CaseStudy } from '@/lib/case-studies-data'

type Props = {
  /** Cohort tag for filtering (e.g. 'supported-living', 'domiciliary'). */
  cohort?: string
  /** Slug to exclude (current page). */
  excludeSlug?: string
  /** Headline metric: short stat line beneath the card title (override). */
  statLine?: { value: string; label: string }
}

function pickBestMatch(cohort: string | undefined, excludeSlug?: string): CaseStudy | null {
  const candidates = CASE_STUDIES.filter(c => c.slug !== excludeSlug)
  if (!candidates.length) return null
  if (!cohort) return candidates[0]

  const lower = cohort.toLowerCase()
  const matched = candidates.find(c => c.category.toLowerCase().includes(lower)) ||
    candidates.find(c => c.categoryLabel.toLowerCase().includes(lower)) ||
    candidates.find(c => c.title.toLowerCase().includes(lower))
  return matched ?? candidates[0]
}

export default function RelatedCaseStudyWidget({
  cohort,
  excludeSlug,
  statLine,
}: Props) {
  const cs = pickBestMatch(cohort, excludeSlug)
  if (!cs) return null

  // Try to extract a headline stat from the result field if no override given.
  const computedStat = statLine ?? extractStat(cs.result)

  return (
    <Link href={`/case-studies/${cs.slug}`} className="he-case-mini">
      <div className="he-case-mini__won">● WON</div>
      <h4 className="he-case-mini__h">{cs.council}</h4>
      <p className="he-case-mini__desc">{cs.transformation}</p>
      {computedStat && (
        <>
          <div className="he-case-mini__stat">{computedStat.value}</div>
          <div className="he-case-mini__stat-label">{computedStat.label}</div>
        </>
      )}
    </Link>
  )
}

function extractStat(result: string): { value: string; label: string } | null {
  if (!result) return null
  // e.g. "5 Tier 2 lots" → value "5", label "Tier 2 lots awarded"
  const m = result.match(/^(\d+[\w/+]*?)\s+(.+)$/)
  if (m) return { value: m[1], label: m[2] }
  return { value: result.slice(0, 12), label: 'Result' }
}
