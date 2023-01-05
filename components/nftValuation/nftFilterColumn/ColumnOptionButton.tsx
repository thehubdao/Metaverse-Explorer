import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
	title: string;
	children: React.ReactNode;
}

export default function ColumnOptionButton({ title, children }: Props) {
	const [opened, setOpened] = useState(false);
	return (
		<div className="flex flex-col">
			<div
				onClick={() => setOpened(!opened)}
				className="items-center tracking-wider p-5 font-plus font-medium text-grey-content flex justify-between cursor-pointer transition-all"
			>
				<p className="font-bold text-lg">{title}</p>
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
				{opened && <div>{children}</div>}
			</div>
		</div>
	);
}
