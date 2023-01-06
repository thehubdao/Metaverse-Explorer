import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

// Components
import ColumnOptionButton from "./nftFilterColumn/ColumnOptionButton";
import FilterSelectorTraits from "./nftFilterColumn/FilterSelectorTraits";
import FilterPrice from "./nftFilterColumn/FilterPrice";

// Libraries
import {
	Status,
	Currencies,
} from "../../lib/nftValuation/nftCommonTypes";
import { typedKeys } from "../../lib/utilities";
import { CheckBox } from "./nftFilterColumn/Checkbox";

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {};
	images: {
		image_small: string;
	};
	name: string | null
	listed_eth_price: number | undefined | null
}

interface IFilterColumn {
	nftObject: nftObject[];
	setfilteredItems: Function;
	setChecked: Function;
	selectedFilters: any
	setSelectedFilters: Function
	nFiltersSelected: number
	setNFiltersSelected: Function
	nftTraitsFilters: {}
}

export default function FilterColumn({
	nftObject,
	setfilteredItems,
	setChecked,
	selectedFilters,
	setSelectedFilters,
	nFiltersSelected,
	setNFiltersSelected,
	nftTraitsFilters
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

	const OpenFilterSection = ({ title, children }: any) => {
		return (
			<div className="flex flex-col">
				<div className="items-center tracking-wider p-5 font-plus font-medium text-grey-content flex justify-between cursor-pointer transition-all">
					<p className="font-bold text-lg">{title}</p>
				</div>
				<div className='mb-1 md:mb-0 flex flex-col gap-2'>
					<div>{children}</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col p-2 nm-flat-medium rounded-3xl gap-5">
			<OpenFilterSection title={'Status'}>
				<CheckBox
					filter={{ name: 'listed', description: '' }}
					selectedFilters={['']}
					handleFilter={() => { console.log('listeds') }}
				/>
			</OpenFilterSection>

			<OpenFilterSection title={'Price Estimation'}>
				<FilterPrice
					currency={currency}
					setCurrency={setCurrency}
					nftObject={nftObject}
					setfilteredItem={setfilteredItems}
					setChecked={setChecked}
				/>
			</OpenFilterSection>

			<ColumnOptionButton title="Trait Filter">
				<div className="flex flex-col p-1 rounded-3xl">
					{typedKeys(nftTraitsFilters).map((filter) => {
						return (
							<Fade duration={500} direction="down" key={filter}>
								<FilterSelectorTraits
									title={filter}
									setChecked={setChecked}
									selectedFilters={selectedFilters}
									setSelectedFilters={setSelectedFilters}
									nFiltersSelected={nFiltersSelected}
									setNFiltersSelected={setNFiltersSelected}
									nftTraitsFilters={nftTraitsFilters}
								/>
							</Fade>
						);
					})}
				</div>
			</ColumnOptionButton>
		</div>
	);
}
