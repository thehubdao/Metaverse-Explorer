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
      //title: window.innerWidth > 500 ? label : undefined,
    })

    const series: any[] = []
    const slicedData = data.map((currentData: any) => {
      const predictions: any = convertETHPrediction(prices, currentData.data, 'sandbox')
      return {
        time: parseInt(currentData.time) as UTCTimestamp,
        value: predictions['ethPrediction'],
      }
    })

    lineSeries.setData(slicedData)
    series.push({ price: lineSeries, name: label, color: '#54575C' })

    function businessDayToString(businessDay: number | any) {
      let businessDayDate = new Date(businessDay * 1000)
      businessDayDate.setDate(businessDayDate.getDate() + 1);
      return businessDayDate.getDate() + "/" + (businessDayDate.getMonth() + 1) + "/" + businessDayDate.getFullYear()
    }

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    function pricesToString(prices: any[]) {
      let auxiliarString = ''

      prices.map((item) => {
        const formatPrice = formatter.format(item.price)
        auxiliarString = `${auxiliarString} <div style="font-size: 10px; margin: 4px 0px; color: ${item.color}">${item.name}: ${formatPrice == 'NaN' ? '0.0' : formatPrice} ${'ETH'}</div>`
      })

      return auxiliarString
    }

    const toolTipWidth = 150;
    const toolTipHeight = 100;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement('div');
    toolTip.setAttribute('style', `width: 166px; height: fit; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`);
    toolTip.style.background = '#F3F6FF';
    toolTip.style.color = 'black';
    //toolTip.style.borderColor = 'rgb(24, 175, 242)';
    toolTip.style.borderRadius = '5px'
    chartElement.current.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(param => {
      if (!chartElement.current) return
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartElement.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartElement.current.clientHeight
      ) {
        toolTip.style.display = 'none';
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = businessDayToString(param.time);
        toolTip.style.display = 'block';
        let prices: any = []
        series.map((item) => { prices.push({ price: param.seriesPrices.get(item.price), name: item.name, color: item.color }) })
        toolTip.innerHTML = `<div style="font-size: 12px; margin: 4px 0px; color: ${'white'}">
          <div style="color: #54575C">${dateStr}</div>
          ${pricesToString(prices)}
          </div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > chartElement.current.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > chartElement.current.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
      }
    });

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