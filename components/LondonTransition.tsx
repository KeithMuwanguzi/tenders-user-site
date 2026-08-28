type LondonTransitionProps = {
  variant: 'layered' | 'panorama' | 'edge' | 'overlap' | 'river'
  className?: string
}

const buildings = Array.from({ length: 18 }, (_, index) => index)

export default function LondonTransition({ variant, className = '' }: LondonTransitionProps) {
  return (
    <div className={`tl-london tl-london--${variant} ${className}`.trim()} aria-hidden="true">
      <div className="tl-london__route"><span /><span /><span /></div>
      <div className="tl-london__river" />
      <div className="tl-london__city">
        {buildings.map((building) => <span key={building} />)}
      </div>
      <div className="tl-london__bridge"><i /><i /><i /><i /></div>
    </div>
  )
}
