import { Fade } from 'react-awesome-reveal'
import { Metaverse } from '../../lib/metaverse'
import { typedKeys } from '../../lib/utilities'
import {
  ICoinPrices,
  LandListAPIResponse,
} from '../../lib/valuation/valuationTypes'
import LandItem from './LandItem'

interface Props {
  lands: LandListAPIResponse
  metaverse: Metaverse
  coinPrices: ICoinPrices
  removeFromWatchList: (landId: string, metaverse: Metaverse) => Promise<void>
}
const LandList = ({
  coinPrices,
  lands,
  removeFromWatchList,
  metaverse,
}: Props) => {
  return (
    <ul className='w-full flex lg:flex-col flex-wrap justify-center gap-4 font-plus'>
      <Fade duration={550} className='w-full flex justify-center'>
        {typedKeys(lands).map((land) => (
          <LandItem
            coinPrices={coinPrices}
            metaverse={metaverse}
            remove={removeFromWatchList}
            land={lands[land]}
            landId={land}
            key={land}
          />
        ))}
      </Fade>
    </ul>
  )
}

export default LandList
