interface ChartTimeFilterSelectorUIProps {
  setVisibleDays: React.Dispatch<React.SetStateAction<7 | 30 | 60 | 183 | 365>>; // Function to set the number of visible days
  visibleDays: number; // Number representing the currently visible days
}

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
            key={index}
            className={`rounded-lg w-12 h-12 bg-lm-fill
            ${visibleDays === item.daysOnNumber ? 'shadow-hollow-8' : 'shadow-relief-12'}`}
            onClick={() => { setVisibleDays(item.daysOnNumber) }}
            title={item.title}
          >{item.label}</button>
        );
      })}
    </div>
  );
}
