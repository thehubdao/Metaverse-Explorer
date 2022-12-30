import { ChangeEventHandler, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Fade } from "react-awesome-reveal";

interface optionList {
	name: string;
	description: string;
}

interface FilterCheckBoxProps {
	optionslist: optionList[];
	selectedFilters: []
	filteredFunction: ChangeEventHandler,
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

function FilterCheckBox({
	optionslist,
	selectedFilters,
	filteredFunction
}: FilterCheckBoxProps) {
	return (
		<div className="flex flex-col">
			{optionslist.map((filter, index: number) => (
				<Fade duration={500} direction="down" key={index}>
					<div className="flex justify-between font-plus px-5 font-medium text-grey-content cursor-pointer transition-all">
						<label>{filter.name}</label>
						<input type="checkbox" value={filter.name} onChange={filteredFunction} checked={selectedFilters.indexOf(filter.name) >= 0} />
					</div>
				</Fade>
			))}
		</div>
	);
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

	const filtered = (e: any) => {
		const keyWord = e.target.value;
		const auxSelectedFilters: any = selectedFilters
		let auxNoFilters = nFiltersSelected
		if (e.target.checked) {
			auxSelectedFilters[title].push(keyWord)
			setSelectedFilters(auxSelectedFilters)
			setNFiltersSelected(auxNoFilters + 1)
			setChecked(true);
		} else {
			auxSelectedFilters[title] = auxSelectedFilters[title].filter((item: any) => item != keyWord)
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
			<div
				className={
					(opened && "mb-1 md:mb-0") + "md:absolute flex flex-col gap-2"
				}
			>
				{opened && (
					<FilterCheckBox
						optionslist={nftTraitsFilters[title]}
						selectedFilters={selectedFilters[title]}
						filteredFunction={filtered}
					/>
				)}
			</div>
		</div>
	);
}