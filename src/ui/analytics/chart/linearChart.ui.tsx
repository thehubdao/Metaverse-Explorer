import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { getMetaverseColor } from '../../../utils/analyticsChart';
import { LightweightLinearChart } from '../../../lib/lightweightLinearChart.util';
import { Currencies, Metaverses } from '../../../enums/common';
import { AnalyticChartData } from '../../../interfaces/charts';
import { convertCurrency } from '../../../utils/currencyConverter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

// Interface for props used in the LinearChartUI component.
interface LinearChartUIProps {
  chartApiData: AnalyticChartData; // Data for the linear chart
  chartOptions: {
    cols: 'col-span-1' | 'col-span-2'; // Column span options for chart layout
    visibleDays: number; // Number of visible days for the chart
    visibleMetaverses: Metaverses[]; // Array of visible metaverses for the chart
    currencySelected: Currencies; // Selected currency for the chart
  };
}

//* Main component for the linear chart.
export default function LinearChartUI({ chartApiData, chartOptions }: LinearChartUIProps) {
  const chartElement = useRef<HTMLDivElement>(null);
  const currencyData = useSelector((state: RootState) => state.currency.currencies);

  useEffect(() => {
    if (chartApiData.status === 'error') return;

    // Create a new instance of LightweightLinearChart
    let LinearChart = new LightweightLinearChart(chartElement);

    // Iterate through the data and add lines to the chart
    for (const [key, value] of Object.entries(chartApiData.data)) {
      if (chartOptions.visibleMetaverses.length === 0) {
        LinearChart.addNewLine(
          value.map(item => {
            return {
              time: item.time,
              data: convertCurrency(
                chartOptions.currencySelected,
                Currencies.Ethereum,
                item.data,
                currencyData ?? 0
              )
            };
          }),
          getMetaverseColor(key),
          key
        );
      } else if (chartOptions.visibleMetaverses.includes(key as Metaverses)) {
        LinearChart.addNewLine(value, getMetaverseColor(key), key);
      }
    }

    LinearChart.updateSymbol(chartOptions.currencySelected);
    LinearChart.ChangeVisibleTimelapsRange(chartOptions.visibleDays);
    LinearChart.createTooltip(chartElement);

    // Cleanup function to remove the chart when the component unmounts
    return () => { LinearChart.remove(); };
  }, [chartOptions, currencyData]);

  return (
    <div className={`relative w-full h-full shadow-hollow-8 rounded-3xl p-7 bg-lm-fill text-lm-text`}>
      <div className='flex items-center gap-1 font-bold mb-4'>
        <Image
          src='/images/icons/chart/ic_round-candlestick-chart.svg'
          alt='chandlestick chart icon'
          width={24}
          height={24}
        />
        <h3 className='text-[0.938rem]'>{chartApiData.label}</h3>
        <Image
          src='/images/icons/chart/mdi_question-mark-circle-outline.svg'
          alt='question mark icon to obtain tooltip description of chart'
          width={17}
          height={17}
          title={chartApiData.description}
        />
      </div>
      <div className='flex w-full h-full justify-center items-center px-10 text-lm-text-gray'>
        {chartApiData.status !== 'error' ? (
          <>
            <p className="absolute transform -rotate-90 origin-center whitespace-nowrap -left-0 text-[0.813rem] font-normal">
              Volume ({chartOptions.currencySelected.toUpperCase()})
            </p>
            <div className="w-full h-60 flex justify-center items-center" ref={chartElement}></div>
            <p className="absolute transform rotate-90 origin-center whitespace-nowrap -right-5 text-[0.813rem] font-normal">
              Average Price ({chartOptions.currencySelected.toUpperCase()})
            </p>
          </>
        ) : (
          <div className='w-full h-full justify-center items-center flex flex-col gap-5 mb-5'>
            <Image
              src="/images/icons/error_icon.svg"
              width={100}
              height={100}
              loading='lazy'
              alt='Error logo image'
            />
            <p className='text-center'>This service is currently experiencing some issues. Please come back later</p>
          </div>
        )}
      </div>
    </div>
  );
}
