import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { typedKeys } from '../../lib/utilities'
import {
  ICoinPrices,
  LandListAPIResponse,
} from '../../lib/valuation/valuationTypes'
import { HorizontalPriceCard } from '../General'

interface Props {
  lands: LandListAPIResponse
  prices: ICoinPrices
  metaverse: Metaverse
  handleSpecificLandData: Function
}
const PortfolioList = ({ lands, prices, metaverse, handleSpecificLandData }: Props) => {
  return (
    <ul className='flex w-full'>
      {typedKeys(lands).map((land) => (
        <li key={land} className='w-[520px] gray-box'>
          <HorizontalPriceCard
            metaverse={metaverse}
            land={lands[land]}
            landId={land}
            prices={prices}
            handleSpecificLandData={handleSpecificLandData}
          />
        </li>
      ))}
    </ul>
  )
}

export default PortfolioList
