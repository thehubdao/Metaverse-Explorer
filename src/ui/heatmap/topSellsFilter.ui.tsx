import { TopSellingFilterBy, filterOptions } from "../../interfaces/itrm/val-analytics.interface";

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
            className={`w-16 h-10 text-sm font-bold cursor-pointer rounded-lg text-lm-text dark:text-nm-fill ${
              filterBy === filter ? 'shadow-hollow-2 dark:shadow-dm-hollow-8' : 'shadow-relief-12 dark:shadow-dm-relief-12 hover:shadow-relief-32 dark:hover:shadow-dm-relief-32'
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



