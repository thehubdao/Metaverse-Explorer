import { useState } from "react";
import ChartCurrencyFilterSelectorUI from "./chart/chartCurrencyFilterSelector.ui";
import ChartGridSelectorUI from "./chart/chartGridSelector.ui";
import ChartMetaverseFilterSelectorUI from "./chart/chartMetaverseFilterSelector.ui";
import ChartNameFilterSelectorUI from "./chart/chartNameFilterSelector.ui";
import ChartTimeFilterSelectorUI from "./chart/chartTimeFilterSelector.ui";
import LinearChartUI from "./chart/linearChart.ui";

import { AnalyticChartData } from "../../interfaces/charts";
import { AnalyticsChartRoutes } from "../../enums/charts";
import { Metaverses } from "../../enums/metaverses.enum";
import { Currencies } from "../../enums/common.enum";
import LoaderUI from "../common/loader.ui";

// Interface for props used in the AnalyticsUI component.
interface AnalyticsUIProps {
  analyticsData: AnalyticChartData[]; // Array of analytic chart data to be displayed
}

//* Main component for the Analytics UI.
export default function AnalyticsUI({ analyticsData }: AnalyticsUIProps) {
  // State variables to manage the UI filters and settings
  const [gridChartCols, setGridChartCols] = useState<'col-span-1' | 'col-span-2'>('col-span-1');
  const [visibleDays, setVisibleDays] = useState<7 | 30 | 60 | 183 | 365>(7);
  const [visibleMetaverses, setVisibleMetaverses] = useState<Metaverses[]>([]);
  const [visibleCharts, setVisibleCharts] = useState<AnalyticsChartRoutes[]>([]);
  const [currencySelected, setCurrencySelected] = useState<Currencies>(Currencies.Ethereum);

  return (
    <div className="w-full mt-16 text-lm-text font-bold text-sm">
      <div className="h-12 flex justify-between items-center">
        <div className="flex gap-6 ">
          <ChartNameFilterSelectorUI visibleCharts={visibleCharts} setVisibleCharts={setVisibleCharts} />
          <ChartMetaverseFilterSelectorUI visibleMetaverses={visibleMetaverses} setVisibleMetaverses={setVisibleMetaverses} />
        </div>
        <div className="flex gap-6">
          <ChartCurrencyFilterSelectorUI currencySelected={currencySelected} setCurrencySelected={setCurrencySelected} />
          <ChartTimeFilterSelectorUI visibleDays={visibleDays} setVisibleDays={setVisibleDays} />
          <ChartGridSelectorUI setGridChartCols={setGridChartCols} gridChartCols={gridChartCols} />
        </div>
      </div>
      {/* Display a message while the chart data is loading */}
      {
        analyticsData.length === 0 && 
        <div className="flex justify-center items-center w-full h-96 my-6">
          <LoaderUI size={100} text={"Loading charts..."}/>
        </div>
      }
      <div className="grid grid-cols-2 gap-5 my-6">
        {/* {analyticsData.length === 0 && <LoaderUI size={100} text={"Loading charts..."}/>} */}
        {/* Render each chart based on the selected filters */}
        {analyticsData.map((chart, index) => {
          return (visibleCharts.length === 0 || visibleCharts.includes(chart.chartEnum)) && (
            <div key={index} className={`w-full h-full ${gridChartCols}`}>
              <LinearChartUI chartApiData={chart} chartOptions={{ cols: gridChartCols, visibleDays, visibleMetaverses, currencySelected }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
