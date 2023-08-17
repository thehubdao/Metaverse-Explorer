const filterOptions = {
  yesterdayTop: { title: 'FILTERED BY YESTERDAY', label: '2D' },
  monthTop: { title: 'FILTERED BY LAST MONTH', label: '1M' },
  yearTop: { title: 'FILTERED BY LAST YEAR', label: '1Y' },
  totalTop: { title: '', label: 'Max' },
};

export type TopSellingFilterBy = keyof typeof filterOptions;

interface TopSellsFilterUIProps {
  filterBy: TopSellingFilterBy;
  setFilterBy: (filter: TopSellingFilterBy) => void;
}

export default function TopSellsFilterUI({ filterBy, setFilterBy }: TopSellsFilterUIProps) {
  return (
    <div className="w-fit inline-flex gap-3">
      {Object.keys(filterOptions).map((filterKey) => {
        const filter = filterKey as TopSellingFilterBy;
        return (
          <button
            key={filterKey}
            type="button"
            className={`w-16 h-10 text-sm font-bold cursor-pointer rounded-lg text-lm-text ${
              filterBy === filter ? 'shadow-hollow-2' : 'shadow-relief-12 hover:shadow-relief-32'
            }`}
            onClick={() => setFilterBy(filter)}
          >
            {filterOptions[filter].label}
          </button>
        );
      })}
    </div>
  );
}



