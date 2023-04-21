import React, { useEffect, useState, useRef } from "react";
import { createChart, UTCTimestamp } from "lightweight-charts";
import { Metaverse } from "../../lib/metaverse";
import { chartSymbolOptions } from ".";
import { convertETHPrediction } from "../../lib/valuation/valuationUtils";
import { ICoinPrices } from "../../lib/valuation/valuationTypes";
import Loader from "../Loader";

type ChartData = {
  time: string;
  data: number;
};

interface Props {
  prices: ICoinPrices;
  dataMetaverse: any;
  fetching: boolean;
  route: any,
  metaverses: Metaverse[];
  interval: any;
  intervalLabels: any,
  symbol: keyof typeof chartSymbolOptions,
  updateMosaic?: string;
  openedFilters?: boolean;
}

const AnalyticsMultiChart = ({
  dataMetaverse,
  metaverses,
  route,
  prices,
  fetching,
  interval,
  intervalLabels,
  symbol,
  updateMosaic,
  openedFilters,
}: Props) => {

  type TimeInterval = keyof typeof intervalLabels;

  let sliceTimeData = (data: ChartData[], interval: TimeInterval) => {
    return interval === "all"
      ? data
      : data.slice(data.length - intervalLabels[interval].days);
  };

  const chartElement = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!chartElement.current) return;
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
        backgroundColor: "#F9FAFB",
        textColor: "black",
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0)",
        },
        horzLines: {
          color: "rgba(101, 101, 101, 0.11)",
        },
      },
    });

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

    const series: any[] = []
    for (let i = 0; i < metaverses.length; i++) {
      let metaverse = dataMetaverse[metaverses[i]];
      if (metaverse.active) {
        let lineSeries = chart.addLineSeries({
          color: metaverse.color,
          lineWidth: 1,
          // title: window.innerWidth > 500 ? metaverse.name : undefined,
        });

        let slicedData = sliceTimeData(metaverse.data[route], interval).map(
          (currentData) => {
            let predictions = convertETHPrediction(
              prices,
              currentData.data,
              metaverses[i]
            );
            return {
              time: parseInt(currentData.time) as UTCTimestamp,
              value: predictions[chartSymbolOptions[symbol].key],
            };
          }
        );
        lineSeries.setData(slicedData);
        series.push({ price: lineSeries, name: metaverse.name, color: metaverse.color })
      }
    }

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
        auxiliarString = `${auxiliarString} <div style="font-size: 10px; margin: 4px 0px; color: ${item.color}">${item.name}: ${formatPrice == 'NaN' ? '0.0' : formatPrice} ${symbol}</div>`
      })

      return auxiliarString
    }

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
        series.map((item) => { prices.push({ price: param.seriesPrices.get(item.price),name: item.name, color: item.color }) })
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
      chart.applyOptions({ width: chartElement.current?.clientWidth });
    };
    window.addEventListener("resize", resizeGraph);
    return () => {
      window.removeEventListener("resize", resizeGraph);
      chart.remove();
    };
  }, [interval, dataMetaverse, symbol, updateMosaic, openedFilters]);

  return (
    <div className="w-full h.full">
      <div className=" max-w-full h-full flex justify-center items-center" ref={chartElement}></div>
      {fetching && <div className="absolute z-50 -top-12 -right-12">
        <Loader color='blue' size={50} />
      </div>}
    </div>
  );
};
export default AnalyticsMultiChart;
