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

    for (let i = 0; i < metaverses.length; i++) {

      let metaverse = dataMetaverse[metaverses[i]];

      if (metaverse.active) {
        let lineSeries = chart.addLineSeries({
          color: metaverse.color,
          lineWidth: 1,
          title: window.innerWidth > 500 ? metaverse.name : undefined,
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
      <div className=" max-w-full h-full flex justify-center items-center" ref={chartElement}>
      </div>
      {/* fetching */ true && <div className="absolute z-50 -top-12 -right-12">
        <Loader color='black' size={50} />
      </div>}
    </div>
  );
};
export default AnalyticsMultiChart;
