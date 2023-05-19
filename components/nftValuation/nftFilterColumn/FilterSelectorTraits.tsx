import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CheckBox } from "./Checkbox";

interface optionList {
	name: string;
	description: string;
}

interface FilterSelectorTraitsProps {
	title: string;
	selectedFilters: any
	nftTraitsFilters: any
	handleTraitFilter: Function
}

export default function FilterSelectorTraits({
	title,
	selectedFilters,
	nftTraitsFilters,
	handleTraitFilter
}: FilterSelectorTraitsProps) {
	const [opened, setOpened] = useState(false);

	const handleFilter = (keyword: string, isntChecked: boolean) => {
		const auxSelectedFilters: any = selectedFilters
		let auxNoFilters = 0
		if (isntChecked) {
			auxSelectedFilters[title].push(keyword)
		} else {
			auxSelectedFilters[title] = auxSelectedFilters[title].filter((item: any) => item != keyword)
		}
		Object.entries(auxSelectedFilters).forEach(([key, value]: any) => {
			if (value.length > 0)
				auxNoFilters = auxNoFilters + 1
		});
		handleTraitFilter(auxSelectedFilters, auxNoFilters)
	};

	return (
		<div className="flex flex-col">
			<div
				onClick={() => setOpened(!opened)}
				className=" items-center tracking-wider p-5  font-medium text-grey-content flex justify-between cursor-pointer transition-all"
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