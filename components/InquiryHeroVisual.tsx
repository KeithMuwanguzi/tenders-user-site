type InquiryHeroVisualProps = {
  kind: 'contact' | 'questions'
}

export default function InquiryHeroVisual({ kind }: InquiryHeroVisualProps) {
  if (kind === 'questions') {
    return (
      <figure className="inquiry-hero-visual">
        <svg viewBox="0 0 680 540" role="img" aria-labelledby="faq-visual-title faq-visual-desc">
          <title id="faq-visual-title">A route from tender questions to a clear service decision</title>
          <desc id="faq-visual-desc">Question cards follow a coral path into an organised decision sheet with a confirmed next step.</desc>
          <rect width="680" height="540" rx="74" fill="#dceff0" />
          <circle cx="616" cy="66" r="126" fill="#f8d9d0" />
          <circle cx="92" cy="468" r="98" fill="#f5dc8b" />
          <path d="M114 126C214 126 198 244 308 244s92 128 202 128" fill="none" stroke="#df3f33" strokeWidth="4" strokeLinecap="round" />
          <circle cx="114" cy="126" r="9" fill="#df3f33" />
          <circle cx="308" cy="244" r="9" fill="#df3f33" />
          <circle cx="510" cy="372" r="9" fill="#df3f33" />
          <g transform="translate(54 62)">
            <rect width="190" height="116" rx="34" fill="#fffdf8" />
            <path d="M52 43c0-18 14-30 37-30 22 0 36 12 36 29 0 15-10 23-22 30-10 6-14 11-14 21" fill="none" stroke="#192231" strokeWidth="9" strokeLinecap="round" />
            <circle cx="89" cy="99" r="6" fill="#192231" />
            <path d="M141 36h23M141 58h18M141 80h28" stroke="#8b99a8" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="translate(232 188)">
            <rect width="190" height="116" rx="34" fill="#fffdf8" />
            <circle cx="67" cy="58" r="30" fill="#f8d9d0" />
            <path d="M58 57l8 8 17-20" fill="none" stroke="#df3f33" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M114 40h44M114 62h34M114 84h50" stroke="#8b99a8" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="translate(404 316)">
            <path d="M0 30c0-17 13-30 30-30h162v132c0 17-13 30-30 30H0Z" fill="#192231" />
            <circle cx="48" cy="60" r="18" fill="#f5dc8b" />
            <path d="M39 60l7 7 13-15" fill="none" stroke="#192231" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M82 51h74M82 72h56" stroke="#fffdf8" strokeOpacity=".88" strokeWidth="7" strokeLinecap="round" />
            <path d="M32 114h128" stroke="#fffdf8" strokeOpacity=".28" strokeWidth="2" />
          </g>
        </svg>
      </figure>
    )
  }

  return (
    <figure className="inquiry-hero-visual">
      <svg viewBox="0 0 680 540" role="img" aria-labelledby="contact-visual-title contact-visual-desc">
        <title id="contact-visual-title">Tender information reaching the right TenderLab conversation</title>
        <desc id="contact-visual-desc">A tender document follows a coral evidence path to telephone, email and deadline details.</desc>
        <rect width="680" height="540" rx="74" fill="#f5dc8b" />
        <circle cx="616" cy="62" r="132" fill="#f8d9d0" />
        <path d="M54 448c132 0 126-108 250-108 122 0 108-146 246-146" fill="none" stroke="#df3f33" strokeWidth="4" strokeLinecap="round" />
        <circle cx="55" cy="448" r="9" fill="#df3f33" />
        <circle cx="304" cy="340" r="9" fill="#df3f33" />
        <circle cx="550" cy="194" r="9" fill="#df3f33" />
        <g transform="translate(68 70)">
          <path d="M0 42C0 19 19 0 42 0h244v300H0Z" fill="#fffdf8" />
          <rect x="36" y="38" width="96" height="16" rx="8" fill="#192231" />
          <rect x="36" y="76" width="202" height="8" rx="4" fill="#aab4bd" />
          <rect x="36" y="98" width="164" height="8" rx="4" fill="#aab4bd" />
          <rect x="36" y="138" width="214" height="72" rx="18" fill="#dceff0" />
          <circle cx="68" cy="174" r="16" fill="#df3f33" />
          <path d="M62 174l5 5 10-12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="100" y="158" width="104" height="7" rx="3.5" fill="#192231" />
          <rect x="100" y="181" width="72" height="7" rx="3.5" fill="#718094" />
          <rect x="36" y="240" width="126" height="9" rx="4.5" fill="#aab4bd" />
          <rect x="36" y="264" width="188" height="9" rx="4.5" fill="#aab4bd" />
        </g>
        <g transform="translate(382 94)">
          <path d="M34 0h164c19 0 34 15 34 34v266c0 19-15 34-34 34H0V34C0 15 15 0 34 0Z" fill="#192231" />
          <circle cx="72" cy="70" r="30" fill="#f8d9d0" />
          <path d="M61 58c4 20 13 28 31 31M63 56l11-7M93 89l8-11" fill="none" stroke="#df3f33" strokeWidth="6" strokeLinecap="round" />
          <rect x="118" y="56" width="76" height="9" rx="4.5" fill="#fffdf8" />
          <rect x="118" y="79" width="50" height="8" rx="4" fill="#fffdf8" fillOpacity=".5" />
          <rect x="38" y="132" width="156" height="84" rx="22" fill="#fffdf8" />
          <path d="M60 154h112v42H60Z" fill="none" stroke="#df3f33" strokeWidth="5" />
          <path d="m61 155 55 36 56-36" fill="none" stroke="#df3f33" strokeWidth="5" strokeLinejoin="round" />
          <rect x="38" y="246" width="156" height="50" rx="18" fill="#dceff0" />
          <path d="M66 258v27M90 258v27M114 258v27M138 258v27M162 258v27M54 270h124" stroke="#192231" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </figure>
  )
}
