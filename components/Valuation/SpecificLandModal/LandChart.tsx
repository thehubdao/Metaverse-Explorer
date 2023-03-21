import { createChart, UTCTimestamp } from "lightweight-charts"
import { useEffect, useRef } from "react"
import { convertETHPrediction } from "../../../lib/valuation/valuationUtils"

const LandChart = ({ data, label, backgroundHexa, prices }: any) => {
  const chartElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!chartElement.current) return
    const chart = createChart(chartElement.current, {
      width: chartElement.current.clientWidth,
      height: 197,
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: true,
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: backgroundHexa ? backgroundHexa : '#FFF',
        textColor: "black",
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(101, 101, 101, 0.11)',
        },
      },
    })
    const lineSeries = chart.addAreaSeries({
      topColor: '#1aabf4',
      bottomColor: 'rgba(93, 252, 233, 0)',
      lineColor: '#1aabf4',
      lineWidth: 1,
      title: window.innerWidth > 500 ? label : undefined,
    })

    const slicedData = data.map((currentData: any) => {
      const predictions: any = convertETHPrediction(prices, currentData.data, 'sandbox')
      return {
        time: parseInt(currentData.time) as UTCTimestamp,
        value: predictions['ethPrediction'],
      }
    })

    lineSeries.setData(slicedData)

    const resizeGraph = () => {
      chart.applyOptions({ width: chartElement.current?.clientWidth })
    }
    window.addEventListener('resize', resizeGraph)
    return () => {
      window.removeEventListener('resize', resizeGraph)
      chart.remove()
    }
  }, [data])

  return (
    <div className="max-w-full h-full relative pt-3" ref={chartElement}></div>
  )
}

export default LandChart