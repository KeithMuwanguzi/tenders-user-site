export type DirectClient = {
  name: string
  href?: string
  logo: string
  treatment: 'wide' | 'mark'
  dark?: boolean
}

export type VerifiedClientReview = {
  organisation: string
  person: string
  role: string
  logo?: string
  darkLogo?: boolean
  href: string
  title: string
  quote?: string
  summary?: string
  sourceLabel: 'Trustpilot review' | 'Trustpilot review summary'
}

export const DIRECT_CLIENTS: DirectClient[] = [
  {
    name: 'Living Plus Care',
    href: 'https://www.livingpluscare.co.uk/',
    logo: '/images/clients/living-plus-care.png',
    treatment: 'wide',
  },
  {
    name: 'Starlight Support Services',
    href: 'https://www.starlightsupportservices.co.uk/',
    logo: '/images/clients/starlight-support-services.webp',
    treatment: 'mark',
  },
  {
    name: 'Three Clover Care',
    href: 'https://threeclovercare.co.uk/',
    logo: '/images/clients/three-clover-care.svg',
    treatment: 'wide',
  },
  {
    name: 'LJC & TN Services',
    href: 'https://ljcandtnservices.com/',
    logo: '/images/clients/ljc-tn-services.png',
    treatment: 'mark',
  },
  {
    name: 'Sorelle Support',
    href: 'https://sorellesupport.co.uk/',
    logo: '/images/clients/sorelle-support-light.svg',
    treatment: 'wide',
  },
  {
    name: 'Absolute Care Services',
    href: 'https://absolutecareservice.co.uk/',
    logo: '/images/clients/absolute-care-services-transparent.png',
    treatment: 'wide',
  },
  {
    name: 'Your Hope Care',
    logo: '/images/clients/your-hope-care-transparent.png',
    treatment: 'mark',
  },
]

export const VERIFIED_CLIENT_REVIEWS: VerifiedClientReview[] = [
  {
    organisation: 'Living Plus Care',
    person: 'Collins',
    role: 'Manager, Living Plus Care',
    logo: '/images/clients/living-plus-care.png',
    href: 'https://uk.trustpilot.com/reviews/6a1fef4de6859ceaa6a82185',
    title: 'It has been a pleasure working with TenderLab',
    quote:
      "It has been a pleasure working with Khol and his team, and I don't believe I could ever go back to doing tenders without their assistance.\n\nWhat I deeply appreciate is that they do not solely focus on writing bids, they have developed a deep understanding of our business since we first started working together, and they know how we communicate, what our strengths are, what is important to us, and how to produce a compelling tender response which have put us on a few frameworks.",
    sourceLabel: 'Trustpilot review',
  },
  {
    organisation: 'Sorelle Support',
    person: 'Janine',
    role: 'Director, Sorelle Support',
    logo: '/images/clients/sorelle-support-light.svg',
    href: 'https://uk.trustpilot.com/reviews/6a44fff253e578452ef74034',
    title: 'A trusted partner for small and medium care providers',
    quote:
      "Working with TenderLab has been a fantastic experience. From the outset, the team took the time to understand our organisation, our values and the services we provide, rather than offering a generic approach.\n\nTheir knowledge of health and social care tenders has been invaluable. They have helped us strengthen our policies, improve our evidence and present our organisation in a way that clearly demonstrates the quality of support we provide. Their guidance has given us confidence throughout the tender process, and they've always been approachable, responsive and happy to answer questions.\n\nWhat has impressed me most is their attention to detail and their genuine commitment to helping us succeed. They don't just write bids—they help you understand what commissioners are looking for and how to continuously improve your organisation.\n\nI would highly recommend TenderLab to any health and social care provider looking for expert support with tenders, compliance or business growth. Thank you for all your hard work and support.",
    sourceLabel: 'Trustpilot review',
  },
  {
    organisation: 'Beyond Healthcare Medical',
    person: 'Beyond Healthcare Medical',
    role: 'Recruitment company',
    href: 'https://uk.trustpilot.com/reviews/6a69adc2bce053d81184ede7',
    title: 'Accepted by a council with guidance at every step',
    summary:
      'The reviewer says TenderLab helped their recruitment company through the process of becoming accepted by a council. They describe the team as genuine and polite, say they were guided at every step, and expect to work with TenderLab again.',
    sourceLabel: 'Trustpilot review summary',
  },
]
