import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {};
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
	setfilteredItems: Function;
	setChecked: Function;
	optionslist: optionList[];
}

export default function FilterCheckBox({
	filterObject,
	setfilteredItems,
	setChecked,
	optionslist,
}: FilterCheckBoxProps) {
	useEffect(() => {
		console.log(optionslist);
	}, []);
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
			setfilteredItems(results);
			setChecked(true);
		} else {
			setfilteredItems(null);
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
