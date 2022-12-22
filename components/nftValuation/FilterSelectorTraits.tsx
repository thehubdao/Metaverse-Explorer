import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterCheckBox from "./FilterCheckBox";
import { Background, Dance, Ears, Expression, Eyes, Eyewear, Fur, Head, Mouth, Music, Neck, Nose, Sex, Top } from "../../lib/nftValuation/nftCommonTypes";

interface optionList {
	name:string
	description:string
}

interface Props {
	title: string;
	filterObject: any;
	setfilteredItem: Function;
	setChecked: Function;
}

function setFilter(typeFilter:string, object: any, setfilteredItem:Function, setChecked:Function){
	let options: optionList[]
	switch (typeFilter) {
		case "Background":
			options = Background
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
		case "Dance":
			options = Dance
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Ears":
			options = Ears
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Expression":
			options = Expression
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Eyes":
			options = Eyes
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Eyewear":
			options = Eyewear
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Fur":
			options = Fur
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Head":
			options = Head
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Mouth":
			options = Mouth
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Music":
			options = Music
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Neck":
			options = Neck
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Nose":
			options = Nose
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Sex":
			options = Sex
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
        case "Top":
			options = Top
			return <FilterCheckBox
			optionslist={options}
			filterObject={object}
			setfilteredItem={setfilteredItem}
			setChecked={setChecked}
		/>;
	}
}

export default function FilterSelectorTraits({
	title,
	filterObject,
	setfilteredItem,
	setChecked,
}: Props) {
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
					<div>
                        {setFilter(title, filterObject, setfilteredItem,setChecked)}  
                    </div>				
				)}
			</div>
		</div>
    )
}