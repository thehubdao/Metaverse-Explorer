import { arrayify } from "ethers/lib/utils";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Currencies } from "../../../lib/nftValuation/nftCommonTypes";
import { typedKeys } from "../../../lib/utilities";
interface Props {
	currency: Currencies;
	setCurrency: React.Dispatch<React.SetStateAction<Currencies>>;
	nftObject: any;
	setfilteredItem: Function;
	setChecked: Function;
}

export default function FilterPrice({
	currency,
	setCurrency,
	nftObject,
	setfilteredItem,
	setChecked,
}: Props) {
	const [opened, setOpened] = useState(false);
	const [inputValuemin, setInputValuemin] = useState<number>(0);
	const [inputValuemax, setInputValuemax] = useState<number>(Number.MAX_VALUE);

	const filterOptions = {
		eth: { name: "ETH", description: "" },
		usdc: { name: "USDC", description: "" },
		weth: { name: "WETH", description: "" },
	};

	const handleApply = () => {
		const results = nftObject.filter((fluf: any) => {
			return (
				fluf.floor_adjusted_predicted_price >= inputValuemin &&
				fluf.floor_adjusted_predicted_price <= inputValuemax
			);
		});
		setChecked(
			inputValuemin !== 0 || inputValuemax !== Number.MAX_VALUE ? true : false
		);
		setfilteredItem(results);

	};

	return (
		<div className="flex flex-col px-5">
			<div className="flex gap-3 items-center font-normal font-plus text-grey-content">
				<input
					type="number"
					placeholder="MIN"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const input = event.currentTarget.value;
						if (input) setInputValuemin(parseFloat(input));
						else setInputValuemin(0);
					}}
					value={inputValuemin === 0 ? "" : inputValuemin}
					className="nm-inset-soft text-sm text-center py-3 px-5 focus:outline-none placeholder-gray-300 rounded-full w-full"
				/>
				<label>to</label>
				<input
					type="number"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const input = event.currentTarget.value;
						if (input) setInputValuemax(parseFloat(input));
						else setInputValuemax(Number.MAX_VALUE);
					}}
					value={inputValuemax === Number.MAX_VALUE ? "" : inputValuemax}
					placeholder="MAX"
					className="nm-inset-soft text-sm text-center py-3 px-5 focus:outline-none placeholder-gray-300 rounded-full w-full"
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
					onClick={() => {
						handleApply();
					}}
				>
					APPLY
				</div>
			</div>
		</div>
	);
}
