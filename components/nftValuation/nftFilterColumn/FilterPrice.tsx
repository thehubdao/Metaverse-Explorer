import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Currencies } from "../../../lib/nftValuation/nftCommonTypes";
import { typedKeys } from "../../../lib/utilities";
interface FilterPriceProps {
	currency: Currencies;
	setCurrency: React.Dispatch<React.SetStateAction<Currencies>>;
	inputValueMin: number
	inputValueMax: number
	setInputValueMin: Function
	setInputValueMax: Function
	handleApply: Function
}

export default function FilterPrice({
	currency,
	setCurrency,
	inputValueMin,
	inputValueMax,
	setInputValueMin,
	setInputValueMax,
	handleApply
}: FilterPriceProps) {
	const [opened, setOpened] = useState(false);


	const filterOptions = {
		eth: { name: "ETH", description: "" },
		usdc: { name: "USDC", description: "" },
		weth: { name: "WETH", description: "" },
	};

	return (
		<div className="flex flex-col px-5">
			<div className="flex gap-3 items-center font-normal font-plus text-grey-content">
				<input
					type="number"
					placeholder="MIN"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const input = event.currentTarget.value;
						if (input) setInputValueMin(parseFloat(input));
						else setInputValueMin(0);
					}}
					value={inputValueMin === 0 ? "" : inputValueMin}
					className="nm-inset-soft text-sm text-center py-3 px-5 focus:outline-none placeholder-gray-300 rounded-full w-full"
					min={0}
				/>
				<label>to</label>
				<input
					type="number"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const input = event.currentTarget.value;
						if (input) setInputValueMax(parseFloat(input));
						else setInputValueMax(Number.MAX_VALUE);
					}}
					value={inputValueMax === Number.MAX_VALUE ? "" : inputValueMax}
					placeholder="MAX"
					className="nm-inset-soft text-sm text-center py-3 px-5 focus:outline-none placeholder-gray-300 rounded-full w-full"
					min={0}
				/>
			</div>
			<div className="flex justify-between pt-5">
				<div className="flex flex-col nm-flat-soft rounded-xl">
					<div
						onClick={() => setOpened(!opened)}
						className="cursor-pointer font-medium w-full px-5 py-2"
					>
						<p>{filterOptions[currency].name}</p>
					</div>
					<div
						className={
							(opened && "mb-1 md:mb-0") + "md:absolute flex flex-col gap-2"
						}
					>
						{opened && (
							<div>
								{typedKeys(filterOptions).map((filter, index: number) => (
									<Fade duration={500} direction="down" key={index}>
										<div
											onClick={() => {
												setCurrency(filter);
												setOpened(false);
											}}
											className="px-4 py-2"
										>
											<label>{filterOptions[filter].name}</label>
										</div>
									</Fade>
								))}
							</div>
						)}
					</div>
				</div>
				<div
					className="nm-flat-soft rounded-full px-4 py-2 w-2/3 h-1/2 text-center cursor-pointer"
					onClick={() => { handleApply() }}
				>
					APPLY
				</div>
			</div>
		</div>
	);
}
