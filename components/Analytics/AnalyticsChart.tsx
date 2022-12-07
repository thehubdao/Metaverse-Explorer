import React, { useEffect, useState, useRef } from 'react'
import { createChart, UTCTimestamp } from 'lightweight-charts'
import { typedKeys } from '../../lib/utilities'
import { Metaverse } from '../../lib/metaverse'
import { chartSymbolOptions } from '.'
import { convertETHPrediction } from '../../lib/valuation/valuationUtils'
import { ICoinPrices } from '../../lib/valuation/valuationTypes'
import ChartLoader from './ChartLoader'

type ChartData = {
  time: string
  data: number
}

interface Props {
  prices: ICoinPrices
  metaverse: Metaverse
  data: ChartData[]
  fetching: boolean
  label: string
}

const AnalyticsChart = ({
  data,
  label,
  metaverse,
  prices,
  fetching,
}: Props) => {
  const [symbol, setSymbol] = useState<keyof typeof chartSymbolOptions>('ETH')
  const intervalLabels = {
    week: { label: '7D', days: 7 },
    month: { label: '30D', days: 30 },
    semester: { label: '180D', days: 180 },
    year: { label: '1Y', days: 365 },
    all: { label: 'Max' },
  }

  type TimeInterval = keyof typeof intervalLabels
  const sliceTimeData = (data: ChartData[], interval: TimeInterval) => {
    return interval === 'all'
      ? data
      : data.slice(data.length - intervalLabels[interval].days)
  }
  const chartElement = useRef<HTMLDivElement>(null)

  const [interval, setInterval] = useState<TimeInterval>('week')

  useEffect(() => {
    if (!chartElement.current) return
    const chart = createChart(chartElement.current, {
      width: chartElement.current.clientWidth,
      height: 197,
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
        timeVisible: false,
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
      title: window.innerWidth > 500 ? label : undefined,
    })
    const slicedData = sliceTimeData(data, interval).map((currentData) => {
      const predictions = convertETHPrediction(
        prices,
        currentData.data,
        metaverse
      )
      return {
        time: parseInt(currentData.time) as UTCTimestamp,
        value: predictions[chartSymbolOptions[symbol].key],
      }
    })
    areaSeries.setData(slicedData)

    const resizeGraph = () => {
      chart.applyOptions({ width: chartElement.current?.clientWidth })
    }
    window.addEventListener('resize', resizeGraph)
    return () => {
      window.removeEventListener('resize', resizeGraph)
      chart.remove()
    }
  }, [data, interval, metaverse, symbol])

  return (
    <div className='gray-box'>
      <div className='max-w-full h-full relative' ref={chartElement}>
        {fetching && <ChartLoader />}

        {/* /* Chart Options Wrapper */}
        <div className='absolute top-1 z-10 flex w-full flex-col gap-4 sm:flex-row justify-between'>
          {/* Interval Buttons */}
          <div className='flex gap-2 relative left-1 w-fit'>
            {typedKeys(intervalLabels).map((arrInterval) => (
              <button
                key={arrInterval}
                className={
                  'gray-box font-semibold rounded-lg p-2 text-xs text-gray-400' +
                  (interval === arrInterval
                    ? ' text-gray-300 bg-opacity-80 '
                    : ' hover:text-gray-300 hover:bg-opacity-80')
                }
                onClick={() => setInterval(arrInterval)}
              >
                {intervalLabels[arrInterval]['label']}
              </button>
            ))}
          </div>

          {/* Coin Buttons */}
          <div className='sm:flex gap-2 relative left-1 sm:left-auto sm:right-18 w-fit hidden'>
            {typedKeys(chartSymbolOptions).map((arrSymbol) => (
              <button
                key={arrSymbol}
                className={
                  'gray-box font-semibold  rounded-lg p-2 text-xs text-gray-400' +
                  (symbol === arrSymbol
                    ? ' text-gray-300 bg-opacity-80 '
                    : ' hover:text-gray-300 hover:bg-opacity-80')
                }
                onClick={() => setSymbol(arrSymbol)}
              >
                {arrSymbol === 'METAVERSE'
                  ? chartSymbolOptions[arrSymbol][metaverse]
                  : arrSymbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnalyticsChart
