import type { Tender } from '@/store/tendersSlice'

/** One care-setting filter, keywords are matched OR-style in tender text. */
export type CareCategory = {
  id: string
  label: string
  keywords: string[]
}

export type CareCategoryGroup = {
  title: string
  categories: CareCategory[]
}

/** Flat list including "All", first entry is the reset filter. */
export const ALL_CARE_CATEGORY: CareCategory = {
  id: '',
  label: 'All care settings',
  keywords: [],
}

export const CARE_CATEGORY_GROUPS: CareCategoryGroup[] = [
  {
    title: 'Care at home',
    categories: [
      { id: 'domiciliary', label: 'Domiciliary care', keywords: ['domiciliary', 'home care', 'homecare', 'care at home'] },
      { id: 'live-in', label: 'Live-in care', keywords: ['live-in', 'live in care', '24 hour care', '24-hour care'] },
      { id: 'reablement', label: 'Reablement', keywords: ['reablement', 're-enablement', 'short term support'] },
      { id: 'discharge', label: 'Hospital discharge', keywords: ['hospital discharge', 'discharge to assess', 'd2a', 'step down'] },
    ],
  },
  {
    title: 'Accommodation & living',
    categories: [
      { id: 'supported-living', label: 'Supported living', keywords: ['supported living', 'supported accommodation'] },
      { id: 'residential', label: 'Residential care', keywords: ['residential care', 'care home', 'nursing home', 'residential'] },
      { id: 'extra-care', label: 'Extra care housing', keywords: ['extra care', 'housing with care', 'very sheltered'] },
      { id: 'supported-accommodation', label: 'Supported accommodation', keywords: ['supported accommodation', 'semi-independent'] },
      { id: 'nursing', label: 'Nursing care', keywords: ['nursing care', 'registered nursing', 'rnld', 'nursing services'] },
    ],
  },
  {
    title: 'Children & families',
    categories: [
      { id: 'children', label: "Children's services", keywords: ['children', 'young people', 'cyp', 'youth', 'adolescent'] },
      { id: 'fostering', label: 'Fostering', keywords: ['fostering', 'foster care', 'foster placement'] },
      { id: 'leaving-care', label: 'Leaving care', keywords: ['leaving care', 'care leaver', 'transition to adulthood'] },
    ],
  },
  {
    title: 'Health & clinical',
    categories: [
      { id: 'mental-health', label: 'Mental health', keywords: ['mental health', 'psychiatric', 'crisis house', 'talking therapies'] },
      { id: 'community-health', label: 'Community health', keywords: ['community health', 'school nursing', 'health visiting', 'primary care'] },
      { id: 'chc', label: 'Continuing healthcare', keywords: ['continuing healthcare', 'continuing care', 'chc', 'fnc'] },
      { id: 'palliative', label: 'End of life & palliative', keywords: ['palliative', 'end of life', 'hospice', 'terminal care'] },
    ],
  },
  {
    title: 'Additional needs',
    categories: [
      { id: 'learning-disability', label: 'Learning disability', keywords: ['learning disability', 'learning difficulties', 'ld ', 'intellectual disability'] },
      { id: 'autism', label: 'Autism', keywords: ['autism', 'autistic', 'asd', 'asperger'] },
      { id: 'substance-misuse', label: 'Substance misuse', keywords: ['substance misuse', 'addiction', 'drug and alcohol', 'recovery service'] },
    ],
  },
  {
    title: 'Community & housing',
    categories: [
      { id: 'housing-support', label: 'Housing support', keywords: ['housing support', 'homelessness', 'rough sleeping', 'tenancy support', 'temporary accommodation'] },
      { id: 'day-services', label: 'Day services', keywords: ['day service', 'day centre', 'day care', 'day opportunity'] },
    ],
  },
]

// Combined categories used by dedicated search landing pages. They are not
// repeated in the interactive sidebar because the individual filters already
// cover the same inventory there.
const LANDING_PAGE_CATEGORIES: CareCategory[] = [
  {
    id: 'complex-chc',
    label: 'Complex care and continuing healthcare',
    keywords: ['complex care', 'continuing healthcare', 'continuing care', 'chc', 'fnc'],
  },
  {
    id: 'residential-nursing',
    label: 'Residential and nursing care',
    keywords: ['residential care', 'care home', 'nursing home', 'nursing care', 'registered nursing'],
  },
]

export const ALL_CARE_CATEGORIES: CareCategory[] = [
  ALL_CARE_CATEGORY,
  ...CARE_CATEGORY_GROUPS.flatMap((g) => g.categories),
  ...LANDING_PAGE_CATEGORIES,
]

export function getCareCategoryById(id: string): CareCategory | undefined {
  return ALL_CARE_CATEGORIES.find((c) => c.id === id)
}

/** Match published tender text (and optional admin category tag) against filter keywords. */
export function tenderMatchesCareCategory(
  tender: Tender & { category?: string | null },
  categoryId: string,
): boolean {
  if (!categoryId) return true

  const def = getCareCategoryById(categoryId)
  if (!def || !def.keywords.length) return true

  const haystack = [
    tender.title,
    tender.description,
    tender.organisation,
    tender.location,
    tender.category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return def.keywords.some((kw) => haystack.includes(kw.toLowerCase()))
}

export function filterTendersByCareCategory<T extends Tender & { category?: string | null }>(
  tenders: T[],
  categoryId: string,
): T[] {
  if (!categoryId) return tenders
  return tenders.filter((t) => tenderMatchesCareCategory(t, categoryId))
}

export function inferCareCategoryLabel(
  tender: Pick<Tender, 'title' | 'description'> &
    Partial<Pick<Tender, 'organisation' | 'location'>> & {
    category?: string | null
  },
): string | null {
  if (tender.category?.trim()) return tender.category.trim()
  const match = CARE_CATEGORY_GROUPS
    .flatMap((group) => group.categories)
    .find((category) => tenderMatchesCareCategory(tender as Tender, category.id))
  return match?.label ?? null
}
