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
}
const PortfolioList = ({ lands, prices, metaverse }: Props) => {
  return (
    <ul className='grid gap-4 lg:gap-12 md:gap-6 md:grid-cols-3 p-8'>
      <Fade duration={400} className='w-full flex justify-center'>
        {typedKeys(lands).map((land) => (
          <li key={land} className='w-full gray-box shadowNormal'>
            <HorizontalPriceCard
              metaverse={metaverse}
              land={lands[land]}
              landId={land}
              prices={prices}
            />
          </li>
        ))}
      </Fade>
    </ul>
  )
}

export default PortfolioList
