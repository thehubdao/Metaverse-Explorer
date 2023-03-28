import { IoIosArrowDown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

interface FilterButtonProps {
	openedFilters: boolean;
	setOpenedFilters: Function;
}

export default function TraitsButton({
	openedFilters,
	setOpenedFilters,
}: FilterButtonProps) {
	return (
		<div
			className="flex items-center justify-between ml-16 relative rounded-xl h-12 w-[273px] p-4 nm-flat-medium cursor-pointer"
			onClick={() => setOpenedFilters(!openedFilters)}
		>
			<IoFilter />

			<div className="font-bold font-plus">FILTER CHARTS</div>
			<IoIosArrowDown
          className={
            (!openedFilters ? 'rotate-180 ' : '') +
            'transition-all duration-500 relative bottom-[1px]'
          } 
        />
		</div>
	);
}
