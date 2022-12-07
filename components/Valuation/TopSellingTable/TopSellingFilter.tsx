import React from "react";
import { typedKeys } from "../../../lib/utilities";

export type TopSellingFilterBy = keyof typeof filterOptions;
interface Props {
	filterBy: TopSellingFilterBy;
	setFilterBy: Function;
}

// Had to put this object outside to use it on the Props. If not, would usually keep it inside function
const filterOptions = { 
  yesterdayTop :{ title: 'FILTERED BY YESTERDAY', label: '2D' },
  monthTop: { title: 'FILTERED BY LAST MOUNTH', label: '1M' },
  yearTop:{ title: 'FILTERED BY LAST YEAR', label: '1Y' },
  totalTop:{ title: '', label: 'Max' }
 }


const TopSellingFilter = ({ filterBy, setFilterBy }: Props) => {
	return (
		<div className="w-fit inline-flex">
			{typedKeys(filterOptions).map((filter) => (
				<button
					key={filter}
					type="button"
					className="py-2.5 px-5 mr-2 mb-2 text-sm font-bold focus:outline-none rounded-2xl  text-grey-content font-plus shadowNormal "
					onClick={() => setFilterBy(filter)}
				>
					{filterOptions[filter].label}
				</button>
			))}
		</div>
	);
};

export default TopSellingFilter;
