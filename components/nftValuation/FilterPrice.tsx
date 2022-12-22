import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Currencies } from "../../lib/nftValuation/nftCommonTypes";
import { typedKeys } from "../../lib/utilities";

interface Props {
    currency: Currencies
    setCurrency: React.Dispatch<React.SetStateAction<Currencies>>;
}

export default function FilterPrice({currency, setCurrency} : Props) {
	const [opened, setOpened] = useState(false);

	const filterOptions = {
		eth: { name: "ETH", description: "" },
		usd: { name: "USD", description: "" },
		sol: { name: "SOL", description: "" },
	};

	return (
		<div className="flex flex-col px-5">
			<div className="flex gap-3 items-center font-normal font-plus text-grey-content">
				<input
					type="number"
					placeholder="MIN"
					className="nm-inset-soft text-sm text-center py-3 px-5 focus:outline-none placeholder-gray-300 rounded-full w-full"
				/>
				<label>to</label>
				<input
					type="number"
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
								{typedKeys(filterOptions).map((filter, index:number) => (
									<Fade duration={500} direction="down">
										<div
											key={index}
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
				<div className="nm-flat-soft rounded-full px-4 py-2 w-2/3 h-1/2 text-center">APPLY</div>
			</div>
		</div>
	);
}
