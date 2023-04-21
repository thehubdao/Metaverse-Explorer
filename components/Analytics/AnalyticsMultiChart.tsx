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

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement('div');
    toolTip.setAttribute('style', `width: 96px; height: 80px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`);
    toolTip.style.background = 'black';
    toolTip.style.color = 'white';
    toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';
    chartElement.current.appendChild(toolTip);

    for (let i = 0; i < metaverses.length; i++) {

      let metaverse = dataMetaverse[metaverses[i]];

      if (metaverse.active) {
        let lineSeries = chart.addLineSeries({
          color: metaverse.color,
          lineWidth: 1,
          // title: window.innerWidth > 500 ? metaverse.name : undefined,
        });

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
            const dateStr = param.time;
            toolTip.style.display = 'block';
            const data = param.seriesData.get(lineSeries);
            const price = data.value !== undefined ? data.value : data.close;
            toolTip.innerHTML = `<div style="color: ${'rgba( 38, 166, 154, 1)'}">ABC Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${'white'}">
			${Math.round(100 * price) / 100}
			</div><div style="color: ${'white'}">
			${dateStr}
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
      }
    }

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
