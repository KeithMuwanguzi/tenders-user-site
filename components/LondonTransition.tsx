import Image from 'next/image'

type LondonTransitionProps = {
  variant: 'layered' | 'panorama' | 'edge' | 'overlap' | 'river'
  className?: string
}

export default function LondonTransition({ variant, className = '' }: LondonTransitionProps) {
  return (
    <figure
      className={`tl-london tl-london--${variant} tl-london--skyline ${className}`.trim()}
      aria-hidden="true"
    >
      <Image
        src="/images/brand-landscapes/tenderlab-london-skyline.png"
        alt=""
        fill
        sizes="100vw"
        className="tl-london__art"
      />
    </figure>
  )
}
