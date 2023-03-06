import { useState, useEffect } from "react"

import { Metaverse } from "../../lib/metaverse"
import { ICoinPrices } from "../../lib/valuation/valuationTypes"

import { AnalyticsChart } from "../Analytics"
import { fetchChartData } from "../Analytics/fetchChartData"

interface HistoricalFloorPriceProps {
  metaverse: Metaverse
  coinPrices: ICoinPrices
}

const HistoricalFloorPrice = ({ metaverse, coinPrices }: HistoricalFloorPriceProps) => {
  const [historicFloorPrice, setHistoricFloorPrice] = useState<any>([])
  const [loadingChart, setLoadingChart] = useState<boolean>(true)


  useEffect(() => {
    if (!metaverse) return
    const fetchHistoricFloorPrice = async () => {
      setLoadingChart(true)
      const response = await fetchChartData(metaverse, 'floorPrice')
      setHistoricFloorPrice(response)
      setLoadingChart(false)
    }
    fetchHistoricFloorPrice()
  }, [metaverse])

  return !historicFloorPrice /* || metaverse =="axie-infinity" */ ? (
    <>
      <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-5 mt-10 w-full bg-grey-panel'>
        <p className={`text-lg font-medium text-grey-content`}>
          We couldn't obtain Chart data
          Check{' '}
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
      <div className='flex flex-col h-full'>
        <p className={`text-lg font-semibold text-grey-content font-plus mb-4 ml-8`}>
          Historic Floor Price:{' '}
        </p>
        <div className='border-t border-l border-white/10 rounded-xl justify-between items-center p-5 h-full bg-grey-panel overflow-hidden w-full'>
          <AnalyticsChart
            data={historicFloorPrice}
            fetching={loadingChart}
            label='Historic Floor Price:'
            metaverse={metaverse}
            prices={coinPrices}
            backgroundHexa={'#E9ECF6'}
          />
        </div>
      </div>
    </>
  )
}

export default HistoricalFloorPrice