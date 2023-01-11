import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

// Components
import ColumnOptionButton from "./nftFilterColumn/ColumnOptionButton";
import FilterSelectorTraits from "./nftFilterColumn/FilterSelectorTraits";
import FilterPrice from "./nftFilterColumn/FilterPrice";

// Libraries
import {
	Currencies,
} from "../../lib/nftValuation/nftCommonTypes";
import { typedKeys } from "../../lib/utilities";
import { CheckBox } from "./nftFilterColumn/Checkbox";

interface IFilterColumn {
	selectedFilters: any
	nftTraitsFilters: {}
	inputValueMin: number
	inputValueMax: number
	setInputValueMin: Function
	setInputValueMax: Function
	handleApply: Function
	handleTraitFilter: Function
}

export default function FilterColumn({
	selectedFilters,
	nftTraitsFilters,
	inputValueMax,
	inputValueMin,
	setInputValueMax,
	setInputValueMin,
	handleApply,
	handleTraitFilter
}: IFilterColumn) {
	const [currency, setCurrency] = useState<Currencies>("eth");

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
					inputValueMax={inputValueMax}
					inputValueMin={inputValueMin}
					setInputValueMax={setInputValueMax}
					setInputValueMin={setInputValueMin}
					handleApply={handleApply}
				/>
			</OpenFilterSection>

			<ColumnOptionButton title="Trait Filter">
				<div className="flex flex-col p-1 rounded-3xl">
					{typedKeys(nftTraitsFilters).map((filter) => {
						return (
							<Fade duration={500} direction="down" key={filter}>
								<FilterSelectorTraits
									title={filter}
									selectedFilters={selectedFilters}
									handleTraitFilter={handleTraitFilter}
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
