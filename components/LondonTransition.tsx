import Image from 'next/image'

type LondonTransitionProps = {
  variant: 'layered' | 'panorama' | 'edge' | 'overlap' | 'river'
  className?: string
}

const UK_MAP_VARIANTS = new Set<LondonTransitionProps['variant']>(['edge', 'panorama'])

export default function LondonTransition({ variant, className = '' }: LondonTransitionProps) {
  const useMap = UK_MAP_VARIANTS.has(variant)
  const src = useMap
    ? '/images/brand-landscapes/tenderlab-uk-map.png'
    : '/images/brand-landscapes/tenderlab-london-skyline.png'

  return (
    <figure
      className={`tl-london tl-london--${variant} ${useMap ? 'tl-london--map' : 'tl-london--skyline'} ${className}`.trim()}
      aria-hidden="true"
    >
      <Image src={src} alt="" fill sizes="100vw" className="tl-london__art" />
    </figure>
  )
}
