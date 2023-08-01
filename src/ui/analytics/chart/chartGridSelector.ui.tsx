import Image from "next/image";

// Interface for props used in the component.
interface ChartGridSelectorUIProps {
  setGridChartCols: React.Dispatch<React.SetStateAction<'col-span-1' | 'col-span-2'>>;
  gridChartCols: 'col-span-1' | 'col-span-2';
}

//* React functional component responsible for rendering the chart grid selector UI.
export default function ChartGridSelectorUI({ gridChartCols, setGridChartCols }: ChartGridSelectorUIProps) {
  return (
    // Container for the chart grid selector buttons.
    <div className="flex justify-center items-center gap-3">
      {/* Button to change the chart grid to 1 column */}
      <button
        onClick={() => { setGridChartCols('col-span-1') }}
        className={`grid rounded-lg w-12 h-12 place-content-center justify-items-center bg-nm-fill 
        ${(gridChartCols === 'col-span-1') ? 'shadow-inset' : 'shadow-relief-12'}`}
      >
        <Image
          src='/images/icons/chart/ic_two-col.svg' // Path to the image file
          width={22} // Width of the image
          height={22} // Height of the image
          alt="button to change charts grid to 2 cols" // Alternate text for accessibility
        />
      </button>
      {/* Button to change the chart grid to 2 columns */}
      <button
        onClick={() => { setGridChartCols('col-span-2') }}
        className={`grid rounded-md w-12 h-12 place-content-center bg-lm-fill
        ${(gridChartCols === 'col-span-2') ? 'shadow-hollow-8' : 'shadow-relief-12'}`}
      >
        <Image
          src='/images/icons/chart/ic_one-col.svg' // Path to the image file
          width={22} // Width of the image
          height={22} // Height of the image
          alt="button to change charts grid to 1 col" // Alternate text for accessibility
        />
      </button>
    </div>
  );
}
