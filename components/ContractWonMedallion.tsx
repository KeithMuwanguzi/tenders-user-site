import Image from 'next/image'

export default function ContractWonMedallion({ className = '' }: { className?: string }) {
  return (
    <span className={`contract-won-medallion${className ? ` ${className}` : ''}`}>
      <Image
        src="/images/contracts/contract-won-medallion.png"
        alt="Contract won"
        width={480}
        height={480}
        sizes="(max-width: 760px) 76px, 104px"
      />
    </span>
  )
}
