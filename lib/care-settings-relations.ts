/**
 * Curated sibling map for the "Related Care Settings" widget in Hybrid E.
 *
 * Every key MUST resolve to a real /care-settings/[slug] URL. The values are
 * the 4 most cohort-adjacent siblings to render in the right-rail widget.
 *
 * Update this file whenever a new care setting slug is added in
 * public/Page Content HTML Files/care-settings/.
 *
 * See references/layout-system.md in the tenderlab-seo-engine skill.
 */

export type CareSettingRelation = {
  slug: string
  label: string
}

const SLUG_LABELS: Record<string, string> = {
  'domiciliary-care': 'Domiciliary Care',
  'live-in-care': 'Live-In Care',
  'residential-care': 'Residential Care',
  'nursing-care': 'Nursing Care',
  'supported-living': 'Supported Living',
  'extra-care-housing': 'Extra Care Housing',
  'childrens-residential-care': "Children's Residential Care",
  'supported-accommodation': 'Supported Accommodation (16+)',
  'fostering-services': 'Fostering Services',
  'leaving-care-services': 'Leaving Care Services',
  'childrens-short-breaks': 'Short Breaks (Children)',
  'family-support-and-outreach': 'Family Support & Outreach',
  'housing-related-support': 'Housing Related Support',
  'temporary-accommodation': 'Temporary Accommodation',
  'emergency-accommodation': 'Emergency Accommodation',
  'supported-housing': 'Supported Housing',
  'community-health-services': 'Community Health Services',
  'continuing-healthcare': 'Continuing Healthcare (CHC)',
  'complex-care': 'Complex Care',
  'rehabilitation-services': 'Rehabilitation Services',
  'end-of-life-and-palliative-care': 'End of Life & Palliative Care',
  'hospital-discharge-services': 'Hospital Discharge',
  'autism-services': 'Autism Services',
  'learning-disability-services': 'Learning Disability Services',
  'mental-health-services': 'Mental Health Services',
  'crisis-rapid-response': 'Crisis & Rapid Response',
  'day-services': 'Day Services',
  'reablement-services': 'Reablement Services',
  'short-breaks-and-respite': 'Short Breaks & Respite',
  'shared-lives': 'Shared Lives',
  'outreach-community-support': 'Outreach & Community Support',
  'substance-misuse-services': 'Substance Misuse Services',
  'care-home-accommodation': 'Care Home Accommodation',
  'childrens-services': "Children's Services",
  'health-services': 'Health Services',
  'housing-support': 'Housing Support',
  'complex-care-and-continuing-healthcare': 'Complex Care & CHC',
}

