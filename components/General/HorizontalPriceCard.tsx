import { PriceList } from '.'
import {
  ICoinPrices,
  IPriceCard,
  SingleLandAPIResponse,
} from '../../lib/valuation/valuationTypes'
import { ExternalAssetLink } from './Links'
import { BsTwitter } from 'react-icons/bs'
import { SocialMediaOptions } from '../../lib/socialMediaOptions'
import { convertETHPrediction } from '../../lib/valuation/valuationUtils'
import { Metaverse } from '../../lib/metaverse'
import { useAppSelector } from '../../state/hooks'

interface Props {
  prices: ICoinPrices
  land: SingleLandAPIResponse
  landId: string
  metaverse: Metaverse
}

const HorizontalPriceCard = ({ land, landId, prices, metaverse }: Props) => {
  const { address } = useAppSelector((state) => state.account)

  const predictions = convertETHPrediction(
    prices,
    land.eth_predicted_price,
    metaverse
  )

  // SocialMediaOptions contains all options with their texts, icons, etc..
  const options = SocialMediaOptions(landId, metaverse, predictions, address)
  return (
    <div className='flex gap-3 lg:gap-4  xl:gap-6 w-full flex-col lg:flex-row justify-between relative'>
      {/* LEFT/TOP */}
      <ExternalAssetLink
        metaverse={metaverse}
        land={land}
        landId={landId}
        layout='responsive'
      />
      {/* RIGHT/BOTTOM - PriceList */}
      <div className='w-full'>
        <h4 className='border-none text-white mb-4'>Price Estimation:</h4>
        <PriceList predictions={predictions} metaverse={metaverse} />
      </div>
      <BsTwitter
        title='Share Valuation'
        onClick={() => window.open(options.twitter.valuationLink)}
        className='absolute h-5 w-5 bottom-[0.58rem] lg:bottom-0 md:bottom-2 right-0 text-grey-content hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
      />
    </div>
  )
}

export default HorizontalPriceCard
