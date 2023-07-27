// Interface for props used in the ChartTimeFilterSelectorUI component.
interface ChartTimeFilterSelectorUIProps {
  setVisibleDays: React.Dispatch<React.SetStateAction<7 | 30 | 60 | 183 | 365>>; // Function to set the number of visible days
  visibleDays: number; // Number representing the currently visible days
}

// Interface for the TimeFilterProps used in the ChartTimeFilterSelectorUI component.
interface TimeFilterProps {
  label: string; // Label to display on the button (e.g., 'W', 'M', 'Q', 'H', 'Y')
  title: string; // Title for the filter (e.g., 'Filter for a week', 'Filter for a month')
  daysOnNumber: 7 | 30 | 60 | 183 | 365; // Number representing the days for the filter
}

//* Main component for the chart time filter selector.
export default function ChartTimeFilterSelectorUI({ visibleDays, setVisibleDays }: ChartTimeFilterSelectorUIProps) {
  // Array of time filters with their respective labels, titles, and daysOnNumber values
  const timeFilters: TimeFilterProps[] = [
    {
      label: 'W',
      title: 'Filter for a week',
      daysOnNumber: 7
    },
    {
      label: 'M',
      title: 'Filter for a month',
      daysOnNumber: 30
    },
    {
      label: 'Q',
      title: 'Filter for a quarter',
      daysOnNumber: 60
    },
    {
      label: 'H',
      title: 'Filter for a half year',
      daysOnNumber: 183
    },
    {
      label: 'Y',
      title: 'Filter for a year',
      daysOnNumber: 365
    }
  ];

  return (
    <div className="flex justify-center items-center gap-3">
      {/* Mapping through the time filters to render the buttons */}
      {timeFilters.map((item: TimeFilterProps, index: number) => {
        return (
          <button
            key={index} // React key to identify each button uniquely
            className={`rounded-lg w-12 h-12 bg-nm-fill
            ${visibleDays === item.daysOnNumber ? 'shadow-inset' : 'shadow-relief-12'}`} // Dynamically generated class based on the currently visible days
            onClick={() => { setVisibleDays(item.daysOnNumber) }} // Function called when the button is clicked to set the number of visible days
            title={item.title} // Tooltip title for the filter
          >
            {item.label} {/* Displaying the label on the button */}
          </button>
        );
      })}
    </div>
  );
}
