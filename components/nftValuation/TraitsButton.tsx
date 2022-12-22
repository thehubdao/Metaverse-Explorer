import { IoIosArrowDown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

interface TraitsButtonProps {
	openedTraits: boolean;
	setOpenedTraits: Function;
}

export default function TraitsButton({
	openedTraits,
	setOpenedTraits,
}: TraitsButtonProps) {
	return (
		<div
			className="flex items-center justify-between w-full relative rounded-full p-4 nm-flat-medium cursor-pointer"
			onClick={() => setOpenedTraits(!openedTraits)}
		>
			<IoFilter />

			<div className="font-bold font-plus">FILTERS</div>
			<IoIosArrowDown
          className={
            (!openedTraits ? 'rotate-180 ' : '') +
            'transition-all duration-500 relative bottom-[1px]'
          } 
        />
		</div>
	);
}
