import Image from "next/image";

interface ChartGridSelectorUIProps {
  setGridChartCols: React.Dispatch<React.SetStateAction<'col-span-1' | 'col-span-2'>>;
  gridChartCols: 'col-span-1' | 'col-span-2';
}

export default function ChartGridSelectorUI({ gridChartCols, setGridChartCols }: ChartGridSelectorUIProps) {
  return (
    <div className="flex justify-center items-center gap-3">
      {/* Button to change the chart grid to 1 column */}
      <button
        onClick={() => { setGridChartCols('col-span-1') }}
        className={`grid rounded-lg w-12 h-12 place-content-center justify-items-center bg-nm-fill dark:bg-nm-dm-fill
        ${(gridChartCols === 'col-span-1') ? 'shadow-inset dark:shadow-dm-hollow-8 ' : 'shadow-relief-12 dark:shadow-dm-relief-12'}`}
      >
        <Image
          src='/images/icons/chart/ic_two-col.svg'
          width={22}
          height={22}
          alt="button to change charts grid to 2 cols"
        />
      </button>
      {/* Button to change the chart grid to 2 columns */}
      <button
        onClick={() => { setGridChartCols('col-span-2') }}
        className={`grid rounded-md w-12 h-12 place-content-center bg-lm-fill dark:bg-nm-dm-fill
        ${(gridChartCols === 'col-span-2') ? 'shadow-hollow-8 dark:shadow-dm-hollow-8' : 'shadow-relief-12 dark:shadow-dm-relief-12'}`}
      >
        <Image
          src='/images/icons/chart/ic_one-col.svg'
          width={22}
          height={22}
          alt="button to change charts grid to 1 col"
        />
      </button>
    </div>
  );
}