/** Cohort-adjacency map. 4 siblings per slug. */
const RELATIONS: Record<string, string[]> = {
  'domiciliary-care': ['live-in-care', 'reablement-services', 'extra-care-housing', 'supported-living'],
  'live-in-care': ['domiciliary-care', 'residential-care', 'nursing-care', 'complex-care'],
  'residential-care': ['nursing-care', 'live-in-care', 'extra-care-housing', 'supported-living'],
  'nursing-care': ['residential-care', 'continuing-healthcare', 'complex-care', 'end-of-life-and-palliative-care'],
  'supported-living': ['extra-care-housing', 'live-in-care', 'housing-related-support', 'shared-lives'],
  'extra-care-housing': ['supported-living', 'residential-care', 'live-in-care', 'housing-related-support'],
  'childrens-residential-care': ['fostering-services', 'leaving-care-services', 'childrens-short-breaks', 'family-support-and-outreach'],
  'supported-accommodation': ['housing-related-support', 'supported-housing', 'leaving-care-services', 'temporary-accommodation'],
  'fostering-services': ['childrens-residential-care', 'family-support-and-outreach', 'childrens-short-breaks', 'leaving-care-services'],
  'leaving-care-services': ['supported-accommodation', 'childrens-residential-care', 'fostering-services', 'housing-related-support'],
  'childrens-short-breaks': ['short-breaks-and-respite', 'family-support-and-outreach', 'childrens-residential-care', 'autism-services'],
  'family-support-and-outreach': ['fostering-services', 'childrens-short-breaks', 'outreach-community-support', 'crisis-rapid-response'],
  'housing-related-support': ['supported-housing', 'supported-accommodation', 'extra-care-housing', 'temporary-accommodation'],
  'temporary-accommodation': ['emergency-accommodation', 'supported-accommodation', 'housing-related-support', 'supported-housing'],
  'emergency-accommodation': ['temporary-accommodation', 'supported-accommodation', 'crisis-rapid-response', 'housing-related-support'],
  'supported-housing': ['housing-related-support', 'supported-living', 'extra-care-housing', 'supported-accommodation'],
  'community-health-services': ['continuing-healthcare', 'rehabilitation-services', 'hospital-discharge-services', 'reablement-services'],
  'continuing-healthcare': ['complex-care', 'nursing-care', 'community-health-services', 'end-of-life-and-palliative-care'],
  'complex-care': ['continuing-healthcare', 'nursing-care', 'end-of-life-and-palliative-care', 'rehabilitation-services'],
  'rehabilitation-services': ['reablement-services', 'hospital-discharge-services', 'community-health-services', 'continuing-healthcare'],
  'end-of-life-and-palliative-care': ['nursing-care', 'continuing-healthcare', 'complex-care', 'community-health-services'],
  'hospital-discharge-services': ['reablement-services', 'community-health-services', 'rehabilitation-services', 'continuing-healthcare'],
  'autism-services': ['learning-disability-services', 'mental-health-services', 'childrens-short-breaks', 'family-support-and-outreach'],
  'learning-disability-services': ['autism-services', 'mental-health-services', 'supported-living', 'shared-lives'],
  'mental-health-services': ['learning-disability-services', 'autism-services', 'crisis-rapid-response', 'substance-misuse-services'],
  'crisis-rapid-response': ['mental-health-services', 'reablement-services', 'community-health-services', 'family-support-and-outreach'],
  'day-services': ['outreach-community-support', 'reablement-services', 'supported-living', 'learning-disability-services'],
  'reablement-services': ['domiciliary-care', 'rehabilitation-services', 'hospital-discharge-services', 'community-health-services'],
  'short-breaks-and-respite': ['childrens-short-breaks', 'day-services', 'family-support-and-outreach', 'outreach-community-support'],
  'shared-lives': ['supported-living', 'learning-disability-services', 'autism-services', 'day-services'],
  'outreach-community-support': ['day-services', 'family-support-and-outreach', 'mental-health-services', 'supported-living'],
  'substance-misuse-services': ['mental-health-services', 'crisis-rapid-response', 'community-health-services', 'outreach-community-support'],
}

/**
 * Return up to 4 sibling care settings for the given slug. Every returned slug
 * resolves to a real /care-settings/[slug] page.
 */
export function getRelatedCareSettings(slug: string): CareSettingRelation[] {
  const siblings = RELATIONS[slug] ?? []
  return siblings
    .filter(s => SLUG_LABELS[s]) // never return a slug we can't label
    .slice(0, 4)
    .map(s => ({ slug: s, label: SLUG_LABELS[s] }))
}

/**
 * Cohort tag used to filter live tenders, blog insights and case studies on
 * the care setting page. Keeps the right rail data-driven.
 */
export const COHORT_TAG: Record<string, string> = {
  'domiciliary-care': 'domiciliary',
  'live-in-care': 'domiciliary',
  'residential-care': 'residential',
  'nursing-care': 'nursing',
  'supported-living': 'supported-living',
  'extra-care-housing': 'supported-living',
  'childrens-residential-care': 'childrens',
  'supported-accommodation': 'supported-accommodation',
  'fostering-services': 'childrens',
  'leaving-care-services': 'childrens',
  'childrens-short-breaks': 'childrens',
  'family-support-and-outreach': 'childrens',
  'housing-related-support': 'housing',
  'temporary-accommodation': 'housing',
  'emergency-accommodation': 'housing',
  'supported-housing': 'housing',
  'community-health-services': 'health',
  'continuing-healthcare': 'complex',
  'complex-care': 'complex',
  'rehabilitation-services': 'health',
  'end-of-life-and-palliative-care': 'health',
  'hospital-discharge-services': 'health',
  'autism-services': 'learning-disability',
  'learning-disability-services': 'learning-disability',
  'mental-health-services': 'mental-health',
  'crisis-rapid-response': 'mental-health',
  'day-services': 'community',
  'reablement-services': 'health',
  'short-breaks-and-respite': 'community',
  'shared-lives': 'community',
  'outreach-community-support': 'community',
  'substance-misuse-services': 'mental-health',
}

export function getCohortTag(slug: string): string {
  return COHORT_TAG[slug] ?? 'care'
}
