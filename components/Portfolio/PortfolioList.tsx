import React from 'react'
import { Fade } from 'react-awesome-reveal'
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
      <Fade duration={400} className='w-full flex flex-wrap gap-8 p-8 items-center justify-center'>
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
      </Fade>
    </ul>
  )
}

export default PortfolioList
