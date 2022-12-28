import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

// Components
import ColumnOptionButton from "./nftFilterColumn/ColumnOptionButton";
import FilterCheckBox from "./nftFilterColumn/FilterCheckBox";
import FilterSelectorTraits from "./nftFilterColumn/FilterSelectorTraits";
import FilterPrice from "./nftFilterColumn/FilterPrice";

// Libraries
import {
	Status,
	Currencies,
	Filters,
} from "../../lib/nftValuation/nftCommonTypes";
import { typedKeys } from "../../lib/utilities";

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {
		traitType: string;
		value: string;
	}[];
	images: {
		image_small: string;
	};
}

interface IFilterColumn {
	nftObject: nftObject[];
	setfilteredItems: Function;
	setChecked: Function;
	selectedFilters: any
	setSelectedFilters: Function
	nFiltersSelected: number
	setNFiltersSelected: Function
}

export default function FilterColumn({
	nftObject,
	setfilteredItems,
	setChecked,
	selectedFilters,
	setSelectedFilters,
	nFiltersSelected,
	setNFiltersSelected,
}: IFilterColumn) {
	const [currency, setCurrency] = useState<Currencies>("eth");

	useEffect(() => {
		if (nFiltersSelected === 0) {
			setfilteredItems(nftObject);
		} else {
			const results = nftObject.filter((fluf: any) => {
				let isReturnItem = false
				Object.entries(selectedFilters).forEach(([key, value]: any) => {
					value.map((item: any) => {
						if (fluf.traits[key] == item) isReturnItem = true
					})
				});
				return isReturnItem
			});
			setfilteredItems(results)
		}
	}, [nFiltersSelected])

	const filterOptions = {
		Status: {
			name: "Status",
			description: "",
			children: (
				<Fade duration={500} direction="down">
					<FilterCheckBox
						optionslist={Status}
						filterObject={nftObject}
						setfilteredItems={setfilteredItems}
						setChecked={setChecked}
					/>
				</Fade>
			),
		},
		Price: {
			name: "Price Estimation",
			description: "",
			children: (
				<Fade duration={500} direction="down">
					<FilterPrice 
						currency={currency} 
						setCurrency={setCurrency} 
						nftObject={nftObject}
						setfilteredItem={setfilteredItems}
						setChecked={setChecked}
					/>
				</Fade>
			),
		},
		TraitFilter: {
			name: "TraitFilter",
			description: "",
			children: (
				<div className="flex flex-col p-1 rounded-3xl">
					{typedKeys(Filters).map((filter) => {
						return (
							<Fade duration={500} direction="down" key={filter}>
								<FilterSelectorTraits
									title={filter}
									setChecked={setChecked}
									selectedFilters={selectedFilters}
									setSelectedFilters={setSelectedFilters}
									nFiltersSelected={nFiltersSelected}
									setNFiltersSelected={setNFiltersSelected}
								/>
							</Fade>
						);
					})}
				</div>
			),
		},
	};

	return (
		<div className="flex flex-col p-2 nm-flat-medium rounded-3xl">
			{typedKeys(filterOptions).map((filter) => (
				<ColumnOptionButton title={filterOptions[filter].name} key={filter}>
					{filterOptions[filter].children}
				</ColumnOptionButton>
			))}
		</div>
	);
}
