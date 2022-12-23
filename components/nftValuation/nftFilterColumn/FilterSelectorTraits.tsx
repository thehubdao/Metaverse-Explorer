import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Fade } from "react-awesome-reveal";

// libraries
import { Filters } from "../../../lib/nftValuation/nftCommonTypes";

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

interface FilterCheckBoxProps {
	filterObject: nftObject[];
	setfilteredItem: Function;
	setChecked: Function;
	optionslist: optionList[];
}

interface FilterSelectorTraitsProps {
	title:
		| "Background"
		| "Dance"
		| "Ears"
		| "Expression"
		| "Eyes"
		| "Eyewear"
		| "Fur"
		| "Head"
		| "Mouth"
		| "Music"
		| "Neck"
		| "Nose"
		| "Sex"
		| "Top";
	filterObject: any;
	setfilteredItem: Function;
	setChecked: Function;
}

function FilterCheckBox({
	filterObject,
	setfilteredItem,
	setChecked,
	optionslist,
}: FilterCheckBoxProps) {
	const filtered = (e: any) => {
		const keyWord = e.target.value;
		if (e.target.checked) {
			const results = filterObject.filter((fluf: any) => {
				return (
					fluf.traits.filter((trait: any) => trait.value == keyWord).length > 0
				);
			});
			console.group("Results");
			console.log(e);
			console.log(results);
			console.groupEnd();
			setfilteredItem(results);
			setChecked(true);
		} else {
			setfilteredItem([]);
			setChecked(false);
			return filterObject;
		}
	};

	return (
		<div className="flex flex-col">
			{optionslist.map((filter, index: number) => (
				<Fade duration={500} direction="down" key={index}>
					<div className="flex justify-between font-plus px-5 font-medium text-grey-content cursor-pointer transition-all">
						<label>{filter.name}</label>
						<input type="checkbox" value={filter.name} onChange={filtered} />
					</div>
				</Fade>
			))}
		</div>
	);
}

export default function FilterSelectorTraits({
	title,
	filterObject,
	setfilteredItem,
	setChecked,
}: FilterSelectorTraitsProps) {
	const [opened, setOpened] = useState(false);
	return (
		<div className="flex flex-col">
			<div
				onClick={() => setOpened(!opened)}
				className=" items-center tracking-wider p-5 font-plus font-medium text-grey-content flex justify-between cursor-pointer transition-all"
			>
				<p className="font-bold text-base">{title}</p>
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
					<FilterCheckBox
						optionslist={Filters[title]}
						filterObject={filterObject}
						setfilteredItem={setfilteredItem}
						setChecked={setChecked}
					/>
				)}
			</div>
		</div>
	);
}
