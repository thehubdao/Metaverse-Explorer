import { useState, useEffect } from "react"

import { Metaverse } from "../../lib/metaverse"
import { ICoinPrices } from "../../lib/valuation/valuationTypes"

import { AnalyticsChart } from "../Analytics"
import { fetchChartData } from "../Analytics/fetchChartData"
import { Tooltip } from "@mui/material"
import { AiFillQuestionCircle } from "react-icons/ai"

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
      <div className='flex flex-col justify-center border-t border-l border-white/10 rounded-xl p-5 w-full h-full bg-grey-panel'>
        <p className={`text-lg font-medium text-grey-content`}>
          We couldn't obtain Chart data
          Check{' '}
          <a
            href='https://opensea.io'
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
        <div className='flex items-center gap-x-2 mb-4'>
          <p className={`text-lg font-semibold text-grey-content font-plus`}>
            Historic Floor Price:{' '}
          </p>
        </div>
        <div className='border-t border-l border-white/10 rounded-xl justify-between items-center p-5 h-full bg-grey-panel overflow-hidden w-full'>
          <AnalyticsChart
            data={historicFloorPrice}
            fetching={loadingChart}
            label='Historic Floor Price'
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