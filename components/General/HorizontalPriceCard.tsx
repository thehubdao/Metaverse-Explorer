import { PriceListSmall } from '.'
import {
  ICoinPrices,
  IPriceCard,
  SingleLandAPIResponse,
} from '../../lib/valuation/valuationTypes'
import { ExternalAssetLink, ExternalLink } from './Links'
import { BsTwitter } from 'react-icons/bs'
import { SocialMediaOptions } from '../../lib/socialMediaOptions'
import { convertETHPrediction } from '../../lib/valuation/valuationUtils'
import { Metaverse } from '../../lib/metaverse'
import { useAppSelector } from '../../state/hooks'
import { createOpenSeaLink } from '../../backend/services/openSeaDataManager'

import {
  handleLandName,
  handleTokenID,
} from '../../lib/valuation/valuationUtils'
import { formatName } from '../../lib/utilities'

interface Props {
  prices: ICoinPrices
  land: SingleLandAPIResponse
  landId: string
  metaverse: Metaverse
  handleSpecificLandData: Function
}

const HorizontalPriceCard = ({
  land,
  landId,
  prices,
  metaverse,
  handleSpecificLandData
}: Props) => {
  const { address } = useAppSelector((state) => state.account)

  const predictions = convertETHPrediction(
    prices,
    land.eth_predicted_price,
    metaverse
  )

  const openSeaLink = createOpenSeaLink(metaverse, landId)

  // SocialMediaOptions contains all options with their texts, icons, etc..
  const options = SocialMediaOptions(landId, metaverse, predictions, address)
  return (

    <div
      className='flex h-[300px] justify-between relative nm-flat-medium rounded-3xl bg-grey-bone space-x-3 min-w-max hover:nm-flat-soft cursor-pointer'
      onClick={() => { handleSpecificLandData(true, land) }}
    >
      {/* LEFT/TOP */}
      <ExternalAssetLink
        metaverse={metaverse}
        land={land}
        landId={landId}
        layout='responsive'
      />
      {/* RIGHT/BOTTOM - PriceList */}
      <div className='flex flex-col justify-center p-7 pr-7 w-[400px]'>

        {/* Links and Info */}
        <div className='flex flex-col gap-6 md:gap-3'>
          {/* Name and Id */}
          <div>
            {/* Asset Name */}
            <h3 className='text-3xl text-grey-icon min-w-max'>
              {handleLandName(metaverse, land.coords)}
            </h3>
            {/* Asset ID */}
            <p className='text-base font-medium text-grey-content'>
              Token ID: {handleTokenID(landId)}
            </p>
          </div>

        </div>
        <h4 className='border-none text-grey-icon text-sm pt-4'>Price Estimation:</h4>
        <PriceListSmall predictions={predictions} metaverse={metaverse} />


        {/* External Links */}
        <div className='flex flex-col lg:flex-row gap-5 lg:items-center justify-start pt-4'>
          {/* {openSeaLink && <ExternalLink href={openSeaLink} text='OpenSea' />} */}
          {/* <ExternalLink
            href={land.external_link || ''}
            text={formatName(metaverse)}
          /> */}
          {openSeaLink && <img onClick={() => window.open(openSeaLink)} src="/images/opensea-logo.png" className='grayscale h-5 w-5 hover:grayscale-0 cursor-pointer' />}
          <BsTwitter
            title='Share Valuation'
            onClick={() => window.open(options.twitter.valuationLink)}
            className='h-5 w-5 text-grey-content hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
          />
        </div>
      </div>

    </div>
  )
}

export default HorizontalPriceCard
