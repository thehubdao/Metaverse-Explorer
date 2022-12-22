import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Fade } from "react-awesome-reveal";
import FilterCheckBox from "./FilterCheckBox";
import {
	TraitFilter,
	Status,
	Currencies
} from "../../lib/nftValuation/nftCommonTypes";
import FilterSelectorTraits from "./FilterSelectorTraits";
import FilterPrice from "./FilterPrice";

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

interface optionList {
	name: string;
	description: string;
}

interface Props {
	title: string;
	filterObject: nftObject[];
	setfilteredItem: Function;
	setChecked: Function;
}

function setFilter(
	typeFilter: string,
	object: nftObject[],
	setfilteredItem: Function,
	setChecked: Function,
	currency: Currencies,
	setCurrency: React.Dispatch<React.SetStateAction<Currencies>>
) {
	let options: optionList[];
	switch (typeFilter) {
		case "Status":
			options = Status;
			return (
				<Fade duration={500} direction="down">
				<FilterCheckBox
					optionslist={options}
					filterObject={object}
					setfilteredItem={setfilteredItem}
					setChecked={setChecked}
				/>
				</Fade>
			);
		case "Price Estimation":
			return <Fade duration={500} direction="down"><FilterPrice currency={currency} setCurrency={setCurrency}/></Fade>
		case "TraitFilter":
			options = TraitFilter;
			return (
				<div className="flex flex-col p-1 rounded-3xl">
					{options.map((filter, index:number) => (
						<Fade duration={500} direction="down">
						<FilterSelectorTraits
							title={filter.name}
							key={index}
							setfilteredItem={setfilteredItem}
							setChecked={setChecked} 
							filterObject={object}
						/>
						</Fade>
					))}
				</div>
			);
	}
}

export default function FilterTraits({
	title,
	filterObject,
	setfilteredItem,
	setChecked,
}: Props) {
	const [opened, setOpened] = useState(false);
	const [currency, setCurrency] = useState<Currencies>('eth')
	return (
		<div className="flex flex-col">
			<div
				onClick={() => setOpened(!opened)}
				className="items-center tracking-wider p-5 font-plus font-medium text-grey-content flex justify-between cursor-pointer transition-all"
			>
				<p className="font-bold text-lg">{title}</p>
				<IoIosArrowDown
					className={
						(opened ? "rotate-180 " : "") +
						"transition-all duration-500 relative bottom-[1px]"
					}
				/>
			</div>
			<div
				className={
					(opened && "mb-1 md:mb-0") + "md:absolute flex flex-col gap-2"
				}
			>
				{opened && (
					<div>
						{setFilter(title, filterObject, setfilteredItem, setChecked, currency, setCurrency)}
					</div>
				)}
			</div>
		</div>
	);
}
