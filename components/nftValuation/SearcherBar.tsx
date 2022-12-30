import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {};
	images: {
		image_small: string;
	};
}

interface SearcherBarProps {
	nftObject: nftObject[];
	setfilteredItems: Function;
	checked: boolean;
	setChecked: Function;
}

export default function SearcherBar({
	nftObject,
	setfilteredItems,
	setChecked,
}: SearcherBarProps) {
	const [inputValue, setInputValue] = useState<number | undefined>(undefined);
	const handleFilter = (e: any) => {
		e.preventDefault();
		const keyWord = e.target.value;
		const results = nftObject.filter((fluf: nftObject) => {
			return fluf.tokenId == keyWord;
		});
		setfilteredItems(results);
		setChecked(keyWord ? true : false);
		keyWord > 0 ? setInputValue(keyWord) : setInputValue(undefined)
	};

	return (
		<div className="relative rounded-full col-span-3 flex">
			<input
				type="number"
				onChange={handleFilter}
				value={inputValue}
				placeholder="Search by ID"
				className="font-normal font-plus justify-center text-grey-content nm-inset-soft focus:outline-none placeholder-gray-300 p-4 rounded-full w-full"
			/>
			<button
				type="submit"
				className="absolute block right-4 top-4 text-grey-content text-xl"
			>
				<FiSearch />
			</button>
		</div>
	);
}
