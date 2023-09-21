import { FiSearch } from "react-icons/fi";

interface SearcherBarProps {
	inputValue: string | undefined
	setInputValue: Function
}

export default function SearcherBar({
	inputValue,
	setInputValue
}: SearcherBarProps) {

	return (
		<div className="relative rounded-full col-span-3 flex">
			<input
				type="number"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) }}
				value={inputValue}
				placeholder="Search by ID"
				min={0}
				className="font-normal  justify-center text-grey-content nm-inset-soft focus:outline-none placeholder-gray-300 p-4 rounded-full w-full"
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
