import React, { useEffect, useState, useRef } from 'react'
import { createChart, UTCTimestamp } from 'lightweight-charts'
import { getValuationDailyData } from '../../lib/FirebaseUtilities'
import { typedKeys } from '../../lib/utilities'
import { Metaverse } from '../../lib/metaverse'

interface IChartValues {
  time: number
  dailyVolume: Record<FloorVolumeKeys, number>
  floorPrice: Record<FloorVolumeKeys, number>
}
type FloorVolumeKeys = 'ethPrediction' | 'usdPrediction' | 'metaversePrediction'

const FloorAndVolumeChart = ({ metaverse }: { metaverse: Metaverse }) => {
  const metaverseGraph = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<IChartValues[]>([])
  const symbolOptions = {
    ETH: { key: 'ethPrediction' },
    USDC: { key: 'usdPrediction' },
    METAVERSE: {
      key: 'metaversePrediction',
      sandbox: 'SAND',
      decentraland: 'MANA',
      'axie-infinity': 'AXS',
      'somnium-space':''
    },
  }
  const [symbol, setSymbol] = useState<keyof typeof symbolOptions>('ETH')

  useEffect(() => {
    ;(async () => setValues(await getValuationDailyData(metaverse)))()
  }, [metaverse])

  useEffect(() => {
    if (!metaverseGraph.current) return
    const chart = createChart(metaverseGraph.current, {
      width: metaverseGraph.current.clientWidth,
      height: 197,
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
        timeVisible: true,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#131722',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
    })
    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(38,198,218, 0.56)',
      bottomColor: 'rgba(38,198,218, 0.04)',
      lineColor: 'rgba(38,198,218, 1)',
      lineWidth: 2,
      title: 'Daily Volume',
    })

    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      title: 'Floor Price',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    areaSeries.setData(
      values.map((data: IChartValues) => {
        return {
          time: (data.time / 1000) as UTCTimestamp,
          value: data.dailyVolume[symbolOptions[symbol].key as FloorVolumeKeys],
        }
      })
    )
    volumeSeries.setData(
      values.map((data: IChartValues) => {
        return {
          time: (data.time / 1000) as UTCTimestamp,
          value: data.floorPrice[symbolOptions[symbol].key as FloorVolumeKeys],
        }
      })
    )
    const resizeGraph = () =>
      chart.applyOptions({ width: metaverseGraph.current?.clientWidth })
    window.addEventListener('resize', resizeGraph)
    return () => {
      window.removeEventListener('resize', resizeGraph)

      chart.remove()
    }
  }, [values, symbol])

  return (
    <div className='max-w-full h-full relative' ref={metaverseGraph}>
      <div className='absolute top-1 left-1 z-10 flex gap-2'>
        {typedKeys(symbolOptions).map((arrSymbol) => (
          <button
            key={arrSymbol}
            className={
              'gray-box font-semibold  rounded-lg p-2 text-xs text-gray-400' +
              (symbol === arrSymbol
                ? ' text-grey-content bg-opacity-80 '
                : ' hover:text-grey-content hover:bg-opacity-80')
            }
            onClick={() => setSymbol(arrSymbol)}
          >
            {arrSymbol === 'METAVERSE'
              ? symbolOptions[arrSymbol][metaverse]
              : arrSymbol}
          </button>
        ))}
      </div>
    </div>
  )
}
export default FloorAndVolumeChart
