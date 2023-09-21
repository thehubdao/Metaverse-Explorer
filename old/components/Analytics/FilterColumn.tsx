import React from "react";
import { CheckBox } from "../nftValuation/nftFilterColumn/Checkbox";
import ColumnOptionButton from "../nftValuation/nftFilterColumn/ColumnOptionButton";


interface IFilterColumn {
	selectedFilters: string[]
	graphFilter: {name:string}[]
	handleGraphFilter: Function
}

export default function FilterColumn({
	selectedFilters,
    graphFilter,
	handleGraphFilter,
}: IFilterColumn) {
   
	const handleFilter = (keyword: string, isntChecked: boolean) => {	
		let auxSelectedFilters: string[] = selectedFilters
		let auxNoFilters = 0
		if (isntChecked) {
			auxSelectedFilters.push(keyword)
		} else {
			auxSelectedFilters = auxSelectedFilters.filter((item: string) => item != keyword)
		}
		auxNoFilters = auxSelectedFilters.length
		handleGraphFilter(auxSelectedFilters, auxNoFilters)
	}


	return (
		<div className="flex flex-col p-2 nm-flat-medium rounded-3xl gap-5 mt-4 ml-16">

			<ColumnOptionButton title="Graphs Filter">
				<div className="flex flex-col p-1 rounded-3xl">

								
					{graphFilter.map((filter: {name: string}, index: number) => (
						<CheckBox
							filter={filter}
							selectedFilters={selectedFilters}
							handleFilter={handleFilter}
							key={index}
						/>
					))}

				</div>
			</ColumnOptionButton>
		</div>
	);
}
