import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../backend/services/openSeaDataManager'
import { Metaverse } from '../../lib/metaverse'
import { IPredictions } from '../../lib/types'
import { formatName } from '../../lib/utilities'
import { ICoinPrices } from '../../lib/valuation/valuationTypes'
import { getAxieDailyTradeVolume } from '../../lib/valuation/valuationUtils'
import { PriceList } from '../General'

interface Props {
  metaverse: Metaverse
  coinPrices: ICoinPrices
}

const SalesVolumeDaily = ({ coinPrices, metaverse }: Props) => {
  const [predictions, setPredictions] = useState<IPredictions>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setData = async () => {
      setLoading(true)
      // Fetch Data from OpenSea
      const stats = await getCollectionData(metaverse)
/*       if (metaverse === 'axie-infinity') {
        // Fetch from Axie Market
        const dailyVolume = Number(await getAxieDailyTradeVolume())
        stats.one_day_volume = dailyVolume
      } */

      const formattedMetaverse =
        metaverse === 'sandbox'
          ? 'the-sandbox'
          : metaverse === 'somnium-space'
            ? 'somnium-space-cubes'
            : metaverse
      const metaversePrediction =
        (stats.one_day_volume * coinPrices.ethereum?.usd) /
        (coinPrices as any)[formattedMetaverse]?.usd

      // Formatting Data for PriceList
      const predictions = {
        ethPrediction: stats.one_day_volume,
        usdPrediction: stats.one_day_volume * coinPrices.ethereum?.usd,
        metaversePrediction: metaversePrediction,
      }
      setPredictions(predictions)
      setLoading(false)
    }
    setData()
  }, [metaverse])

  return !predictions ? (
    <>
      <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-5 w-full bg-grey-panel'>
        <p className={`text-lg xl:text-xl font-medium text-grey-content`}>
          We couldn't obtain Daily Volume for the {formatName(metaverse)} lands
          collection. Check{' '}
          <a
            href='https://opensea.io/collection'
            target='_blank'
            className='hover:underline text-grey-content'
          >
            Open Sea Market
          </a>{' '}
          for more information.
        </p>
      </div>
    </>
  ) : (
    <>
    <div className='flex flex-col'>
        <p className={`text-lg xl:text-xl font-medium text-grey-content font-plus mb-4`}>
          Daily Volume:{' '}
        </p>
      <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-5 w-full bg-grey-panel'>     

        <div
          className={
            (loading ? 'opacity-0' : 'opacity-100') +
            ' transition-all duration-300'
          }
        >
          <PriceList predictions={predictions} metaverse={metaverse} />
        </div>
      </div>
    </div>
        
    </>
  )
}

export default SalesVolumeDaily
