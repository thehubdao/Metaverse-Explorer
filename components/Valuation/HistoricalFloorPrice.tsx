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

  return (
    <>
      {historicFloorPrice && 
      <><h3>Historic Floor Price:</h3>
      <div className="rounded-3xl overflow-hidden h-full">
        <AnalyticsChart
          data={historicFloorPrice}
          fetching={loadingChart}
          label='Historic Floor Price:'
          metaverse={metaverse}
          prices={coinPrices}
        />
      </div></>}
    </>
  )
}

export default HistoricalFloorPrice