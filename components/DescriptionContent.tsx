import Loader from "./Loader"

interface boxInfoProps {
  num_owners: number
  market_cap: number
}

interface DescriptionContentProps {
  title: string,
  description: string,
  boxInfo: boxInfoProps
  isLoading: boolean
}

interface SmallContainerProps {
  value: number,
  condition: string,
  currency?: string
}

function SmallContainer({ value, condition, currency = '' }: SmallContainerProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-bold text-2xl text-black">{`${formatter.format(value)} ${currency}`}</p>
      <p className="font-semibold text-base text-black">{condition}</p>
    </div>
  )
}

export default function DescriptionContent({ title, description, boxInfo, isLoading }: DescriptionContentProps) {

  return (
    <div className="flex border-t border-l border-white/10 rounded-3xl shadowDiv py-10 px-5 bg-opacity-30 justify-between">
      <div className="w-4/6">
        <h2 className="text-grey-content font-plus font-medium rounded-2xl text-xl mb-0 sm:mb-2">
          {title}
        </h2>
        <p className={`text-xs font-plus font-normal text-grey-content`}>
          {description}
        </p>
      </div>
      <div className="flex rounded-xl justify-evenly w-2/6">
        {
          isLoading ? (
            <Loader />
          ) : (
            <>
              <SmallContainer condition='MCAP' value={boxInfo.market_cap} currency="ETH" />
              <SmallContainer condition="OWNERS" value={boxInfo.num_owners} />
            </>
          )
        }
      </div>
    </div >
  )
}