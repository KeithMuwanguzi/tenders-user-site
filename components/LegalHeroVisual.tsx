type Props = {
  variant: 'privacy' | 'terms'
}

export default function LegalHeroVisual({ variant }: Props) {
  const privacy = variant === 'privacy'
  const title = privacy
    ? 'A privacy notice connecting information, consent and security'
    : 'Service terms connecting scope, responsibilities and agreement'

  return (
    <figure className="legal-hero-visual">
      <svg viewBox="0 0 620 500" role="img" aria-label={title}>
        <rect width="620" height="500" rx="58" fill={privacy ? '#dceff0' : '#f5df91'} />
        <circle cx="548" cy="52" r="118" fill="#f5d7ce" />
        <path d="M62 392C168 326 262 420 374 330C444 274 496 310 566 252" fill="none" stroke="#d4382c" strokeWidth="4" strokeLinecap="round" />

        <g transform="translate(66 55)">
          <rect width="318" height="372" rx="30" fill="#fffdf8" />
          <rect x="34" y="38" width="92" height="13" rx="6" fill="#192231" />
          <rect x="34" y="68" width="214" height="8" rx="4" fill="#a7b1bd" />
          <rect x="34" y="88" width="182" height="8" rx="4" fill="#c3cad1" />
          {[0, 1, 2].map((index) => (
            <g key={index} transform={`translate(34 ${132 + index * 67})`}>
              <circle cx="16" cy="16" r="16" fill={index === 1 ? '#f5d7ce' : '#dceff0'} />
              <path d="M8 16l5 5 11-12" fill="none" stroke="#d4382c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="48" y="8" width={index === 2 ? 154 : 188} height="8" rx="4" fill="#192231" opacity=".82" />
              <rect x="48" y="27" width={index === 0 ? 142 : 112} height="7" rx="3.5" fill="#a7b1bd" />
            </g>
          ))}
          <rect x="34" y="338" width="114" height="10" rx="5" fill="#d4382c" />
        </g>

        {privacy ? (
          <g transform="translate(356 132)">
            <path d="M100 0l78 30v72c0 70-45 116-78 132-33-16-78-62-78-132V30z" fill="#192231" />
            <rect x="66" y="78" width="68" height="62" rx="12" fill="#fffdf8" />
            <path d="M78 78V62c0-30 44-30 44 0v16" fill="none" stroke="#f5df91" strokeWidth="10" strokeLinecap="round" />
            <circle cx="100" cy="105" r="7" fill="#d4382c" />
            <rect x="96" y="109" width="8" height="18" rx="4" fill="#d4382c" />
          </g>
        ) : (
          <g transform="translate(354 116)">
            <rect width="210" height="248" rx="34" fill="#192231" />
            <rect x="28" y="34" width="86" height="10" rx="5" fill="#f5df91" />
            {[0, 1, 2].map((index) => (
              <g key={index} transform={`translate(28 ${76 + index * 48})`}>
                <circle cx="11" cy="11" r="11" fill="#d4382c" />
                <path d="M6 11l4 4 7-8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="34" y="6" width={index === 1 ? 116 : 132} height="9" rx="4.5" fill="#fffdf8" />
              </g>
            ))}
            <path d="M30 218c42-28 86 21 150-18" fill="none" stroke="#f5df91" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </svg>
      <figcaption>
        {privacy
          ? 'Plain-language information about data, choice and control.'
          : 'The published terms sit alongside the agreed scope for each engagement.'}
      </figcaption>
    </figure>
  )
}
