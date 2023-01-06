import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CheckBox } from "./Checkbox";

interface optionList {
	name: string;
	description: string;
}

interface FilterSelectorTraitsProps {
	title: string;
	setChecked: Function;
	selectedFilters: any
	setSelectedFilters: Function
	nFiltersSelected: number
	setNFiltersSelected: Function
	nftTraitsFilters: any
}

export default function FilterSelectorTraits({
	title,
	setChecked,
	selectedFilters,
	setSelectedFilters,
	nFiltersSelected,
	setNFiltersSelected,
	nftTraitsFilters
}: FilterSelectorTraitsProps) {
	const [opened, setOpened] = useState(false);

	const handleFilter = (keyword: string, isntChecked: boolean) => {
		const auxSelectedFilters: any = selectedFilters
		let auxNoFilters = nFiltersSelected
		if (isntChecked) {
			auxSelectedFilters[title].push(keyword)
			setSelectedFilters(auxSelectedFilters)
			setNFiltersSelected(auxNoFilters + 1)
			setChecked(true);
		} else {
			auxSelectedFilters[title] = auxSelectedFilters[title].filter((item: any) => item != keyword)
			setSelectedFilters(auxSelectedFilters)
			setNFiltersSelected(auxNoFilters - 1)
			if (auxNoFilters - 1 <= 0)
				setChecked(false);
		}
	};

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
			<div className={(opened && "mb-1 md:mb-0") + "md:absolute flex flex-col gap-2"}>
				{opened && (
					<div className="flex flex-col">
						{nftTraitsFilters[title].map((filter: optionList, index: number) => (
							<CheckBox
								filter={filter}
								selectedFilters={selectedFilters[title]}
								handleFilter={handleFilter}
								key={index}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}